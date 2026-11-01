import { aDia, fechaLarga, mesesYDias } from "../../comun/fechas";
import { duracionDa } from "../../dias-entre-fechas/textos/da";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoDa: ContenidoUniversal = (ctx) => {
  const nac = "1990-05-15";
  const ref = "2026-10-13";
  const { meses, dias } = mesesYDias(nac, ref);
  const total = aDia(ref) - aDia(nac);
  return {
    h1: "Aldersberegner",
    title: tituloQueEntre(
      `Aldersberegner: præcis alder i år, måneder og dage | ${ctx.nombrePais}`,
      `Aldersberegner | ${ctx.nombrePais}`,
      "Aldersberegner",
    ),
    description: "Beregn din præcise alder i år, måneder og dage, hvor mange dage du har levet, og hvor længe der er til næste fødselsdag.",
    intro: [
      "Skriv din fødselsdato, så ser du din præcise alder i dag, også i måneder, uger og dage.",
      "Skift den anden dato for at se, hvor gammel en person var på en bestemt dag, eller hvor gammel personen bliver.",
    ],
    comoSeCalcula: [
      "Vi tæller hele måneder fra fødslen til den valgte dato. Hver 12. måned bliver til et år.",
      "De dage, der er tilbage efter den sidste hele måned, er dagene i alderen.",
      "Skudår tælles med deres 366 dage.",
    ],
    ejemplo: [
      `En person, der er født ${fechaLarga(ctx.locale, nac)}, var ${duracionDa(Math.floor(meses / 12), meses % 12, dias)} gammel den ${fechaLarga(ctx.locale, ref)}.`,
      `Det svarer til ${formatearNumero(ctx, total)} dage.`,
    ],
    faq: [
      {
        pregunta: "Hvordan regnes den præcise alder ud?",
        respuesta: "Først tælles hele år, så hele måneder siden den seneste fødselsdag og til sidst de dage, der er tilbage.",
      },
      {
        pregunta: "Hvad gælder for en person, der er født den 29. februar?",
        respuesta: "I år, der ikke er skudår, regner denne beregner med den 28. februar som fødselsdag. Nogle regler bruger i stedet den 1. marts.",
      },
      {
        pregunta: "Hvor mange dage gammel er jeg?",
        respuesta: "Se rækken «I dage». Den tæller hver dag fra din fødsel til den valgte dato, uden at tælle den sidste dag med.",
      },
    ],
    glosario: [
      { termino: "Alder", definicion: "Antallet af hele år siden fødslen." },
      { termino: "Skudår", definicion: "Et år med 366 dage og en 29. februar. Det kommer hvert fjerde år, bortset fra visse århundredskifter." },
    ],
  };
};
