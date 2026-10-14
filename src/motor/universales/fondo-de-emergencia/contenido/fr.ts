import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoFr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const gastos = montoEjemplo(ctx, 1500);
  const aporte = montoEjemplo(ctx, 300);
  return {
    h1: "Calcul de l’épargne de précaution",
    title: tituloQueEntre(`Calcul de l’épargne de précaution (${ctx.nombrePais})`, "Calcul de l’épargne de précaution", "Épargne de précaution"),
    description: "Calculez le montant de votre épargne de précaution à partir de vos dépenses essentielles, et combien de mois il faut pour la constituer.",
    intro: [
      "L’épargne de précaution est l’argent mis de côté pour ce qu’on ne peut pas prévoir : une perte d’emploi, un problème de santé ou une réparation urgente.",
      "Elle vous évite de recourir au crédit au pire moment. Indiquez vos dépenses essentielles et le nombre de mois à couvrir.",
    ],
    comoSeCalcula: [
      "Épargne conseillée = dépenses essentielles par mois × nombre de mois à couvrir.",
      "Reste à épargner = épargne conseillée − ce que vous avez déjà.",
      "Mois pour la constituer = reste à épargner ÷ ce que vous pouvez épargner par mois, arrondi au-dessus.",
    ],
    ejemplo: [
      `Avec ${m(gastos)} de dépenses essentielles par mois, une épargne de 6 mois représente ${m(gastos * 6)}.`,
      `En épargnant ${m(aporte)} par mois, vous la constituez en ${Math.ceil((gastos * 6) / aporte)} mois.`,
    ],
    faq: [
      {
        pregunta: "Combien de mois doit couvrir l’épargne de précaution ?",
        respuesta: "Le repère habituel est de 3 à 6 mois de dépenses essentielles. Si vos revenus varient, si vous êtes indépendant ou si le foyer vit d’un seul revenu, visez 6 à 12 mois.",
      },
      {
        pregunta: "Où placer son épargne de précaution ?",
        respuesta: ctx.pais === "FR"
          ? "Sur un support sûr et disponible à tout moment, séparé du compte courant, comme le Livret A ou le LDDS. Ce n’est pas de l’argent à placer en Bourse : il doit être là quand vous en avez besoin."
          : "Sur un support sûr et disponible à tout moment, séparé du compte courant, comme un livret d’épargne. Ce n’est pas de l’argent à placer en Bourse : il doit être là quand vous en avez besoin.",
      },
      {
        pregunta: "Faut-il d’abord constituer cette épargne ou rembourser ses dettes ?",
        respuesta: "Une approche courante : mettre de côté un mois de dépenses, puis rembourser les dettes chères comme le crédit renouvelable, puis compléter l’épargne.",
      },
    ],
    glosario: [
      { termino: "Dépenses essentielles", definicion: "Les factures à payer même si vos revenus s’arrêtent : logement, alimentation, énergie, santé." },
      { termino: "Liquidité", definicion: "La rapidité avec laquelle on peut utiliser une somme sans perdre de valeur." },
    ],
  };
};
