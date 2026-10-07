import { esFechaISO } from "@/motor/vigencia";
import type { Detector, HallazgoNorma, PuntoSerie } from "@/motor/tipos";

function esLista(v: unknown): v is unknown[] {
  return Array.isArray(v);
}

export const detectores: readonly Detector[] = [
  {
    id: "zz.indice-bcz",
    carril: "serie",
    serie: "zz.indice",
    metodo: "api-json",
    url: "https://example.org/zz/api/indice",
    banda: { min: 50, max: 200, saltoRelativoMax: 0.01 },
    async traer(http) {
      const json = await http.json(this.url);
      if (!esLista(json)) return null;
      const puntos: PuntoSerie[] = [];
      for (const fila of json) {
        if (typeof fila !== "object" || fila === null) return null;
        const { fecha, valor } = fila as { fecha?: unknown; valor?: unknown };
        if (!esFechaISO(fecha) || typeof valor !== "number") return null;
        puntos.push({ fecha, valor });
      }
      return puntos;
    },
  },
  {
    id: "zz.diario-oficial",
    carril: "norma",
    datos: ["zz.minimo", "zz.bonificacion"],
    metodo: "api-json",
    url: "https://example.org/zz/api/diario-oficial",
    async traer(http) {
      const json = await http.json(this.url);
      if (!esLista(json)) return null;
      const hallazgos: HallazgoNorma[] = [];
      for (const n of json as { titulo?: unknown; url?: unknown; fecha?: unknown }[]) {
        if (typeof n.titulo !== "string" || typeof n.url !== "string" || !esFechaISO(n.fecha)) continue;
        if (/salario m[ií]nimo|bonificaci[oó]n/i.test(n.titulo)) hallazgos.push({ titulo: n.titulo, url: n.url, fecha: n.fecha });
      }
      return hallazgos;
    },
  },
];
