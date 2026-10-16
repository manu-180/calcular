import { definirCalculadora } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import { nombreTrimestre, variacionEntreTrimestres } from "../lib/indice-precios";
import series from "../series.json";

const CPI = (series.series.find((s) => s.id === "nz.cpi")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];

export default definirCalculadora({
  id: "nz.inflation-calculator",
  mercado: "nz",
  concepto: "inflacion",
  slug: "inflation-calculator",
  estado: "publicado",
  requiere: {
    "nz.cpi": "serie",
  },
  campos: [
    { id: "importe", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 1000 },
    { id: "desde", tipo: "fecha", etiqueta: "Date of the original amount", min: "1990-01-01", porDefecto: "2020-01-01", ayuda: "Uses the CPI for that quarter." },
    { id: "hasta", tipo: "fecha", etiqueta: "Date to bring it to", min: "1990-01-01", porDefecto: "hoy" },
  ],
  calcular(entrada, v, { redondear }) {
    const r = variacionEntreTrimestres(CPI, v["nz.cpi"], entrada.desde, entrada.hasta, "desde");
    return {
      actualizado: redondear(entrada.importe * r.factor),
      diferencia: redondear(entrada.importe * r.factor - entrada.importe),
      acumulada: r.acumulada,
      anual: r.anual,
      trimestreInicial: nombreTrimestre(r.inicial),
      indiceInicial: r.indiceInicial,
      trimestreFinal: nombreTrimestre(r.final),
      indiceFinal: r.indiceFinal,
      observaciones: r.observaciones,
    };
  },
  resultado: [
    { clave: "actualizado", etiqueta: "Amount adjusted for inflation", formato: "moneda", destacada: true },
    { clave: "diferencia", etiqueta: "Increase from inflation", formato: "moneda" },
    { clave: "acumulada", etiqueta: "CPI inflation over the period", formato: "porcentaje", decimales: 2 },
    { clave: "anual", etiqueta: "Annual CPI inflation to the end quarter", formato: "porcentaje", decimales: 1 },
    { clave: "trimestreInicial", etiqueta: "Start quarter", formato: "texto" },
    { clave: "indiceInicial", etiqueta: "CPI in the start quarter", formato: "numero", decimales: 0 },
    { clave: "trimestreFinal", etiqueta: "End quarter", formato: "texto" },
    { clave: "indiceFinal", etiqueta: "CPI in the end quarter", formato: "numero", decimales: 0 },
  ],
});
