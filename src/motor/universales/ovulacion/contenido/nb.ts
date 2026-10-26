import { aDia, aFecha, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { FASE_LUTEA, ventana } from "../definicion";

export const contenidoNb: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const fum = "2026-03-05";
  const v = ventana(aDia(fum), 28);
  return {
    h1: "Eggløsningskalkulator",
    title: tituloQueEntre(
      `Eggløsningskalkulator: finn de fruktbare dagene | ${ctx.nombrePais}`,
      `Eggløsningskalkulator | ${ctx.nombrePais}`,
      "Eggløsningskalkulator",
    ),
    description: "Regn ut når du har eggløsning, hvilke dager du er fruktbar og når neste menstruasjon kommer, for de tre neste syklusene.",
    intro: [
      "Fyll inn første dag i siste menstruasjon og hvor lang syklusen din er. Du ser omtrentlig eggløsning, de fruktbare dagene og neste menstruasjon.",
      "Dette er et anslag for regelmessige sykluser og ikke en prevensjonsmetode. Kalkulatoren er veiledende og erstatter ikke en samtale med lege eller jordmor.",
    ],
    comoSeCalcula: [
      `Eggløsningen skjer oftest ${FASE_LUTEA} dager før neste menstruasjon: første dag i siste menstruasjon + syklusens lengde − ${FASE_LUTEA}.`,
      "De fruktbare dagene regnes fra 5 dager før eggløsningen til dagen etter, fordi sædceller kan leve i opptil 5 dager.",
      "Neste menstruasjon ventes én syklus etter den forrige.",
    ],
    ejemplo: [
      `Med siste menstruasjon ${f(fum)} og en syklus på 28 dager er omtrentlig eggløsning ${f(aFecha(v.ovulacion))}.`,
      `De fruktbare dagene er ${f(aFecha(v.desde))} til ${f(aFecha(v.hasta))}, og neste menstruasjon ventes ${f(aFecha(v.proxima))}.`,
    ],
    faq: [
      {
        pregunta: "Hvilke dager er man mest fruktbar?",
        respuesta: "De to eller tre dagene før eggløsningen og selve eggløsningsdagen. Hele det fruktbare vinduet er rundt 6 dager.",
      },
      {
        pregunta: "Fungerer det hvis syklusen min er uregelmessig?",
        respuesta: "Du får en pekepinn, men den er mindre nøyaktig. Med uregelmessige sykluser kan eggløsningen flytte seg flere dager fra måned til måned.",
      },
      {
        pregunta: "Kan jeg bruke dette for å unngå graviditet?",
        respuesta: "Nei. Anslaget er omtrentlig, og eggløsningen kan komme tidligere eller senere. For å beskytte deg mot graviditet trenger du prevensjon.",
      },
    ],
    glosario: [
      { termino: "Eggløsning", definicion: "Når en eggstokk slipper et egg." },
      { termino: "Fruktbare dager", definicion: "Dagene i syklusen da man kan bli gravid." },
    ],
  };
};
