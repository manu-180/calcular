import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import series from "../series.json";

const CPI = (series.series.find((s) => s.id === "my.cpi")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];
const MESES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function nombreMes(fecha: string): string {
  return `${MESES[Number(fecha.slice(5, 7)) - 1]} ${fecha.slice(0, 4)}`;
}

// El último punto vigente lo da el motor; los anteriores salen de series.json filtrados a esa fecha,
// así una actualización del cron no cambia resultados viejos de golpe.
export default definirCalculadora({
  id: "my.inflation-calculator",
  mercado: "my",
  concepto: "inflacion",
  slug: "inflation-calculator",
  estado: "publicado",
  requiere: {
    "my.cpi": "serie",
  },
  campos: [
    { id: "importe", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 1000 },
    { id: "desde", tipo: "fecha", etiqueta: "Date of the original amount", min: "1980-01-01", porDefecto: "2015-01-01" },
    { id: "hasta", tipo: "fecha", etiqueta: "Date to bring it to", min: "1980-01-01", porDefecto: "hoy" },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.importe <= 0) throw new ErrorEntrada("Enter an amount.", "importe");
    const ultimo = v["my.cpi"];
    const puntos = CPI.filter(([f]) => f <= ultimo.fecha);
    const buscar = (fecha: string) => {
      const mes = `${fecha.slice(0, 7)}-01`;
      let elegido: PuntoSerieTupla | undefined;
      for (const p of puntos) if (p[0] <= mes) elegido = p;
      return elegido;
    };
    if (entrada.hasta <= entrada.desde) throw new ErrorEntrada("The second date has to be after the first one.", "hasta");
    const inicial = buscar(entrada.desde);
    const final = buscar(entrada.hasta);
    if (!inicial || !final) throw new ErrorEntrada("The CPI series starts in January 1980.", "desde");
    const factor = final[1] / inicial[1];
    const anios = ((Number(final[0].slice(0, 4)) - Number(inicial[0].slice(0, 4))) * 12 + Number(final[0].slice(5, 7)) - Number(inicial[0].slice(5, 7))) / 12;
    const observaciones: string[] = [];
    if (final[0] < `${entrada.hasta.slice(0, 7)}-01`) observaciones.push(`The latest CPI published by DOSM is for ${nombreMes(final[0])}, so the result runs to that month.`);
    return {
      actualizado: redondear(entrada.importe * factor),
      diferencia: redondear(entrada.importe * (factor - 1)),
      acumulada: (factor - 1) * 100,
      anual: anios > 0 ? (Math.pow(factor, 1 / anios) - 1) * 100 : 0,
      periodo: `${nombreMes(inicial[0])} to ${nombreMes(final[0])}`,
      indiceInicial: inicial[1],
      indiceFinal: final[1],
      observaciones,
    };
  },
  resultado: [
    { clave: "actualizado", etiqueta: "Amount adjusted for inflation", formato: "moneda", destacada: true },
    { clave: "diferencia", etiqueta: "Increase from inflation", formato: "moneda" },
    { clave: "acumulada", etiqueta: "CPI inflation over the period", formato: "porcentaje", decimales: 1 },
    { clave: "anual", etiqueta: "Average inflation a year", formato: "porcentaje", decimales: 1 },
    { clave: "periodo", etiqueta: "Period", formato: "texto" },
    { clave: "indiceInicial", etiqueta: "CPI at the start (2010 = 100)", formato: "numero", decimales: 1 },
    { clave: "indiceFinal", etiqueta: "CPI at the end (2010 = 100)", formato: "numero", decimales: 1 },
  ],
});
