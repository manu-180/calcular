import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { tarifa } from "../definicion";

export const contenidoSv: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const ingreso = montoEjemplo(ctx, 40000);
  const gastos = montoEjemplo(ctx, 5000);
  const r = tarifa({ ingreso, gastos, impuestos: 25, diasLibres: 30, diasSemana: 5, horasSemana: 25 });
  return {
    h1: "Räkna ut timpris som frilansare",
    title: tituloQueEntre(
      `Räkna ut timpris som frilansare och konsult | ${ctx.nombrePais}`,
      `Räkna ut timpris | ${ctx.nombrePais}`,
      "Räkna ut timpris",
    ),
    description: "Räkna ut ditt timpris och dagpris som frilansare utifrån vad du vill tjäna, dina kostnader, skatt, ledighet och debiterbara timmar.",
    intro: [
      "Det vanligaste misstaget som frilansare är att ta lönen du skulle vilja ha som anställd och dela den med 160 timmar. Då glömmer du skatt, kostnader, semester och alla timmar som inte går att debitera.",
      "Den här kalkylatorn utgår från vad du vill ha kvar och visar vad du behöver ta betalt för att komma dit.",
    ],
    comoSeCalcula: [
      "Fakturering som behövs = det du vill ha kvar ÷ (1 − skattesats) + kostnader i verksamheten.",
      "Arbetsdagar = 52 veckor × arbetsdagar per vecka − lediga dagar.",
      "Debiterbara timmar per år = arbetsdagar × debiterbara timmar per dag.",
      "Timpris = fakturering som behövs ÷ debiterbara timmar per år.",
    ],
    ejemplo: [
      `För att ha ${m(ingreso)} kvar om året, med ${m(gastos)} i kostnader och 25 % i skatt, behöver du fakturera ${m(r.facturado)}.`,
      `Med 30 lediga dagar och 25 debiterbara timmar i veckan blir det ${formatearNumero(ctx, r.horas)} timmar om året. Det ger ett timpris på ${m(r.hora)} eller ett dagpris på ${m(r.dia)}.`,
    ],
    faq: [
      {
        pregunta: "Hur många timmar i veckan kan jag debitera?",
        respuesta: "Färre än du jobbar. Kundjakt, mejl, fakturering och fortbildning tar tid som ingen betalar för. 20 till 30 debiterbara timmar av 40 är vanligt.",
      },
      {
        pregunta: "Ska jag ta betalt per timme eller per uppdrag?",
        respuesta: "Båda fungerar. Även om du sätter ett fast pris per uppdrag kan du uppskatta timmarna och gånga med det här timpriset, så att du inte går back.",
      },
      {
        pregunta: "Vilken skattesats ska jag använda?",
        respuesta: "Det beror på land och företagsform. Räkna med både inkomstskatt och sociala avgifter. Är du osäker, fråga en redovisningskonsult.",
      },
    ],
    glosario: [
      { termino: "Debiterbara timmar", definicion: "Arbetstimmar som du tar betalt för av en kund." },
      { termino: "Det du har kvar", definicion: "Det som återstår efter skatt och kostnader i verksamheten." },
    ],
  };
};
