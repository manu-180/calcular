import { aDia, aFecha, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DURACION } from "../definicion";

export const contenidoNl: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const fum = "2026-01-10";
  const fpp = aFecha(aDia(fum) + DURACION);
  const fpp32 = aFecha(aDia(fum) + DURACION + 4);
  return {
    h1: "Uitgerekende datum berekenen",
    title: tituloQueEntre(`Uitgerekende datum berekenen in ${ctx.nombrePais}`, "Uitgerekende datum berekenen", "Uitgerekende datum"),
    description: "Bereken je uitgerekende datum vanaf je laatste menstruatie of de datum van de bevruchting, en zie hoeveel weken zwanger je vandaag bent.",
    intro: [
      "Vul de eerste dag van je laatste menstruatie in (of de datum van de bevruchting, als je die weet). Je ziet je uitgerekende datum, hoe ver je bent en in welk trimester.",
      "Het is een schatting. De echo en de controles bij je verloskundige of arts geven de nauwkeurigste datum.",
    ],
    comoSeCalcula: [
      "De rekenhulp gebruikt de regel van Naegele: de uitgerekende datum is je laatste menstruatie plus 280 dagen (40 weken).",
      "Is je cyclus langer of korter dan 28 dagen, dan schuift de datum met dat verschil op.",
      "Vanaf de bevruchting telt de rekenhulp er 266 dagen (38 weken) bij op.",
      "De zwangerschapsweken tellen vanaf je laatste menstruatie, niet vanaf de bevruchting.",
    ],
    ejemplo: [
      `Was je laatste menstruatie op ${f(fum)} en is je cyclus 28 dagen, dan is je uitgerekende datum ${f(fpp)}.`,
      `Bij een cyclus van 32 dagen schuift die 4 dagen op, naar ${f(fpp32)}.`,
    ],
    faq: [
      {
        pregunta: "Hoe wordt de uitgerekende datum berekend?",
        respuesta: "Bij de eerste dag van je laatste menstruatie tel je 280 dagen op. Een snelle regel die bijna dezelfde datum geeft: 7 dagen erbij, 3 maanden eraf en een jaar erbij.",
      },
      {
        pregunta: "Waarom tellen de weken vanaf je laatste menstruatie?",
        respuesta: "Omdat bijna iedereen die datum weet. Daarom ben je in week 2 eigenlijk nog niet zwanger.",
      },
      {
        pregunta: "Hoeveel baby's komen op de uitgerekende datum?",
        respuesta: "Weinig. De meeste worden geboren tussen week 37 en week 42. De datum is dus een richtpunt, geen vaste dag.",
      },
    ],
    glosario: [
      { termino: "Laatste menstruatie", definicion: "De eerste dag van je laatste bloeding. Daarvandaan tellen de zwangerschapsweken." },
      { termino: "Regel van Naegele", definicion: "Een manier om de uitgerekende datum te schatten: 280 dagen na de laatste menstruatie." },
    ],
  };
};
