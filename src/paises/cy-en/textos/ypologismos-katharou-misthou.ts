import { definirTextos } from "@/motor/edicion";
import base from "../../cy/calculadoras/ypologismos-katharou-misthou";
import { MENSAJES } from "../lib/comun";

export default definirTextos(base, {
  calculadora: "cy-en.ypologismos-katharou-misthou",
  slug: "net-salary-calculator",
  campos: {
    miktos: { etiqueta: "Gross monthly salary" },
    misthoi: { etiqueta: "Salaries a year", opciones: { "12": "12 salaries", "13": "13 salaries (with a 13th salary)" } },
    tekna: { etiqueta: "Dependent children", ayuda: "The child deduction only applies if family income is within the income limits." },
    monogoneas: { etiqueta: "Single-parent family" },
  },
  filas: {
    katharaMina: { etiqueta: "Net monthly salary" },
    kaMina: { etiqueta: "Social Insurance per month" },
    gesyMina: { etiqueta: "GeSY contribution per month" },
    forosMina: { etiqueta: "Income tax per month" },
    miktaEtous: { etiqueta: "Gross pay for the year" },
    ekptosiEisforon: { etiqueta: "Deduction for contributions" },
    ekptosiTeknon: { etiqueta: "Child deduction" },
    forologiteo: { etiqueta: "Taxable income" },
    forosEtous: { etiqueta: "Income tax for the year" },
    katharaEtous: { etiqueta: "Net pay for the year" },
  },
  mensajes: MENSAJES,
});
