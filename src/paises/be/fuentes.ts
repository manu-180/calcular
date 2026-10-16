import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const MAANDEN = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];

// Statbel publiceert sinds 2026 in basis 2025 = 100, maar blijft de reeksen ook in basis 2013 = 100
// geven. De reeksen in series.json staan in 2013 = 100, dus het filter op het basisjaar is nodig.
const CPI_URL = "https://bestat.statbel.fgov.be/bestat/api/views/5a614b7f-cb6e-4af5-a4f7-723aac525f70/result/JSON" as const;
const GEZONDHEIDSINDEX_URL = "https://bestat.statbel.fgov.be/bestat/api/views/d9a303dc-d393-4686-8fe2-234e03a857b8/result/JSON" as const;

type Feit = { Maand?: string; Basisjaar?: string; Consumptieprijsindex?: number; "Niveau 1"?: string | null };

function maandNaarDatum(maand: string | undefined): FechaISO | null {
  const m = /^(\p{L}+) (\d{4})$/u.exec(maand?.trim() ?? "");
  if (!m) return null;
  const i = MAANDEN.indexOf(m[1].toLowerCase());
  if (i < 0) return null;
  const fecha = `${m[2]}-${String(i + 1).padStart(2, "0")}-01`;
  return esFechaISO(fecha) ? fecha : null;
}

async function bestat(http: Http, url: string, niveau: string | null): Promise<PuntoSerie[] | null> {
  const json = (await http.json(url)) as { facts?: Feit[] };
  if (!Array.isArray(json?.facts)) return null;
  const punten = new Map<string, number>();
  for (const f of json.facts) {
    if (f.Basisjaar !== "2013 = 100") continue;
    if (niveau !== null && f["Niveau 1"] !== niveau) continue;
    const fecha = maandNaarDatum(f.Maand);
    if (!fecha || typeof f.Consumptieprijsindex !== "number") continue;
    // De API geeft waarden als 140.67000000000002: Statbel publiceert ze met twee decimalen.
    punten.set(fecha, Math.round(f.Consumptieprijsindex * 100) / 100);
  }
  const lijst = [...punten.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([fecha, valor]) => ({ fecha: fecha as FechaISO, valor }));
  return lijst.length ? lijst : null;
}

// De RSZ-instructies krijgen elk kwartaal een nieuw versienummer (bijvoorbeeld 2026/4). Een nieuwe
// versie kan nieuwe werkbonusgrenzen of bijdragen bevatten, dus die melden we als hallazgo.
async function rszVersie(http: Http, url: string, titel: string): Promise<HallazgoNorma[] | null> {
  const html = await http.texto(url);
  const m = /Administratieve instructies RSZ\s*-\s*(\d{4})\/(\d)/.exec(html);
  if (!m) return null;
  const maand = String((Number(m[2]) - 1) * 3 + 1).padStart(2, "0");
  const fecha = `${m[1]}-${maand}-01`;
  if (!esFechaISO(fecha)) return null;
  return [{ titulo: `${titel} (instructies ${m[1]}/${m[2]})`, url, fecha }];
}

export const detectores: readonly Detector[] = [
  {
    id: "be.cpi-statbel",
    carril: "serie",
    serie: "be.cpi",
    metodo: "api-json",
    url: CPI_URL,
    banda: { min: 120, max: 175, saltoRelativoMax: 0.03 },
    async traer(http) {
      return bestat(http, this.url, null);
    },
  },
  {
    id: "be.gezondheidsindex-statbel",
    carril: "serie",
    serie: "be.gezondheidsindex",
    metodo: "api-json",
    url: GEZONDHEIDSINDEX_URL,
    banda: { min: 120, max: 175, saltoRelativoMax: 0.03 },
    async traer(http) {
      return bestat(http, this.url, "Gezondheidsindex");
    },
  },
  {
    id: "be.rsz-werkbonus",
    carril: "norma",
    datos: ["be.werkbonus", "be.rsz-werknemer"],
    metodo: "html",
    url: "https://www.socialsecurity.be/employer/instructions/dmfa/nl/latest/instructions/deductions/workers_reductions/workbonus.html",
    async traer(http) {
      return rszVersie(http, this.url, "RSZ-instructies werkbonus");
    },
  },
  {
    id: "be.rsz-bijdragen",
    carril: "norma",
    datos: ["be.rsz-werkgever", "be.bbsz-individueel", "be.bbsz-gemeenschappelijk", "be.bbsz-grenzen", "be.vakantiegeld"],
    metodo: "html",
    url: "https://www.socialsecurity.be/employer/instructions/dmfa/nl/latest/instructions/socialsecuritycontributions/contributions/ordinarycontributions.html",
    async traer(http) {
      return rszVersie(http, this.url, "RSZ-instructies bijdragen");
    },
  },
  {
    id: "be.fisconet-bedrijfsvoorheffing",
    carril: "norma",
    datos: ["be.bv-schaal", "be.bv-gezin", "be.bv-kinderen", "be.bv-werkbonus"],
    metodo: "api-json",
    url: "https://eservices.minfin.fgov.be/myminfin-rest/fisconetPlus/public/document/da14799a-a9fa-420e-9b75-2004a59d4ce3",
    async traer(http) {
      const json = (await http.json(this.url)) as { data?: { metadata?: { title?: string; lastModified?: string } } };
      const meta = json?.data?.metadata;
      const fecha = meta?.lastModified?.slice(0, 10);
      if (!meta?.title || !fecha || !esFechaISO(fecha)) return null;
      return [{ titulo: `Fisconetplus: ${meta.title}`, url: "https://financien.belgium.be/nl/ondernemingen/personeel_en_loon/bedrijfsvoorheffing/berekening", fecha }];
    },
  },
  {
    id: "be.nar-cao-bedragen",
    carril: "norma",
    datos: ["be.ggmmi"],
    metodo: "html",
    url: "https://cnt-nar.be/nl/documents/cao-bedragen",
    async traer(http) {
      const html = await http.texto(this.url);
      const m = /CAO-BEDRAGEN\s*[^<]*?Bijgewerkt op (\d{2})\.(\d{2})\.(\d{4})/i.exec(html);
      if (!m) return null;
      const fecha = `${m[3]}-${m[2]}-${m[1]}`;
      if (!esFechaISO(fecha)) return null;
      return [{ titulo: `NAR: tabellen cao-bedragen bijgewerkt op ${m[1]}.${m[2]}.${m[3]}`, url: this.url, fecha }];
    },
  },
];
