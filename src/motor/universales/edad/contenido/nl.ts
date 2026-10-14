import { aDia, fechaLarga, mesesYDias } from "../../comun/fechas";
import { duracionNl } from "../../dias-entre-fechas/textos/nl";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoNl: ContenidoUniversal = (ctx) => {
  const nac = "1990-05-15";
  const ref = "2026-10-13";
  const { meses, dias } = mesesYDias(nac, ref);
  const total = aDia(ref) - aDia(nac);
  return {
    h1: "Leeftijd berekenen",
    title: tituloQueEntre(`Leeftijd berekenen in ${ctx.nombrePais}`, "Leeftijd berekenen"),
    description: "Bereken je precieze leeftijd in jaren, maanden en dagen, hoeveel dagen je al leeft en hoelang het nog duurt tot je volgende verjaardag.",
    intro: [
      "Vul je geboortedatum in en je ziet je precieze leeftijd van vandaag, ook in maanden, weken en dagen.",
      "Pas de tweede datum aan om te zien hoe oud iemand op een bepaalde dag was of wordt.",
    ],
    comoSeCalcula: [
      "De rekenhulp telt de hele maanden van de geboorte tot de gekozen datum. Elke 12 maanden is één jaar.",
      "De dagen die na de laatste hele maand overblijven, zijn de dagen van de leeftijd.",
      "Schrikkeljaren tellen mee met hun 366 dagen.",
    ],
    ejemplo: [
      `Wie op ${fechaLarga(ctx.locale, nac)} geboren is, was op ${fechaLarga(ctx.locale, ref)} ${duracionNl(Math.floor(meses / 12), meses % 12, dias)} oud.`,
      `Dat zijn ${formatearNumero(ctx, total)} dagen.`,
    ],
    faq: [
      {
        pregunta: "Hoe bereken je je precieze leeftijd?",
        respuesta: "Eerst tel je de hele jaren, dan de hele maanden sinds je laatste verjaardag en tot slot de dagen die overblijven.",
      },
      {
        pregunta: "En als je op 29 februari jarig bent?",
        respuesta: "In een jaar zonder 29 februari neemt deze rekenhulp 28 februari als verjaardag. Sommige wetten gaan uit van 1 maart.",
      },
      {
        pregunta: "Hoeveel dagen ben ik oud?",
        respuesta: "Kijk bij “In dagen”. Daar staat elke dag van je geboorte tot de gekozen datum, zonder die laatste dag.",
      },
    ],
    glosario: [
      { termino: "Leeftijd", definicion: "Het aantal hele jaren sinds de geboorte." },
      { termino: "Schrikkeljaar", definicion: "Een jaar van 366 dagen, met een 29 februari. Het komt elke vier jaar, op een paar eeuwjaren na." },
    ],
  };
};
