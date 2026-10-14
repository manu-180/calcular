import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cagr, roi } from "../definicion";

export const contenidoFr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)} %`;
  const inicial = montoEjemplo(ctx, 10000);
  const final = montoEjemplo(ctx, 15000);
  return {
    h1: "Calcul du rendement d’un investissement",
    title: tituloQueEntre(`Calcul du ROI et du rendement annuel (${ctx.nombrePais})`, `Calcul du ROI (${ctx.nombrePais})`, "Calcul du ROI"),
    description: "Calculez le rendement total (ROI) et le rendement annuel (TCAC) d’un investissement à partir de la mise de départ, de sa valeur actuelle et de la durée.",
    intro: [
      "Un gain de 50 % fait rêver, mais ce n’est pas la même chose sur 2 ans que sur 10. Pour comparer des investissements, il faut le rendement par an.",
      "Saisissez ce que vous avez investi, ce que cela vaut aujourd’hui et le nombre d’années écoulées. Vous obtenez le rendement total et le rendement annuel composé.",
    ],
    comoSeCalcula: [
      "ROI = (valeur finale + revenus perçus − montant investi) ÷ montant investi × 100.",
      "TCAC = ((valeur finale + revenus perçus) ÷ montant investi) puissance (1 ÷ nombre d’années), moins 1.",
      "Le TCAC est le taux annuel composé : celui qui donne le même résultat s’il se répète chaque année.",
    ],
    ejemplo: [
      `Investir ${m(inicial)} et finir avec ${m(final)}, c’est un gain de ${m(final - inicial)}, soit un ROI de ${p(roi(inicial, final))}.`,
      `Si cela a pris 5 ans, le rendement annuel est de ${p(cagr(inicial, final, 5))}. Sur 2 ans, il serait de ${p(cagr(inicial, final, 2))}.`,
    ],
    faq: [
      {
        pregunta: "Quelle différence entre ROI et TCAC ?",
        respuesta: "Le ROI est le gain total par rapport à la mise, quelle que soit la durée. Le TCAC le ramène à l’année, pour comparer des placements de durées différentes.",
      },
      {
        pregunta: "Pourquoi le rendement annuel n’est-il pas le total divisé par le nombre d’années ?",
        respuesta: `Parce que les gains de chaque année s’ajoutent au capital et rapportent à leur tour. Un gain de 50 % sur 5 ans correspond à ${p(cagr(1, 1.5, 5))} par an en composé, pas à 10 %.`,
      },
      {
        pregunta: "Comment compter les dividendes ou intérêts perçus ?",
        respuesta: "Ajoutez-les dans les revenus perçus si vous les avez retirés. Si vous les avez réinvestis, ils sont déjà dans la valeur finale.",
      },
    ],
    glosario: [
      { termino: "ROI", definicion: "Retour sur investissement : le gain total en pourcentage de la mise." },
      { termino: "TCAC", definicion: "Taux de croissance annuel composé (CAGR en anglais) : le rendement moyen par an, intérêts composés compris." },
    ],
  };
};
