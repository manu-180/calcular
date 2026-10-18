import { definirTextos } from "@/motor/edicion";
import takeHomePay from "../../ca/calculadoras/take-home-pay";
import { MENSAJES_COMUNES } from "../lib/comun";

export default definirTextos(takeHomePay, {
  calculadora: "ca-fr.take-home-pay",
  slug: "calcul-salaire-net",
  campos: {
    salario: { etiqueta: "Salaire annuel brut" },
    provincia: {
      etiqueta: "Province ou territoire de résidence",
      porDefecto: "qc",
      opciones: {
        ab: "Alberta",
        bc: "Colombie-Britannique",
        mb: "Manitoba",
        nb: "Nouveau-Brunswick",
        nl: "Terre-Neuve-et-Labrador",
        ns: "Nouvelle-Écosse",
        nt: "Territoires du Nord-Ouest",
        nu: "Nunavut",
        on: "Ontario",
        pe: "Île-du-Prince-Édouard",
        qc: "Québec",
        sk: "Saskatchewan",
        yt: "Yukon",
      },
    },
    periodo: {
      etiqueta: "Fréquence de la paie",
      opciones: { weekly: "Chaque semaine (52 paies)", biweekly: "Aux deux semaines (26 paies)", "semi-monthly": "Deux fois par mois (24 paies)", monthly: "Chaque mois (12 paies)" },
    },
    pension: { etiqueta: "Votre cotisation REER ou au régime de retraite retenue sur la paie (% du salaire)" },
  },
  filas: {
    anual: { etiqueta: "Salaire net par année" },
    porPago: { etiqueta: "Salaire net par paie" },
    mensual: { etiqueta: "Salaire net par mois" },
    federal: { etiqueta: "Impôt fédéral" },
    provincial: { etiqueta: "Impôt provincial ou territorial" },
    cpp: { etiqueta: "Cotisations au RRQ (RPC hors Québec)" },
    cpp2: { etiqueta: "Deuxièmes cotisations supplémentaires au RRQ ou au RPC" },
    ei: { etiqueta: "Cotisations d'assurance-emploi" },
    qpip: { etiqueta: "Cotisations au RQAP" },
    aportePension: { etiqueta: "Votre cotisation REER ou au régime de retraite" },
    marginal: { etiqueta: "Taux marginal d'imposition" },
  },
  mensajes: {
    ...MENSAJES_COMUNES,
    "Your payslip can differ by a few dollars each pay, because payroll spreads the CPP and EI maximums and the tax credits over the year.":
      "Votre talon de paie peut différer de quelques dollars d'une paie à l'autre, parce que la paie répartit les maximums du RRQ et de l'assurance-emploi et les crédits d'impôt sur l'année.",
    "In Quebec the federal tax already takes off the 16.5% Quebec abatement, and Quebec tax only counts the basic personal amount and the deduction for workers.":
      "Au Québec, l'impôt fédéral tient déjà compte de l'abattement du Québec de 16,5 %, et l'impôt du Québec ne compte que le montant personnel de base et la déduction pour travailleurs.",
  },
});
