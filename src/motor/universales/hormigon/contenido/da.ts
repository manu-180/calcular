import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { MEZCLA } from "../definicion";

export const contenidoDa: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const ft3 = 10 * 10 * (4 / 12);
        return [
          `En terrasse på 10 × 10 ft og 4 in tyk skal bruge ${n(ft3)} ft³ beton, altså ${n(ft3 / 27)} kubikyard.`,
          `Med referenceblandingen bliver det cirka ${n((MEZCLA.cementoKg * ft3 * 0.0283168466) / 0.45359237, 0)} lb cement.`,
        ];
      })()
    : (() => {
        const volumen = 4 * 3 * 0.1;
        return [
          `En plade på 4 × 3 m og 10 cm tyk skal bruge ${n(volumen, 1)} m³ beton.`,
          `Med referenceblandingen bliver det cirka ${n(MEZCLA.cementoKg * volumen, 0)} kg cement, ${n(MEZCLA.arenaM3 * volumen)} m³ sand og ${n(MEZCLA.piedraM3 * volumen)} m³ sten.`,
        ];
      })();
  return {
    h1: "Betonberegner: hvor meget beton skal jeg bruge?",
    title: tituloQueEntre(
      `Betonberegner: hvor meget beton skal jeg bruge? | ${ctx.nombrePais}`,
      `Betonberegner | ${ctx.nombrePais}`,
      "Betonberegner",
    ),
    description: `Beregn, hvor meget beton du skal bruge til en støbning, i ${imperial ? "kubikyard" : "kubikmeter"}, og cirka hvor meget cement, sand og sten du skal købe.`,
    intro: [
      "Skriv længde, bredde og tykkelse. Du ser mængden af beton, og cirka hvor meget materiale der går til blandingen.",
      "Mængderne afhænger af opskriften. Beregneren tager udgangspunkt i en almindelig blanding 1:2:3.",
    ],
    comoSeCalcula: [
      imperial
        ? "Mængde = længde × bredde × tykkelse, med tykkelsen i fod. Del kubikfod med 27 for at få kubikyard."
        : "Mængde = længde × bredde × tykkelse, med tykkelsen i meter.",
      "Derefter lægges tillægget for ujævnt underlag og spild til.",
      `Pr. m³: cirka ${n(MEZCLA.cementoKg, 0)} kg cement, ${n(MEZCLA.arenaM3)} m³ sand, ${n(MEZCLA.piedraM3, 1)} m³ sten og ${n(MEZCLA.aguaL, 0)} liter vand.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Hvordan regner jeg ud, hvor meget beton der går til?",
        respuesta: `Gang længde, bredde og tykkelse i meter. En plade på 4 × 3 m og 10 cm tyk giver ${n(4 * 3 * 0.1, 1)} m³.`,
      },
      {
        pregunta: "Hvor meget cement går der til en kubikmeter beton?",
        respuesta: `Med en blanding 1:2:3 cirka ${n(MEZCLA.cementoKg, 0)} kg. Stærkere beton kræver mere cement.`,
      },
      {
        pregunta: "Skal jeg bestille fabriksbeton?",
        respuesta: "Ved store støbninger bliver det som regel mere ensartet og går hurtigere. Til mindre opgaver er det almindeligt selv at blande med de her mængder.",
      },
    ],
    glosario: [
      { termino: "Blandingsforhold", definicion: "Forholdet mellem cement, sand, sten og vand i blandingen." },
      { termino: "Støbning", definicion: "Når betonen hældes i forskallingen og får lov at hærde." },
    ],
  };
};
