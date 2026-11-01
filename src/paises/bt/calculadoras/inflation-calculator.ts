import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import series from "../series.json";

const IPC = (series.series.find((s) => s.id === "bt.cpi")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];
const MESES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Compara el índice del NSB del mismo mes en dos años. La serie arranca en diciembre de 2012.
export default definirCalculadora({
  id: "bt.inflation-calculator",
  mercado: "bt",
  concepto: "inflacion",
  slug: "inflation-calculator",
  estado: "publicado",
  requiere: {
    "bt.cpi": "serie",
  },
  campos: [
    { id: "importe", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 1000 },
    { id: "anio", tipo: "entero", etiqueta: "Year of the original amount", min: 2013, max: 2100, porDefecto: 2020 },
  ],
  calcular(e, v, { redondear }) {
    const ultimo = v["bt.cpi"];
    const anioFinal = Number(ultimo.fecha.slice(0, 4));
    const mes = ultimo.fecha.slice(5, 7);
    if (e.anio >= anioFinal) throw new ErrorEntrada(`Choose a year before ${anioFinal}.`, "anio");
    const porFecha = new Map<string, number>(IPC.filter(([f]) => f <= ultimo.fecha));
    const inicial = porFecha.get(`${e.anio}-${mes}-01`);
    if (inicial === undefined) throw new ErrorEntrada("The index starts in December 2012, so choose 2013 or later.", "anio");
    const previo = porFecha.get(`${anioFinal - 1}-${mes}-01`);
    const factor = ultimo.valor / inicial;
    const anios = anioFinal - e.anio;
    const nombreMes = MESES[Number(mes) - 1];
    return {
      actualizado: redondear(e.importe * factor),
      diferencia: redondear(e.importe * (factor - 1)),
      acumulada: (factor - 1) * 100,
      promedio: (Math.pow(factor, 1 / anios) - 1) * 100,
      ultimaTasa: previo ? (ultimo.valor / previo - 1) * 100 : null,
      periodo: `${nombreMes} ${e.anio} to ${nombreMes} ${anioFinal}`,
    };
  },
  resultado: [
    { clave: "actualizado", etiqueta: "Amount in today's ngultrum", formato: "moneda", destacada: true },
    { clave: "diferencia", etiqueta: "Increase from inflation", formato: "moneda" },
    { clave: "acumulada", etiqueta: "Total inflation over the period", formato: "porcentaje", decimales: 1 },
    { clave: "promedio", etiqueta: "Average inflation a year", formato: "porcentaje", decimales: 1 },
    { clave: "ultimaTasa", etiqueta: "Latest 12-month inflation", formato: "porcentaje", decimales: 2 },
    { clave: "periodo", etiqueta: "Period", formato: "texto" },
  ],
});
