import { aDia, fechaLarga, mesesYDias } from "../../comun/fechas";
import { duracionFr } from "../../dias-entre-fechas/textos/fr";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoFr: ContenidoUniversal = (ctx) => {
  const nac = "1990-05-15";
  const ref = "2026-10-13";
  const { meses, dias } = mesesYDias(nac, ref);
  const total = aDia(ref) - aDia(nac);
  return {
    h1: "Calcul de l’âge exact",
    title: tituloQueEntre(`Calcul de l’âge exact (${ctx.nombrePais})`, "Calcul de l’âge exact", "Calcul de l’âge"),
    description: "Calculez votre âge exact en années, mois et jours, le nombre de jours que vous avez vécus et le temps avant votre prochain anniversaire.",
    intro: [
      "Saisissez votre date de naissance : vous voyez votre âge exact aujourd’hui, aussi en mois, en semaines et en jours.",
      "Changez la deuxième date pour connaître l’âge d’une personne à un jour donné, ou l’âge qu’elle aura.",
    ],
    comoSeCalcula: [
      "Le calcul compte les mois entiers depuis la naissance jusqu’à la date choisie. Chaque groupe de 12 mois fait une année.",
      "Les jours qui restent après le dernier mois entier sont les jours de l’âge.",
      "Les années bissextiles comptent avec leurs 366 jours.",
    ],
    ejemplo: [
      `Une personne née le ${fechaLarga(ctx.locale, nac)} avait ${duracionFr(Math.floor(meses / 12), meses % 12, dias)} le ${fechaLarga(ctx.locale, ref)}.`,
      `Cela fait ${formatearNumero(ctx, total)} jours.`,
    ],
    faq: [
      {
        pregunta: "Comment calcule-t-on l’âge exact ?",
        respuesta: "On compte les années pleines, puis les mois entiers depuis le dernier anniversaire, puis les jours qui restent.",
      },
      {
        pregunta: "Et pour une personne née un 29 février ?",
        respuesta: "Les années non bissextiles, ce calculateur prend le 28 février comme jour d’anniversaire. Certaines règles retiennent plutôt le 1er mars.",
      },
      {
        pregunta: "Combien de jours ai-je vécu ?",
        respuesta: "Regardez la ligne « En jours ». Elle compte chaque jour depuis votre naissance jusqu’à la date choisie, sans compter ce dernier jour.",
      },
    ],
    glosario: [
      { termino: "Âge", definicion: "Le nombre d’années pleines depuis la naissance." },
      { termino: "Année bissextile", definicion: "Une année de 366 jours, avec un 29 février. Elle revient tous les quatre ans, sauf certaines années de fin de siècle." },
    ],
  };
};
