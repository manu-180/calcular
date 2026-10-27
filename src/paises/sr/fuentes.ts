import { esFechaISO } from "@/motor/vigencia";
import type { Detector, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

// Het ABS publiceert de CPI als bijlage in WordPress. De SDMX-bestanden (GDDS) bevatten de hele reeks;
// via de media-API vinden we het nieuwste bestand zonder de url te raden.
const ABS_MEDIA = "https://statistics-suriname.org/wp-json/wp/v2/media?search=Suriname_CPI_new_GDDS&per_page=20&orderby=date";

// SRiS (Ministerie van Justitie en Politie) zet elk Staatsblad als pdf online. De zoekpagina geeft
// links met jaar en maand van plaatsing in het pad; mod_security weigert verzoeken zonder
// browserkoppen, daarom userAgentNavegador en een Accept voor html.
const SRIS = "https://www.sris.sr/?s=";
const HTML = { encabezados: { Accept: "text/html,application/xhtml+xml", "Accept-Language": "nl" } } as const;

const BELASTINGDIENST_MEDIA = "https://belastingdienst.sr/wp-json/wp/v2/media?per_page=50&orderby=date&mime_type=application/pdf&search=";

function laatsteJaren(): string {
  return String(new Date().getUTCFullYear() - 1);
}

async function sris(http: Http, zoekterm: string, filter: RegExp): Promise<HallazgoNorma[] | null> {
  const html = await http.texto(`${SRIS}${encodeURIComponent(zoekterm)}`, { userAgentNavegador: true, ...HTML });
  if (!/sris\.sr/.test(html) || !/<title>/i.test(html)) return null;
  const vanaf = laatsteJaren();
  const gezien = new Set<string>();
  const hallazgos: HallazgoNorma[] = [];
  for (const [url, jaar, maand, bestand] of html.matchAll(/https:\/\/www\.sris\.sr\/wp-content\/uploads\/(\d{4})\/(\d{2})\/([^"'\s<>]+\.pdf)/g)) {
    if (gezien.has(url) || jaar < vanaf || !filter.test(bestand)) continue;
    gezien.add(url);
    const fecha = `${jaar}-${maand}-01`;
    if (!esFechaISO(fecha)) continue;
    hallazgos.push({ titulo: decodeURIComponent(bestand).replace(/\.pdf$/, "").replace(/-/g, " "), url, fecha });
  }
  return hallazgos;
}

async function belastingdienst(http: Http, zoekterm: string): Promise<HallazgoNorma[] | null> {
  const json = await http.json(`${BELASTINGDIENST_MEDIA}${encodeURIComponent(zoekterm)}`, { userAgentNavegador: true });
  if (!Array.isArray(json)) return null;
  const vanaf = laatsteJaren();
  const hallazgos: HallazgoNorma[] = [];
  for (const item of json as { date?: string; source_url?: string; title?: { rendered?: string } }[]) {
    const fecha = item.date?.slice(0, 10) ?? "";
    const url = item.source_url ?? "";
    if (!esFechaISO(fecha) || !url.startsWith("https://") || fecha.slice(0, 4) < vanaf) continue;
    hallazgos.push({ titulo: item.title?.rendered?.trim() || url.split("/").pop() || url, url, fecha });
  }
  return hallazgos;
}

export const detectores: readonly Detector[] = [
  {
    id: "sr.cpi-abs",
    carril: "serie",
    serie: "sr.cpi",
    metodo: "api-xml",
    url: ABS_MEDIA,
    userAgentNavegador: true,
    banda: { min: 800, max: 1600, saltoRelativoMax: 0.08 },
    async traer(http) {
      const media = await http.json(this.url, { userAgentNavegador: true });
      if (!Array.isArray(media)) return null;
      const xml = (media as { source_url?: string; date?: string }[])
        .filter((m) => typeof m.source_url === "string" && m.source_url.endsWith(".xml"))
        .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""))[0]?.source_url;
      if (!xml || !xml.startsWith("https://")) return null;
      const tekst = await http.texto(xml, { userAgentNavegador: true });
      const reeks = /<Series [^>]*INDICATOR="PCPI_IX"[^>]*>([\s\S]*?)<\/Series>/.exec(tekst)?.[1];
      if (!reeks) return null;
      const puntos: PuntoSerie[] = [];
      for (const [, periode, waarde] of reeks.matchAll(/TIME_PERIOD="(\d{4}-\d{2})"\s+OBS_VALUE="([\d.]+)"/g)) {
        const fecha = `${periode}-01`;
        const valor = Math.round(Number(waarde) * 100) / 100;
        if (!esFechaISO(fecha) || !Number.isFinite(valor)) return null;
        puntos.push({ fecha, valor });
      }
      return puntos.length ? puntos : null;
    },
  },
  {
    id: "sr.sris-loonbelasting",
    carril: "norma",
    datos: [
      "sr.belastingvrije-som",
      "sr.forfaitaire-aftrek",
      "sr.forfaitaire-aftrek-max",
      "sr.loonbelasting-tarief",
      "sr.uitkering-ineens-tarief",
      "sr.overwerk-tarief",
      "sr.vrijstelling-vakantie-bonus",
    ],
    metodo: "html",
    url: "https://www.sris.sr/?s=loonbelasting",
    userAgentNavegador: true,
    async traer(http) {
      return sris(http, "loonbelasting", /loonbelasting/i);
    },
  },
  {
    id: "sr.sris-inkomstenbelasting",
    carril: "norma",
    datos: ["sr.ib-tarief", "sr.hypotheek-max-schuld", "sr.aov-premie"],
    metodo: "html",
    url: "https://www.sris.sr/?s=inkomstenbelasting",
    userAgentNavegador: true,
    async traer(http) {
      return sris(http, "inkomstenbelasting", /inkomstenbelasting|oudedag|AOV/i);
    },
  },
  {
    id: "sr.sris-minimumloon",
    carril: "norma",
    datos: ["sr.minimumuurloon"],
    metodo: "html",
    url: "https://www.sris.sr/?s=minimum+uurloon",
    userAgentNavegador: true,
    async traer(http) {
      return sris(http, "minimum uurloon", /minimum/i);
    },
  },
  {
    id: "sr.sris-arbeid",
    carril: "norma",
    datos: ["sr.vakantiedagen-basis", "sr.vakantiedagen-stap", "sr.vakantiedagen-max", "sr.vakantietoelage", "sr.overwerk-factor", "sr.overwerk-factor-rustdag"],
    metodo: "html",
    url: "https://www.sris.sr/?s=vacantiewet",
    userAgentNavegador: true,
    async traer(http) {
      const vakantie = await sris(http, "vacantiewet", /vac?antie/i);
      const arbeid = await sris(http, "arbeidswet", /arbeidswet/i);
      if (vakantie === null || arbeid === null) return null;
      return [...vakantie, ...arbeid];
    },
  },
  {
    id: "sr.belastingdienst-btw",
    carril: "norma",
    datos: ["sr.btw-algemeen", "sr.btw-verlaagd", "sr.btw-verhoogd"],
    metodo: "api-json",
    url: "https://belastingdienst.sr/wp-json/wp/v2/media?per_page=50&orderby=date&mime_type=application/pdf&search=BTW",
    userAgentNavegador: true,
    async traer(http) {
      return belastingdienst(http, "BTW");
    },
  },
  {
    id: "sr.belastingdienst-huurwaarde",
    carril: "norma",
    datos: ["sr.huurwaardebelasting", "sr.huurwaarde-eigen-gebruik", "sr.huurwaarde-aftrek", "sr.huurwaardebelasting-minimum"],
    metodo: "api-json",
    url: "https://belastingdienst.sr/wp-json/wp/v2/media?per_page=50&orderby=date&mime_type=application/pdf&search=huurwaarde",
    userAgentNavegador: true,
    async traer(http) {
      return belastingdienst(http, "huurwaarde");
    },
  },
];
