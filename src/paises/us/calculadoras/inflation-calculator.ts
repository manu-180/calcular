import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import series from "../series.json";

const CPI = new Map(((series.series.find((s) => s.id === "us.cpi-u")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[]).map(([f, v]) => [f.slice(0, 7), v]));
const MESES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function nombreMes(mes: string): string {
  return `${MESES[Number(mes.slice(5, 7)) - 1]} ${mes.slice(0, 4)}`;
}

function mesesEntre(a: string, b: string): number {
  return (Number(b.slice(0, 4)) - Number(a.slice(0, 4))) * 12 + Number(b.slice(5, 7)) - Number(a.slice(5, 7));
}

export default definirCalculadora({
  id: "us.inflation-calculator",
  mercado: "us",
  concepto: "inflacion",
  slug: "inflation-calculator",
  estado: "publicado",
  requiere: {
    "us.cpi-u": "serie",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Amount in dollars", min: 0, porDefecto: 100 },
    { id: "desde", tipo: "fecha", etiqueta: "Month of the original amount", min: "1997-01-01", porDefecto: "2020-01-01", ayuda: "The CPI of that month is used. The day doesn't matter." },
    { id: "hasta", tipo: "fecha", etiqueta: "Month you want to compare with", min: "1997-01-01", porDefecto: "hoy" },
  ],
  calcular(entrada, valores, { redondear }) {
    const ultimo = valores["us.cpi-u"].fecha.slice(0, 7);
    const observaciones: string[] = [];
    const desde = entrada.desde.slice(0, 7);
    let hasta = entrada.hasta.slice(0, 7);
    if (desde > ultimo) throw new ErrorEntrada(`The latest CPI available is for ${nombreMes(ultimo)}.`, "desde");
    if (hasta > ultimo) {
      observaciones.push(`The latest CPI available is for ${nombreMes(ultimo)}, so that month is used as the end.`);
      hasta = ultimo;
    }
    if (desde > hasta) throw new ErrorEntrada("The first month has to be before the second one.", "hasta");
    for (const [mes, campo] of [[desde, "desde"], [hasta, "hasta"]] as const) {
      if (!CPI.has(mes)) {
        throw new ErrorEntrada(
          mes === "2025-10" ? "The BLS did not publish a CPI for October 2025 because of the government shutdown. Pick another month." : `There is no CPI for ${nombreMes(mes)}.`,
          campo,
        );
      }
    }
    const inicial = CPI.get(desde)!;
    const final = hasta === ultimo ? valores["us.cpi-u"].valor : CPI.get(hasta)!;
    const factor = final / inicial;
    const meses = mesesEntre(desde, hasta);
    return {
      ajustado: redondear(entrada.monto * factor),
      diferencia: redondear(entrada.monto * factor - entrada.monto),
      acumulada: redondear((factor - 1) * 100),
      anual: meses >= 12 ? redondear((Math.pow(factor, 12 / meses) - 1) * 100) : null,
      mesInicial: nombreMes(desde),
      indiceInicial: inicial,
      mesFinal: nombreMes(hasta),
      indiceFinal: final,
      observaciones,
    };
  },
  resultado: [
    { clave: "ajustado", etiqueta: "Amount in the later month's dollars", formato: "moneda", destacada: true },
    { clave: "diferencia", etiqueta: "Increase from inflation", formato: "moneda" },
    { clave: "acumulada", etiqueta: "Cumulative inflation", formato: "porcentaje" },
    { clave: "anual", etiqueta: "Average yearly inflation", formato: "porcentaje" },
    { clave: "mesInicial", etiqueta: "First month", formato: "texto" },
    { clave: "indiceInicial", etiqueta: "CPI-U in the first month", formato: "numero", decimales: 3 },
    { clave: "mesFinal", etiqueta: "Last month", formato: "texto" },
    { clave: "indiceFinal", etiqueta: "CPI-U in the last month", formato: "numero", decimales: 3 },
  ],
});
