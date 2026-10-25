import { esFechaISO } from "@/motor/vigencia";
import type { Detector, DetectorSerie, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const KURZY_ROK = "https://www.cnb.cz/cs/financni-trhy/devizovy-trh/kurzy-devizoveho-trhu/kurzy-devizoveho-trhu/rok.txt";

function radkyKurzu(txt: string, kod: string): PuntoSerie[] | null {
  const radky = txt.replace(/^\uFEFF/, "").split(/\r?\n/).filter(Boolean);
  const hlavicka = radky[0]?.split("|") ?? [];
  const sloupec = hlavicka.indexOf(`1 ${kod}`);
  if (hlavicka[0] !== "Datum" || sloupec < 0) return null;
  const puntos: PuntoSerie[] = [];
  for (const radek of radky.slice(1)) {
    const p = radek.split("|");
    const m = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(p[0] ?? "");
    const valor = Number((p[sloupec] ?? "").replace(",", "."));
    const fecha = m ? `${m[3]}-${m[2]}-${m[1]}` : "";
    if (esFechaISO(fecha) && Number.isFinite(valor) && valor > 0) puntos.push({ fecha, valor });
  }
  return puntos;
}

// ČNB vydává kurzy za celý rok jako text s oddělovačem «|»: hlavička «Datum|1 EUR|...», řádky
// «23.10.2026|24,335|...». Bez parametru «rok» vrací letošní rok; v lednu má jen pár řádků, proto
// doplníme i loňský soubor.
async function kurzCnb(http: Http, url: string, kod: string): Promise<readonly PuntoSerie[] | null> {
  const letos = radkyKurzu(await http.texto(url), kod);
  if (!letos?.length) return null;
  if (letos.length >= 40) return letos.slice(-40);
  const rok = Number(letos[0].fecha.slice(0, 4));
  const loni = radkyKurzu(await http.texto(`${url}?rok=${rok - 1}`), kod) ?? [];
  return [...loni, ...letos].slice(-40);
}

function detectorKurzu(kod: string, banda: DetectorSerie["banda"]): Detector {
  return {
    id: `cz.${kod.toLowerCase()}-cnb`,
    carril: "serie",
    serie: `cz.${kod.toLowerCase()}`,
    metodo: "html",
    url: KURZY_ROK,
    banda,
    traer(http) {
      return kurzCnb(http, this.url, kod);
    },
  };
}

const CSU_CSV = "https://data.csu.gov.cz/opendata/sady/CEN0101E/distribuce/csv";

// Otevřená data ČSÚ (sada CEN0101E): bazický index 2015 = 100 za úhrn spotřebního koše,
// domácnosti celkem a celé Česko. Kód měsíce je «2026-09»; kumulace («2026-09K») a čtvrtletí
// («2026-Q3») přeskakujeme.
async function cpiCsu(http: Http): Promise<readonly PuntoSerie[] | null> {
  const csv = await http.texto(CSU_CSV);
  const re = /"IZ2015","Úhrn","0","","","Domácnosti celkem","0","Česko","CZ","[^"]*","(\d{4})-(\d{2})","([\d.]+)"/g;
  const body = new Map<string, number>();
  for (const m of csv.matchAll(re)) {
    const fecha = `${m[1]}-${m[2]}-01`;
    const valor = Number(m[3]);
    if (esFechaISO(fecha) && Number.isFinite(valor)) body.set(fecha, valor);
  }
  if (!body.has("2015-01-01")) return null;
  return [...body.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([fecha, valor]) => ({ fecha: fecha as FechaISO, valor }));
}

// Nová změna repo sazby se v souboru ČNB objeví jako nový řádek «RRRRMMDD|sazba».
async function repoCnb(http: Http, url: string): Promise<readonly HallazgoNorma[] | null> {
  const txt = await http.texto(url);
  const radky = [...txt.matchAll(/^(\d{4})(\d{2})(\d{2})\|([\d,]+)\s*$/gm)];
  const posledni = radky.at(-1);
  if (!posledni) return null;
  const fecha = `${posledni[1]}-${posledni[2]}-${posledni[3]}`;
  if (!esFechaISO(fecha)) return null;
  if (fecha <= "2026-06-19") return [];
  return [{ titulo: `Repo sazba ČNB ${posledni[4]} % od ${fecha}`, url: "https://www.cnb.cz/cs/menova-politika/br-zapisy-z-jednani/", fecha }];
}

// Zákony pro lidi u každého předpisu ukazují «Aktuální znění DD.MM.RRRR - ...». Nové znění s
// pozdějším začátkem znamená novelu, kterou je třeba přečíst.
async function zneniZakona(http: Http, url: string, nazev: string, overeno: FechaISO): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url);
  const m = /Aktuální znění (\d{2})\.(\d{2})\.(\d{4})/.exec(html);
  if (!m) return null;
  const fecha = `${m[3]}-${m[2]}-${m[1]}`;
  if (!esFechaISO(fecha)) return null;
  if (fecha <= overeno) return [];
  return [{ titulo: `${nazev}: nové znění od ${fecha}`, url, fecha }];
}

function detectorZakona(id: string, cislo: string, nazev: string, overeno: FechaISO, datos: readonly string[]): Detector {
  return {
    id,
    carril: "norma",
    datos,
    metodo: "html",
    url: `https://www.zakonyprolidi.cz/cs/${cislo}`,
    traer(http) {
      return zneniZakona(http, this.url, nazev, overeno);
    },
  };
}

// ČSSZ každý prosinec zveřejní «Přehled nejdůležitějších údajů pro sociální zabezpečení v roce RRRR».
async function prehledCssz(http: Http, url: string): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url);
  if (!/Česká správa sociálního zabezpečení/i.test(html)) return null;
  const roky = [...html.matchAll(/nejdůležitějších údajů pro sociální zabezpečení v roce (\d{4})/gi)].map((m) => Number(m[1]));
  const novy = roky.filter((r) => r > 2026).sort().at(-1);
  if (!novy) return [];
  return [{ titulo: `ČSSZ: přehled nejdůležitějších údajů pro rok ${novy}`, url, fecha: `${novy - 1}-12-01` as FechaISO }];
}

// MPSV na stránce o minimální mzdě uvádí nadpis «Minimální mzda v roce RRRR».
async function minimalniMzdaMpsv(http: Http, url: string): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url);
  const roky = [...html.matchAll(/Minimální mzda v roce (\d{4})/g)].map((m) => Number(m[1]));
  if (!roky.length) return null;
  const novy = roky.filter((r) => r > 2027).sort().at(-1);
  if (!novy) return [];
  return [{ titulo: `MPSV: minimální mzda v roce ${novy}`, url, fecha: `${novy - 1}-09-30` as FechaISO }];
}

export const detectores: readonly Detector[] = [
  detectorKurzu("EUR", { min: 22, max: 28, saltoRelativoMax: 0.04 }),
  detectorKurzu("USD", { min: 17, max: 27, saltoRelativoMax: 0.06 }),
  detectorKurzu("GBP", { min: 25, max: 33, saltoRelativoMax: 0.06 }),
  detectorKurzu("CHF", { min: 22, max: 30, saltoRelativoMax: 0.06 }),
  detectorKurzu("PLN", { min: 5, max: 6.5, saltoRelativoMax: 0.05 }),
  {
    id: "cz.cpi-csu",
    carril: "serie",
    serie: "cz.cpi",
    metodo: "html",
    url: CSU_CSV,
    banda: { min: 140, max: 200, saltoRelativoMax: 0.03 },
    traer(http) {
      return cpiCsu(http);
    },
  },
  {
    id: "cz.repo-cnb",
    carril: "norma",
    datos: ["cz.repo-sazba"],
    metodo: "html",
    url: "https://www.cnb.cz/cs/casto-kladene-dotazy/.galleries/vyvoj_repo_historie.txt",
    traer(http) {
      return repoCnb(http, this.url);
    },
  },
  {
    id: "cz.cssz-prehled",
    carril: "norma",
    datos: [
      "cz.prumerna-mzda",
      "cz.max-vymerovaci-zaklad",
      "cz.rozhodny-prijem-dpp",
      "cz.osvc-min-zaloha-socialni",
      "cz.osvc-min-vz-socialni",
      "cz.osvc-rozhodna-castka",
      "cz.duchod-zakladni-vymera",
      "cz.duchod-redukcni-hranice",
      "cz.dan-z-prijmu",
    ],
    metodo: "html",
    url: "https://www.cssz.gov.cz/web/cz/tiskove-zpravy",
    traer(http) {
      return prehledCssz(http, this.url);
    },
  },
  {
    id: "cz.mpsv-minimalni-mzda",
    carril: "norma",
    datos: ["cz.minimalni-mzda", "cz.minimalni-mzda-hodinova"],
    metodo: "html",
    url: "https://mpsv.gov.cz/minimalni-mzda",
    traer(http) {
      return minimalniMzdaMpsv(http, this.url);
    },
  },
  detectorZakona("cz.zpl-dane-z-prijmu", "1992-586", "Zákon o daních z příjmů", "2026-08-01", [
    "cz.dan-z-prijmu",
    "cz.sleva-na-poplatnika",
    "cz.zvyhodneni-na-deti",
    "cz.srazkova-dan",
    "cz.pausalni-vydaje",
    "cz.pausalni-vydaje-limit",
    "cz.pausalni-dan-limity",
  ]),
  detectorZakona("cz.zpl-zakonik-prace", "2006-262", "Zákoník práce", "2026-08-29", [
    "cz.vymera-dovolene",
    "cz.priplatky",
    "cz.odstupne",
    "cz.vypovedni-doba",
    "cz.nahrada-mzdy-nemoc",
  ]),
  detectorZakona("cz.zpl-nemocenske", "2006-187", "Zákon o nemocenském pojištění", "2026-07-01", ["cz.nemocenske-sazby", "cz.ppm-sazba", "cz.ppm-podpurci-doba"]),
  detectorZakona("cz.zpl-statni-socialni-podpora", "1995-117", "Zákon o státní sociální podpoře", "2026-09-01", [
    "cz.rodicovsky-prispevek",
    "cz.rodicovsky-limit",
    "cz.rodicovsky-podil",
  ]),
  detectorZakona("cz.zpl-dph", "2004-235", "Zákon o DPH", "2026-01-01", ["cz.dph"]),
  detectorZakona("cz.zpl-duchodove", "1995-155", "Zákon o důchodovém pojištění", "2026-01-01", ["cz.duchod-zapocet", "cz.duchod-sazba-za-rok"]),
];
