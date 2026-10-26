import { aDia, fechaLarga, mesesYDias } from "../../comun/fechas";
import { duracionSv } from "../../dias-entre-fechas/textos/sv";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSv: ContenidoUniversal = (ctx) => {
  const nac = "1990-05-15";
  const ref = "2026-10-13";
  const { meses, dias } = mesesYDias(nac, ref);
  const total = aDia(ref) - aDia(nac);
  return {
    h1: "Räkna ut ålder",
    title: tituloQueEntre(
      `Räkna ut ålder: exakt ålder i år, månader och dagar | ${ctx.nombrePais}`,
      `Räkna ut ålder | ${ctx.nombrePais}`,
      "Räkna ut ålder",
    ),
    description: "Räkna ut din exakta ålder i år, månader och dagar, hur många dagar du har levt och hur länge det är kvar till nästa födelsedag.",
    intro: [
      "Fyll i ditt födelsedatum så ser du din exakta ålder i dag, också i månader, veckor och dagar.",
      "Ändra det andra datumet för att se hur gammal någon var en viss dag, eller hur gammal personen kommer att vara.",
    ],
    comoSeCalcula: [
      "Vi räknar hela månader från födseln till det valda datumet. Varje 12 månader blir ett år.",
      "Dagarna som blir över efter den sista hela månaden är dagarna i åldern.",
      "Skottår räknas med sina 366 dagar.",
    ],
    ejemplo: [
      `Den som är född ${fechaLarga(ctx.locale, nac)} var ${duracionSv(Math.floor(meses / 12), meses % 12, dias)} gammal den ${fechaLarga(ctx.locale, ref)}.`,
      `Det är ${formatearNumero(ctx, total)} dagar.`,
    ],
    faq: [
      {
        pregunta: "Hur räknas exakt ålder ut?",
        respuesta: "Först räknas hela år, sedan hela månader sedan den senaste födelsedagen och till sist dagarna som blir över.",
      },
      {
        pregunta: "Vad gäller för den som är född den 29 februari?",
        respuesta: "De år som inte är skottår räknar den här kalkylatorn med den 28 februari som födelsedag. I vissa lagar gäller i stället den 1 mars.",
      },
      {
        pregunta: "Hur många dagar gammal är jag?",
        respuesta: "Titta på raden «I dagar». Den räknar varje dag från din födsel till det valda datumet, utan att räkna med den sista dagen.",
      },
    ],
    glosario: [
      { termino: "Ålder", definicion: "Antalet hela år sedan födseln." },
      { termino: "Skottår", definicion: "Ett år med 366 dagar och en 29 februari. Det kommer vart fjärde år, utom vissa sekelskiften." },
    ],
  };
};
