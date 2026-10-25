import { aDia, fechaLarga, mesesYDias } from "../../comun/fechas";
import { duracionNb } from "../../dias-entre-fechas/textos/nb";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoNb: ContenidoUniversal = (ctx) => {
  const nac = "1990-05-15";
  const ref = "2026-10-13";
  const { meses, dias } = mesesYDias(nac, ref);
  const total = aDia(ref) - aDia(nac);
  return {
    h1: "Alderskalkulator",
    title: tituloQueEntre(
      `Alderskalkulator: nøyaktig alder i år, måneder og dager | ${ctx.nombrePais}`,
      `Alderskalkulator | ${ctx.nombrePais}`,
      "Alderskalkulator",
    ),
    description: "Regn ut den nøyaktige alderen din i år, måneder og dager, hvor mange dager du har levd og hvor lenge det er til neste bursdag.",
    intro: [
      "Fyll inn fødselsdatoen din, så ser du den nøyaktige alderen din i dag, også i måneder, uker og dager.",
      "Endre den andre datoen for å se hvor gammel noen var en bestemt dag, eller hvor gammel personen kommer til å bli.",
    ],
    comoSeCalcula: [
      "Vi teller hele måneder fra fødselen til datoen du har valgt. Hver 12. måned blir et år.",
      "Dagene som blir til overs etter den siste hele måneden, er dagene i alderen.",
      "Skuddår telles med sine 366 dager.",
    ],
    ejemplo: [
      `Den som er født ${fechaLarga(ctx.locale, nac)}, var ${duracionNb(Math.floor(meses / 12), meses % 12, dias)} gammel ${fechaLarga(ctx.locale, ref)}.`,
      `Det er ${formatearNumero(ctx, total)} dager.`,
    ],
    faq: [
      {
        pregunta: "Hvordan regnes nøyaktig alder ut?",
        respuesta: "Først telles hele år, så hele måneder siden forrige bursdag og til slutt dagene som blir til overs.",
      },
      {
        pregunta: "Hva gjelder for den som er født 29. februar?",
        respuesta: "I år som ikke er skuddår, regner denne kalkulatoren med 28. februar som bursdag. I noen lover gjelder 1. mars i stedet.",
      },
      {
        pregunta: "Hvor mange dager gammel er jeg?",
        respuesta: "Se på raden «I dager». Den teller hver dag fra du ble født til datoen du har valgt, uten å ta med den siste dagen.",
      },
    ],
    glosario: [
      { termino: "Alder", definicion: "Antall hele år siden fødselen." },
      { termino: "Skuddår", definicion: "Et år med 366 dager og en 29. februar. Det kommer hvert fjerde år, unntatt enkelte hundreårsskifter." },
    ],
  };
};
