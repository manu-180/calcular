import { definirTextos } from "@/motor/edicion";
import base from "../../cy/calculadoras/katotatos-misthos";
import { MENSAJES } from "../lib/comun";

export default definirTextos(base, {
  calculadora: "cy-en.katotatos-misthos",
  slug: "minimum-wage",
  campos: {
    exiMines: { etiqueta: "You have worked six months for the same employer" },
    ores: { etiqueta: "Hours worked per week" },
    oresPlirous: { etiqueta: "Full-time hours in your sector", ayuda: "Usually 40 hours a week." },
  },
  filas: {
    katotatos: { etiqueta: "Monthly minimum wage for your hours" },
    plires: { etiqueta: "Full-time minimum wage" },
    oriaios: { etiqueta: "Roughly per hour" },
    katharaMina: { etiqueta: "Net per month" },
    kaMina: { etiqueta: "Social Insurance" },
    gesyMina: { etiqueta: "GeSY" },
  },
  mensajes: MENSAJES,
});
