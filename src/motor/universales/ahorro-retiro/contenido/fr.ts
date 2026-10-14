import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { acumular, rentaMensual } from "../definicion";

export const contenidoFr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const actual = montoEjemplo(ctx, 5000);
  const aporte = montoEjemplo(ctx, 200);
  const a30 = acumular(30, 65, actual, aporte, 4);
  const capital30 = a30[a30.length - 1].saldo;
  const a40 = acumular(40, 65, actual, aporte, 4);
  const capital40 = a40[a40.length - 1].saldo;
  return {
    h1: "Simulation d’épargne retraite",
    title: tituloQueEntre(`Simulation d’épargne retraite (${ctx.nombrePais})`, "Simulation d’épargne retraite", "Épargne retraite"),
    description: "Voyez quel capital constituer pour la retraite avec des versements mensuels et quel revenu mensuel il vous donnerait, en pouvoir d’achat actuel.",
    intro: [
      "La pension de retraite suffit rarement à garder le même niveau de vie. Une épargne personnelle, même modeste, change beaucoup de choses si vous commencez tôt.",
      "Indiquez votre âge, l’âge de départ voulu, ce que vous avez et ce que vous pouvez verser chaque mois. Vous voyez votre capital à la retraite et ce que vous pourriez en tirer chaque mois.",
    ],
    comoSeCalcula: [
      "L’épargne grandit chaque mois au rendement réel, c’est-à-dire le rendement moins l’inflation. Le résultat reste ainsi en pouvoir d’achat d’aujourd’hui.",
      "À la retraite, le capital est versé en mensualités égales sur le nombre d’années choisi. Ce qui reste continue de rapporter entre-temps.",
      "Les pensions des régimes obligatoires, les impôts et les frais de gestion ne sont pas pris en compte.",
    ],
    ejemplo: [
      `Avec ${m(actual)} épargnés à 30 ans et ${m(aporte)} par mois à 4 % de rendement réel, vous atteignez ${m(capital30)} à 65 ans. Cela donne ${m(rentaMensual(capital30, 4, 25))} par mois pendant 25 ans.`,
      `En commençant à 40 ans avec les mêmes chiffres, vous atteignez ${m(capital40)}. Dix ans d’écart font une grosse différence.`,
    ],
    faq: [
      {
        pregunta: "Qu’est-ce que le rendement réel ?",
        respuesta: "C’est ce que rapporte un placement une fois l’inflation déduite. Si un placement rapporte 7 % et que l’inflation est de 3 %, le rendement réel est d’environ 4 %.",
      },
      {
        pregunta: "Ce calcul remplace-t-il ma pension de retraite ?",
        respuesta: ctx.pais === "FR"
          ? "Non. C’est votre épargne personnelle, en plus de la retraite de base et complémentaire. Pour estimer votre pension, consultez votre relevé de carrière sur le site officiel de l’Assurance retraite."
          : "Non. C’est votre épargne personnelle, en plus des régimes de retraite obligatoires. Pour estimer votre pension, renseignez-vous auprès de l’organisme de votre pays.",
      },
      {
        pregunta: "Combien épargner pour la retraite ?",
        respuesta: "Il n’y a pas de chiffre unique. Un repère courant est 10 % à 15 % de vos revenus. Le plus important est de commencer le plus tôt possible.",
      },
    ],
    glosario: [
      { termino: "Rendement réel", definicion: "Ce que rapporte un placement au-delà de l’inflation." },
      { termino: "Pouvoir d’achat d’aujourd’hui", definicion: "Un montant futur exprimé en ce qu’il permettrait d’acheter aujourd’hui." },
    ],
  };
};
