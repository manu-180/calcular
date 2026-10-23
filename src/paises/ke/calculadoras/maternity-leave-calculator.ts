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
  id: "ke.maternity-leave-calculator",
  mercado: "ke",
  concepto: "propio",
  slug: "maternity-leave-calculator",
  estado: "publicado",
  requiere: {
    "ke.maternity-months": "numero",
    "ke.paternity-weeks": "numero",
  },
  campos: [
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "Type of leave",
      opciones: [
        { valor: "maternity", etiqueta: "Maternity leave" },
        { valor: "paternity", etiqueta: "Paternity leave" },
      ],
      porDefecto: "maternity",
    },
    { id: "inicio", tipo: "fecha", etiqueta: "First day of leave", porDefecto: "hoy" },
  ],
  calcular(e, v) {
    if (!esFechaISO(e.inicio)) throw new ErrorEntrada("Enter the first day of leave.", "inicio");
    const ultimo =
      e.tipo === "maternity" ? sumarDias(sumarMeses(e.inicio, v["ke.maternity-months"]), -1) : sumarDias(e.inicio, v["ke.paternity-weeks"] * 7 - 1);
    const regreso = sumarDias(ultimo, 1);
    const observaciones =
      e.tipo === "maternity"
        ? ["Give your employer at least seven days' written notice of the date you start and the date you return.", "Taking maternity leave does not reduce your annual leave."]
        : [];
    return { ultimo, regreso, observaciones };
  },
  resultado: [
    { clave: "ultimo", etiqueta: "Last day of leave", formato: "fecha", destacada: true },
    { clave: "regreso", etiqueta: "Day after your leave ends", formato: "fecha" },
  ],
});
