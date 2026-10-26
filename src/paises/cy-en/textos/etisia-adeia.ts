import { definirTextos } from "@/motor/edicion";
import base from "../../cy/calculadoras/etisia-adeia";
import { MENSAJES } from "../lib/comun";

export default definirTextos(base, {
  calculadora: "cy-en.etisia-adeia",
  slug: "annual-leave-calculator",
  campos: {
    evdomada: { etiqueta: "Working week" },
    evdomades: { etiqueta: "Weeks worked in the leave year", ayuda: "Time off for illness, accidents, maternity or parental leave counts as work." },
    misthos: { etiqueta: "Gross monthly salary (optional)" },
  },
  filas: {
    imeres: { etiqueta: "Working days of annual leave" },
    plires: { etiqueta: "Full leave for 48 weeks or more" },
    evdomadesAdeias: { etiqueta: "In working weeks" },
    axia: { etiqueta: "Approximate value of the leave" },
  },
  mensajes: MENSAJES,
});
