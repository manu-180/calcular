import { definirTextos } from "@/motor/edicion";
import hipoteca from "../../ca/calculadoras/variable-rate-mortgage";

export default definirTextos(hipoteca, {
  calculadora: "ca-fr.variable-rate-mortgage",
  slug: "calcul-hypotheque-taux-variable",
  campos: {
    prestamo: { etiqueta: "Montant du prêt hypothécaire" },
    anios: { etiqueta: "Amortissement en années" },
    margen: { etiqueta: "Votre taux par rapport au taux préférentiel (par exemple -0,5 pour préférentiel moins 0,5)" },
  },
  filas: {
    pago: { etiqueta: "Versement mensuel au taux préférentiel d'aujourd'hui" },
    tasa: { etiqueta: "Votre taux d'intérêt aujourd'hui" },
    prime: { etiqueta: "Taux préférentiel (série de la Banque du Canada)" },
    politica: { etiqueta: "Taux directeur de la Banque du Canada" },
    siSube: { etiqueta: "De plus par mois si les taux montent de 0,25 point" },
    siBaja: { etiqueta: "Économie par mois si les taux baissent de 0,25 point" },
    intereses: { etiqueta: "Intérêts totaux si les taux restent les mêmes" },
  },
  mensajes: {
    "Enter the amount you borrow.": "Inscrivez le montant que vous empruntez.",
    "This uses the prime rate from the Bank of Canada weekly series. Your lender's prime and payment rules can differ, so check your mortgage agreement.":
      "Le calcul utilise le taux préférentiel de la série hebdomadaire de la Banque du Canada. Le taux préférentiel et les règles de versement de votre prêteur peuvent différer : vérifiez votre contrat hypothécaire.",
  },
});
