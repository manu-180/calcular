import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import series from "../series.json";

const IPC = (series.series.find((s) => s.id === "bw.cpi-annual")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];
const PRIMER_ANIO = 2020;
const MESES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// La serie es la inflación de 12 meses que publica Statistics Botswana. Encadenar las tasas del mismo
// mes año tras año da el cambio del índice entre ese mes de un año y el de otro.
export default definirCalculadora({
  id: "bw.inflation-calculator",
  mercado: "bw",
  concepto: "inflacion",
  slug: "inflation-calculator",
  estado: "publicado",
  requiere: {
    "bw.cpi-annual": "serie",
  },
  campos: [
    { id: "importe", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 1000 },
    { id: "anio", tipo: "entero", etiqueta: "Year of the original amount", min: PRIMER_ANIO, max: 2100, porDefecto: 2021 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.importe <= 0) throw new ErrorEntrada("Enter an amount above zero.", "importe");
    const ultimo = v["bw.cpi-annual"];
    const anioFinal = Number(ultimo.fecha.slice(0, 4));
    const mes = ultimo.fecha.slice(5, 7);
    if (entrada.anio >= anioFinal) throw new ErrorEntrada(`Choose a year before ${anioFinal}.`, "anio");
    const porFecha = new Map<string, number>(IPC.filter(([f]) => f <= ultimo.fecha));
    let factor = 1;
    for (let a = entrada.anio + 1; a <= anioFinal; a++) {
      const tasa = porFecha.get(`${a}-${mes}-01`);
      if (tasa === undefined) throw new ErrorEntrada(`Our inflation series starts in 2021, so choose ${PRIMER_ANIO} or later.`, "anio");
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
      observaciones: ["Worked out from the annual inflation rates that Statistics Botswana publishes, rounded to one decimal, so the result can differ slightly from one based on the index itself."],
    };
  },
  resultado: [
    { clave: "actualizado", etiqueta: "Amount in today's pula", formato: "moneda", destacada: true },
    { clave: "diferencia", etiqueta: "Increase from inflation", formato: "moneda" },
    { clave: "acumulada", etiqueta: "Total inflation over the period", formato: "porcentaje", decimales: 1 },
    { clave: "promedio", etiqueta: "Average inflation a year", formato: "porcentaje", decimales: 1 },
    { clave: "ultimaTasa", etiqueta: "Latest annual inflation", formato: "porcentaje", decimales: 1 },
    { clave: "periodo", etiqueta: "Period", formato: "texto" },
  ],
});
