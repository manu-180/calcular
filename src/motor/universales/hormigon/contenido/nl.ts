import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { MEZCLA } from "../definicion";

export const contenidoNl: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const ft3 = 10 * 10 * (4 / 12);
        return [
          `Een terras van 10 × 10 ft en 4 in dik heeft ${n(ft3)} ft³ beton nodig: ${n(ft3 / 27)} cubic yard.`,
          `Met de standaardmengverhouding is dat ongeveer ${n((MEZCLA.cementoKg * ft3 * 0.0283168466) / 0.45359237, 0)} lb cement.`,
        ];
      })()
    : (() => {
        const volumen = 4 * 3 * 0.1;
        return [
          `Een vloer van 4 × 3 m en 10 cm dik heeft ${n(volumen, 1)} m³ beton nodig.`,
          `Met de standaardmengverhouding is dat ongeveer ${n(MEZCLA.cementoKg * volumen, 0)} kg cement, ${n(MEZCLA.arenaM3 * volumen)} m³ zand en ${n(MEZCLA.piedraM3 * volumen)} m³ grind.`,
        ];
      })();
  return {
    h1: "Beton berekenen",
    title: tituloQueEntre(`Beton berekenen in ${ctx.nombrePais}`, "Beton berekenen"),
    description: `Bereken hoeveel beton je nodig hebt voor een vloer of fundering, in ${imperial ? "cubic yards" : "kubieke meter"}, en ongeveer hoeveel cement, zand en grind je moet kopen.`,
    intro: [
      "Vul de lengte, breedte en dikte in. Je ziet hoeveel beton je nodig hebt en ongeveer welke materialen je moet mengen.",
      "De materialen hangen af van het mengsel. Deze rekenhulp gaat uit van een gewone mengverhouding van 1:2:3.",
    ],
    comoSeCalcula: [
      imperial
        ? "Volume = lengte × breedte × dikte, met de dikte in voet. Deel de kubieke voet door 27 voor cubic yards."
        : `Volume = lengte × breedte × dikte, met de dikte in meter. 10 cm is dus ${n(0.1, 1)} m.`,
      "Daarna komt de marge erbij voor een ongelijke ondergrond en wat je morst.",
      `Per m³: ongeveer ${n(MEZCLA.cementoKg, 0)} kg cement, ${n(MEZCLA.arenaM3)} m³ zand, ${n(MEZCLA.piedraM3, 1)} m³ grind en ${n(MEZCLA.aguaL, 0)} liter water.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Hoeveel cement zit er in een kuub beton?",
        respuesta: `Bij een mengverhouding van 1:2:3 ongeveer ${n(MEZCLA.cementoKg, 0)} kg. Sterker beton heeft meer cement nodig.`,
      },
      {
        pregunta: "Hoe dik moet een betonvloer zijn?",
        respuesta: "Voor een tuinpad of terras is 10 cm meestal genoeg. Rijdt er een auto overheen, reken dan op 12 tot 15 cm. Bij een fundering beslist de constructeur.",
      },
      {
        pregunta: "Zelf mengen of stortklaar beton bestellen?",
        respuesta: "Voor grote oppervlakken is stortklaar beton uit de mixer meestal gelijkmatiger en sneller. Voor kleine klussen meng je vaak zelf met deze hoeveelheden.",
      },
    ],
    glosario: [
      { termino: "Mengverhouding", definicion: "De verhouding tussen cement, zand, grind en water in het beton." },
      { termino: "Kuub", definicion: "Een kubieke meter (m³): een blok van 1 bij 1 bij 1 meter." },
    ],
  };
};
