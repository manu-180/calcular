import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { area, FT2_POR_M2 } from "../definicion";

export const contenidoCs: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "ft" : "m";
  const us = imperial ? "ft²" : "m²";
  const enL = imperial ? area("rectangulo", 16, 12) + area("rectangulo", 10, 6) : area("rectangulo", 5, 4) + area("rectangulo", 3, 2);
  return {
    h1: imperial ? "Výpočet plochy ve čtverečních stopách" : "Výpočet metrů čtverečních",
    title: imperial
      ? tituloQueEntre(`Výpočet plochy ve stopách ${GRAMATICA.cs.para(ctx.nombrePais)}`, "Výpočet plochy ve čtverečních stopách")
      : tituloQueEntre(`Výpočet metrů čtverečních ${GRAMATICA.cs.para(ctx.nombrePais)}`, "Výpočet metrů čtverečních", "Výpočet m²"),
    description: "Spočítejte plochu místnosti, podlahy nebo pozemku: obdélníky, trojúhelníky i kruhy, a až pět tvarů sečtených dohromady.",
    intro: [
      "Vyberte tvar a zadejte jeho rozměry. Pokud prostor není jednoduchý obdélník, rozdělte ho na části a kalkulačka je sečte.",
      imperial ? "Výsledek ukáže i v metrech čtverečních." : "Výsledek ukáže i ve čtverečních stopách.",
    ],
    comoSeCalcula: [
      "Obdélník: délka × šířka.",
      "Trojúhelník: základna × výška ÷ 2.",
      `Kruh: π × poloměr × poloměr, kde poloměr je polovina průměru. 1 m² je ${n(FT2_POR_M2)} ft².`,
    ],
    ejemplo: [
      imperial
        ? `Obývací pokoj ve tvaru L se dá rozdělit na obdélník 16 × 12 ft a obdélník 10 × 6 ft. Dohromady to je ${n(enL, 0)} ft².`
        : `Obývací pokoj ve tvaru L se dá rozdělit na obdélník 5 × 4 m a obdélník 3 × 2 m. Dohromady to je ${n(enL, 0)} m².`,
      `Kulatý stůl o průměru 2 ${u} zabírá ${n(area("circulo", 2, 0))} ${us}.`,
    ],
    faq: [
      {
        pregunta: imperial ? "Jak spočítat plochu místnosti ve stopách?" : "Jak spočítat metry čtvereční místnosti?",
        respuesta: imperial
          ? "Změřte délku a šířku ve stopách a vynásobte je. Místnost 12 × 10 ft má 120 ft²."
          : "Změřte délku a šířku v metrech a vynásobte je. Pokoj 4 × 3 m má 12 m².",
      },
      {
        pregunta: "Co když mám rozměry v centimetrech?",
        respuesta: `Nejdřív je převeďte: centimetry vydělte 100 a dostanete metry (palce vydělte 12 a dostanete stopy). 350 cm je ${n(3.5, 1)} m.`,
      },
      {
        pregunta: "Jak převést metry čtvereční na čtvereční stopy?",
        respuesta: `Vynásobte je číslem ${n(FT2_POR_M2)}. 20 m² je ${n(20 * FT2_POR_M2)} ft².`,
      },
    ],
    glosario: [
      { termino: "Metr čtvereční (m²)", definicion: "Plocha čtverce o straně 1 metr." },
      { termino: "Čtvereční stopa (ft²)", definicion: "Plocha čtverce o straně 1 stopa." },
    ],
  };
};
