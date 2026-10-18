import { definirTextos } from "@/motor/edicion";
import incomeTax from "../../ca/calculadoras/income-tax-calculator";
import { MENSAJES_COMUNES } from "../lib/comun";
import { PROVINCES_FR } from "../lib/provinces";

export default definirTextos(incomeTax, {
  calculadora: "ca-fr.income-tax-calculator",
  slug: "calcul-impot-revenu",
  campos: {
    provincia: { etiqueta: "Province ou territoire de résidence au 31 décembre", porDefecto: "qc", opciones: PROVINCES_FR },
    empleo: { etiqueta: "Revenu d'emploi pour 2026" },
    otros: { etiqueta: "Autres revenus imposables (intérêts, loyers, pension)" },
    rrsp: { etiqueta: "Déductions REER et régime de retraite" },
  },
  filas: {
    total: { etiqueta: "Impôt total pour 2026" },
    federal: { etiqueta: "Impôt fédéral" },
    provincial: { etiqueta: "Impôt provincial ou territorial" },
    gravable: { etiqueta: "Revenu imposable" },
    despues: { etiqueta: "Revenu après impôt (avant RRQ et assurance-emploi)" },
    promedio: { etiqueta: "Taux moyen d'imposition" },
    marginal: { etiqueta: "Taux marginal sur votre prochain dollar" },
    cpp: { etiqueta: "Cotisations au RRQ ou au RPC sur votre paie" },
    ei: { etiqueta: "Cotisations d'assurance-emploi sur votre paie" },
    qpip: { etiqueta: "Cotisations au RQAP sur votre paie" },
  },
  mensajes: {
    ...MENSAJES_COMUNES,
    "The Ontario amount includes the Ontario surtax and the Ontario Health Premium, less the basic Ontario tax reduction.":
      "Le montant de l'Ontario comprend la surtaxe et la contribution-santé de l'Ontario, moins la réduction d'impôt de base de l'Ontario.",
    "The BC amount already takes off the BC tax reduction for lower incomes.": "Le montant de la Colombie-Britannique tient déjà compte de sa réduction d'impôt pour les revenus plus bas.",
    "In Quebec you file a separate Quebec return. The federal amount already takes off the 16.5% Quebec abatement, and the Quebec amount counts the basic personal amount and the deduction for workers only.":
      "Au Québec, vous produisez une déclaration de revenus du Québec distincte. Le montant fédéral tient déjà compte de l'abattement du Québec de 16,5 %, et le montant du Québec ne compte que le montant personnel de base et la déduction pour travailleurs.",
  },
});
