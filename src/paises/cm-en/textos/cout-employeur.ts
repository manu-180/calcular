import { definirTextos } from "@/motor/edicion";
import base from "../../cm/calculadoras/cout-employeur";
import { MENSAJES } from "../lib/comun";

export default definirTextos(base, {
  calculadora: "cm-en.cout-employeur",
  slug: "employer-cost-calculator",
  campos: {
    brut: { etiqueta: "Monthly gross salary" },
    regime: { etiqueta: "Family benefits scheme" },
    groupe: { etiqueta: "Company risk group" },
    exonere: {
      etiqueta: "Employer exempt from the Housing Loan Fund and FNE",
      ayuda: "The State, councils, non-profit associations, individual farmers, private schools and faith-based hospitals.",
    },
  },
  filas: {
    cout: { etiqueta: "Total monthly cost of the employee" },
    cnps: { etiqueta: "Employer CNPS contributions" },
    cfc: { etiqueta: "Housing Loan Fund, employer share" },
    fne: { etiqueta: "National Employment Fund" },
    charges: { etiqueta: "Total employer charges" },
    tauxCharges: { etiqueta: "Charges as a share of gross pay" },
    coutAnnuel: { etiqueta: "Cost over 12 months" },
  },
  mensajes: MENSAJES,
});
