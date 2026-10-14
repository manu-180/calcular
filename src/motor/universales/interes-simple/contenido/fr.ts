import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoFr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const capital = montoEjemplo(ctx, 1000);
  return {
    h1: "Calcul des intérêts simples",
    title: tituloQueEntre(`Calcul des intérêts simples (${ctx.nombrePais})`, "Calcul des intérêts simples", "Intérêts simples"),
    description: "Calculez les intérêts simples d’un capital à un taux annuel, sur des jours, des mois ou des années. Choisissez une année de 365 ou 360 jours.",
    intro: [
      "Les intérêts simples se calculent toujours sur le capital de départ : ils ne s’ajoutent pas au capital pendant la durée du placement.",
      "On les utilise pour les placements courts, les prêts entre particuliers et beaucoup d’exercices de maths.",
    ],
    comoSeCalcula: [
      "Intérêts = capital × taux annuel × durée en années.",
      "Pour des mois, divisez par 12. Pour des jours, divisez par 365 ou 360, selon l’année retenue par la banque.",
      "Total = capital + intérêts.",
    ],
    ejemplo: [
      `${m(capital)} placés à 10 % par an pendant 6 mois rapportent ${m(capital * 0.1 * 0.5)} d’intérêts.`,
      `Le même capital sur 90 jours rapporte ${m((capital * 0.1 * 90) / 365)} sur une année de 365 jours et ${m((capital * 0.1 * 90) / 360)} sur une année de 360 jours.`,
    ],
    faq: [
      {
        pregunta: "Quelle est la formule des intérêts simples ?",
        respuesta: `I = C × t × n. C est le capital, t le taux annuel en décimal (10 % s’écrit ${formatearNumero(ctx, 0.1, 2)}) et n la durée en années.`,
      },
      {
        pregunta: "Quelle différence avec les intérêts composés ?",
        respuesta: "Les intérêts simples se calculent toujours sur le même capital. Avec les intérêts composés, les intérêts s’ajoutent au capital et produisent eux aussi des intérêts.",
      },
      {
        pregunta: "Pourquoi certaines banques comptent-elles 360 jours ?",
        respuesta: "C’est une convention bancaire qui simplifie les calculs. Sur 360 jours, les intérêts sont un peu plus élevés. Vérifiez celle qu’utilise votre banque.",
      },
    ],
    glosario: [
      { termino: "Capital", definicion: "La somme prêtée ou placée." },
      { termino: "Année commerciale", definicion: "Une année comptée sur 360 jours, avec des mois de 30 jours." },
    ],
  };
};
