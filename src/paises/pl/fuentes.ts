import { esFechaISO } from "@/motor/vigencia";
import type { Detector, DetectorSerie, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const VERIFICADO: FechaISO = "2026-10-24";

async function kursNbp(http: Http, url: string, kod: string): Promise<readonly PuntoSerie[] | null> {
  const json = (await http.json(url)) as { code?: unknown; rates?: unknown };
  if (json?.code !== kod || !Array.isArray(json.rates)) return null;
  const puntos: PuntoSerie[] = [];
  for (const r of json.rates as { effectiveDate?: unknown; mid?: unknown }[]) {
    if (!esFechaISO(r.effectiveDate) || typeof r.mid !== "number" || !Number.isFinite(r.mid)) return null;
    puntos.push({ fecha: r.effectiveDate, valor: r.mid });
  }
  return puntos.length ? puntos : null;
}

function detectorKursu(kod: string, banda: DetectorSerie["banda"]): Detector {
  const k = kod.toLowerCase();
  return {
    id: `pl.${k}-nbp`,
    carril: "serie",
    serie: `pl.${k}`,
    metodo: "api-json",
    url: `https://api.nbp.pl/api/exchangerates/rates/a/${k}/last/20/?format=json`,
    banda,
    traer(http) {
      return kursNbp(http, this.url, kod);
    },
  };
}

const GUS_STRONA =
  "https://stat.gov.pl/obszary-tematyczne/ceny-handel/wskazniki-cen/wskazniki-cen-towarow-i-uslug-konsumpcyjnych-pot-inflacja-/miesieczne-wskazniki-cen-towarow-i-uslug-konsumpcyjnych-od-1982-roku/";

// GUS publikuje wskaźniki "grudzień poprzedniego roku = 100" w pliku CSV, którego nazwa zmienia się
// z każdą aktualizacją, więc najpierw szukamy linku na stronie. Indeks łączymy grudniami od 2000 r.,
// tak samo jak w series.json (grudzień 1999 = 100). CSV jest w cp1250: dopasowujemy tylko liczby.
// Bez nagłówka przeglądarki: z nim stat.gov.pl odpowiada 503 (ochrona przed botami).
async function cpiGus(http: Http): Promise<readonly PuntoSerie[] | null> {
  const html = await http.texto(GUS_STRONA);
  const link = /href="([^"]*miesiecznewskaznikicen[^"]*\.csv)"/.exec(html)?.[1];
  if (!link) return null;
  const csv = await http.texto(link.startsWith("http") ? link : `https://stat.gov.pl${link}`);
  const wskazniki = new Map<string, number>();
  for (const linia of csv.split(/\r?\n/)) {
    const m = /;Grudzie[^;]*;(\d{4});(\d{1,2});(\d+),(\d)/.exec(linia);
    if (m) wskazniki.set(`${m[1]}-${m[2].padStart(2, "0")}`, Number(`${m[3]}.${m[4]}`));
  }
  if (!wskazniki.has("2000-01")) return null;
  const puntos: PuntoSerie[] = [];
  let baza = 100;
  for (let rok = 2000; ; rok++) {
    let grudzien: number | null = null;
    for (let mies = 1; mies <= 12; mies++) {
      const w = wskazniki.get(`${rok}-${String(mies).padStart(2, "0")}`);
      if (w === undefined) continue;
      const fecha = `${rok}-${String(mies).padStart(2, "0")}-01`;
      if (!esFechaISO(fecha)) return null;
      const valor = (baza * w) / 100;
      puntos.push({ fecha, valor: Math.round(valor * 10000) / 10000 });
      if (mies === 12) grudzien = valor;
    }
    if (grudzien === null) break;
    baza = grudzien;
  }
  return puntos.length ? puntos : null;
}

// Nowa decyzja RPP pojawia się w pliku XML jako nowa data "obowiazuje_od".
async function stopaReferencyjna(http: Http, url: string): Promise<readonly HallazgoNorma[] | null> {
  const xml = await http.texto(url);
  if (!/<stopy_procentowe/.test(xml)) return null;
  const m = /id="ref"[\s\S]*?oprocentowanie="([\d,]+)"[\s\S]*?obowiazuje_od="(\d{4}-\d{2}-\d{2})"/.exec(xml);
  if (!m || !esFechaISO(m[2])) return null;
  if (m[2] <= "2026-03-05") return [];
  return [{ titulo: `Stopa referencyjna NBP ${m[1]} % od ${m[2]}`, url: "https://nbp.pl/polityka-pieniezna/decyzje-rpp/podstawowe-stopy-procentowe-nbp/", fecha: m[2] }];
}

// Wyszukiwarka aktów ELI Kancelarii Sejmu: nowe rozporządzenia i teksty jednolite po dacie weryfikacji.
async function aktyEli(http: Http, url: string): Promise<readonly HallazgoNorma[] | null> {
  const json = (await http.json(url)) as { items?: unknown };
  if (!Array.isArray(json?.items)) return null;
  const hallazgos: HallazgoNorma[] = [];
  for (const a of json.items as { ELI?: unknown; title?: unknown; announcementDate?: unknown; year?: unknown; pos?: unknown }[]) {
    if (typeof a.title !== "string" || typeof a.year !== "number" || typeof a.pos !== "number" || !esFechaISO(a.announcementDate)) continue;
    if (a.announcementDate <= VERIFICADO) continue;
    hallazgos.push({
      titulo: a.title,
      url: `https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU${a.year}${String(a.pos).padStart(7, "0")}`,
      fecha: a.announcementDate,
    });
  }
  return hallazgos;
}

function eli(tytul: string): `https://${string}` {
  return `https://api.sejm.gov.pl/eli/acts/search?publisher=DU&title=${encodeURIComponent(tytul)}&dateFrom=${VERIFICADO}&limit=20`;
}

export const detectores: readonly Detector[] = [
  detectorKursu("EUR", { min: 3.8, max: 5.2, saltoRelativoMax: 0.05 }),
  detectorKursu("USD", { min: 3.0, max: 5.0, saltoRelativoMax: 0.06 }),
  detectorKursu("CHF", { min: 3.5, max: 5.8, saltoRelativoMax: 0.06 }),
  detectorKursu("GBP", { min: 4.3, max: 6.3, saltoRelativoMax: 0.06 }),
  {
    id: "pl.cpi-gus",
    carril: "serie",
    serie: "pl.cpi",
    metodo: "html",
    url: GUS_STRONA,
    banda: { min: 200, max: 320, saltoRelativoMax: 0.03 },
    traer(http) {
      return cpiGus(http);
    },
  },
  {
    id: "pl.stopa-referencyjna-nbp",
    carril: "norma",
    datos: ["pl.stopa-referencyjna"],
    metodo: "api-xml",
    url: "https://static.nbp.pl/dane/stopy/stopy_procentowe.xml",
    traer(http) {
      return stopaReferencyjna(http, this.url);
    },
  },
  {
    id: "pl.eli-placa-minimalna",
    carril: "norma",
    datos: ["pl.placa-minimalna", "pl.stawka-godzinowa"],
    metodo: "api-json",
    url: eli("minimalnego wynagrodzenia"),
    traer(http) {
      return aktyEli(http, this.url);
    },
  },
  {
    id: "pl.eli-podatki",
    carril: "norma",
    datos: ["pl.skala-pit", "pl.kwota-zmniejszajaca", "pl.podatek-liniowy", "pl.podatek-belki", "pl.koszty-pracownicze", "pl.koszty-procentowe", "pl.limit-ulgi-dla-mlodych"],
    metodo: "api-json",
    url: eli("podatku dochodowym od osób fizycznych"),
    traer(http) {
      return aktyEli(http, this.url);
    },
  },
  {
    id: "pl.eli-ryczalt",
    carril: "norma",
    datos: ["pl.stawki-ryczaltu"],
    metodo: "api-json",
    url: eli("zryczałtowanym podatku dochodowym"),
    traer(http) {
      return aktyEli(http, this.url);
    },
  },
  {
    id: "pl.eli-zus",
    carril: "norma",
    datos: ["pl.skladki-pracownika", "pl.skladki-platnika", "pl.limit-malego-zus", "pl.limit-30-krotnosci", "pl.podstawa-zus-pelna", "pl.podstawa-zus-preferencyjna"],
    metodo: "api-json",
    url: eli("systemie ubezpieczeń społecznych"),
    traer(http) {
      return aktyEli(http, this.url);
    },
  },
  {
    id: "pl.eli-zdrowotna",
    carril: "norma",
    datos: ["pl.skladka-zdrowotna", "pl.skladka-zdrowotna-liniowa", "pl.zdrowotna-podstawa-minimalna", "pl.zdrowotna-ryczalt"],
    metodo: "api-json",
    url: eli("świadczeniach opieki zdrowotnej"),
    traer(http) {
      return aktyEli(http, this.url);
    },
  },
  {
    id: "pl.eli-budzet",
    carril: "norma",
    datos: ["pl.fundusze", "pl.prognozowane-wynagrodzenie"],
    metodo: "api-json",
    url: eli("Ustawa budżetowa"),
    traer(http) {
      return aktyEli(http, this.url);
    },
  },
  {
    id: "pl.eli-vat",
    carril: "norma",
    datos: ["pl.stawki-vat"],
    metodo: "api-json",
    url: eli("podatku od towarów i usług"),
    traer(http) {
      return aktyEli(http, this.url);
    },
  },
  {
    id: "pl.eli-pcc",
    carril: "norma",
    datos: ["pl.stawki-pcc", "pl.pcc-prog-zwolnienia"],
    metodo: "api-json",
    url: eli("podatku od czynności cywilnoprawnych"),
    traer(http) {
      return aktyEli(http, this.url);
    },
  },
  {
    id: "pl.eli-kodeks-pracy",
    carril: "norma",
    datos: ["pl.wymiar-urlopu", "pl.dodatek-za-nadgodziny", "pl.okres-wypowiedzenia", "pl.odprawa", "pl.limit-odprawy", "pl.zasilek-chorobowy"],
    metodo: "api-json",
    url: eli("Kodeks pracy"),
    traer(http) {
      return aktyEli(http, this.url);
    },
  },
];
