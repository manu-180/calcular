import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { area, FT2_POR_M2 } from "../definicion";

export const contenidoHu: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "ft" : "m";
  const us = imperial ? "ft²" : "m²";
  const enL = imperial ? area("rectangulo", 16, 12) + area("rectangulo", 10, 6) : area("rectangulo", 5, 4) + area("rectangulo", 3, 2);
  return {
    h1: imperial ? "Terület kalkulátor négyzetlábban" : "Négyzetméter kalkulátor",
    title: imperial
      ? tituloQueEntre(`Terület kalkulátor négyzetlábban: ${ctx.nombrePais}`, "Terület kalkulátor négyzetlábban")
      : tituloQueEntre(`Négyzetméter kalkulátor: ${ctx.nombrePais}`, "Négyzetméter kalkulátor: alapterület számítás", "Négyzetméter kalkulátor"),
    description: "Számold ki egy szoba, padló vagy telek területét: téglalap, háromszög és kör, akár öt alakzat összeadva.",
    intro: [
      "Válaszd ki az alakzatot, és add meg a méreteit. Ha a tér nem egyszerű téglalap, oszd részekre, és a kalkulátor összeadja őket.",
      imperial ? "Az eredményt négyzetméterben is mutatjuk." : "Az eredményt négyzetlábban is mutatjuk.",
    ],
    comoSeCalcula: [
      "Téglalap: hossz × szélesség.",
      "Háromszög: alap × magasság ÷ 2.",
      `Kör: π × sugár × sugár, ahol a sugár az átmérő fele. 1 m² = ${n(FT2_POR_M2)} ft².`,
    ],
    ejemplo: [
      imperial
        ? `Egy L alakú nappali felosztható egy 16 × 12 ft és egy 10 × 6 ft méretű téglalapra. A kettő együtt: ${n(enL, 0)} ft².`
        : `Egy L alakú nappali felosztható egy 5 × 4 m és egy 3 × 2 m méretű téglalapra. A kettő együtt: ${n(enL, 0)} m².`,
      `Egy 2 ${u} átmérőjű kerek asztal területe: ${n(area("circulo", 2, 0))} ${us}.`,
    ],
    faq: [
      {
        pregunta: imperial ? "Hogyan számolom ki egy szoba területét négyzetlábban?" : "Hogyan számolom ki egy szoba négyzetméterét?",
        respuesta: imperial
          ? "Mérd meg a hosszát és a szélességét lábban, és szorozd össze őket. Egy 12 × 10 ft méretű szoba területe 120 ft²."
          : "Mérd meg a hosszát és a szélességét méterben, és szorozd össze őket. Egy 4 × 3 m méretű szoba területe 12 m².",
      },
      {
        pregunta: "Mi a teendő, ha centiméterben vannak a méreteim?",
        respuesta: `Először váltsd át őket: a centimétert oszd el százzal, és métert kapsz (a hüvelyket tizenkettővel, és lábat kapsz). 350 cm = ${n(3.5, 1)} m.`,
      },
      {
        pregunta: "Hogyan váltom át a négyzetmétert négyzetlábra?",
        respuesta: `Szorozd meg ezzel a számmal: ${n(FT2_POR_M2)}. 20 m² = ${n(20 * FT2_POR_M2)} ft².`,
      },
    ],
    glosario: [
      { termino: "Négyzetméter (m²)", definicion: "Egy 1 méter oldalú négyzet területe." },
      { termino: "Négyzetláb (ft²)", definicion: "Egy 1 láb oldalú négyzet területe." },
    ],
  };
};
