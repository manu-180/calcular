import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma } from "@/motor/tipos";

const VERIFICADO: FechaISO = "2026-10-29";

export const detectores: readonly Detector[] = [
  {
    // El Social Security Board publica cada cambio de tasas como una entrada de WordPress.
    id: "ag.sswb-posts",
    carril: "norma",
    datos: ["ag.ss-employee-rate", "ag.ss-employer-rate", "ag.ss-ceiling-monthly", "ag.ss-ceiling-weekly", "ag.sickness-benefit-rate", "ag.maternity-allowance-rate"],
    metodo: "api-json",
    url: "https://socialsecurity.gov.ag/wp-json/wp/v2/posts?per_page=20&_fields=date,link,title",
    async traer(http) {
      const json = await http.json(this.url);
      if (!Array.isArray(json)) return null;
      const hallazgos: HallazgoNorma[] = [];
      for (const p of json as { date?: unknown; link?: unknown; title?: { rendered?: unknown } }[]) {
        const titulo = p.title?.rendered;
        if (typeof p.date !== "string" || typeof p.link !== "string" || typeof titulo !== "string") return null;
        const fecha = p.date.slice(0, 10);
        if (esFechaISO(fecha) && fecha > VERIFICADO && /contribution|rate|pension|ceiling|earnings/i.test(titulo)) {
          hallazgos.push({ titulo, url: p.link, fecha });
        }
      }
      return hallazgos;
    },
  },
  {
    // laws.gov.ag lista las leyes de cada año. Una Revenue (Miscellaneous Provisions) Act posterior puede cambiar el ABST.
    id: "ag.laws-revenue-acts",
    carril: "norma",
    datos: ["ag.abst-rate", "ag.abst-return-days"],
    metodo: "html",
    url: "https://laws.gov.ag/annual/?variable=2027",
    async traer(http) {
      const html = await http.texto(this.url);
      if (!/Laws or Acts of Parliament By Year/i.test(html)) return null;
      const hallazgos: HallazgoNorma[] = [];
      for (const m of html.matchAll(/href='([^']+\.pdf)'[^>]*>\s*([^<]*(?:Revenue|Sales Tax)[^<]*)/gi)) {
        hallazgos.push({ titulo: m[2].trim(), url: m[1], fecha: "2027-01-01" });
      }
      return hallazgos;
    },
  },
];
