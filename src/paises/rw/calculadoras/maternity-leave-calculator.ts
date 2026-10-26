import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { FechaISO } from "@/motor/tipos";
import { esFechaISO, sumarDias } from "@/motor/vigencia";

function diasDelMes(anio: number, mes: number): number {
  if (mes === 2) return anio % 4 === 0 && (anio % 100 !== 0 || anio % 400 === 0) ? 29 : 28;
  return [4, 6, 9, 11].includes(mes) ? 30 : 31;
}

function sumarMeses(fecha: FechaISO, meses: number): FechaISO {
  const [a, m, d] = fecha.split("-").map(Number);
  const total = a * 12 + (m - 1) + meses;
  const anio = Math.floor(total / 12);
  const mes = (total % 12) + 1;
  return `${anio}-${String(mes).padStart(2, "0")}-${String(Math.min(d, diasDelMes(anio, mes))).padStart(2, "0")}` as FechaISO;
}

export default definirCalculadora({
  id: "rw.maternity-leave-calculator",
  mercado: "rw",
  concepto: "propio",
  slug: "maternity-leave-calculator",
  estado: "publicado",
  requiere: {
    "rw.maternity-weeks": "numero",
    "rw.maternity-rssb-weeks": "numero",
  },
  campos: [
    { id: "inicio", tipo: "fecha", etiqueta: "First day of maternity leave", porDefecto: "hoy" },
    { id: "complicaciones", tipo: "si-no", etiqueta: "Complications from the delivery confirmed by a doctor", porDefecto: false },
  ],
  calcular(e, v) {
    if (!esFechaISO(e.inicio)) throw new ErrorEntrada("Enter the first day of leave.", "inicio");
    const semanas = v["rw.maternity-weeks"];
    const finNormal = sumarDias(e.inicio, semanas * 7 - 1);
    const ultimo = e.complicaciones ? sumarDias(sumarMeses(sumarDias(finNormal, 1), 1), -1) : finNormal;
    const empleador = semanas - v["rw.maternity-rssb-weeks"];
    return {
      ultimo,
      regreso: sumarDias(ultimo, 1),
      semanas,
      empleador,
      rssb: v["rw.maternity-rssb-weeks"],
      inicioRssb: sumarDias(e.inicio, empleador * 7),
      observaciones: ["Your employer keeps paying your full salary for the whole leave and then claims the last weeks back from RSSB."],
    };
  },
  resultado: [
    { clave: "ultimo", etiqueta: "Last day of leave", formato: "fecha", destacada: true },
    { clave: "regreso", etiqueta: "Back at work", formato: "fecha" },
    { clave: "semanas", etiqueta: "Maternity leave on full salary", formato: "semanas" },
    { clave: "empleador", etiqueta: "Weeks the employer bears", formato: "semanas" },
    { clave: "rssb", etiqueta: "Weeks reimbursed by RSSB", formato: "semanas" },
    { clave: "inicioRssb", etiqueta: "RSSB weeks start on", formato: "fecha" },
  ],
});
