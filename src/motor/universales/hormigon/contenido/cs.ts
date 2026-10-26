import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { MEZCLA } from "../definicion";

export const contenidoCs: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const ft3 = 10 * 10 * (4 / 12);
        return [
          `Na terasu 10 × 10 ft o tloušťce 4 in potřebujete ${n(ft3)} ft³ betonu, tedy ${n(ft3 / 27)} krychlového yardu.`,
          `Při vzorové směsi na to padne asi ${n((MEZCLA.cementoKg * ft3 * 0.0283168466) / 0.45359237, 0)} lb cementu.`,
        ];
      })()
    : (() => {
        const volumen = 4 * 3 * 0.1;
        return [
          `Na betonovou desku 4 × 3 m o tloušťce 10 cm potřebujete ${n(volumen, 1)} m³ betonu.`,
          `Při vzorové směsi na to padne asi ${n(MEZCLA.cementoKg * volumen, 0)} kg cementu, ${n(MEZCLA.arenaM3 * volumen)} m³ písku a ${n(MEZCLA.piedraM3 * volumen)} m³ štěrku.`,
        ];
      })();
  return {
    h1: "Kalkulačka betonu",
    title: tituloQueEntre(`Kalkulačka betonu: ${ctx.nombrePais}`, "Kalkulačka betonu a cementu", "Kalkulačka betonu"),
    description: `Spočítejte, kolik betonu potřebujete na desku v ${imperial ? "krychlových yardech" : "metrech krychlových"}, a přibližně kolik cementu, písku a štěrku koupit.`,
    intro: [
      "Zadejte délku, šířku a tloušťku. Uvidíte objem betonu a přibližné množství materiálu na směs.",
      "Množství materiálu závisí na poměru směsi. Kalkulačka jako příklad počítá s běžnou směsí 1 : 2 : 3.",
    ],
    comoSeCalcula: [
      imperial
        ? "Objem = délka × šířka × tloušťka, s tloušťkou ve stopách. Krychlové stopy se vydělí 27, aby vyšly krychlové yardy."
        : "Objem = délka × šířka × tloušťka, s tloušťkou v metrech.",
      "K objemu se přičte rezerva na nerovný podklad a ztráty betonu.",
      `Na 1 m³ připadá asi ${MEZCLA.cementoKg} kg cementu, ${n(MEZCLA.arenaM3)} m³ písku, ${n(MEZCLA.piedraM3, 1)} m³ štěrku a ${MEZCLA.aguaL} litrů vody.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Kolik cementu je potřeba na 1 m³ betonu?",
        respuesta: `U směsi 1 : 2 : 3 asi ${MEZCLA.cementoKg} kg. Na pevnější beton je cementu potřeba víc.`,
      },
      {
        pregunta: "Kolik krychlových stop má krychlový yard?",
        respuesta: "27. Krychlový yard je krychle 3 ft × 3 ft × 3 ft.",
      },
      {
        pregunta: "Vyplatí se objednat hotový beton z betonárny?",
        respuesta: "U větších betonáží bývá hotový beton z autodomíchávače stejnoměrnější a práce jde rychleji, prodává se po kubících. U menších prací se beton běžně míchá na místě v těchto poměrech.",
      },
    ],
    glosario: [
      { termino: "Poměr směsi", definicion: "Poměr cementu, písku, štěrku a vody ve směsi." },
      { termino: "Metr krychlový (m³)", definicion: "Objem krychle o hraně 1 metr, hovorově kubík." },
    ],
  };
};
