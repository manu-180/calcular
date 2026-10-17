import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aDia, fechaLarga, habilesEntre } from "../../comun/fechas";

export const contenidoFr: ContenidoUniversal = (ctx) => {
  const desde = "2026-03-02";
  const hasta = "2026-06-30";
  const dias = aDia(hasta) - aDia(desde);
  const habiles = habilesEntre(aDia(desde), aDia(hasta));
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  return {
    h1: "Nombre de jours entre deux dates",
    title: tituloQueEntre(`Nombre de jours entre deux dates (${ctx.nombrePais})`, "Nombre de jours entre deux dates", "Jours entre deux dates"),
    description: "Comptez les jours entre deux dates : jours calendaires, semaines, mois et jours ouvrés du lundi au vendredi.",
    intro: [
      "Choisissez une date de début et une date de fin. Vous obtenez les jours calendaires, la même durée en semaines et en mois, et les jours ouvrés.",
      "Pratique pour un délai, une échéance, des vacances, une grossesse ou un compte à rebours.",
    ],
    comoSeCalcula: [
      "Les jours calendaires sont tous les jours entre les deux dates. Le premier jour compte, le dernier non, sauf si vous cochez l’option.",
      "Les jours ouvrés sont les lundis à vendredis de cette même période. Les jours fériés ne sont pas retirés.",
      "Les années bissextiles comptent avec leur 29 février.",
    ],
    ejemplo: [
      `Du ${f(desde)} au ${f(hasta)}, il y a ${formatearNumero(ctx, dias)} jours calendaires.`,
      `Parmi eux, ${formatearNumero(ctx, habiles)} tombent du lundi au vendredi.`,
    ],
    faq: [
      {
        pregunta: "Le premier et le dernier jour sont-ils comptés ?",
        respuesta: "Par défaut, le premier jour compte et le dernier non, comme quand on soustrait deux dates. Si les deux doivent compter, cochez « Compter aussi le dernier jour ».",
      },
      {
        pregunta: "Quelle différence entre jours ouvrés et jours ouvrables ?",
        respuesta: ctx.locale.endsWith("-CA")
          ? "Au Canada, on dit souvent jours ouvrables pour parler du lundi au vendredi. C’est ce que compte ce calculateur, sous le nom de jours ouvrés."
          : "Les jours ouvrés vont du lundi au vendredi. Les jours ouvrables vont du lundi au samedi. Ce calculateur compte les jours ouvrés.",
      },
      {
        pregunta: "Les jours fériés sont-ils retirés ?",
        respuesta: "Non. Ils changent selon le pays, la région et l’année. Retirez-les à part si votre délai en tient compte.",
      },
      {
        pregunta: "Combien de jours compte une année ?",
        respuesta: "365, ou 366 les années bissextiles. C’est pour cela que les mêmes dates, sur des années différentes, peuvent donner un écart différent.",
      },
    ],
    glosario: [
      { termino: "Jours calendaires", definicion: "Tous les jours du calendrier, week-ends et jours fériés compris." },
      { termino: "Jours ouvrés", definicion: "Les jours travaillés dans l’entreprise, en général du lundi au vendredi." },
      { termino: "Jours ouvrables", definicion: "Tous les jours sauf le dimanche et les jours fériés, soit du lundi au samedi." },
    ],
  };
};
