import { definirTextos } from "@/motor/edicion";
import base from "../../cm/calculadoras/calcul-irpp";
import { MENSAJES } from "../lib/comun";

export default definirTextos(base, {
  calculadora: "cm-en.calcul-irpp",
  slug: "irpp-calculator",
  campos: {
    periode: { etiqueta: "The salary you enter is", opciones: { mois: "Monthly", annee: "Yearly" } },
    brut: { etiqueta: "Taxable gross pay", ayuda: "Salary, bonuses, taxable allowances and benefits in kind, before any deduction." },
  },
  filas: {
    totalMois: { etiqueta: "IRPP and CAC withheld each month" },
    irppMois: { etiqueta: "IRPP for the month" },
    cacMois: { etiqueta: "Council additional tax for the month" },
    fraisProfessionnels: { etiqueta: "Work expenses deducted for the year" },
    cotisationPension: { etiqueta: "CNPS pension deducted for the year" },
    baseImposable: { etiqueta: "Taxable income for the year (after allowance)" },
    irppAnnuel: { etiqueta: "IRPP for the year" },
    cacAnnuel: { etiqueta: "CAC for the year" },
    tauxEffectif: { etiqueta: "Average rate on gross pay" },
  },
  mensajes: MENSAJES,
});
