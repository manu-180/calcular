import { definirTextos } from "@/motor/edicion";
import base from "../../cy/calculadoras/ypologismos-forou-eisodimatos";
import { MENSAJES } from "../lib/comun";

export default definirTextos(base, {
  calculadora: "cy-en.ypologismos-forou-eisodimatos",
  slug: "income-tax-calculator",
  campos: {
    eisodima: { etiqueta: "Gross income for the year" },
    eisfores: { etiqueta: "Social Insurance, GeSY, provident fund and life insurance contributions" },
    tekna: { etiqueta: "Dependent children" },
    monogoneas: { etiqueta: "Single-parent family" },
    stegasi: { etiqueta: "Rent or mortgage interest paid on your main home" },
    energeia: { etiqueta: "Spending on energy upgrades or an electric car" },
    asfalisi: { etiqueta: "Home insurance premiums against natural disasters" },
    kritiria: {
      etiqueta: "You are within the income limits",
      ayuda: "The child, housing and energy deductions are only given if your income (individual or family) is within the limits.",
    },
  },
  filas: {
    foros: { etiqueta: "Income tax for the year" },
    ekptoseis: { etiqueta: "Total deductions" },
    forologiteo: { etiqueta: "Taxable income" },
    mesos: { etiqueta: "Average tax rate" },
    orikos: { etiqueta: "Marginal rate" },
    kathara: { etiqueta: "Income after tax" },
  },
  mensajes: MENSAJES,
});
