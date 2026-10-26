import { esFechaISO } from "@/motor/vigencia";
import type { BandaSerie, Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const BNM_XML = "https://www.bnm.md/ro/official_exchange_rates?get_xml=1";
const IPC_BNS = "https://statbank.statistica.md/PxWeb/api/v1/ro/40%20Statistica%20economica/05%20PRE/PRE010/serii%20lunare/PRE012300.px";
const MONITORUL = "https://monitorul.gov.md/ro/search";
const SCUTIRI_SFS = "https://dataset.gov.md/ro/dataset/38ec2750-8671-4faa-833d-3041baae0a18";
const ULTIMUL_AN_VERIFICAT = 2026;

function azi(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Chisinau" }).format(new Date());
}

// BNM publică un XML pe zi; fără parametrul date răspunde gol, așa că se cere data de azi de la Chișinău.
async function cursBnm(http: Http, cod: string): Promise<readonly PuntoSerie[] | null> {
  const ziua = azi();
  const xml = await http.texto(`${BNM_XML}&date=${ziua.slice(8, 10)}.${ziua.slice(5, 7)}.${ziua.slice(0, 4)}`);
  const antet = /<ValCurs Date="(\d{2})\.(\d{2})\.(\d{4})"/.exec(xml);
  if (!antet) return null;
  const fecha = `${antet[3]}-${antet[2]}-${antet[1]}`;
  const m = new RegExp(`<CharCode>${cod}</CharCode>\\s*<Nominal>(\\d+)</Nominal>[\\s\\S]*?<Value>([\\d.]+)</Value>`).exec(xml);
  if (!m || !esFechaISO(fecha)) return null;
  const valor = Number(m[2]) / Number(m[1]);
  if (!Number.isFinite(valor) || valor <= 0) return null;
  return [{ fecha, valor: Math.round(valor * 1e6) / 1e6 }];
}

function detectorCurs(cod: string, banda: BandaSerie): Detector {
  const c = cod.toLowerCase();
  return {
    id: `md.${c}-bnm`,
    carril: "serie",
    serie: `md.${c}`,
    metodo: "api-xml",
    url: BNM_XML,
    banda,
    traer(http) {
      return cursBnm(http, cod);
    },
  };
}

// Banca de date a BNS (PxWeb) dă tabelul doar la un POST cu interogarea în JSON (json-stat2).
async function ipcBns(http: Http): Promise<readonly PuntoSerie[] | null> {
  if (!http.postJson) return null;
  const json = (await http.postJson(IPC_BNS, {
    query: [{ code: "Grupe majore", selection: { filter: "item", values: ["0"] } }],
    response: { format: "json-stat2" },
  })) as { value?: (number | null)[]; dimension?: Record<string, { category?: { index?: Record<string, number> } }> };
  const ani = json?.dimension?.Ani?.category?.index;
  const luni = json?.dimension?.Luni?.category?.index;
  if (!ani || !luni || !Array.isArray(json.value)) return null;
  const nl = Object.keys(luni).length;
  const puncte: PuntoSerie[] = [];
  for (const [an, i] of Object.entries(ani)) {
    for (const [luna, j] of Object.entries(luni)) {
      const v = json.value[i * nl + j];
      const fecha = `${an}-${luna}-01`;
      if (typeof v !== "number" || an < "2000" || !esFechaISO(fecha)) continue;
      puncte.push({ fecha, valor: v });
    }
  }
  puncte.sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
  return puncte.length ? puncte : null;
}

// Căutarea din Monitorul Oficial întoarce cuprinsul edițiilor. Un titlu cu un an mai nou decât cel
// verificat (hotărârea salariului minim, legea anuală a fondurilor medicale) e un act nou de citit.
async function acteNoi(http: Http, cautare: string, titlu: RegExp): Promise<readonly HallazgoNorma[] | null> {
  const url = `${MONITORUL}?keywords=${encodeURIComponent(cautare)}`;
  const html = await http.texto(url);
  if (!/monitorul\/view\/pdf/.test(html)) return null;
  const gasite: HallazgoNorma[] = [];
  for (const m of html.matchAll(/<div>([^<]{20,400})<\/div>/g)) {
    const text = m[1].replace(/&acirc;/g, String.fromCharCode(0xe2)).replace(/&icirc;/g, String.fromCharCode(0xee)).replace(/\s+/g, " ").trim();
    const an = titlu.exec(text);
    if (an && Number(an[1]) > ULTIMUL_AN_VERIFICAT) gasite.push({ titulo: text, url, fecha: azi() as FechaISO });
  }
  return gasite;
}

// SFS publică pe portalul datelor deschise un PDF pe an cu scutirile; un fișier pentru un an nou
// înseamnă sume de verificat.
async function scutiriNoi(http: Http): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(SCUTIRI_SFS);
  const ani = [...html.matchAll(/download\/anul-(\d{4})/g)].map((m) => Number(m[1]));
  if (!ani.length) return null;
  return ani
    .filter((an) => an > ULTIMUL_AN_VERIFICAT)
    .map((an) => ({ titulo: `SFS: scutirile la impozitul pe venit pentru anul ${an}`, url: SCUTIRI_SFS, fecha: azi() as FechaISO }));
}

// CNAS scrie suma indemnizației unice pe pagina serviciului; dacă textul nu mai conține suma
// verificată, s-a schimbat.
async function paginaCnas(http: Http, url: string, sume: readonly string[], titlu: string): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url);
  if (!/Casa Na/.test(html)) return null;
  const text = html.replace(/&nbsp;|\s+/g, " ");
  return sume.every((s) => text.includes(s)) ? [] : [{ titulo: titlu, url, fecha: azi() as FechaISO }];
}

const CNAS = "https://cnas.gov.md/ro/servicii/servicii";

export const detectores: readonly Detector[] = [
  detectorCurs("EUR", { min: 17, max: 25, saltoRelativoMax: 0.05 }),
  detectorCurs("USD", { min: 14, max: 23, saltoRelativoMax: 0.05 }),
  detectorCurs("RON", { min: 3.2, max: 4.6, saltoRelativoMax: 0.05 }),
  detectorCurs("UAH", { min: 0.3, max: 0.55, saltoRelativoMax: 0.06 }),
  detectorCurs("GBP", { min: 19, max: 29, saltoRelativoMax: 0.05 }),
  {
    id: "md.ipc-bns",
    carril: "serie",
    serie: "md.ipc",
    metodo: "api-json",
    url: IPC_BNS,
    banda: { min: 500, max: 7000, saltoRelativoMax: 0.05 },
    traer(http) {
      return ipcBns(http);
    },
  },
  {
    id: "md.salariu-minim-mo",
    carril: "norma",
    datos: ["md.salariu-minim", "md.salariu-minim-orar", "md.ore-lunare-salariu-minim"],
    metodo: "html",
    url: MONITORUL,
    traer(http) {
      return acteNoi(http, "cuantumului salariului minim pe țară", /salariului minim pe țară pentru anul (\d{4})/);
    },
  },
  {
    id: "md.salariu-mediu-mo",
    carril: "norma",
    datos: ["md.salariu-mediu"],
    metodo: "html",
    url: MONITORUL,
    traer(http) {
      return acteNoi(http, "salariului mediu lunar pe economie prognozat", /prognozat pentru anul (\d{4})/);
    },
  },
  {
    id: "md.fonduri-aoam-mo",
    carril: "norma",
    datos: ["md.prima-medicala", "md.prima-medicala-fixa"],
    metodo: "html",
    url: MONITORUL,
    traer(http) {
      return acteNoi(http, "fondurilor asigurării obligatorii de asistență medicală", /asistență medicală pentru anul (\d{4})/);
    },
  },
  {
    id: "md.scutiri-sfs",
    carril: "norma",
    datos: ["md.scutire-personala", "md.scutire-majorata", "md.scutire-intretinut", "md.scutire-intretinut-dizabilitate", "md.plafon-scutire"],
    metodo: "html",
    url: SCUTIRI_SFS,
    traer(http) {
      return scutiriNoi(http);
    },
  },
  {
    id: "md.indemnizatii-familii-cnas",
    carril: "norma",
    datos: ["md.indemnizatie-nastere", "md.crestere-copil", "md.ingrijire-copil-2-ani"],
    metodo: "html",
    url: `${CNAS}/indemnizatii/indemnizatii-adresate-familiilor-cu-copii`,
    traer(http) {
      return paginaCnas(http, this.url, ["21 886 lei", "30% din baza de calcul", "740 lei"], "CNAS a schimbat pagina indemnizațiilor pentru familiile cu copii");
    },
  },
  {
    id: "md.indemnizatii-cnas",
    carril: "norma",
    datos: ["md.itm", "md.plafon-salarii-medii", "md.somaj", "md.maternitate", "md.varsta-pensionare"],
    metodo: "html",
    url: `${CNAS}/indemnizatii/indemnizatie-pentru-incapacitate-temporara-de-munca`,
    traer(http) {
      return paginaCnas(http, this.url, ["75% din salariul mediu", "60% din baza de calcul", "90% din baza de calcul"], "CNAS a schimbat pagina indemnizației pentru incapacitate temporară de muncă");
    },
  },
  {
    id: "md.politica-fiscala",
    carril: "norma",
    datos: ["md.impozit-venit", "md.cas-angajator", "md.tva", "md.impozit-dividende"],
    // Manual: Codul fiscal și Legea nr. 489/1999 consolidate sunt doar pe legis.md și sfs.md, care
    // cer verificare anti-bot. Cotele se recitesc de mână la fiecare lege de politică fiscală.
    metodo: "manual",
    url: "https://www.legis.md/",
    async traer() {
      return [];
    },
  },
  {
    id: "md.codul-muncii",
    carril: "norma",
    datos: ["md.concediu-odihna", "md.ore-suplimentare"],
    // Manual: același motiv, Codul muncii consolidat e doar pe legis.md.
    metodo: "manual",
    url: "https://www.legis.md/",
    async traer() {
      return [];
    },
  },
];
