import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import series from "../series.json";

const IPC = (series.series.find((s) => s.id === "mw.cpi")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];
const MESES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default definirCalculadora({
  id: "mw.inflation-calculator",
  mercado: "mw",
  concepto: "inflacion",
  slug: "inflation-calculator",
  estado: "publicado",
  requiere: {
    "mw.cpi": "serie",
  },
  campos: [
    { id: "importe", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 100000 },
    {
      id: "mes",
      tipo: "opcion",
      etiqueta: "Month of the original amount",
      opciones: MESES.map((m, i) => ({ valor: String(i + 1).padStart(2, "0"), etiqueta: m })),
      porDefecto: "01",
    },
    { id: "anio", tipo: "entero", etiqueta: "Year of the original amount", min: 1991, max: 2100, porDefecto: 2020 },
  ],
  calcular(e, v, { redondear }) {
    const ultimo = v["mw.cpi"];
    const desde = `${e.anio}-${e.mes}-01`;
    if (desde >= ultimo.fecha) throw new ErrorEntrada("Choose a month before the latest CPI.", "anio");
    const base = IPC.find(([f]) => f === desde)?.[1];
    if (base === undefined) throw new ErrorEntrada("The monthly CPI here starts in January 1991. Choose that month or a later one.", "anio");
    const factor = ultimo.valor / base;
    const nombreUltimo = `${MESES[Number(ultimo.fecha.slice(5, 7)) - 1]} ${ultimo.fecha.slice(0, 4)}`;
    return {
      actualizado: redondear(e.importe * factor),
      diferencia: redondear(e.importe * (factor - 1)),
      acumulada: (factor - 1) * 100,
      ipcInicial: base,
      ipcFinal: ultimo.valor,
      periodo: `${MESES[Number(e.mes) - 1]} ${e.anio} to ${nombreUltimo}`,
    };
  },
  resultado: [
    { clave: "actualizado", etiqueta: "Amount in today's kwacha", formato: "moneda", destacada: true },
    { clave: "diferencia", etiqueta: "Increase from inflation", formato: "moneda" },
    { clave: "acumulada", etiqueta: "Total inflation over the period", formato: "porcentaje", decimales: 1 },
    { clave: "ipcInicial", etiqueta: "CPI at the start", formato: "numero", decimales: 2 },
    { clave: "ipcFinal", etiqueta: "Latest CPI", formato: "numero", decimales: 2 },
    { clave: "periodo", etiqueta: "Period", formato: "texto" },
  ],
});
