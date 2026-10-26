import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aDia, fechaLarga, habilesEntre } from "../../comun/fechas";

export const contenidoDa: ContenidoUniversal = (ctx) => {
  const desde = "2026-03-02";
  const hasta = "2026-06-30";
  const dias = aDia(hasta) - aDia(desde);
  const habiles = habilesEntre(aDia(desde), aDia(hasta));
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const n = (x: number) => formatearNumero(ctx, x);
  return {
    h1: "Beregn dage mellem to datoer",
    title: tituloQueEntre(
      `Dage mellem datoer: beregn antal dage | ${ctx.nombrePais}`,
      `Dage mellem datoer | ${ctx.nombrePais}`,
      "Dage mellem datoer",
    ),
    description: "Beregn antallet af dage mellem to datoer. Du ser kalenderdage, uger, måneder og hverdage fra mandag til fredag.",
    intro: [
      "Vælg en startdato og en slutdato. Du ser kalenderdagene, den samme periode i uger og måneder og antallet af hverdage.",
      "Brug den til frister, forfaldsdatoer, ferie, graviditet eller en nedtælling.",
    ],
    comoSeCalcula: [
      "Kalenderdage er alle dage mellem de to datoer. Startdatoen tæller med, men slutdatoen gør ikke, medmindre du sætter flueben.",
      "Hverdage er mandage til fredage i samme periode. Helligdage trækkes ikke fra.",
      "Skudår tælles med deres 29. februar.",
    ],
    ejemplo: [
      `Fra ${f(desde)} til ${f(hasta)} er der ${n(dias)} kalenderdage.`,
      `Af dem falder ${n(habiles)} på en hverdag fra mandag til fredag.`,
    ],
    faq: [
      {
        pregunta: "Tæller den første eller den sidste dag med?",
        respuesta: "Som standard tæller den første med, men ikke den sidste, ligesom når du trækker en dato fra en anden. Skal begge med, så sæt flueben ved «Medregn slutdatoen».",
      },
      {
        pregunta: "Trækkes helligdage fra hverdagene?",
        respuesta: "Nej. Hverdagene tælles mandag til fredag. Helligdage varierer mellem lande, regioner og år, så træk dem fra for sig.",
      },
      {
        pregunta: "Hvor mange dage har et år?",
        respuesta: "365, eller 366 i et skudår. Derfor kan der være forskelligt antal dage mellem de samme to datoer i forskellige år.",
      },
    ],
    glosario: [
      { termino: "Kalenderdage", definicion: "Alle dage i kalenderen, inklusive weekender og helligdage." },
      { termino: "Hverdage", definicion: "I denne beregner mandag til fredag." },
    ],
  };
};
