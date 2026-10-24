import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import series from "../series.json";

const INFLACION = (series.series.find((s) => s.id === "ke.inflation")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];
const MESES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// La serie es la inflación de 12 meses que publica el CBK con datos del KNBS. Encadenar el mismo mes
// año tras año da el cambio del índice entre ese mes de un año y el de otro.
export default definirCalculadora({
  id: "ke.inflation-calculator",
  mercado: "ke",
  concepto: "inflacion",
  slug: "inflation-calculator",
  estado: "publicado",
  requiere: {
    "ke.inflation": "serie",
  },
  campos: [
    { id: "importe", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 1000 },
    { id: "anio", tipo: "entero", etiqueta: "Year of the original amount", min: 2004, max: 2100, porDefecto: 2016 },
  ],
  calcular(e, v, { redondear }) {
    const ultimo = v["ke.inflation"];
    const anioFinal = Number(ultimo.fecha.slice(0, 4));
    const mes = ultimo.fecha.slice(5, 7);
    if (e.anio >= anioFinal) throw new ErrorEntrada(`Choose a year before ${anioFinal}.`, "anio");
    const porFecha = new Map<string, number>(INFLACION.filter(([f]) => f <= ultimo.fecha));
    let factor = 1;
    for (let a = e.anio + 1; a <= anioFinal; a++) {
      const tasa = porFecha.get(`${a}-${mes}-01`);
      if (tasa === undefined) throw new ErrorEntrada("The inflation series starts in 2005, so choose 2004 or later.", "anio");
      factor *= 1 + tasa / 100;
    }
    const anios = anioFinal - e.anio;
    const nombreMes = MESES[Number(mes) - 1];
    return {
      actualizado: redondear(e.importe * factor),
      diferencia: redondear(e.importe * (factor - 1)),
      acumulada: (factor - 1) * 100,
      promedio: (Math.pow(factor, 1 / anios) - 1) * 100,
      ultimaTasa: ultimo.valor,
      periodo: `${nombreMes} ${e.anio} to ${nombreMes} ${anioFinal}`,
      observaciones: ["Worked out from the 12-month inflation rates the CBK publishes, rounded to two decimals, so the result can differ slightly from one based on the CPI itself."],
    };
  },
  resultado: [
    { clave: "actualizado", etiqueta: "Amount in today's shillings", formato: "moneda", destacada: true },
    { clave: "diferencia", etiqueta: "Increase from inflation", formato: "moneda" },
    { clave: "acumulada", etiqueta: "Total inflation over the period", formato: "porcentaje", decimales: 1 },
    { clave: "promedio", etiqueta: "Average inflation a year", formato: "porcentaje", decimales: 1 },
    { clave: "ultimaTasa", etiqueta: "Latest 12-month inflation", formato: "porcentaje", decimales: 2 },
    { clave: "periodo", etiqueta: "Period", formato: "texto" },
  ],
});
