import { aDia, aFecha, esHabil, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoDa: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const inicio = "2026-03-02";
  const mas90 = aFecha(aDia(inicio) + 90);
  let habil = aDia(inicio);
  for (let n = 0; n < 15; ) if (esHabil(++habil)) n++;
  return {
    h1: "Læg dage til en dato",
    title: tituloQueEntre(
      `Læg dage til en dato: regn frem eller tilbage | ${ctx.nombrePais}`,
      `Læg dage til en dato | ${ctx.nombrePais}`,
      "Læg dage til en dato",
    ),
    description: "Læg kalenderdage eller hverdage til en dato, eller træk dem fra, og se hvilken dag det bliver. Praktisk til frister og forfaldsdatoer.",
    intro: [
      "Vælg en dato, et antal dage, og om du vil lægge til eller trække fra. Du ser den nye dato og ugedagen.",
      "Med hverdage springer beregneren lørdage og søndage over.",
    ],
    comoSeCalcula: [
      "Med kalenderdage rykker datoen én dag i kalenderen for hver dag, du skriver.",
      "Med hverdage tæller kun mandag til fredag. Selve startdatoen tæller ikke med.",
      "Helligdage trækkes ikke fra, fordi de varierer mellem lande og regioner.",
    ],
    ejemplo: [
      `Lægger du 90 kalenderdage til ${f(inicio)}, bliver det ${f(mas90)}.`,
      `Lægger du 15 hverdage til ${f(inicio)}, bliver det ${f(aFecha(habil))}.`,
    ],
    faq: [
      {
        pregunta: "Tæller startdatoen som dag ét?",
        respuesta: "Nej. Lægger du 1 dag til en mandag, bliver det tirsdag. Sådan regnes de fleste frister.",
      },
      {
        pregunta: "Hvad sker der, hvis jeg lægger hverdage til fra en lørdag?",
        respuesta: "Den første hverdag er mandagen efter. Lægger du 1 hverdag til en lørdag, bliver det mandag.",
      },
      {
        pregunta: "Tager beregneren højde for skudår?",
        respuesta: "Ja. Går perioden hen over den 29. februar, tæller den som en dag mere.",
      },
    ],
    glosario: [
      { termino: "Kalenderdage", definicion: "Alle dage i kalenderen, uden at nogen springes over." },
      { termino: "Hverdage", definicion: "I denne beregner mandag til fredag." },
    ],
  };
};
