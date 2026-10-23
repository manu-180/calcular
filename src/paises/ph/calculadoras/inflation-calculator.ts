import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import series from "../series.json";

const IPC = (series.series.find((s) => s.id === "ph.cpi")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];
const MESES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] as const;
const OPCIONES_MES = MESES.map((m, i) => ({ valor: String(i + 1).padStart(2, "0"), etiqueta: m }));

export default definirCalculadora({
  id: "ph.inflation-calculator",
  mercado: "ph",
  concepto: "inflacion",
  slug: "inflation-calculator",
  estado: "publicado",
  requiere: {
    "ph.cpi": "serie",
  },
  campos: [
    { id: "importe", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 1000 },
    { id: "anio", tipo: "entero", etiqueta: "Year of the original amount", min: 1994, max: 2100, porDefecto: 2015 },
    { id: "mes", tipo: "opcion", etiqueta: "Month", opciones: OPCIONES_MES, porDefecto: "01" },
  ],
  calcular(entrada, v, { redondear }) {
    const ultimo = v["ph.cpi"];
    const fecha = `${entrada.anio}-${entrada.mes}-01`;
    if (fecha >= ultimo.fecha) throw new ErrorEntrada("Choose a month before the latest CPI published by the PSA.", "anio");
    const base = IPC.find(([f]) => f === fecha)?.[1];
    if (base === undefined) throw new ErrorEntrada("The CPI series starts in January 1994.", "anio");
    const factor = ultimo.valor / base;
    const anios = (Number(ultimo.fecha.slice(0, 4)) - entrada.anio) * 12 + Number(ultimo.fecha.slice(5, 7)) - Number(entrada.mes);
    const nombreFinal = `${MESES[Number(ultimo.fecha.slice(5, 7)) - 1]} ${ultimo.fecha.slice(0, 4)}`;
    return {
      actualizado: redondear(entrada.importe * factor),
      diferencia: redondear(entrada.importe * (factor - 1)),
      acumulada: (factor - 1) * 100,
      promedio: (Math.pow(factor, 12 / anios) - 1) * 100,
      poder: redondear(entrada.importe / factor),
      periodo: `${MESES[Number(entrada.mes) - 1]} ${entrada.anio} to ${nombreFinal}`,
      observaciones: ["Based on the PSA consumer price index for all income households (2018 = 100). Values before 2018 are the PSA's backcasted series."],
    };
  },
  resultado: [
    { clave: "actualizado", etiqueta: "Amount in today's pesos", formato: "moneda", destacada: true },
    { clave: "diferencia", etiqueta: "Increase from inflation", formato: "moneda" },
    { clave: "acumulada", etiqueta: "Total inflation over the period", formato: "porcentaje", decimales: 1 },
    { clave: "promedio", etiqueta: "Average inflation a year", formato: "porcentaje", decimales: 1 },
    { clave: "poder", etiqueta: "What today's amount was worth back then", formato: "moneda" },
    { clave: "periodo", etiqueta: "Period", formato: "texto" },
  ],
});
