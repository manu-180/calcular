import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import series from "../series.json";

const CPI = (series.series.find((s) => s.id === "bn.cpi")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];
const MESES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default definirCalculadora({
  id: "bn.inflation-calculator",
  mercado: "bn",
  concepto: "inflacion",
  slug: "inflation-calculator",
  estado: "publicado",
  requiere: { "bn.cpi": "serie" },
  campos: [
    { id: "importe", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 1000 },
    { id: "anio", tipo: "entero", etiqueta: "Year of the original amount", min: 2021, max: 2100, porDefecto: 2021 },
    { id: "mes", tipo: "entero", etiqueta: "Month of the original amount (1 to 12)", min: 1, max: 12, porDefecto: 1 },
  ],
  calcular(e, v, { redondear }) {
    const ultimo = v["bn.cpi"];
    const inicio = `${e.anio}-${String(e.mes).padStart(2, "0")}-01`;
    if (inicio >= ultimo.fecha) throw new ErrorEntrada("Choose a month before the latest CPI figure.", "anio");
    const punto = CPI.find(([f]) => f === inicio);
    if (!punto) throw new ErrorEntrada("There is no CPI figure for that month. Try another month or a year from 2021.", "anio");
    const factor = ultimo.valor / punto[1];
    const anios = (Number(ultimo.fecha.slice(0, 4)) * 12 + Number(ultimo.fecha.slice(5, 7)) - (e.anio * 12 + e.mes)) / 12;
    return {
      actualizado: redondear(e.importe * factor),
      diferencia: redondear(e.importe * (factor - 1)),
      acumulada: (factor - 1) * 100,
      promedio: (Math.pow(factor, 1 / anios) - 1) * 100,
      indiceInicial: punto[1],
      indiceActual: ultimo.valor,
      periodo: `${MESES[e.mes - 1]} ${e.anio} to ${MESES[Number(ultimo.fecha.slice(5, 7)) - 1]} ${ultimo.fecha.slice(0, 4)}`,
    };
  },
  resultado: [
    { clave: "actualizado", etiqueta: "Amount in today's prices", formato: "moneda", destacada: true },
    { clave: "diferencia", etiqueta: "Change in prices", formato: "moneda" },
    { clave: "acumulada", etiqueta: "Total change over the period", formato: "porcentaje", decimales: 1 },
    { clave: "promedio", etiqueta: "Average change a year", formato: "porcentaje", decimales: 2 },
    { clave: "indiceInicial", etiqueta: "CPI in the starting month", formato: "numero", decimales: 1 },
    { clave: "indiceActual", etiqueta: "Latest CPI", formato: "numero", decimales: 1 },
    { clave: "periodo", etiqueta: "Period", formato: "texto" },
  ],
});
