import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aDia, fechaLarga, habilesEntre } from "../../comun/fechas";

export const contenidoNb: ContenidoUniversal = (ctx) => {
  const desde = "2026-03-02";
  const hasta = "2026-06-30";
  const dias = aDia(hasta) - aDia(desde);
  const habiles = habilesEntre(aDia(desde), aDia(hasta));
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const n = (x: number) => formatearNumero(ctx, x);
  return {
    h1: "Regn ut dager mellom datoer",
    title: tituloQueEntre(
      `Dager mellom datoer: regn ut antall dager | ${ctx.nombrePais}`,
      `Dager mellom datoer | ${ctx.nombrePais}`,
      "Dager mellom datoer",
    ),
    description: "Regn ut antall dager mellom to datoer. Du ser kalenderdager, uker, måneder og virkedager fra mandag til fredag.",
    intro: [
      "Velg en startdato og en sluttdato. Du ser kalenderdagene, den samme perioden i uker og måneder og antall virkedager.",
      "Bruk den til frister, forfallsdatoer, ferie, svangerskap eller en nedtelling.",
    ],
    comoSeCalcula: [
      "Kalenderdager er alle dagene mellom de to datoene. Startdatoen telles, men ikke sluttdatoen, med mindre du huker av for det.",
      "Virkedager er mandagene til fredagene i den samme perioden. Helligdager trekkes ikke fra.",
      "Skuddår telles med sin 29. februar.",
    ],
    ejemplo: [
      `Fra ${f(desde)} til ${f(hasta)} er det ${n(dias)} kalenderdager.`,
      `Av dem faller ${n(habiles)} på mandag til fredag.`,
    ],
    faq: [
      {
        pregunta: "Telles den første eller den siste dagen?",
        respuesta: "Som standard telles den første, men ikke den siste, akkurat som når du trekker én dato fra en annen. Trenger du begge, huker du av for «Ta med sluttdatoen».",
      },
      {
        pregunta: "Trekkes helligdager fra virkedagene?",
        respuesta: "Nei. Virkedagene telles mandag til fredag. Helligdager varierer mellom land, regioner og år, så trekk dem fra for seg.",
      },
      {
        pregunta: "Hvor mange dager har et år?",
        respuesta: "365, eller 366 i et skuddår. Derfor kan de samme to datoene ligge et ulikt antall dager fra hverandre i forskjellige år.",
      },
    ],
    glosario: [
      { termino: "Kalenderdager", definicion: "Alle dagene i kalenderen, helger og helligdager medregnet." },
      { termino: "Virkedager", definicion: "I denne kalkulatoren mandag til fredag." },
    ],
  };
};
