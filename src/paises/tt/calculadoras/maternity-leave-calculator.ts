import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { sumarDias } from "@/motor/vigencia";

export default definirCalculadora({
  id: "tt.maternity-leave-calculator",
  mercado: "tt",
  concepto: "propio",
  slug: "maternity-leave-calculator",
  estado: "publicado",
  requiere: {
    "tt.maternity-leave-weeks": "numero",
    "tt.maternity-leave-before-birth-weeks": "numero",
    "tt.maternity-full-pay-months": "numero",
    "tt.maternity-half-pay-months": "numero",
  },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Your monthly pay", min: 0, porDefecto: 8000 },
    { id: "parto", tipo: "fecha", etiqueta: "Expected date of birth (from your medical certificate)", porDefecto: "hoy" },
  ],
  calcular(e, v, { redondear }) {
    if (e.sueldo <= 0) throw new ErrorEntrada("Enter your monthly pay.", "sueldo");
    const semanas = v["tt.maternity-leave-weeks"];
    const completo = redondear(e.sueldo * v["tt.maternity-full-pay-months"]);
    const medio = redondear((e.sueldo / 2) * v["tt.maternity-half-pay-months"]);
    const inicio = sumarDias(e.parto, -7 * v["tt.maternity-leave-before-birth-weeks"]);
    return {
      empleador: redondear(completo + medio),
      completo,
      medio,
      semanas,
      inicio,
      regreso: sumarDias(inicio, 7 * semanas),
      observaciones: [
        "On top of this you can claim the NIS maternity benefit. If the two together come to less than your full pay for the leave, your employer must pay the difference.",
        `You can also start your leave later than the earliest date. You must return no later than ${semanas} weeks after the day you go on leave.`,
      ],
    };
  },
  resultado: [
    { clave: "empleador", etiqueta: "Your employer pays at least", formato: "moneda", destacada: true },
    { clave: "completo", etiqueta: "Month at full pay", formato: "moneda" },
    { clave: "medio", etiqueta: "Months at half pay", formato: "moneda" },
    { clave: "semanas", etiqueta: "Length of maternity leave", formato: "semanas" },
    { clave: "inicio", etiqueta: "Earliest date your leave can start", formato: "fecha" },
    { clave: "regreso", etiqueta: "Return date if you start on that day", formato: "fecha" },
  ],
});
