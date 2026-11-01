import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import series from "../series.json";

const IPC = (series.series.find((s) => s.id === "ws.cpi")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];

export default definirCalculadora({
  id: "ws.inflation-calculator",
  mercado: "ws",
  concepto: "inflacion",
  slug: "inflation-calculator",
  estado: "publicado",
  requiere: {
    "ws.cpi": "serie",
  },
  campos: [
    { id: "importe", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 1000 },
    {
      id: "desde",
      tipo: "opcion",
      etiqueta: "Month of the original amount",
      opciones: [
        { valor: "2025-09-01", etiqueta: "September 2025" },
        { valor: "2025-10-01", etiqueta: "October 2025" },
        { valor: "2025-11-01", etiqueta: "November 2025" },
        { valor: "2025-12-01", etiqueta: "December 2025" },
        { valor: "2026-01-01", etiqueta: "January 2026" },
        { valor: "2026-02-01", etiqueta: "February 2026" },
        { valor: "2026-03-01", etiqueta: "March 2026" },
        { valor: "2026-04-01", etiqueta: "April 2026" },
        { valor: "2026-05-01", etiqueta: "May 2026" },
        { valor: "2026-06-01", etiqueta: "June 2026" },
        { valor: "2026-07-01", etiqueta: "July 2026" },
        { valor: "2026-08-01", etiqueta: "August 2026" },
      ],
      porDefecto: "2025-09-01",
    },
  ],
  calcular(e, v, { redondear }) {
    const ultimo = v["ws.cpi"];
    const inicio = IPC.find(([f]) => f === e.desde);
    if (!inicio || e.desde >= ultimo.fecha) throw new ErrorEntrada("Choose a month before the latest CPI month.", "desde");
    const factor = ultimo.valor / inicio[1];
    return {
      actualizado: redondear(e.importe * factor),
      diferencia: redondear(e.importe * (factor - 1)),
      acumulada: (factor - 1) * 100,
      indiceInicial: inicio[1],
      indiceActual: ultimo.valor,
      fecha: ultimo.fecha,
      observaciones: ["Worked out from the all-items Consumer Price Index of the Samoa Bureau of Statistics. The latest month is provisional and can be revised."],
    };
  },
  resultado: [
    { clave: "actualizado", etiqueta: "Amount in today's prices", formato: "moneda", destacada: true },
    { clave: "diferencia", etiqueta: "Increase from inflation", formato: "moneda" },
    { clave: "acumulada", etiqueta: "Price change over the period", formato: "porcentaje", decimales: 1 },
    { clave: "indiceInicial", etiqueta: "CPI in the starting month", formato: "numero", decimales: 2 },
    { clave: "indiceActual", etiqueta: "CPI in the latest month", formato: "numero", decimales: 2 },
    { clave: "fecha", etiqueta: "Latest CPI month", formato: "fecha" },
  ],
});
