import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { sumarDias, sumarDiasHabiles, sumarMeses } from "../lib/fechas";

function esHabil(fecha: string): boolean {
  const [a, m, d] = fecha.split("-").map(Number);
  const dia = new Date(Date.UTC(a, m - 1, d)).getUTCDay();
  return dia !== 0 && dia !== 6;
}

export default definirCalculadora({
  id: "gm.maternity-leave",
  mercado: "gm",
  concepto: "propio",
  slug: "maternity-leave",
  estado: "publicado",
  requiere: {
    "gm.maternity-leave-months": "numero",
    "gm.paternity-leave-days": "numero",
  },
  campos: [
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "Leave",
      opciones: [
        { valor: "maternidad", etiqueta: "Maternity leave" },
        { valor: "paternidad", etiqueta: "Paternity leave" },
      ],
      porDefecto: "maternidad",
    },
    { id: "inicio", tipo: "fecha", etiqueta: "First day of leave", min: "2023-01-01", porDefecto: "hoy" },
    { id: "salario", tipo: "moneda", etiqueta: "Monthly salary", min: 0, porDefecto: 10000 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario < 0) throw new ErrorEntrada("The salary cannot be negative.", "salario");
    if (entrada.tipo === "maternidad") {
      const meses = v["gm.maternity-leave-months"];
      const regreso = sumarMeses(entrada.inicio, meses);
      return {
        ultimo: sumarDias(regreso, -1),
        regreso,
        meses,
        dias: null,
        pago: redondear(entrada.salario * meses),
        observaciones: ["You need a medical certificate showing the expected date of birth. Your employer cannot dismiss you while you are on maternity leave."],
      };
    }
    const dias = v["gm.paternity-leave-days"];
    const ultimo = sumarDiasHabiles(esHabil(entrada.inicio) ? sumarDias(entrada.inicio, -1) : entrada.inicio, dias);
    return {
      ultimo,
      regreso: sumarDiasHabiles(ultimo, 1),
      meses: null,
      dias,
      pago: null,
      observaciones: ["Claim it within six months of the birth. Weekends are not counted; public holidays are not taken into account here."],
    };
  },
  resultado: [
    { clave: "ultimo", etiqueta: "Last day of leave", formato: "fecha", destacada: true },
    { clave: "regreso", etiqueta: "Back at work on", formato: "fecha" },
    { clave: "meses", etiqueta: "Length of leave", formato: "meses" },
    { clave: "dias", etiqueta: "Working days of leave", formato: "dias" },
    { clave: "pago", etiqueta: "Salary paid during the leave", formato: "moneda" },
  ],
});
