import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aporteNecesario } from "../definicion";

export const contenidoFr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const meta = montoEjemplo(ctx, 10000);
  const actual = montoEjemplo(ctx, 1000);
  return {
    h1: "Calcul d’objectif d’épargne",
    title: tituloQueEntre(`Calcul d’objectif d’épargne (${ctx.nombrePais})`, "Calcul d’objectif d’épargne", "Objectif d’épargne"),
    description: "Découvrez combien épargner chaque mois pour réunir la somme voulue à la date prévue, en comptant ce que vous avez déjà et ce que rapporte votre épargne.",
    intro: [
      "Un voyage, une voiture, l’apport d’un logement ou une réserve pour les imprévus. Un objectif avec un montant et une date est bien plus facile à tenir.",
      "Indiquez combien vous voulez mettre de côté et en combien de mois. Le calcul vous dit combien épargner chaque mois et chaque semaine.",
    ],
    comoSeCalcula: [
      "Le calcul regarde d’abord combien votre épargne actuelle aura grandi à la fin de la période.",
      "Ce qui manque encore est réparti en versements mensuels égaux.",
      "Si votre épargne rapporte des intérêts, chaque versement en rapporte aussi : il faut donc verser un peu moins.",
    ],
    ejemplo: [
      `Pour réunir ${m(meta)} en 24 mois sans intérêts, il faut ${m(meta / 24)} par mois.`,
      `Avec ${m(actual)} déjà de côté et un rendement de 5 % par an, ${m(aporteNecesario(meta, actual, 24, 5))} par mois suffisent.`,
    ],
    faq: [
      {
        pregunta: "Comment tenir son objectif ?",
        respuesta: "Mettez l’argent de côté dès que vous êtes payé, avant toute autre dépense. Si possible, programmez un virement automatique vers un compte à part.",
      },
      {
        pregunta: "Et si le montant mensuel est trop élevé ?",
        respuesta: "Donnez-vous plus de temps ou baissez l’objectif. Vous pouvez aussi commencer avec ce que vous pouvez et augmenter quand vos revenus progressent.",
      },
      {
        pregunta: "Faut-il tenir compte de l’inflation ?",
        respuesta: "Si l’objectif est à plusieurs années, ajoutez l’inflation attendue au montant. Ce qui coûte 100 aujourd’hui coûtera sans doute un peu plus le moment venu.",
      },
    ],
    glosario: [
      { termino: "Versement", definicion: "L’argent que vous mettez de côté chaque mois pour l’objectif." },
      { termino: "Rendement", definicion: "Ce que rapporte votre épargne sur un livret ou un placement." },
    ],
  };
};
