import { definirCalculadora } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import { nombreMes, variacionEntreMeses } from "../lib/indice-precios";
import series from "../series.json";

const CPI = (series.series.find((s) => s.id === "mu.cpi")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];

export default definirCalculadora({
  id: "mu.inflation-calculator",
  mercado: "mu",
  concepto: "inflacion",
  slug: "inflation-calculator",
  estado: "publicado",
  requiere: {
    "mu.cpi": "serie",
  },
  campos: [
    { id: "importe", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 10000 },
    { id: "desde", tipo: "fecha", etiqueta: "Month of the original amount", min: "2024-04-01", porDefecto: "2024-04-01", ayuda: "From April 2024, when the current CPI series starts. The day does not matter." },
    { id: "hasta", tipo: "fecha", etiqueta: "Month to bring it to", min: "2024-04-01", porDefecto: "hoy" },
  ],
  calcular(entrada, v, { redondear }) {
    const r = variacionEntreMeses(CPI, v["mu.cpi"], entrada.desde, entrada.hasta, { desde: "desde", hasta: "hasta" });
    return {
      actualizado: redondear(entrada.importe * r.factor),
      diferencia: redondear(entrada.importe * r.factor - entrada.importe),
      acumulada: r.acumulada,
      interanual: r.interanual,
      mesInicial: nombreMes(r.mesInicial),
      indiceInicial: r.indiceInicial,
      mesFinal: nombreMes(r.mesFinal),
      indiceFinal: r.indiceFinal,
      observaciones: r.observaciones,
    };
  },
  resultado: [
    { clave: "actualizado", etiqueta: "Amount adjusted for inflation", formato: "moneda", destacada: true },
    { clave: "diferencia", etiqueta: "Increase from inflation", formato: "moneda" },
    { clave: "acumulada", etiqueta: "Price rise over the period", formato: "porcentaje", decimales: 2 },
    { clave: "interanual", etiqueta: "Year-on-year inflation in the end month", formato: "porcentaje", decimales: 1 },
    { clave: "mesInicial", etiqueta: "Start month", formato: "texto" },
    { clave: "indiceInicial", etiqueta: "CPI in the start month", formato: "numero", decimales: 1 },
    { clave: "mesFinal", etiqueta: "End month", formato: "texto" },
    { clave: "indiceFinal", etiqueta: "CPI in the end month", formato: "numero", decimales: 1 },
  ],
});
