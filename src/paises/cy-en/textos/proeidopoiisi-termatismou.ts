import { definirTextos } from "@/motor/edicion";
import base from "../../cy/calculadoras/proeidopoiisi-termatismou";
import { MENSAJES } from "../lib/comun";

export default definirTextos(base, {
  calculadora: "cy-en.proeidopoiisi-termatismou",
  slug: "notice-period-calculator",
  campos: {
    apo: { etiqueta: "Start date" },
    eos: { etiqueta: "Date notice is given" },
    misthos: { etiqueta: "Gross monthly salary (optional)" },
  },
  filas: {
    ergodotis: { etiqueta: "Notice from the employer" },
    ergazomenos: { etiqueta: "Notice if you resign" },
    evdomades: { etiqueta: "Weeks of continuous employment" },
    antiProeidopoiisis: { etiqueta: "Approximate pay for the notice period" },
  },
  mensajes: MENSAJES,
});
