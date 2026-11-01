import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoLt: ContenidoUniversal = (ctx) => {
  const precio = montoEjemplo(ctx, 80);
  const m = (n: number) => formatearMonto(ctx, n);
  const n = (x: number) => formatearNumero(ctx, x);
  const efectiva = Math.round((1 - 0.7 * 0.9) * 100);
  return {
    h1: "Nuolaidos skaičiuoklė",
    title: tituloQueEntre(`Nuolaidos skaičiuoklė internetu (${ctx.nombrePais})`, "Nuolaidos skaičiuoklė: kaip apskaičiuoti nuolaidą", "Nuolaidos skaičiuoklė"),
    description: "Apskaičiuokite kainą su nuolaida ir kiek sutaupysite, net kai nuolaidos taikomos viena po kitos, pavyzdžiui, 30 % ir dar 10 %.",
    intro: [
      "Įveskite kainą ir nuolaidą, ir iš karto pamatysite, kiek mokėsite ir kiek sutaupysite.",
      "Jei akcija siūlo dar vieną nuolaidą, pridėkite ir ją: dvi nuolaidos iš eilės niekada tiesiog nesusideda.",
    ],
    comoSeCalcula: [
      "Kaina su nuolaida = pradinė kaina × (1 − nuolaida ÷ 100).",
      "Papildoma nuolaida skaičiuojama nuo kainos, jau pritaikius pirmąją nuolaidą.",
      "Sutaupoma suma yra pradinė kaina atėmus kainą su nuolaida.",
    ],
    ejemplo: [
      `Prekė už ${m(precio)} su 25 % nuolaida kainuos ${m(precio * 0.75)}.`,
      `Su 30 % nuolaida ir dar 10 % nuolaida ji kainuos ${m(precio * 0.7 * 0.9)}: bendra nuolaida yra ${n(efectiva)} %, o ne 40 %.`,
    ],
    faq: [
      {
        pregunta: "Kaip apskaičiuoti nuolaidą?",
        respuesta: "Padauginkite kainą iš nuolaidos procento ir padalykite iš 100. Tai sutaupoma suma. Atimkite ją iš kainos ir gausite mokėtiną sumą.",
      },
      {
        pregunta: "Ar 30 % nuolaida ir dar 10 % yra tas pats, kas 40 %?",
        respuesta: `Ne. Antroji nuolaida skaičiuojama nuo jau sumažintos kainos, todėl iš viso išeina ${n(efectiva)} %.`,
      },
      {
        pregunta: "Kaip sužinoti pradinę kainą iš kainos su nuolaida?",
        respuesta: `Padalykite kainą su nuolaida iš reiškinio (1 − nuolaida ÷ 100). Kai nuolaida 25 %, dalykite iš ${formatearNumero(ctx, 0.75, 2)}.`,
      },
    ],
    glosario: [
      { termino: "Nuolaida", definicion: "Procentas, kuriuo sumažinama pradinė kaina." },
      { termino: "Efektyvi nuolaida", definicion: "Bendras sutaupomas procentas, kai taikoma daugiau nei viena nuolaida." },
    ],
  };
};
