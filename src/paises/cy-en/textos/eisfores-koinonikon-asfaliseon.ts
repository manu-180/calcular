import { definirTextos } from "@/motor/edicion";
import base from "../../cy/calculadoras/eisfores-koinonikon-asfaliseon";
import { MENSAJES } from "../lib/comun";

export default definirTextos(base, {
  calculadora: "cy-en.eisfores-koinonikon-asfaliseon",
  slug: "social-insurance-calculator",
  campos: {
    misthos: { etiqueta: "Gross monthly salary" },
    tameioAdeion: { etiqueta: "Your employer pays into the Central Holiday Fund", ayuda: "This applies when the employer has no exemption. Your annual leave is then paid by the Fund." },
  },
  filas: {
    misthotou: { etiqueta: "Deducted from your salary" },
    kaMisthotou: { etiqueta: "Social Insurance (employee)" },
    gesyMisthotou: { etiqueta: "GeSY (employee)" },
    ergodoti: { etiqueta: "Employer contributions" },
    kaErgodoti: { etiqueta: "Social Insurance (employer)" },
    gesyErgodoti: { etiqueta: "GeSY (employer)" },
    adeies: { etiqueta: "Central Holiday Fund" },
    pleonasmos: { etiqueta: "Redundancy Fund" },
    anaptyxi: { etiqueta: "Human Resource Development Fund" },
    synochi: { etiqueta: "Social Cohesion Fund" },
    synolo: { etiqueta: "Total contributions per month" },
  },
  mensajes: MENSAJES,
});
