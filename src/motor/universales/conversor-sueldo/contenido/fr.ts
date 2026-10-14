import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoFr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const n = (x: number, d = 0) => formatearNumero(ctx, x, d);
  const horas = ctx.pais === "FR" ? 35 : 40;
  const horasAnio = horas * 52;
  const anual = montoEjemplo(ctx, 50000);
  const hora = montoEjemplo(ctx, 20);
  return {
    h1: "Convertir un salaire horaire, mensuel ou annuel",
    title: tituloQueEntre(`Salaire horaire, mensuel et annuel (${ctx.nombrePais})`, "Salaire horaire, mensuel et annuel", "Convertir un salaire"),
    description: "Convertissez votre salaire entre l’heure, le jour, la semaine, la quinzaine, le mois et l’année, avec vos heures et vos semaines payées.",
    intro: [
      "Combien vaut votre salaire à l’heure ? Que donne une offre au taux horaire sur une année ? Saisissez un montant, choisissez la période : vous voyez toutes les autres.",
      "Pratique pour comparer des offres d’emploi, chiffrer des heures supplémentaires ou savoir ce que vaut votre temps.",
    ],
    comoSeCalcula: [
      "Tout est d’abord ramené à un montant annuel.",
      "Par heure = annuel ÷ (heures par semaine × semaines payées).",
      "Par jour = annuel ÷ (jours par semaine × semaines payées). Par semaine = annuel ÷ semaines payées.",
      "Par mois = annuel ÷ 12. Par quinzaine = annuel ÷ 24.",
    ],
    ejemplo: [
      `Un salaire de ${m(anual)} par an à ${horas} heures par semaine fait ${m(anual / horasAnio)} de l’heure et ${m(anual / 12)} par mois.`,
      `Une offre à ${m(hora)} de l’heure à temps plein donne ${m((hora * horasAnio) / 12)} par mois et ${m(hora * horasAnio)} par an.`,
    ],
    faq: [
      {
        pregunta: "Combien d’heures travaille-t-on par mois ?",
        respuesta: ctx.pais === "FR"
          ? `À 35 heures par semaine, ${n((35 * 52) / 12, 2)} heures par mois en moyenne (35 × 52 ÷ 12). C’est la base de la plupart des fiches de paie à temps plein.`
          : `À ${horas} heures par semaine, ${n((horas * 52) / 12, 2)} heures par mois en moyenne (${horas} × 52 ÷ 12).`,
      },
      {
        pregunta: "Pourquoi le salaire hebdomadaire × 4 ne donne-t-il pas le mensuel ?",
        respuesta: `Parce qu’un mois compte en moyenne ${n(52 / 12, 2)} semaines, pas 4. Pour passer de la semaine au mois, multipliez par 52 puis divisez par 12.`,
      },
      {
        pregunta: "Le calcul passe-t-il du brut au net ?",
        respuesta: "Non. Il convertit le même montant d’une période à l’autre. Saisissez du brut pour obtenir du brut, du net pour obtenir du net. Les primes s’ajoutent à part.",
      },
    ],
    glosario: [
      { termino: "Salaire brut", definicion: "Le salaire avant cotisations et impôt." },
      { termino: "Salaire net", definicion: "Ce qui reste après les cotisations salariales." },
    ],
  };
};
