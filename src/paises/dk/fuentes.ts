import { esFechaISO } from "@/motor/vigencia";
import type { Detector, DetectorSerie, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const VERIFICADO: FechaISO = "2026-10-24";
const NATIONALBANKEN = "https://www.nationalbanken.dk/api/currencyratesxml?lang=en";

// Nationalbankens XML har kun dagens kurser (DKK pr. 100 enheder). Historikken samler cron'en selv.
async function kurs(http: Http, kode: string): Promise<readonly PuntoSerie[] | null> {
  const xml = await http.texto(NATIONALBANKEN);
  const dag = /<dailyrates id="(\d{4}-\d{2}-\d{2})"/.exec(xml)?.[1];
  const rate = new RegExp(`code="${kode}"[^>]*rate="([\\d.]+)"`).exec(xml)?.[1];
  if (!esFechaISO(dag) || !rate) return null;
  const valor = Number(rate);
  return Number.isFinite(valor) && valor > 0 ? [{ fecha: dag, valor }] : null;
}

function detectorKurs(kode: string, banda: DetectorSerie["banda"]): Detector {
  return {
    id: `dk.${kode.toLowerCase()}-nationalbanken`,
    carril: "serie",
    serie: `dk.${kode.toLowerCase()}`,
    metodo: "api-xml",
    url: NATIONALBANKEN,
    banda,
    traer(http) {
      return kurs(http, kode);
    },
  };
}

// Statistikbanken svarer med semikolon-CSV: "VAREGR;ENHED;TID;INDHOLD" og tal med komma.
async function fpi(http: Http, url: string): Promise<readonly PuntoSerie[] | null> {
  const csv = await http.texto(url);
  const puntos: PuntoSerie[] = [];
  for (const linje of csv.split(/\r?\n/)) {
    const m = /;(\d{4})M(\d{2});(\d+),(\d+)\s*$/.exec(linje);
    if (!m) continue;
    const fecha = `${m[1]}-${m[2]}-01`;
    if (!esFechaISO(fecha)) return null;
    puntos.push({ fecha, valor: Number(`${m[3]}.${m[4]}`) });
  }
  return puntos.length > 12 ? puntos : null;
}

// En ny rentebeslutning ses som en anden udlånsrente end den, der gjaldt ved verificeringen (2,25 %).
async function udlaansrente(http: Http, url: string): Promise<readonly HallazgoNorma[] | null> {
  const csv = await http.texto(url);
  const hallazgos: HallazgoNorma[] = [];
  let set = false;
  for (const linje of csv.split(/\r?\n/)) {
    const m = /;(\d{4})M(\d{2})D(\d{2});(\d+),(\d+)\s*$/.exec(linje);
    if (!m) continue;
    set = true;
    const fecha = `${m[1]}-${m[2]}-${m[3]}`;
    const rente = Number(`${m[4]}.${m[5]}`);
    if (esFechaISO(fecha) && rente !== 2.25 && !hallazgos.some((h) => h.fecha === fecha)) {
      hallazgos.push({ titulo: `Nationalbankens udlånsrente ${rente} % fra ${fecha}`, url: "https://www.nationalbanken.dk/da/vores-opgaver/pengepolitik", fecha });
    }
  }
  return set ? hallazgos.slice(0, 1) : null;
}

// Skatte- og Vækstministeriets satssider viser datoen for seneste opdatering under titlen (dd-mm-åååå).
async function satsside(http: Http, url: string): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url);
  const m = /(\d{2})-(\d{2})-(20\d{2})/.exec(html.replace(/<[^>]+>/g, " "));
  if (!m) return null;
  const fecha = `${m[3]}-${m[2]}-${m[1]}`;
  if (!esFechaISO(fecha)) return null;
  return fecha > VERIFICADO ? [{ titulo: `Satssiden er opdateret ${fecha}`, url, fecha }] : [];
}

// Siden har et afsnit med årstallet for satserne ("Satser 2026", "Sats 2026").
async function aarstal(http: Http, url: string, moenster: RegExp): Promise<readonly HallazgoNorma[] | null> {
  const tekst = (await http.texto(url)).replace(/<[^>]+>/g, " ");
  const aar = [...tekst.matchAll(moenster)].map((m) => Number(m[1]));
  if (!aar.length) return null;
  const nyeste = Math.max(...aar);
  return nyeste > 2026 ? [{ titulo: `Nye satser for ${nyeste}`, url, fecha: VERIFICADO }] : [];
}

const SVMN = "https://svmn.dk/tal-og-metode/satser/satser-og-beloebsgraenser-i-lovgivningen/";

function satsDetektor(id: string, lov: string, datos: readonly string[]): Detector {
  return {
    id: `dk.svmn-${id}`,
    carril: "norma",
    datos,
    metodo: "html",
    url: `${SVMN}${lov}` as `https://${string}`,
    traer(http) {
      return satsside(http, this.url);
    },
  };
}

export const detectores: readonly Detector[] = [
  detectorKurs("EUR", { min: 725, max: 765, saltoRelativoMax: 0.02 }),
  detectorKurs("USD", { min: 500, max: 850, saltoRelativoMax: 0.06 }),
  detectorKurs("GBP", { min: 750, max: 1050, saltoRelativoMax: 0.06 }),
  detectorKurs("SEK", { min: 50, max: 85, saltoRelativoMax: 0.06 }),
  detectorKurs("NOK", { min: 50, max: 85, saltoRelativoMax: 0.06 }),
  {
    id: "dk.fpi-dst",
    carril: "serie",
    serie: "dk.fpi",
    metodo: "api-json",
    url: "https://api.statbank.dk/v1/data/PRIS01/CSV?VAREGR=000000&ENHED=100&Tid=*",
    banda: { min: 60, max: 130, saltoRelativoMax: 0.03 },
    traer(http) {
      return fpi(http, this.url);
    },
  },
  {
    id: "dk.udlaansrente-nationalbanken",
    carril: "norma",
    datos: ["dk.referencesats"],
    metodo: "api-json",
    url: "https://api.statbank.dk/v1/data/DNRENTD/CSV?INSTRUMENT=OIRNAA&LAND=DK&OPGOER=E&Tid=%3E=2026M09D11",
    traer(http) {
      return udlaansrente(http, this.url);
    },
  },
  satsDetektor("personskat", "personskatteloven", [
    "dk.bundskat",
    "dk.personfradrag",
    "dk.mellemskat-sats",
    "dk.mellemskat-graense",
    "dk.topskat-sats",
    "dk.topskat-graense",
    "dk.toptopskat-sats",
    "dk.toptopskat-graense",
    "dk.skatteloft",
    "dk.aktieindkomst-satser",
    "dk.aktieindkomst-graense",
  ]),
  satsDetektor("ligning", "ligningsloven", [
    "dk.beskaeftigelsesfradrag-sats",
    "dk.beskaeftigelsesfradrag-max",
    "dk.jobfradrag-sats",
    "dk.jobfradrag-graense",
    "dk.jobfradrag-max",
    "dk.koerselsgodtgoerelse",
  ]),
  satsDetektor("am-bidrag", "arbejdsmarkedsbidragsloven", ["dk.am-bidrag"]),
  satsDetektor("boafgift", "boafgiftsloven", ["dk.gaveafgift-bundfradrag", "dk.gaveafgift-sats"]),
  satsDetektor("boerneydelse", "boerne-og-ungeydelsesloven", ["dk.boerneydelse", "dk.boerneydelse-aftrapning-graense", "dk.boerneydelse-aftrapning-sats"]),
  satsDetektor("ejendomsskat", "ejendomsskatteloven", ["dk.ejendomsvaerdiskat-satser", "dk.ejendomsvaerdiskat-graense", "dk.beskatningsgrundlag-andel"]),
  satsDetektor("moms", "momsloven", ["dk.moms"]),
  {
    id: "dk.kommuneskat-dst",
    carril: "norma",
    datos: ["dk.kommuneskat", "dk.kirkeskat", "dk.grundskyld"],
    metodo: "api-json",
    url: "https://api.statbank.dk/v1/tableinfo/PSKAT?format=JSON",
    async traer(http) {
      const info = (await http.json(this.url)) as { variables?: { id?: unknown; values?: { id?: unknown }[] }[] };
      const tid = info?.variables?.find((v) => v.id === "Tid")?.values;
      if (!Array.isArray(tid)) return null;
      const aar = tid.map((v) => Number(v.id)).filter(Number.isFinite);
      const nyeste = Math.max(...aar);
      return nyeste > 2026
        ? [{ titulo: `Kommuneskatter for ${nyeste} i Statistikbanken`, url: "https://svmn.dk/tal-og-metode/satser/oversigt-over-kommuneskatter", fecha: VERIFICADO }]
        : [];
    },
  },
  {
    id: "dk.bm-satser",
    carril: "norma",
    datos: ["dk.dagpenge-hoejst", "dk.folkepension-grundbeloeb", "dk.pensionstillaeg", "dk.pensionstillaeg-fradrag", "dk.pensionstillaeg-nedsaettelse"],
    metodo: "html",
    url: "https://bm.dk/satser",
    traer(http) {
      return aarstal(http, this.url, /satser-for-(20\d{2})/g);
    },
  },
  {
    id: "dk.su-satser",
    carril: "norma",
    datos: ["dk.su-udeboende", "dk.su-hjemmeboende", "dk.su-foraeldreindkomst"],
    metodo: "html",
    url: "https://www.su.dk/satser/videregaaende-uddannelser-satser-for-su-til-udeboende",
    traer(http) {
      return aarstal(http, this.url, /Sats (20\d{2})/g);
    },
  },
  {
    id: "dk.koerselsfradrag-skat",
    carril: "norma",
    datos: ["dk.koerselsfradrag"],
    metodo: "html",
    url: "https://skat.dk/borger/fradrag/koerselsfradrag/beregn-dit-koerselsfradrag",
    traer(http) {
      return aarstal(http, this.url, /Satser for kørselsfradrag (20\d{2})/g);
    },
  },
  {
    id: "dk.atp-satser",
    carril: "norma",
    datos: ["dk.atp-loenmodtager", "dk.atp-arbejdsgiver", "dk.atp-timegraenser"],
    metodo: "html",
    url: "https://www.borger.dk/pension-og-efterloen/ATP-Livslang-pension-oversigt/atp-bidraget/atp-satser-for-privat-virksomhed",
    traer(http) {
      return aarstal(http, this.url, /ATP-satser for (20\d{2})/g);
    },
  },
];
