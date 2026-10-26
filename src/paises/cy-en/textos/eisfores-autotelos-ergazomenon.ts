import { definirTextos } from "@/motor/edicion";
import base from "../../cy/calculadoras/eisfores-autotelos-ergazomenon";
import { MENSAJES } from "../lib/comun";

export default definirTextos(base, {
  calculadora: "cy-en.eisfores-autotelos-ergazomenon",
  slug: "self-employed-contributions",
  campos: {
    katigoria: { etiqueta: "Occupational category" },
    eisodima: { etiqueta: "Net income from your work for the year" },
    pragmatiko: {
      etiqueta: "You are approved to pay on your actual income",
      ayuda: "If your income is below the minimum for your category, you can apply with supporting evidence.",
    },
  },
  filas: {
    synolo: { etiqueta: "Contributions for the year" },
    ka: { etiqueta: "Social Insurance for the year" },
    kaMina: { etiqueta: "Social Insurance per month, roughly" },
    gesy: { etiqueta: "GeSY for the year" },
    katotatoEvdomada: { etiqueta: "Weekly minimum for the category" },
    asfalistees: { etiqueta: "Insurable earnings for the year" },
  },
  mensajes: MENSAJES,
});
