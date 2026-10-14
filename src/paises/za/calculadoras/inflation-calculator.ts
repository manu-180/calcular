import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import series from "../series.json";

const IPC = (series.series.find((s) => s.id === "za.cpi-annual")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];
const MESES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// La serie es la variación de 12 meses que publica Stats SA. Encadenar las variaciones del mismo mes
// año tras año da el cambio del índice entre ese mes de un año y el de otro, sin necesitar el índice.
export default definirCalculadora({
  id: "za.inflation-calculator",
  mercado: "za",
  concepto: "inflacion",
  slug: "inflation-calculator",
  estado: "publicado",
  requiere: {
    "za.cpi-annual": "serie",
  },
  campos: [
    { id: "importe", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 1000 },
    { id: "anio", tipo: "entero", etiqueta: "Year of the original amount", min: 1999, max: 2100, porDefecto: 2015 },
  ],
  calcular(entrada, v, { redondear }) {
    const ultimo = v["za.cpi-annual"];
    const anioFinal = Number(ultimo.fecha.slice(0, 4));
    const mes = ultimo.fecha.slice(5, 7);
    if (entrada.anio >= anioFinal) throw new ErrorEntrada(`Choose a year before ${anioFinal}.`, "anio");
    const porFecha = new Map<string, number>(IPC.filter(([f]) => f <= ultimo.fecha));
    let factor = 1;
    for (let a = entrada.anio + 1; a <= anioFinal; a++) {
      const tasa = porFecha.get(`${a}-${mes}-01`);
      if (tasa === undefined) throw new ErrorEntrada("The CPI series starts in 2000, so choose 1999 or later.", "anio");
      factor *= 1 + tasa / 100;
    }
    const anios = anioFinal - entrada.anio;
    const nombreMes = MESES[Number(mes) - 1];
    return {
      actualizado: redondear(entrada.importe * factor),
      diferencia: redondear(entrada.importe * (factor - 1)),
      acumulada: (factor - 1) * 100,
      promedio: (Math.pow(factor, 1 / anios) - 1) * 100,
      ultimaTasa: ultimo.valor,
      periodo: `${nombreMes} ${entrada.anio} to ${nombreMes} ${anioFinal}`,
      observaciones: ["Worked out from the yearly CPI inflation rates that Stats SA publishes, rounded to one decimal, so the result can differ slightly from one based on the index itself."],
    };
  },
  resultado: [
    { clave: "actualizado", etiqueta: "Amount in today's rand", formato: "moneda", destacada: true },
    { clave: "diferencia", etiqueta: "Increase from inflation", formato: "moneda" },
    { clave: "acumulada", etiqueta: "Total CPI inflation over the period", formato: "porcentaje", decimales: 1 },
    { clave: "promedio", etiqueta: "Average inflation a year", formato: "porcentaje", decimales: 1 },
    { clave: "ultimaTasa", etiqueta: "Latest annual CPI inflation", formato: "porcentaje", decimales: 1 },
    { clave: "periodo", etiqueta: "Period", formato: "texto" },
  ],
});
