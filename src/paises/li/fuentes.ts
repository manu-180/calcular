import type { Detector, FechaISO, HallazgoNorma } from "@/motor/tipos";

const AHV_SAETZE = "https://www.ahv.li/beitraege/arbeitnehmer-arbeitgeber/beitragsansaetze-ahv-iv-fak-vk-gueltig-ab-01012021-1-1-1";
const AHV_KINDERZULAGEN = "https://www.ahv.li/leistungen/fak/kinderzulagen";

const GEPRUEFT = "2026-10-18";

// Konsolidierte Fassungen auf gesetze.li: die Seite listet alle Fassungen mit ihrem Beginn. Eine
// Fassung, die nach dem letzten geprüften Stand beginnt, ist ein Hinweis, die Werte neu zu lesen.
const ERLASSE: readonly { id: string; name: string; datos: readonly string[] }[] = [
  {
    id: "2010340000",
    name: "Steuergesetz",
    datos: ["li.steuertarif-alleinstehend", "li.steuertarif-alleinerziehend", "li.steuertarif-ehegatten", "li.gemeindezuschlag", "li.gewinnungskosten-pauschale", "li.kinderabzug", "li.versicherungsabzug"],
  },
  { id: "2009330000", name: "Mehrwertsteuergesetz", datos: ["li.mwst-normalsatz", "li.mwst-reduziert", "li.mwst-beherbergung"] },
  { id: "1988012000", name: "BPVG", datos: ["li.bpv-altersbeitrag"] },
];

function hoy(): FechaISO {
  return new Date().toISOString().slice(0, 10) as FechaISO;
}

function zuIso(d: string): string {
  return `${d.slice(6, 10)}-${d.slice(3, 5)}-${d.slice(0, 2)}`;
}

function fassungsDetector(e: (typeof ERLASSE)[number], stand: string): Detector {
  return {
    id: `li.gesetze-${e.id}`,
    carril: "norma",
    datos: e.datos,
    metodo: "html",
    url: `https://www.gesetze.li/konso/${e.id}`,
    async traer(http): Promise<HallazgoNorma[] | null> {
      const html = await http.texto(this.url);
      const beginne = [...html.matchAll(/(\d{2}\.\d{2}\.\d{4})(?:\s*-\s*\d{2}\.\d{2}\.\d{4})?\s*</g)].map((m) => zuIso(m[1]));
      if (beginne.length === 0) return null;
      const neueste = beginne.sort().at(-1) as string;
      return neueste > stand ? [{ titulo: `${e.name}: neue Fassung ab ${neueste}`, url: this.url, fecha: hoy() }] : [];
    },
  };
}

export const detectores: readonly Detector[] = [
  {
    id: "li.ahv-beitragsansaetze",
    carril: "norma",
    datos: ["li.beitraege-arbeitnehmer", "li.beitraege-arbeitgeber"],
    metodo: "html",
    url: AHV_SAETZE,
    async traer(http): Promise<HallazgoNorma[] | null> {
      const html = await http.texto(this.url);
      const jahre = [...html.matchAll(/gültig ab 01\.01\.(\d{4})/g)].map((m) => Number(m[1]));
      if (jahre.length === 0) return null;
      const neuestes = Math.max(...jahre);
      return neuestes > 2026 ? [{ titulo: `Neue Beitragsansätze AHV/IV/FAK ab 01.01.${neuestes}`, url: this.url, fecha: hoy() }] : [];
    },
  },
  {
    id: "li.fak-kinderzulagen",
    carril: "norma",
    datos: ["li.kinderzulage", "li.kinderzulage-erhoeht"],
    metodo: "html",
    url: AHV_KINDERZULAGEN,
    async traer(http): Promise<HallazgoNorma[] | null> {
      const html = await http.texto(this.url);
      const m = /für jedes Kind monatlich CHF\s*(\d+)/.exec(html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " "));
      if (!m) return null;
      return m[1] === "310" ? [] : [{ titulo: `Kinderzulage neu CHF ${m[1]} pro Monat`, url: this.url, fecha: hoy() }];
    },
  },
  ...ERLASSE.map((e) => fassungsDetector(e, GEPRUEFT)),
];
