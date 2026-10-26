import { aDia, aFecha, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DURACION } from "../definicion";

export const contenidoSv: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const fum = "2026-01-10";
  const fpp = aFecha(aDia(fum) + DURACION);
  const fpp32 = aFecha(aDia(fum) + DURACION + 4);
  return {
    h1: "Graviditetskalkylator: räkna ut BF",
    title: tituloQueEntre(
      `Graviditetskalkylator: räkna ut BF | ${ctx.nombrePais}`,
      `Graviditetskalkylator | ${ctx.nombrePais}`,
      "Graviditetskalkylator",
    ),
    description: "Räkna ut beräknat förlossningsdatum (BF) utifrån senaste mensen eller befruktningen, och se vilken graviditetsvecka du är i i dag.",
    intro: [
      "Fyll i första dagen i senaste mensen (eller datum för befruktning, om du vet det). Du ser BF, hur långt gången du är och vilken trimester du är i.",
      "Det är en uppskattning. Det ersätter inte en bedömning av barnmorska, läkare eller annan vårdpersonal, och ultraljud ger det säkraste datumet.",
    ],
    comoSeCalcula: [
      "Beräkningen följer Naegeles regel: BF är första dagen i senaste mensen plus 280 dagar (40 veckor).",
      "Är din cykel längre eller kortare än 28 dagar flyttas datumet lika många dagar.",
      "Från befruktningen läggs 266 dagar till (38 veckor).",
      "Graviditetsveckorna räknas från senaste mensen, inte från befruktningen.",
    ],
    ejemplo: [
      `Med senaste mens ${f(fum)} och en cykel på 28 dagar blir BF ${f(fpp)}.`,
      `Med en cykel på 32 dagar flyttas BF 4 dagar till ${f(fpp32)}.`,
    ],
    faq: [
      {
        pregunta: "Hur räknar man ut BF?",
        respuesta: "Man lägger 280 dagar till första dagen i senaste mensen. En snabb tumregel som ger nästan samma datum: lägg till 7 dagar, dra av 3 månader och lägg till ett år.",
      },
      {
        pregunta: "Varför räknas veckorna från senaste mensen?",
        respuesta: "För att det är ett datum som nästan alla vet. Därför har befruktningen ännu inte skett i vecka 2.",
      },
      {
        pregunta: "Hur många barn föds på BF?",
        respuesta: "Få. De flesta föds mellan vecka 37 och 42, så datumet är en riktlinje snarare än en exakt dag.",
      },
    ],
    glosario: [
      { termino: "BF", definicion: "Beräknat förlossningsdatum, den dag graviditeten når 40 veckor." },
      { termino: "Sista mens", definicion: "Första blödningsdagen i den senaste menstruationen." },
      { termino: "Naegeles regel", definicion: "Ett sätt att uppskatta BF genom att lägga 280 dagar till senaste mensen." },
    ],
  };
};
