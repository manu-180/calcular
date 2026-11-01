import { definirTextos } from "@/motor/edicion";
import base from "../../cy/calculadoras/ypologismos-miktou-apo-katharo";
import { MENSAJES } from "../lib/comun";

export default definirTextos(base, {
  calculadora: "cy-en.ypologismos-miktou-apo-katharo",
  slug: "net-to-gross-salary",
  campos: {
    kathara: { etiqueta: "Net monthly salary you want" },
    misthoi: { etiqueta: "Salaries a year", opciones: { "12": "12 salaries", "13": "13 salaries (with a 13th salary)" } },
    tekna: { etiqueta: "Dependent children" },
    monogoneas: { etiqueta: "Single-parent family" },
  },
  filas: {
    miktos: { etiqueta: "Gross monthly salary" },
    katharaMina: { etiqueta: "Resulting net salary" },
    kaMina: { etiqueta: "Social Insurance per month" },
    gesyMina: { etiqueta: "GeSY per month" },
    forosMina: { etiqueta: "Income tax per month" },
    miktaEtous: { etiqueta: "Gross pay for the year" },
  },
  mensajes: MENSAJES,
});
