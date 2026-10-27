import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import series from "../series.json";

const IPC = (series.series.find((s) => s.id === "rw.cpi-urban")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];
const MESES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function etiqueta(fecha: string): string {
  return `${MESES[Number(fecha.slice(5, 7)) - 1]} ${fecha.slice(0, 4)}`;
}

export default definirCalculadora({
  id: "rw.inflation-calculator",
  mercado: "rw",
  concepto: "inflacion",
  slug: "inflation-calculator",
  estado: "publicado",
  requiere: {
    "rw.cpi-urban": "serie",
  },
  campos: [
    { id: "importe", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 100000 },
    { id: "anio", tipo: "entero", etiqueta: "Year of the original amount", min: 2009, max: 2100, porDefecto: 2020 },
    {
      id: "mes",
      tipo: "opcion",
      etiqueta: "Month",
      opciones: [
        { valor: "01", etiqueta: "January" },
        { valor: "02", etiqueta: "February" },
        { valor: "03", etiqueta: "March" },
        { valor: "04", etiqueta: "April" },
        { valor: "05", etiqueta: "May" },
        { valor: "06", etiqueta: "June" },
        { valor: "07", etiqueta: "July" },
        { valor: "08", etiqueta: "August" },
        { valor: "09", etiqueta: "September" },
        { valor: "10", etiqueta: "October" },
        { valor: "11", etiqueta: "November" },
        { valor: "12", etiqueta: "December" },
      ],
      porDefecto: "01",
    },
  ],
  calcular(e, v, { redondear }) {
    const ultimo = v["rw.cpi-urban"];
    const porFecha = new Map<string, number>(IPC.filter(([f]) => f <= ultimo.fecha));
    const desde = `${e.anio}-${e.mes}-01`;
    const inicial = porFecha.get(desde);
    if (desde >= ultimo.fecha) throw new ErrorEntrada(`Choose a month before ${etiqueta(ultimo.fecha)}.`, "anio");
    if (inicial === undefined) throw new ErrorEntrada("The urban CPI series starts in February 2009. Choose a later month.", "anio");
    const factor = ultimo.valor / inicial;
    const haceUnAnio = porFecha.get(`${Number(ultimo.fecha.slice(0, 4)) - 1}${ultimo.fecha.slice(4)}`);
    return {
      actualizado: redondear(e.importe * factor),
      diferencia: redondear(e.importe * (factor - 1)),
      acumulada: (factor - 1) * 100,
      anual: haceUnAnio ? (ultimo.valor / haceUnAnio - 1) * 100 : null,
      periodo: `${etiqueta(desde)} to ${etiqueta(ultimo.fecha)}`,
    };
  },
  resultado: [
    { clave: "actualizado", etiqueta: "Amount in today's francs", formato: "moneda", destacada: true },
    { clave: "diferencia", etiqueta: "Increase from inflation", formato: "moneda" },
    { clave: "acumulada", etiqueta: "Total inflation over the period", formato: "porcentaje", decimales: 1 },
    { clave: "anual", etiqueta: "Latest 12-month inflation", formato: "porcentaje", decimales: 1 },
    { clave: "periodo", etiqueta: "Period", formato: "texto" },
  ],
});
