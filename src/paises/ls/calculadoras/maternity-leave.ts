import { definirCalculadora } from "@/motor/calculo";
import { sumarDias } from "@/motor/vigencia";
import { sumarMeses } from "../lib/comun";

export default definirCalculadora({
  id: "ls.maternity-leave",
  mercado: "ls",
  concepto: "propio",
  slug: "maternity-leave",
  estado: "publicado",
  requiere: {
    "ls.maternity-weeks": "mapa",
    "ls.nursing-months": "numero",
    "ls.paternity-days": "numero",
  },
  campos: [
    { id: "parto", tipo: "fecha", etiqueta: "Expected date of birth", porDefecto: "hoy" },
    { id: "enfermedad", tipo: "si-no", etiqueta: "A doctor certifies an illness from the birth", porDefecto: false },
  ],
  calcular(entrada, v) {
    const m = v["ls.maternity-weeks"];
    const despues = entrada.enfermedad ? m["after-illness"] : m["after"];
    const inicio = sumarDias(entrada.parto, -m["before"] * 7);
    const regreso = sumarDias(entrada.parto, despues * 7);
    return {
      regreso,
      inicio,
      semanasDespues: despues,
      lactancia: sumarMeses(regreso, v["ls.nursing-months"]),
      paternidad: v["ls.paternity-days"],
      observaciones: [
        "If the baby arrives later than expected, the leave after the birth still runs in full from the actual date of birth.",
        "The Labour Act does not oblige the employer to pay wages during maternity leave. Your contract or a collective agreement may.",
      ],
    };
  },
  resultado: [
    { clave: "regreso", etiqueta: "Earliest day back at work", formato: "fecha", destacada: true },
    { clave: "inicio", etiqueta: "Leave can start from", formato: "fecha" },
    { clave: "semanasDespues", etiqueta: "Leave after the birth", formato: "semanas" },
    { clave: "lactancia", etiqueta: "Paid nursing hour until about", formato: "fecha" },
    { clave: "paternidad", etiqueta: "Paternity leave for the other parent", formato: "dias" },
  ],
});
