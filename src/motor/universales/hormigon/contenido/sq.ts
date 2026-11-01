import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { MEZCLA } from "../definicion";

export const contenidoSq: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const ft3 = 10 * 10 * (4 / 12);
        return [
          `Një tarracë 10 × 10 ft, me trashësi 4 in, kërkon ${n(ft3)} ft³ beton: ${n(ft3 / 27)} jardë kub.`,
          `Me recetën e referencës, kjo do të thotë rreth ${n((MEZCLA.cementoKg * ft3 * 0.0283168466) / 0.45359237, 0)} lb çimento.`,
        ];
      })()
    : (() => {
        const volumen = 4 * 3 * 0.1;
        const kg = MEZCLA.cementoKg * volumen;
        return [
          `Një pllakë betoni 4 × 3 m, me trashësi 10 cm, kërkon ${n(volumen, 1)} m³ beton.`,
          `Me recetën e referencës, kjo do të thotë rreth ${n(kg, 0)} kg çimento, ${n(MEZCLA.arenaM3 * volumen)} m³ rërë dhe ${n(MEZCLA.piedraM3 * volumen)} m³ zhavorr.`,
        ];
      })();
  return {
    h1: "Kalkulator betoni",
    title: tituloQueEntre(`Kalkulator betoni: ${ctx.nombrePais}`, "Kalkulator betoni"),
    description: `Llogaritni sa beton ju duhet për një pllakë, në ${imperial ? "jardë kub" : "metra kub"}, dhe përafërsisht sa çimento, rërë dhe zhavorr të blini.`,
    intro: [
      "Vendosni gjatësinë, gjerësinë dhe trashësinë. Shikoni vëllimin e betonit dhe materialet e përafërta për përgatitjen.",
      "Materialet varen nga receta. Ky kalkulator përdor si referencë një beton të zakonshëm 1:2:3.",
    ],
    comoSeCalcula: [
      imperial ? "Vëllimi = gjatësia × gjerësia × trashësia, me trashësinë në këmbë. Pjesëtoni këmbët kub me 27 për të marrë jardë kub." : "Vëllimi = gjatësia × gjerësia × trashësia, me trashësinë në metra.",
      "Shtohet rezerva për terren të pabarabartë dhe humbje.",
      `Për m³: rreth ${MEZCLA.cementoKg} kg çimento, ${n(MEZCLA.arenaM3)} m³ rërë, ${n(MEZCLA.piedraM3, 1)} m³ zhavorr dhe ${MEZCLA.aguaL} litra ujë.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Sa thasë çimento hyjnë në një metër kub beton?",
        respuesta: `Me një recetë 1:2:3, rreth ${MEZCLA.cementoKg} kg çimento, pra rreth ${Math.ceil(MEZCLA.cementoKg / 40)} thasë 40 kg. Një beton më i fortë përdor më shumë çimento.`,
      },
      {
        pregunta: "Si e llogaris sa metra kub beton më duhen?",
        respuesta: "Shumëzoni gjatësinë me gjerësinë dhe me trashësinë, të gjitha në metra. Një pllakë 5 × 4 m me trashësi 10 cm ka 2 m³. Shtoni nga 5% deri në 10% rezervë.",
      },
      {
        pregunta: "A ta porosis betonin të gatshëm nga fabrika?",
        respuesta: "Për derdhje të mëdha, zakonisht është më uniform dhe më i shpejtë. Për punime të vogla, përgatitja në kantier me këto sasi është një zgjidhje e përdorur shpesh.",
      },
    ],
    glosario: [
      { termino: "Recetë betoni", definicion: "Përpjesëtimi i çimentos, rërës, zhavorrit dhe ujit në një përzierje." },
      { termino: "Metër kub (m³)", definicion: "Vëllimi i një kubi me brinjë 1 metër." },
    ],
  };
};
