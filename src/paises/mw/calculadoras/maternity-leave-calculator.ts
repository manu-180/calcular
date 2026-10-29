import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { sumarDias } from "@/motor/vigencia";

export default definirCalculadora({
  id: "mw.maternity-leave-calculator",
  mercado: "mw",
  concepto: "propio",
  slug: "maternity-leave-calculator",
  estado: "publicado",
  requiere: {
    "mw.maternity-weeks": "numero",
    "mw.maternity-cycle": "numero",
  },
  campos: [
    { id: "inicio", tipo: "fecha", etiqueta: "First day of maternity leave", porDefecto: "hoy" },
    { id: "mensual", tipo: "moneda", etiqueta: "Your monthly pay", min: 0, requerido: false, ayuda: "Optional. Add it to see the pay for the weeks of leave." },
    { id: "reciente", tipo: "si-no", etiqueta: "You took maternity leave in the last three years", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.mensual !== null && e.mensual < 0) throw new ErrorEntrada("Pay cannot be negative.", "mensual");
    const semanas = v["mw.maternity-weeks"];
    const dias = semanas * 7;
    const observaciones = e.reciente
      ? [`The Act gives this leave on full pay once within every ${v["mw.maternity-cycle"]} years. Check your contract or ask your employer how a second leave is treated.`]
      : [];
    return {
      semanas,
      ultimo: sumarDias(e.inicio, dias - 1),
      regreso: sumarDias(e.inicio, dias),
      pago: e.mensual === null ? null : redondear((e.mensual * 12 * semanas) / 52),
      observaciones,
    };
  },
  resultado: [
    { clave: "semanas", etiqueta: "Maternity leave on full pay", formato: "semanas", destacada: true },
    { clave: "ultimo", etiqueta: "Last day of leave", formato: "fecha" },
    { clave: "regreso", etiqueta: "Back at work on", formato: "fecha" },
    { clave: "pago", etiqueta: "Pay for the weeks of leave", formato: "moneda" },
  ],
});
