import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aEfectiva, aNominal } from "../definicion";

export const contenidoFr: ContenidoUniversal = (ctx) => {
  const p = (n: number) => `${formatearNumero(ctx, n, 2)} %`;
  return {
    h1: "Convertir un taux nominal en taux effectif",
    title: tituloQueEntre(`Taux nominal et taux effectif annuel (${ctx.nombrePais})`, "Taux nominal et taux effectif annuel", "Taux nominal et effectif"),
    description: "Convertissez un taux nominal annuel en taux effectif annuel, et inversement, avec une capitalisation mensuelle, trimestrielle, semestrielle ou quotidienne.",
    intro: [
      "Deux offres au même taux peuvent coûter ou rapporter des montants différents. La différence vient de la fréquence à laquelle les intérêts sont comptés.",
      "Le taux effectif annuel met tout au même niveau : c’est ce que vous payez ou gagnez vraiment sur un an. Choisissez le taux que vous avez, le calcul vous donne l’autre.",
    ],
    comoSeCalcula: [
      "Taux effectif = (1 + taux nominal ÷ m) puissance m, moins 1. Ici, m est le nombre de capitalisations par an : 12 en mensuel, 4 en trimestriel.",
      "Taux nominal = m × ((1 + taux effectif) puissance 1 ÷ m, moins 1).",
      "Le taux par période est le taux nominal divisé par m.",
    ],
    ejemplo: [
      `Un taux nominal de 12 % capitalisé chaque mois correspond à un taux effectif de ${p(aEfectiva(12, 12))}.`,
      `Un taux effectif de 10 % correspond à un taux nominal de ${p(aNominal(10, 12))} quand les intérêts sont capitalisés chaque mois.`,
    ],
    faq: [
      {
        pregunta: "Quelle différence entre taux nominal et taux effectif ?",
        respuesta: "Le taux nominal est le taux annuel avant capitalisation. Le taux effectif tient compte des intérêts qui produisent des intérêts. Il est donc toujours égal ou supérieur au taux nominal.",
      },
      {
        pregunta: "Lequel utiliser pour comparer des offres ?",
        respuesta: "Pour l’épargne, le taux effectif (on parle aussi de taux actuariel), car il montre ce que vous gagnez vraiment. Pour un crédit, comparez le TAEG, qui ajoute les frais et l’assurance.",
      },
      {
        pregunta: "Pourquoi une capitalisation plus fréquente augmente-t-elle le taux effectif ?",
        respuesta: "Les intérêts s’ajoutent plus tôt au capital et commencent à produire leurs propres intérêts. Avec une capitalisation annuelle, les deux taux sont identiques.",
      },
    ],
    glosario: [
      { termino: "Taux nominal", definicion: "Le taux annuel affiché, avant capitalisation." },
      { termino: "Taux effectif annuel", definicion: "Le taux réel sur un an, capitalisation comprise." },
      { termino: "Capitalisation", definicion: "Le moment où les intérêts s’ajoutent au capital." },
    ],
  };
};
