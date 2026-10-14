import { aDia, aFecha, esHabil, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoFr: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const inicio = "2026-03-02";
  const mas90 = aFecha(aDia(inicio) + 90);
  let habil = aDia(inicio);
  for (let n = 0; n < 15; ) if (esHabil(++habil)) n++;
  return {
    h1: "Ajouter des jours à une date",
    title: tituloQueEntre(`Ajouter des jours à une date (${ctx.nombrePais})`, "Ajouter des jours à une date", "Ajouter des jours"),
    description: "Ajoutez ou retirez des jours calendaires ou des jours ouvrés à une date et voyez sur quel jour vous tombez. Pratique pour un délai ou une échéance.",
    intro: [
      "Choisissez une date, un nombre de jours et l’opération. Vous obtenez la date d’arrivée et le jour de la semaine.",
      "En jours ouvrés, le calcul saute les samedis et les dimanches.",
    ],
    comoSeCalcula: [
      "En jours calendaires, le calcul avance d’un jour sur le calendrier pour chaque jour saisi.",
      "En jours ouvrés, seuls les jours du lundi au vendredi comptent. La date de départ ne compte pas.",
      "Les jours fériés ne sont pas retirés, car ils changent selon le pays et la région.",
    ],
    ejemplo: [
      `Le ${f(inicio)} plus 90 jours calendaires, cela donne le ${f(mas90)}.`,
      `Le ${f(inicio)} plus 15 jours ouvrés, cela donne le ${f(aFecha(habil))}.`,
    ],
    faq: [
      {
        pregunta: "La date de départ compte-t-elle comme premier jour ?",
        respuesta: "Non. Un lundi plus 1 jour donne mardi. C’est ainsi que se comptent la plupart des délais.",
      },
      {
        pregunta: "Et si j’ajoute des jours ouvrés à partir d’un samedi ?",
        respuesta: "Le premier jour ouvré est le lundi suivant. Un samedi plus 1 jour ouvré donne lundi.",
      },
      {
        pregunta: "Les années bissextiles sont-elles prises en compte ?",
        respuesta: "Oui. Si la période passe par un 29 février, il compte comme un jour de plus.",
      },
    ],
    glosario: [
      { termino: "Jours calendaires", definicion: "Tous les jours du calendrier, sans en sauter aucun." },
      { termino: "Jours ouvrés", definicion: "Dans ce calculateur, du lundi au vendredi." },
    ],
  };
};
