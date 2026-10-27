import { definirTextos } from "@/motor/edicion";
import base from "../../cm/calculadoras/salaire-net-en-brut";
import { MENSAJES } from "../lib/comun";

export default definirTextos(base, {
  calculadora: "cm-en.salaire-net-en-brut",
  slug: "net-to-gross-salary",
  campos: {
    net: {
      etiqueta: "Monthly net pay you want",
      ayuda: "Net after IRPP, CNPS, Housing Loan Fund, broadcasting fee and local development tax.",
    },
  },
  filas: {
    brut: { etiqueta: "Gross salary needed" },
    netObtenu: { etiqueta: "Net pay with this gross" },
    retenues: { etiqueta: "Total deductions" },
    irpp: { etiqueta: "of which IRPP and council tax" },
    cnps: { etiqueta: "of which CNPS pension" },
  },
  mensajes: MENSAJES,
});
