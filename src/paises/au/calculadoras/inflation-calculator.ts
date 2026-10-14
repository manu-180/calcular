import { definirCalculadora } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import { nombreTrimestre, variacionEntreTrimestres } from "../lib/indice-precios";
import series from "../series.json";

const CPI = (series.series.find((s) => s.id === "au.cpi")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];

export default definirCalculadora({
  id: "au.inflation-calculator",
  mercado: "au",
  concepto: "inflacion",
  slug: "inflation-calculator",
  estado: "publicado",
  requiere: {
    "au.cpi": "serie",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 1000 },
    { id: "desde", tipo: "fecha", etiqueta: "Date of the original amount", min: "2000-01-01", porDefecto: "2015-06-30", ayuda: "The CPI of that quarter is used." },
    { id: "hasta", tipo: "fecha", etiqueta: "Date to bring it to", min: "2000-01-01", porDefecto: "hoy" },
  ],
  calcular(entrada, valores, { redondear }) {
    const v = variacionEntreTrimestres(CPI, valores["au.cpi"], entrada.desde, entrada.hasta, { desde: "desde", hasta: "hasta" });
    return {
      actualizado: redondear(entrada.monto * v.factor),
      diferencia: redondear(entrada.monto * v.factor - entrada.monto),
      acumulada: v.acumulada,
      anual: v.anual,
      trimestreInicial: nombreTrimestre(v.inicial),
      indiceInicial: v.indiceInicial,
      trimestreFinal: nombreTrimestre(v.final),
      indiceFinal: v.indiceFinal,
      observaciones: v.observaciones,
    };
  },
  resultado: [
    { clave: "actualizado", etiqueta: "Amount in today's dollars", formato: "moneda", destacada: true },
    { clave: "diferencia", etiqueta: "Increase due to inflation", formato: "moneda" },
    { clave: "acumulada", etiqueta: "Total inflation over the period", formato: "porcentaje", decimales: 2 },
    { clave: "anual", etiqueta: "Annual inflation to the final quarter", formato: "porcentaje", decimales: 2 },
    { clave: "trimestreInicial", etiqueta: "Starting quarter", formato: "texto" },
    { clave: "indiceInicial", etiqueta: "CPI in the starting quarter", formato: "numero", decimales: 2 },
    { clave: "trimestreFinal", etiqueta: "Final quarter", formato: "texto" },
    { clave: "indiceFinal", etiqueta: "CPI in the final quarter", formato: "numero", decimales: 2 },
  ],
});
