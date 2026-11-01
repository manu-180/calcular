import { aDia, aFecha, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { FASE_LUTEA, ventana } from "../definicion";

export const contenidoSv: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const fum = "2026-03-05";
  const v = ventana(aDia(fum), 28);
  return {
    h1: "Ägglossningskalkylator",
    title: tituloQueEntre(
      `Ägglossningskalkylator: dina fertila dagar | ${ctx.nombrePais}`,
      `Ägglossningskalkylator | ${ctx.nombrePais}`,
      "Ägglossningskalkylator",
    ),
    description: "Räkna ut när du har ägglossning, vilka dagar du är fertil och när nästa mens väntas, med de tre kommande cyklerna.",
    intro: [
      "Fyll i första dagen i senaste mensen och hur lång din cykel är. Du ser ungefärlig ägglossning, dina fertila dagar och nästa mens.",
      "Det är en uppskattning för regelbundna cykler. Det är inget preventivmedel och ersätter inte en bedömning av barnmorska, läkare eller annan vårdpersonal.",
    ],
    comoSeCalcula: [
      `Ägglossningen sker oftast ${FASE_LUTEA} dagar före nästa mens: första dagen i senaste mensen + cykelns längd − ${FASE_LUTEA}.`,
      "De fertila dagarna räknas från 5 dagar före ägglossningen till dagen efter, eftersom spermier kan leva upp till 5 dagar.",
      "Nästa mens väntas en cykel efter den senaste.",
    ],
    ejemplo: [
      `Med senaste mens ${f(fum)} och en cykel på 28 dagar blir ungefärlig ägglossning ${f(aFecha(v.ovulacion))}.`,
      `De fertila dagarna är ${f(aFecha(v.desde))} till ${f(aFecha(v.hasta))}, och nästa mens väntas ${f(aFecha(v.proxima))}.`,
    ],
    faq: [
      {
        pregunta: "Vilka dagar är man mest fertil?",
        respuesta: "De två eller tre dagarna före ägglossningen och själva ägglossningsdagen. Hela det fertila fönstret är ungefär 6 dagar.",
      },
      {
        pregunta: "Fungerar det om min cykel är oregelbunden?",
        respuesta: "Du får en fingervisning, men mindre exakt. Med oregelbundna cykler kan ägglossningen flytta sig flera dagar från månad till månad.",
      },
      {
        pregunta: "Kan jag använda det för att undvika graviditet?",
        respuesta: "Nej. Uppskattningen är ungefärlig och ägglossningen kan komma tidigare eller senare. För att skydda dig mot graviditet behöver du ett preventivmedel.",
      },
    ],
    glosario: [
      { termino: "Ägglossning", definicion: "När en äggstock släpper ett ägg." },
      { termino: "Fertila dagar", definicion: "De dagar i cykeln då det går att bli gravid." },
    ],
  };
};
