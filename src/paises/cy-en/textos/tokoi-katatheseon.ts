import { definirTextos } from "@/motor/edicion";
import base from "../../cy/calculadoras/tokoi-katatheseon";
import { MENSAJES } from "../lib/comun";

export default definirTextos(base, {
  calculadora: "cy-en.tokoi-katatheseon",
  slug: "fixed-deposit-interest",
  campos: {
    kefalaio: { etiqueta: "Deposit amount" },
    epitokio: { etiqueta: "Annual interest rate" },
    mines: { etiqueta: "Term in months" },
  },
  filas: {
    kathara: { etiqueta: "Net interest" },
    tokos: { etiqueta: "Gross interest" },
    amyna: { etiqueta: "Special Defence Contribution" },
    gesy: { etiqueta: "GeSY contribution" },
    teliko: { etiqueta: "Amount at maturity" },
    apodosi: { etiqueta: "Net annual return" },
  },
  mensajes: MENSAJES,
});
