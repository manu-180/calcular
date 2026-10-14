import { aDia, aFecha, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DURACION } from "../definicion";

export const contenidoFr: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const fum = "2026-01-10";
  const fpp = aFecha(aDia(fum) + DURACION);
  const fpp32 = aFecha(aDia(fum) + DURACION + 4);
  return {
    h1: "Calcul de la date d’accouchement",
    title: tituloQueEntre(`Calcul de la date d’accouchement (${ctx.nombrePais})`, "Calcul de la date d’accouchement", "Date d’accouchement"),
    description: "Estimez votre date d’accouchement à partir des dernières règles ou de la date de conception, et voyez où vous en êtes en semaines.",
    intro: [
      "Indiquez le premier jour de vos dernières règles (ou la date de conception, si vous la connaissez). Vous voyez la date prévue d’accouchement, l’avancement de la grossesse et le trimestre.",
      "C’est une estimation. Le suivi avec un professionnel de santé et l’échographie donnent la date la plus fiable.",
    ],
    comoSeCalcula: [
      "Le calcul suit la règle de Naegele : date des dernières règles plus 280 jours, soit 40 semaines.",
      "Si votre cycle est plus long ou plus court que 28 jours, la date se décale de la différence.",
      "À partir de la conception, il ajoute 266 jours, soit 38 semaines.",
      "Les semaines se comptent depuis les dernières règles : ce sont les semaines d’aménorrhée.",
    ],
    ejemplo: [
      `Avec des dernières règles le ${f(fum)} et un cycle de 28 jours, la date prévue est le ${f(fpp)}.`,
      `Avec un cycle de 32 jours, elle se décale de 4 jours, au ${f(fpp32)}.`,
    ],
    faq: [
      {
        pregunta: "Comment calculer la date d’accouchement ?",
        respuesta: "On ajoute 280 jours au premier jour des dernières règles. Une astuce donne presque la même date : ajoutez 7 jours, retirez 3 mois et ajoutez un an.",
      },
      {
        pregunta: "Quelle différence entre SA et SG ?",
        respuesta: "Les semaines d’aménorrhée (SA) se comptent depuis les dernières règles. Les semaines de grossesse (SG) se comptent depuis la conception, environ 2 semaines plus tard. 14 SA correspondent donc à 12 SG.",
      },
      {
        pregunta: "Pourquoi ma maternité annonce-t-elle une date plus tardive ?",
        respuesta: "En France, le terme est souvent fixé à 41 SA, soit une semaine après la règle de Naegele utilisée ici. Fiez-vous à la date donnée lors de votre suivi.",
      },
      {
        pregunta: "Combien de bébés naissent le jour prévu ?",
        respuesta: "Peu. La plupart naissent entre la 37e et la 42e semaine : la date est un repère, pas un jour exact.",
      },
    ],
    glosario: [
      { termino: "DDR", definicion: "Date des dernières règles : le premier jour des derniers saignements." },
      { termino: "SA", definicion: "Semaines d’aménorrhée, comptées depuis la DDR." },
      { termino: "Règle de Naegele", definicion: "Une méthode pour estimer la date d’accouchement en ajoutant 280 jours à la DDR." },
    ],
  };
};
