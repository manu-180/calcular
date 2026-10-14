import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DISTANCIAS_KM, KM_POR_MILLA, reloj, ritmoTexto } from "../definicion";

export const contenidoFr: ContenidoUniversal = (ctx) => {
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "mile" : "km";
  const corto = imperial ? "mi" : "km";
  const media = imperial ? DISTANCIAS_KM.media / KM_POR_MILLA : DISTANCIAS_KM.media;
  const ritmoMedia = imperial ? 9 * 60 : 5 * 60 + 30;
  return {
    h1: "Calcul d’allure de course",
    title: tituloQueEntre(`Calcul d’allure de course à pied (${ctx.nombrePais})`, `Calcul d’allure (${ctx.nombrePais})`, "Calcul d’allure de course"),
    description: `Calculez votre allure au ${u}, votre temps à l’arrivée ou votre distance pour un 5 km, un 10 km, un semi-marathon ou un marathon.`,
    intro: [
      "Avec deux des trois données (distance, temps et allure), vous obtenez la troisième. Pour préparer une course ou vérifier une sortie d’entraînement.",
      "Les distances du 5 km, du 10 km, du semi-marathon et du marathon sont déjà prévues.",
    ],
    comoSeCalcula: [
      `Allure = temps ÷ distance, en minutes et secondes par ${u}.`,
      "Temps = allure × distance.",
      "Distance = temps ÷ allure. La vitesse moyenne est la distance divisée par le nombre d’heures.",
    ],
    ejemplo: imperial
      ? [
          `3 miles en 27 minutes, c’est une allure de 9:00 par mile, soit ${formatearNumero(ctx, 20 / 3, 2)} mph.`,
          `Un semi-marathon (${formatearNumero(ctx, media, 2)} mi) à ${ritmoTexto(ritmoMedia)} par mile se boucle en ${reloj(ritmoMedia * media)}.`,
        ]
      : [
          "10 km en 50 minutes, c’est une allure de 5:00 par km, soit 12 km/h.",
          `Un semi-marathon (${formatearNumero(ctx, media, 1)} ${corto}) à ${ritmoTexto(ritmoMedia)} par km se boucle en ${reloj(ritmoMedia * media)}.`,
        ],
    faq: [
      {
        pregunta: `Comment calculer son allure au ${u} ?`,
        respuesta: imperial
          ? `Convertissez le temps en minutes et divisez par le nombre de miles. 3 miles en 28 minutes et 30 secondes donnent ${formatearNumero(ctx, 9.5, 1)} minutes par mile, soit 9:30.`
          : `Convertissez le temps en minutes et divisez par le nombre de kilomètres. 10 km en 55 minutes donnent ${formatearNumero(ctx, 5.5, 1)} minutes par km, soit 5:30.`,
      },
      {
        pregunta: "Quelle allure pour débuter ?",
        respuesta: "Une allure qui vous permet encore de parler en courant. Elle s’améliore à mesure que votre forme progresse.",
      },
      {
        pregunta: "Quelle est la distance d’un marathon ?",
        respuesta: `${formatearNumero(ctx, DISTANCIAS_KM.maraton, 3)} km (${formatearNumero(ctx, DISTANCIAS_KM.maraton / KM_POR_MILLA, 1)} miles). Le semi-marathon en fait la moitié.`,
      },
      {
        pregunta: "Comment passer d’une allure à une vitesse en km/h ?",
        respuesta: `Divisez 60 par l’allure en minutes. À 5:00 par km, vous courez à 12 km/h. À 6:00 par km, à 10 km/h.`,
      },
    ],
    glosario: [
      { termino: "Allure", definicion: "Le temps mis pour parcourir un kilomètre ou un mile." },
      { termino: "Vitesse moyenne", definicion: "La distance parcourue en une heure." },
      { termino: "Semi-marathon", definicion: `Une course de ${formatearNumero(ctx, DISTANCIAS_KM.media, 3)} km, la moitié d’un marathon.` },
    ],
  };
};
