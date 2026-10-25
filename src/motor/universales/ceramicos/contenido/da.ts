import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoDa: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const piezas = Math.ceil((150 * 1.1) / 1 - 1e-9);
        return [
          `Til 150 ft² med fliser på 12 × 12 in (1 ft² hver) og 10 % spild skal du bruge ${n(piezas, 0)} fliser.`,
          `Er der 10 fliser i en pakke, bliver det ${n(Math.ceil(piezas / 10), 0)} pakker.`,
        ];
      })()
    : (() => {
        const pieza = 0.6 * 0.6;
        const piezas = Math.ceil((20 * 1.1) / pieza - 1e-9);
        return [
          `Til 20 m² med fliser på 60 × 60 cm (${n(pieza)} m² hver) og 10 % spild skal du bruge ${n(piezas, 0)} fliser.`,
          `Er der 4 fliser i en pakke, bliver det ${n(Math.ceil(piezas / 4), 0)} pakker.`,
        ];
      })();
  return {
    h1: "Hvor mange fliser skal jeg bruge?",
    title: tituloQueEntre(
      `Fliseberegner: hvor mange fliser skal jeg bruge? | ${ctx.nombrePais}`,
      `Fliseberegner | ${ctx.nombrePais}`,
      "Fliseberegner",
    ),
    description: "Beregn, hvor mange fliser du skal bruge til gulv eller væg, med spild regnet med, og hvor mange pakker du skal købe.",
    intro: [
      "Skriv arealet, flisernes størrelse, og hvor mange der er i en pakke. Du ser, hvor mange fliser og pakker du skal købe.",
      "Spildet dækker tilskæring langs kanterne og en enkelt flise, der går i stykker.",
    ],
    comoSeCalcula: [
      `En flises areal = længde × bredde, regnet om til ${imperial ? "kvadratfod" : "kvadratmeter"}.`,
      "Fliser = areal × (1 + spild ÷ 100) ÷ en flises areal, rundet op.",
      "Pakker = fliser ÷ fliser pr. pakke, rundet op.",
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Hvor meget spild skal jeg regne med?",
        respuesta: "10 % ved lige lægning. Ved diagonal lægning, sildebensmønster eller rum med mange tilskæringer regner du med 15 til 20 %.",
      },
      {
        pregunta: "Skal jeg regne fugerne med?",
        respuesta: "Nej. Fugerne er kun nogle få millimeter brede, og forskellen er allerede dækket af spildet.",
      },
      {
        pregunta: "Skal jeg købe nogle ekstra fliser?",
        respuesta: "Ja, et par stykker fra samme produktionsparti. Går en flise i stykker senere, kan det være svært at finde præcis samme nuance.",
      },
    ],
    glosario: [
      { termino: "Spild", definicion: "Den ekstra procentdel, du køber til tilskæring og fliser, der går i stykker." },
      { termino: "Fuge", definicion: "Mellemrummet mellem fliserne, som fyldes med fugemasse." },
    ],
  };
};
