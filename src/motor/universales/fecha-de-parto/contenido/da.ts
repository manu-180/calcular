import { aDia, aFecha, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DURACION } from "../definicion";

export const contenidoDa: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const fum = "2026-01-10";
  const fpp = aFecha(aDia(fum) + DURACION);
  const fpp32 = aFecha(aDia(fum) + DURACION + 4);
  return {
    h1: "Terminsberegner: beregn din terminsdato",
    title: tituloQueEntre(
      `Terminsberegner: beregn din terminsdato | ${ctx.nombrePais}`,
      `Terminsberegner | ${ctx.nombrePais}`,
      "Terminsberegner",
    ),
    description: "Beregn din terminsdato ud fra sidste menstruation eller undfangelsen, og se, hvilken graviditetsuge du er i i dag.",
    intro: [
      "Skriv første dag i din sidste menstruation (eller datoen for undfangelse, hvis du kender den). Du ser terminsdatoen, hvor langt henne du er, og hvilket trimester du er i.",
      "Det er et skøn, og scanningen giver den mest sikre dato. Beregneren er vejledende og erstatter ikke en samtale med din læge eller jordemoder.",
    ],
    comoSeCalcula: [
      "Beregningen følger Naegeles regel: terminsdatoen er første dag i sidste menstruation plus 280 dage (40 uger).",
      "Er din cyklus længere eller kortere end 28 dage, flyttes datoen lige så mange dage.",
      "Fra undfangelsen lægges 266 dage til (38 uger).",
      "Graviditetsugerne tælles fra sidste menstruation, ikke fra undfangelsen.",
    ],
    ejemplo: [
      `Med sidste menstruation ${f(fum)} og en cyklus på 28 dage bliver terminsdatoen ${f(fpp)}.`,
      `Med en cyklus på 32 dage flyttes terminsdatoen 4 dage til ${f(fpp32)}.`,
    ],
    faq: [
      {
        pregunta: "Hvordan beregner man terminsdatoen?",
        respuesta: "Man lægger 280 dage til første dag i sidste menstruation. En hurtig tommelfingerregel giver næsten samme dato: læg 7 dage til, træk 3 måneder fra, og læg et år til.",
      },
      {
        pregunta: "Hvorfor tælles ugerne fra sidste menstruation?",
        respuesta: "Fordi det er en dato, næsten alle kender. Derfor er undfangelsen endnu ikke sket i uge 2.",
      },
      {
        pregunta: "Hvor mange børn bliver født på terminsdatoen?",
        respuesta: "Få. De fleste bliver født mellem uge 37 og 42, så datoen er en rettesnor snarere end en præcis dag.",
      },
    ],
    glosario: [
      { termino: "Terminsdato", definicion: "Den beregnede fødselsdato, hvor graviditeten når 40 uger." },
      { termino: "Sidste menstruation", definicion: "Første blødningsdag i den seneste menstruation." },
      { termino: "Naegeles regel", definicion: "En måde at beregne terminsdatoen på ved at lægge 280 dage til sidste menstruation." },
    ],
  };
};
