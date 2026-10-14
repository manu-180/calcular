import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoFr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const ingreso = montoEjemplo(ctx, 2000);
  return {
    h1: "Budget avec la règle des 50/30/20",
    title: tituloQueEntre(`Budget avec la règle des 50/30/20 (${ctx.nombrePais})`, "Budget avec la règle des 50/30/20", "Règle des 50/30/20"),
    description: "Répartissez votre revenu net mensuel avec la règle des 50/30/20 : ce qui va aux besoins, aux envies et à l’épargne. Ajustez les pourcentages si besoin.",
    intro: [
      "La règle des 50/30/20 est une façon simple d’organiser son mois. La moitié va à l’essentiel, 30 % à ce qui vous fait plaisir et 20 % à l’épargne.",
      "Saisissez votre revenu net et vous voyez combien va à chaque partie. Si votre situation est différente, par exemple avec un loyer élevé, ajustez les pourcentages.",
    ],
    comoSeCalcula: [
      "Besoins = revenu × 50 %.",
      "Envies = revenu × 30 %.",
      "Épargne = revenu × 20 %. Les trois pourcentages doivent faire 100 %.",
    ],
    ejemplo: [
      `Avec ${m(ingreso)} par mois : ${m(ingreso * 0.5)} pour les besoins, ${m(ingreso * 0.3)} pour les envies et ${m(ingreso * 0.2)} pour l’épargne.`,
      `Sur un an, ces 20 % représentent ${m(ingreso * 0.2 * 12)} mis de côté.`,
    ],
    faq: [
      {
        pregunta: "Qu’est-ce qui relève des besoins et des envies ?",
        respuesta: "Les besoins sont les dépenses obligatoires : logement, courses de base, énergie, transport, santé et remboursements minimums. Les envies sont ce que vous pourriez supprimer en cas de coup dur.",
      },
      {
        pregunta: "Et si mes besoins dépassent 50 % ?",
        respuesta: "C’est fréquent, surtout avec un loyer élevé. Essayez 60/20/20 ou 70/20/10, et évitez de ramener l’épargne à zéro.",
      },
      {
        pregunta: "Les remboursements de crédit comptent-ils comme épargne ?",
        respuesta: "Les mensualités obligatoires vont dans les besoins. Ce que vous remboursez en plus pour solder une dette plus vite compte comme épargne, car cela améliore votre patrimoine.",
      },
    ],
    glosario: [
      { termino: "Revenu net", definicion: "Ce que vous touchez après impôts et cotisations." },
      { termino: "Règle des 50/30/20", definicion: "Une façon de répartir son revenu entre besoins, envies et épargne." },
    ],
  };
};
