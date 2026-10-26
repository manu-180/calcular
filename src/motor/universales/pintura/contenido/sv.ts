import { formatearCifra, formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { MARGEN } from "../definicion";

export const contenidoSv: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const margen = formatearCifra(ctx, MARGEN * 100);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const neta = 48 * 8 - 40;
        const gal = (neta * 2) / 350;
        return [
          `Ett rum med 48 ft vägg, 8 ft i takhöjd och 40 ft² dörrar och fönster har ${n(neta, 0)} ft² att måla.`,
          `Med 2 strykningar och en färg som räcker till 350 ft² per gallon behöver du ${n(gal, 2)} gallon. Med marginalen blir det ${n(gal * (1 + MARGEN), 2)} gallon.`,
        ];
      })()
    : (() => {
        const neta = 14 * 2.6 - 4;
        const litros = (neta * 2) / 10;
        return [
          `Ett rum med 14 m vägg, ${n(2.6)} m i takhöjd och 4 m² dörrar och fönster har ${n(neta)} m² att måla.`,
          `Med 2 strykningar och en färg som räcker till 10 m² per liter behöver du ${n(litros, 2)} liter. Med marginalen blir det ${n(litros * (1 + MARGEN), 2)} liter.`,
        ];
      })();
  return {
    h1: "Hur mycket färg behöver jag?",
    title: tituloQueEntre(
      `Hur mycket färg behöver jag? Räkna ut färgåtgång | ${ctx.nombrePais}`,
      `Färgåtgång: hur mycket färg | ${ctx.nombrePais}`,
      "Hur mycket färg behöver jag?",
    ),
    description: "Räkna ut hur mycket färg du behöver till väggarna utifrån måtten, dörrar och fönster, antal strykningar och åtgången som står på burken.",
    intro: [
      "Fyll i väggarnas längd och höjd (eller ytan direkt), hur mycket dörrar och fönster tar upp och hur många gånger du ska stryka.",
      `Beräkningen lägger till ${margen} % extra så att färgen inte tar slut halvvägs.`,
    ],
    comoSeCalcula: [
      "Yta = väggarnas sammanlagda längd × höjd, minus dörrar och fönster.",
      "Färg = yta × antal strykningar ÷ åtgång.",
      `Sedan läggs en marginal på ${margen} % till.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Hur långt räcker en liter färg?",
        respuesta: "De flesta väggfärger för inomhusbruk räcker till ungefär 8 till 12 m² per liter och strykning. Den exakta siffran står på burken.",
      },
      {
        pregunta: "Hur många strykningar behövs?",
        respuesta: "Två strykningar är det vanliga. Nyspacklade eller mycket sugande väggar, eller ett stort färgbyte, kan kräva en tredje.",
      },
      {
        pregunta: "Ska jag dra av dörrar och fönster?",
        respuesta: "Ja, om de är stora. Små öppningar är bättre att låta vara kvar, eftersom det extra går åt till kanter och hörn.",
      },
    ],
    glosario: [
      { termino: "Åtgång", definicion: "Hur stor yta en liter eller gallon färg täcker i en strykning." },
      { termino: "Strykning", definicion: "Varje lager färg som läggs på väggen." },
    ],
  };
};
