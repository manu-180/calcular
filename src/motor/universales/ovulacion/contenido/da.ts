import { aDia, aFecha, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { FASE_LUTEA, ventana } from "../definicion";

export const contenidoDa: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const fum = "2026-03-05";
  const v = ventana(aDia(fum), 28);
  return {
    h1: "Ægløsningsberegner",
    title: tituloQueEntre(
      `Ægløsningsberegner: find dine fertile dage | ${ctx.nombrePais}`,
      `Ægløsningsberegner | ${ctx.nombrePais}`,
      "Ægløsningsberegner",
    ),
    description: "Beregn, hvornår du har ægløsning, hvilke dage du er fertil, og hvornår næste menstruation kommer, med de tre næste cyklusser.",
    intro: [
      "Skriv første dag i din sidste menstruation, og hvor lang din cyklus er. Du ser den omtrentlige ægløsning, dine fertile dage og næste menstruation.",
      "Det er et skøn for regelmæssige cyklusser og ikke en prævention. Beregneren er vejledende og erstatter ikke en samtale med din læge eller jordemoder.",
    ],
    comoSeCalcula: [
      `Ægløsningen sker oftest ${FASE_LUTEA} dage før næste menstruation: første dag i sidste menstruation + cyklussens længde − ${FASE_LUTEA}.`,
      "De fertile dage regnes fra 5 dage før ægløsningen til dagen efter, fordi sædceller kan leve i op til 5 dage.",
      "Næste menstruation ventes en cyklus efter den sidste.",
    ],
    ejemplo: [
      `Med sidste menstruation ${f(fum)} og en cyklus på 28 dage er den omtrentlige ægløsning ${f(aFecha(v.ovulacion))}.`,
      `De fertile dage er ${f(aFecha(v.desde))} til ${f(aFecha(v.hasta))}, og næste menstruation ventes ${f(aFecha(v.proxima))}.`,
    ],
    faq: [
      {
        pregunta: "Hvilke dage er man mest fertil?",
        respuesta: "De to eller tre dage før ægløsningen og selve ægløsningsdagen. Hele det fertile vindue er omkring 6 dage.",
      },
      {
        pregunta: "Virker det, hvis min cyklus er uregelmæssig?",
        respuesta: "Du får et fingerpeg, men det er mindre præcist. Med uregelmæssige cyklusser kan ægløsningen flytte sig flere dage fra måned til måned.",
      },
      {
        pregunta: "Kan jeg bruge det til at undgå graviditet?",
        respuesta: "Nej. Skønnet er omtrentligt, og ægløsningen kan komme tidligere eller senere. For at beskytte dig mod graviditet skal du bruge prævention.",
      },
    ],
    glosario: [
      { termino: "Ægløsning", definicion: "Når en æggestok frigiver et æg." },
      { termino: "Fertile dage", definicion: "De dage i cyklussen, hvor man kan blive gravid." },
    ],
  };
};
