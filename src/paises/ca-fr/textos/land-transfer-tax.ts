import { definirTextos } from "@/motor/edicion";
import landTransferTax from "../../ca/calculadoras/land-transfer-tax";
import { MENSAJES_COMUNES } from "../lib/comun";

export default definirTextos(landTransferTax, {
  calculadora: "ca-fr.land-transfer-tax",
  slug: "calcul-taxe-de-bienvenue",
  campos: {
    lugar: {
      etiqueta: "Où se trouve la propriété",
      porDefecto: "qc",
      opciones: {
        on: "Ontario, hors Toronto",
        toronto: "Ville de Toronto",
        bc: "Colombie-Britannique",
        qc: "Québec, hors Montréal (taxe de bienvenue)",
      },
    },
    precio: { etiqueta: "Prix d'achat" },
    primeraVez: { etiqueta: "Vous achetez une première habitation (remboursements de l'Ontario et de Toronto)" },
  },
  filas: {
    total: { etiqueta: "Droits de mutation à payer" },
    provincial: { etiqueta: "Taxe provinciale avant remboursements" },
    municipal: { etiqueta: "Droits municipaux avant remboursements (taxe de bienvenue au Québec, ou Toronto)" },
    rebaja: { etiqueta: "Remboursement ou exemption pour premier acheteur" },
    efectiva: { etiqueta: "Droits en pourcentage du prix" },
  },
  mensajes: {
    ...MENSAJES_COMUNES,
    "Enter the purchase price.": "Inscrivez le prix d'achat.",
    "These are the Quebec rates for 2026. A municipality can set a higher rate, up to 3%, on the part above $500,000, and Montreal has its own higher rates.":
      "Ce sont les taux du Québec pour 2026. Une municipalité peut fixer un taux plus élevé, jusqu'à 3 %, sur la partie qui dépasse 500 000 $, et Montréal a ses propres taux plus élevés.",
    "BC rates shown are the general property transfer tax for a home. The first time home buyers' exemption is not included yet, and foreign buyers can owe an additional tax.":
      "Les taux de la Colombie-Britannique sont ceux de la taxe générale sur les transferts de propriété pour une habitation. L'exemption pour premiers acheteurs n'est pas encore incluse, et les acheteurs étrangers peuvent devoir une taxe additionnelle.",
    "Rates shown are for a home with one or two single family residences.": "Les taux indiqués visent une propriété comptant une ou deux résidences unifamiliales.",
  },
});
