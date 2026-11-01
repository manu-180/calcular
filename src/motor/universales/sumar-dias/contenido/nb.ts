import { aDia, aFecha, esHabil, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoNb: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const inicio = "2026-03-02";
  const mas90 = aFecha(aDia(inicio) + 90);
  let habil = aDia(inicio);
  for (let n = 0; n < 15; ) if (esHabil(++habil)) n++;
  return {
    h1: "Legg til dager på en dato",
    title: tituloQueEntre(
      `Legg til dager: regn ut dato fram eller tilbake | ${ctx.nombrePais}`,
      `Legg til dager på en dato | ${ctx.nombrePais}`,
      "Legg til dager på en dato",
    ),
    description: "Legg til eller trekk fra kalenderdager eller virkedager fra en dato og se hvilken dag det blir. Nyttig for frister og forfallsdatoer.",
    intro: [
      "Velg en dato, et antall dager og om du vil legge til eller trekke fra. Du ser den nye datoen og ukedagen.",
      "Med virkedager hopper kalkulatoren over lørdager og søndager.",
    ],
    comoSeCalcula: [
      "Med kalenderdager flyttes datoen én dag i kalenderen for hver dag du fyller inn.",
      "Med virkedager telles bare mandag til fredag. Selve startdatoen telles ikke.",
      "Helligdager trekkes ikke fra, fordi de varierer mellom land og regioner.",
    ],
    ejemplo: [
      `Legger du 90 kalenderdager til ${f(inicio)}, blir det ${f(mas90)}.`,
      `Legger du 15 virkedager til ${f(inicio)}, blir det ${f(aFecha(habil))}.`,
    ],
    faq: [
      {
        pregunta: "Telles startdatoen som dag én?",
        respuesta: "Nei. Legger du til 1 dag på en mandag, blir det tirsdag. Slik regnes de fleste frister.",
      },
      {
        pregunta: "Hva skjer hvis jeg legger til virkedager fra en lørdag?",
        respuesta: "Den første virkedagen er mandagen etter. Legger du til 1 virkedag på en lørdag, blir det mandag.",
      },
      {
        pregunta: "Tar kalkulatoren hensyn til skuddår?",
        respuesta: "Ja. Går perioden over 29. februar, telles den som en dag til.",
      },
    ],
    glosario: [
      { termino: "Kalenderdager", definicion: "Alle dagene i kalenderen, uten at noen hoppes over." },
      { termino: "Virkedager", definicion: "I denne kalkulatoren mandag til fredag." },
    ],
  };
};
