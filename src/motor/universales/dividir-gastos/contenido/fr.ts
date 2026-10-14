import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoFr: ContenidoUniversal = (ctx) => {
  const a = montoEjemplo(ctx, 90);
  const b = montoEjemplo(ctx, 30);
  const cuota = (a + b) / 3;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Partage des dépenses entre amis",
    title: tituloQueEntre(`Partage des dépenses entre amis (${ctx.nombrePais})`, `Partage des dépenses (${ctx.nombrePais})`, "Partage des dépenses"),
    description: "Partagez une dépense commune entre 8 personnes au plus : la part de chacun et qui rembourse qui, avec le moins de virements possible.",
    intro: [
      "Pratique pour un voyage, un dîner, une fête ou une location à plusieurs, quand chacun a avancé un montant différent.",
      "Indiquez ce que chaque personne a payé. Vous obtenez la part de chacun et les virements pour que tout le monde soit quitte.",
    ],
    comoSeCalcula: [
      "Part de chacun = total dépensé ÷ nombre de personnes.",
      "Qui a payé moins que sa part doit la différence. Qui a payé plus la récupère.",
      "Les virements vont de la plus grosse dette vers le plus gros crédit : personne ne fait de virement en trop.",
    ],
    ejemplo: [
      `Léa a payé ${m(a)}, Hugo ${m(b)} et Inès rien du tout. Le total est de ${m(a + b)}, donc la part de chacun est de ${m(cuota)}.`,
      `Inès verse ${m(cuota)} à Léa et Hugo verse ${m(cuota - b)} à Léa.`,
    ],
    faq: [
      {
        pregunta: "Comment partager une dépense quand chacun a payé un montant différent ?",
        respuesta: "Additionnez tout, divisez par le nombre de personnes et comparez avec ce que chacun a payé. La différence est ce que chacun doit ou doit recevoir.",
      },
      {
        pregunta: "Et si quelqu’un n’a rien payé ?",
        respuesta: "Mettez 0 pour cette personne : elle compte dans le partage. Si vous laissez la case vide, elle n’est pas prise en compte.",
      },
      {
        pregunta: "Pourquoi y a-t-il moins de virements que de personnes ?",
        respuesta: "Les dettes sont regroupées : celui qui doit le plus rembourse celui qui a le plus avancé, et ainsi de suite. Il ne faut jamais plus de virements que de personnes moins une.",
      },
    ],
    glosario: [
      { termino: "Part", definicion: "Ce que chaque personne doit payer sur le total." },
      { termino: "Solde", definicion: "La différence entre ce qu’une personne a payé et sa part." },
    ],
  };
};
