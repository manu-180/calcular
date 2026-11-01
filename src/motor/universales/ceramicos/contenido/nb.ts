import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoNb: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const piezas = Math.ceil((150 * 1.1) / 1 - 1e-9);
        return [
          `Til 150 ft² med fliser på 12 × 12 in (1 ft² hver) og 10 % svinn trenger du ${n(piezas, 0)} fliser.`,
          `Er det 10 fliser i en pakke, blir det ${n(Math.ceil(piezas / 10), 0)} pakker.`,
        ];
      })()
    : (() => {
        const pieza = 0.6 * 0.6;
        const piezas = Math.ceil((20 * 1.1) / pieza - 1e-9);
        return [
          `Til 20 m² med fliser på 60 × 60 cm (${n(pieza)} m² hver) og 10 % svinn trenger du ${n(piezas, 0)} fliser.`,
          `Er det 4 fliser i en pakke, blir det ${n(Math.ceil(piezas / 4), 0)} pakker.`,
        ];
      })();
  return {
    h1: "Hvor mange fliser trenger jeg?",
    title: tituloQueEntre(
      `Flisekalkulator: hvor mange fliser trenger jeg? | ${ctx.nombrePais}`,
      `Flisekalkulator | ${ctx.nombrePais}`,
      "Flisekalkulator",
    ),
    description: "Regn ut hvor mange fliser du trenger til gulv eller vegg, med svinn regnet med, og hvor mange pakker du må kjøpe.",
    intro: [
      "Fyll inn arealet, størrelsen på flisene og hvor mange det er i en pakke. Du ser hvor mange fliser og pakker du må kjøpe.",
      "Svinnet dekker kapp langs kantene og en og annen flis som knekker.",
    ],
    comoSeCalcula: [
      `Arealet av én flis = lengde × bredde, regnet om til ${imperial ? "kvadratfot" : "kvadratmeter"}.`,
      "Fliser = areal × (1 + svinn ÷ 100) ÷ arealet av én flis, rundet opp.",
      "Pakker = fliser ÷ fliser per pakke, rundet opp.",
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Hvor mye svinn bør jeg regne med?",
        respuesta: "10 % ved rett legging. Ved diagonal legging, fiskebeinsmønster eller rom med mye kapp regner du med 15 til 20 %.",
      },
      {
        pregunta: "Må jeg regne med fugene?",
        respuesta: "Nei. Fugene er bare noen få millimeter brede, og forskjellen er allerede dekket av svinnet.",
      },
      {
        pregunta: "Bør jeg kjøpe noen ekstra fliser?",
        respuesta: "Ja, et par stykker fra samme produksjonsparti. Knekker en flis senere, kan det være vanskelig å finne nøyaktig samme nyanse.",
      },
    ],
    glosario: [
      { termino: "Svinn", definicion: "Den ekstra prosentandelen du kjøper til kapp og fliser som knekker." },
      { termino: "Fuge", definicion: "Mellomrommet mellom flisene, som fylles med fugemasse." },
    ],
  };
};
