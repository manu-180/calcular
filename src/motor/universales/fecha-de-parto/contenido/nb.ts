import { aDia, aFecha, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DURACION } from "../definicion";

export const contenidoNb: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const fum = "2026-01-10";
  const fpp = aFecha(aDia(fum) + DURACION);
  const fpp32 = aFecha(aDia(fum) + DURACION + 4);
  return {
    h1: "Terminkalkulator: regn ut termindatoen",
    title: tituloQueEntre(
      `Terminkalkulator: regn ut termindatoen | ${ctx.nombrePais}`,
      `Terminkalkulator | ${ctx.nombrePais}`,
      "Terminkalkulator",
    ),
    description: "Regn ut termindatoen fra siste menstruasjon eller befruktningen, og se hvilken svangerskapsuke du er i i dag.",
    intro: [
      "Fyll inn første dag i siste menstruasjon (eller datoen for befruktning, hvis du vet den). Du ser termindatoen, hvor langt på vei du er og hvilket trimester du er i.",
      "Dette er et anslag, og ultralyden gir den sikreste datoen. Kalkulatoren er veiledende og erstatter ikke en samtale med lege eller jordmor.",
    ],
    comoSeCalcula: [
      "Beregningen følger Naegeles regel: termindatoen er første dag i siste menstruasjon pluss 280 dager (40 uker).",
      "Er syklusen din lengre eller kortere enn 28 dager, flyttes datoen like mange dager.",
      "Fra befruktningen legges det til 266 dager (38 uker).",
      "Svangerskapsukene telles fra siste menstruasjon, ikke fra befruktningen.",
    ],
    ejemplo: [
      `Med siste menstruasjon ${f(fum)} og en syklus på 28 dager blir termindatoen ${f(fpp)}.`,
      `Med en syklus på 32 dager flyttes termindatoen 4 dager, til ${f(fpp32)}.`,
    ],
    faq: [
      {
        pregunta: "Hvordan regner man ut termindatoen?",
        respuesta: "Man legger 280 dager til første dag i siste menstruasjon. En rask tommelfingerregel gir nesten samme dato: legg til 7 dager, trekk fra 3 måneder og legg til ett år.",
      },
      {
        pregunta: "Hvorfor telles ukene fra siste menstruasjon?",
        respuesta: "Fordi det er en dato nesten alle vet. Derfor har befruktningen ennå ikke skjedd i uke 2.",
      },
      {
        pregunta: "Hvor mange barn blir født på termindatoen?",
        respuesta: "Få. De fleste blir født mellom uke 37 og 42, så datoen er en pekepinn mer enn en nøyaktig dag.",
      },
    ],
    glosario: [
      { termino: "Termindato", definicion: "Den beregnede fødselsdatoen, når svangerskapet når 40 uker." },
      { termino: "Siste menstruasjon", definicion: "Første blødningsdag i den siste menstruasjonen." },
      { termino: "Naegeles regel", definicion: "En måte å regne ut termindatoen på ved å legge 280 dager til siste menstruasjon." },
    ],
  };
};
