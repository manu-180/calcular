import { esFechaISO } from "@/motor/vigencia";
import type { Detector, DetectorSerie, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const VERIFICADO: FechaISO = "2026-10-24";

// Riksbankens öppna API begränsar antalet anrop per minut utan nyckel. Vid ett avvisat anrop väntar vi
// och försöker igen i stället för att låta serien bli gammal.
async function hamtaRiksbanken(http: Http, url: string): Promise<unknown> {
  for (let forsok = 0; forsok < 3; forsok++) {
    try {
      return await http.json(url);
    } catch {
      await new Promise((klar) => setTimeout(klar, 61000));
    }
  }
  return null;
}

async function senasteKurs(http: Http, url: string): Promise<readonly PuntoSerie[] | null> {
  const json = (await hamtaRiksbanken(http, url)) as { date?: unknown; value?: unknown } | null;
  if (!json || !esFechaISO(json.date) || typeof json.value !== "number" || !Number.isFinite(json.value)) return null;
  return [{ fecha: json.date, valor: json.value }];
}

function detectorKurs(kod: string, banda: DetectorSerie["banda"]): Detector {
  const k = kod.toLowerCase();
  return {
    id: `se.${k}-riksbanken`,
    carril: "serie",
    serie: `se.${k}`,
    metodo: "api-json",
    url: `https://api.riksbank.se/swea/v1/Observations/Latest/SEK${kod}PMI`,
    banda,
    traer(http) {
      return senasteKurs(http, this.url);
    },
  };
}

// SCB fastställer KPI med basår 2020 sedan januari 2026 och publicerar samma tal ombasade till 1980 = 100
// i TAB6792. Äldre månader saknar värde i tabellen och finns redan i series.json.
async function kpiScb(http: Http, url: string): Promise<readonly PuntoSerie[] | null> {
  const json = (await http.json(url)) as { dimension?: { Tid?: { category?: { index?: unknown } } }; value?: unknown };
  const index = json?.dimension?.Tid?.category?.index;
  if (!index || typeof index !== "object" || !Array.isArray(json.value)) return null;
  const manader = Array.isArray(index) ? (index as string[]) : Object.keys(index as Record<string, number>);
  if (manader.length !== json.value.length) return null;
  const puntos: PuntoSerie[] = [];
  manader.forEach((m, i) => {
    const v = (json.value as unknown[])[i];
    const fecha = `${m.slice(0, 4)}-${m.slice(5, 7)}-01`;
    if (typeof v === "number" && Number.isFinite(v) && /^\d{4}M\d{2}$/.test(m) && esFechaISO(fecha)) puntos.push({ fecha, valor: v });
  });
  return puntos.length ? puntos : null;
}

// Riksbanken fastställer referensräntan för varje kalenderhalvår. En ny period eller en ny nivå betyder ett nytt tramo.
async function referensranta(http: Http, url: string): Promise<readonly HallazgoNorma[] | null> {
  const json = (await hamtaRiksbanken(http, url)) as { date?: unknown; value?: unknown } | null;
  if (!json || !esFechaISO(json.date) || typeof json.value !== "number") return null;
  if (json.date <= "2026-12-31" && json.value === 2) return [];
  return [{ titulo: `Riksbankens referensränta ${json.value} % (${json.date})`, url: "https://www.riksbank.se/sv/statistik/rantor-och-valutakurser/referensranta-och-diskonto/", fecha: json.date }];
}

// Skatteverket lägger upp en sida per inkomstår. När sidan för nästa år finns kan belopp och
// procentsatser ha ändrats.
async function nyttArPaSkatteverket(http: Http, url: string, monster: RegExp, titel: string): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url);
  if (!/Skatteverket/.test(html)) return null;
  const hallazgos: HallazgoNorma[] = [];
  for (const m of html.matchAll(monster)) {
    const ar = Number(m[2]);
    if (ar <= 2026) continue;
    const lank = m[1].startsWith("http") ? m[1] : `https://www.skatteverket.se${m[1]}`;
    if (!hallazgos.some((h) => h.url === lank)) hallazgos.push({ titulo: `${titel} ${ar}`, url: lank, fecha: VERIFICADO });
  }
  return hallazgos;
}

// Riksdagens öppna data: nya SFS-nummer för de lagar som våra data bygger på.
async function nyaForfattningar(http: Http, url: string): Promise<readonly HallazgoNorma[] | null> {
  const json = (await http.json(url)) as { dokumentlista?: { dokument?: unknown } };
  const lista = json?.dokumentlista;
  if (!lista) return null;
  const dokument = Array.isArray(lista.dokument) ? lista.dokument : [];
  const hallazgos: HallazgoNorma[] = [];
  for (const d of dokument as { datum?: unknown; titel?: unknown; dok_id?: unknown }[]) {
    const datum = typeof d.datum === "string" ? d.datum.slice(0, 10) : "";
    if (!esFechaISO(datum) || datum <= VERIFICADO || typeof d.titel !== "string" || typeof d.dok_id !== "string") continue;
    hallazgos.push({ titulo: d.titel, url: `https://data.riksdagen.se/dokument/${d.dok_id}.text`, fecha: datum });
  }
  return hallazgos;
}

function sfs(sok: string): `https://${string}` {
  return `https://data.riksdagen.se/dokumentlista/?doktyp=sfs&sok=${encodeURIComponent(sok)}&sort=datum&sortorder=desc&utformat=json`;
}

const KPI_URL =
  "https://statistikdatabasen.scb.se/api/v2/tables/TAB6792/data?lang=sv&valueCodes[ContentsCode]=000007MM&valueCodes[Tid]=*&outputFormat=json-stat2";

export const detectores: readonly Detector[] = [
  detectorKurs("EUR", { min: 9.5, max: 13.5, saltoRelativoMax: 0.05 }),
  detectorKurs("USD", { min: 7.5, max: 13, saltoRelativoMax: 0.06 }),
  detectorKurs("NOK", { min: 0.8, max: 1.25, saltoRelativoMax: 0.06 }),
  detectorKurs("DKK", { min: 1.25, max: 1.8, saltoRelativoMax: 0.05 }),
  detectorKurs("GBP", { min: 11, max: 16, saltoRelativoMax: 0.06 }),
  {
    id: "se.kpi-scb",
    carril: "serie",
    serie: "se.kpi",
    metodo: "api-json",
    url: KPI_URL as `https://${string}`,
    banda: { min: 380, max: 520, saltoRelativoMax: 0.03 },
    traer(http) {
      return kpiScb(http, this.url);
    },
  },
  {
    id: "se.referensranta-riksbanken",
    carril: "norma",
    datos: ["se.referensranta"],
    metodo: "api-json",
    url: "https://api.riksbank.se/swea/v1/Observations/Latest/SECBREFEFF",
    traer(http) {
      return referensranta(http, this.url);
    },
  },
  {
    id: "se.skatteverket-belopp",
    carril: "norma",
    datos: [
      "se.prisbasbelopp",
      "se.forhojt-prisbasbelopp",
      "se.inkomstbasbelopp",
      "se.skiktgrans",
      "se.traktamente",
      "se.traktamente-minskning",
      "se.reseavdrag",
      "se.fastighetsavgift",
      "se.isk-schablonranta",
      "se.isk-grundniva",
    ],
    metodo: "html",
    url: "https://www.skatteverket.se/privat/skatter/beloppochprocent.4.18e1b10334ebe8bc80004109.html",
    traer(http) {
      return nyttArPaSkatteverket(http, this.url, /href="([^"]*beloppochprocent\/(\d{4})[^"]*)"/g, "Belopp och procent för inkomstår");
    },
  },
  {
    id: "se.skatteverket-skattetabeller",
    carril: "norma",
    datos: ["se.kommunalskatt", "se.begravningsavgift", "se.grundavdrag", "se.jobbskatteavdrag", "se.allman-pensionsavgift", "se.public-service-avgift", "se.skattereduktion-forvarvsinkomst", "se.statlig-inkomstskatt"],
    metodo: "html",
    url: "https://www.skatteverket.se/foretag/arbetsgivare/arbetsgivaravgifterochskatteavdrag/skattetabeller.4.96cca41179bad4b1aa8a46.html",
    traer(http) {
      return nyttArPaSkatteverket(http, this.url, /href="([^"]*skattesatser-kommuner-(\d{4})[^"]*)"/g, "Kommunala skattesatser och skattetabeller för");
    },
  },
  {
    id: "se.sfs-socialforsakringsbalk",
    carril: "norma",
    datos: ["se.foraldrapenning", "se.sjukpenning", "se.barnbidrag", "se.flerbarnstillagg"],
    metodo: "api-json",
    url: sfs("socialförsäkringsbalken"),
    traer(http) {
      return nyaForfattningar(http, this.url);
    },
  },
  {
    id: "se.sfs-arbetsratt",
    carril: "norma",
    datos: ["se.semesterdagar", "se.semesterlon-procent", "se.semestertillagg", "se.uppsagningstid", "se.sjuklon", "se.karensavdrag"],
    metodo: "api-json",
    url: sfs("semesterlagen anställningsskydd sjuklön"),
    traer(http) {
      return nyaForfattningar(http, this.url);
    },
  },
  {
    id: "se.sfs-avgifter",
    carril: "norma",
    datos: ["se.arbetsgivaravgift", "se.alderspensionsavgift", "se.arbetsgivaravgift-unga", "se.unga-tak", "se.egenavgifter", "se.schablonavdrag-egenavgifter", "se.nedsattning-egenavgifter"],
    metodo: "api-json",
    url: sfs("socialavgiftslagen"),
    traer(http) {
      return nyaForfattningar(http, this.url);
    },
  },
  {
    id: "se.sfs-skatter",
    carril: "norma",
    datos: ["se.momssatser", "se.kapitalskatt", "se.ranteavdrag", "se.skatt-bostadsvinst", "se.bostadsforlust-avdrag", "se.stampelskatt"],
    metodo: "api-json",
    url: sfs("mervärdesskattelag inkomstskattelagen stämpelskatt"),
    traer(http) {
      return nyaForfattningar(http, this.url);
    },
  },
  {
    id: "se.sfs-studiestod",
    carril: "norma",
    datos: ["se.csn-ranta", "se.csn-aterbetalning", "se.csn-avgift"],
    metodo: "api-json",
    url: sfs("studiestödslagen studiestödsförordningen"),
    traer(http) {
      return nyaForfattningar(http, this.url);
    },
  },
  {
    id: "se.sfs-rantelag",
    carril: "norma",
    datos: ["se.drojsmalsranta-tillagg", "se.lantmateriet-avgift"],
    metodo: "api-json",
    url: sfs("räntelagen inskrivningsförordningen"),
    traer(http) {
      return nyaForfattningar(http, this.url);
    },
  },
];
