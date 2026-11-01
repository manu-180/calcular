import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { area, FT2_POR_M2 } from "../definicion";

export const contenidoSk: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "ft" : "m";
  const us = imperial ? "ft²" : "m²";
  const enL = imperial ? area("rectangulo", 16, 12) + area("rectangulo", 10, 6) : area("rectangulo", 5, 4) + area("rectangulo", 3, 2);
  return {
    h1: imperial ? "Výpočet plochy v štvorcových stopách" : "Výpočet metrov štvorcových",
    title: imperial
      ? tituloQueEntre(`Výpočet plochy v stopách ${GRAMATICA.sk.para(ctx.nombrePais)}`, "Výpočet plochy v štvorcových stopách")
      : tituloQueEntre(`Výpočet metrov štvorcových ${GRAMATICA.sk.para(ctx.nombrePais)}`, "Výpočet metrov štvorcových", "Výpočet m²"),
    description: "Vypočítajte plochu miestnosti, podlahy alebo pozemku: obdĺžniky, trojuholníky aj kruhy a až päť tvarov spočítaných dokopy.",
    intro: [
      "Vyberte tvar a zadajte jeho rozmery. Ak priestor nie je jednoduchý obdĺžnik, rozdeľte ho na časti a kalkulačka ich spočíta.",
      imperial ? "Výsledok ukáže aj v metroch štvorcových." : "Výsledok ukáže aj v štvorcových stopách.",
    ],
    comoSeCalcula: [
      "Obdĺžnik: dĺžka × šírka.",
      "Trojuholník: základňa × výška ÷ 2.",
      `Kruh: π × polomer × polomer, kde polomer je polovica priemeru. 1 m² je ${n(FT2_POR_M2)} ft².`,
    ],
    ejemplo: [
      imperial
        ? `Obývačka v tvare L sa dá rozdeliť na obdĺžnik 16 × 12 ft a obdĺžnik 10 × 6 ft. Dokopy to je ${n(enL, 0)} ft².`
        : `Obývačka v tvare L sa dá rozdeliť na obdĺžnik 5 × 4 m a obdĺžnik 3 × 2 m. Dokopy to je ${n(enL, 0)} m².`,
      `Okrúhly stôl s priemerom 2 ${u} zaberá ${n(area("circulo", 2, 0))} ${us}.`,
    ],
    faq: [
      {
        pregunta: imperial ? "Ako vypočítať plochu miestnosti v stopách?" : "Ako vypočítať metre štvorcové miestnosti?",
        respuesta: imperial
          ? "Zmerajte dĺžku a šírku v stopách a vynásobte ich. Miestnosť 12 × 10 ft má 120 ft²."
          : "Zmerajte dĺžku a šírku v metroch a vynásobte ich. Izba 4 × 3 m má 12 m².",
      },
      {
        pregunta: "Čo ak mám rozmery v centimetroch?",
        respuesta: `Najprv ich preveďte: centimetre vydeľte 100 a dostanete metre (palce vydeľte 12 a dostanete stopy). 350 cm je ${n(3.5, 1)} m.`,
      },
      {
        pregunta: "Ako previesť metre štvorcové na štvorcové stopy?",
        respuesta: `Vynásobte ich číslom ${n(FT2_POR_M2)}. 20 m² je ${n(20 * FT2_POR_M2)} ft².`,
      },
    ],
    glosario: [
      { termino: "Meter štvorcový (m²)", definicion: "Plocha štvorca so stranou 1 meter." },
      { termino: "Štvorcová stopa (ft²)", definicion: "Plocha štvorca so stranou 1 stopa." },
    ],
  };
};
