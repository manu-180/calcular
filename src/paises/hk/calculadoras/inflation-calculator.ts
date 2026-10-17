import { definirCalculadora } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import { nombreMes, variacionEntreMeses } from "../lib/indice-precios";
import series from "../series.json";

const CPI = (series.series.find((s) => s.id === "hk.cpi")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];

export default definirCalculadora({
  id: "hk.inflation-calculator",
  mercado: "hk",
  concepto: "inflacion",
  slug: "inflation-calculator",
  estado: "publicado",
  requiere: {
    "hk.cpi": "serie",
  },
  campos: [
    { id: "importe", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 1000 },
    { id: "desde", tipo: "fecha", etiqueta: "Date of the original amount", min: "1980-10-01", porDefecto: "2020-01-01", ayuda: "Uses the Composite CPI for that month." },
    { id: "hasta", tipo: "fecha", etiqueta: "Date to bring it to", min: "1980-10-01", porDefecto: "hoy" },
  ],
  calcular(entrada, v, { redondear }) {
    const r = variacionEntreMeses(CPI, v["hk.cpi"], entrada.desde, entrada.hasta, "desde");
    return {
      actualizado: redondear(entrada.importe * r.factor),
      diferencia: redondear(entrada.importe * r.factor - entrada.importe),
      acumulada: r.acumulada,
      anual: r.anual,
      mesInicial: nombreMes(r.inicial),
      indiceInicial: r.indiceInicial,
      mesFinal: nombreMes(r.final),
      indiceFinal: r.indiceFinal,
      observaciones: r.observaciones,
    };
  },
  resultado: [
    { clave: "actualizado", etiqueta: "Amount adjusted for inflation", formato: "moneda", destacada: true },
    { clave: "diferencia", etiqueta: "Increase from inflation", formato: "moneda" },
    { clave: "acumulada", etiqueta: "Composite CPI inflation over the period", formato: "porcentaje", decimales: 2 },
    { clave: "anual", etiqueta: "Year-on-year inflation in the end month", formato: "porcentaje", decimales: 1 },
    { clave: "mesInicial", etiqueta: "Start month", formato: "texto" },
    { clave: "indiceInicial", etiqueta: "Composite CPI in the start month", formato: "numero", decimales: 1 },
    { clave: "mesFinal", etiqueta: "End month", formato: "texto" },
    { clave: "indiceFinal", etiqueta: "Composite CPI in the end month", formato: "numero", decimales: 1 },
  ],
});
