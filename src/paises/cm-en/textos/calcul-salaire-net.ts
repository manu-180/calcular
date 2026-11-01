import { definirTextos } from "@/motor/edicion";
import base from "../../cm/calculadoras/calcul-salaire-net";
import { MENSAJES } from "../lib/comun";

export default definirTextos(base, {
  calculadora: "cm-en.calcul-salaire-net",
  slug: "net-salary-calculator",
  campos: {
    brut: { etiqueta: "Monthly taxable gross pay", ayuda: "Basic salary, bonuses, taxable allowances (including transport) and benefits in kind." },
    salaireBase: { etiqueta: "Monthly basic salary", ayuda: "Used for the local development tax. Leave it blank if it equals your gross pay." },
    nonImposable: { etiqueta: "Non-taxable allowances this month", ayuda: "Family allowances or refunds of work expenses. They go straight to net pay." },
    autres: { etiqueta: "Other deductions this month", ayuda: "Salary advance, mutual insurance, union dues: anything else on your payslip." },
  },
  filas: {
    net: { etiqueta: "Net pay" },
    cnps: { etiqueta: "CNPS old-age pension" },
    irpp: { etiqueta: "IRPP (income tax)" },
    cac: { etiqueta: "Council additional tax" },
    cfc: { etiqueta: "Cameroon Housing Loan Fund" },
    rav: { etiqueta: "Broadcasting fee (CRTV)" },
    tdl: { etiqueta: "Local development tax" },
    autres: { etiqueta: "Other deductions" },
    nonImposable: { etiqueta: "Non-taxable allowances added" },
    totalRetenues: { etiqueta: "Total deductions" },
    netAnnuel: { etiqueta: "Net over 12 months" },
  },
  mensajes: MENSAJES,
});
