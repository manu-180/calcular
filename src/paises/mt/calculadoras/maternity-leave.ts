import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { esFechaISO } from "@/motor/vigencia";
import { sumarDias } from "../lib/fechas";

export default definirCalculadora({
  id: "mt.maternity-leave",
  mercado: "mt",
  concepto: "propio",
  slug: "maternity-leave",
  estado: "publicado",
  requiere: { "mt.maternity-leave": "mapa" },
  campos: [
    { id: "parto", tipo: "fecha", etiqueta: "Expected date of birth", porDefecto: "2027-03-15" },
    { id: "extraAntes", tipo: "entero", etiqueta: "Extra weeks you want to take before the birth", min: 0, max: 8, porDefecto: 0 },
    { id: "semanal", tipo: "moneda", etiqueta: "Weekly wage (optional)", min: 0, requerido: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (!esFechaISO(entrada.parto)) throw new ErrorEntrada("Enter the expected date of birth.", "parto");
    const m = v["mt.maternity-leave"];
    const total = enMapa(m, "total");
    const minimoAntes = enMapa(m, "before");
    const minimoDespues = enMapa(m, "after");
    const libres = total - minimoAntes - minimoDespues;
    if (entrada.extraAntes > libres) throw new ErrorEntrada(`You can move at most ${libres} weeks before the birth.`, "extraAntes");
    const antes = minimoAntes + entrada.extraAntes;
    const despues = total - antes;
    const empieza = sumarDias(entrada.parto, -7 * antes);
    const termina = sumarDias(entrada.parto, 7 * despues - 1);
    const pagadas = enMapa(m, "paid");
    return {
      total,
      empieza,
      termina,
      antes,
      despues,
      pagadas,
      sinSueldo: total - pagadas,
      pago: entrada.semanal !== null ? redondear(entrada.semanal * pagadas) : null,
      observaciones: [
        "The dates move with the actual date of birth. Six weeks after the birth are compulsory.",
        "For the weeks your employer does not pay, you may get a maternity leave benefit from the Social Security Department.",
      ],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Maternity leave", formato: "semanas", destacada: true },
    { clave: "empieza", etiqueta: "Leave starts on", formato: "fecha" },
    { clave: "termina", etiqueta: "Leave ends on", formato: "fecha" },
    { clave: "antes", etiqueta: "Before the expected date", formato: "semanas" },
    { clave: "despues", etiqueta: "After the expected date", formato: "semanas" },
    { clave: "pagadas", etiqueta: "Paid in full by your employer", formato: "semanas" },
    { clave: "sinSueldo", etiqueta: "Not paid by your employer", formato: "semanas" },
    { clave: "pago", etiqueta: "Wages from your employer during the leave", formato: "moneda" },
  ],
});
