import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aporteNecesario } from "../definicion";

export const contenidoLt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const meta = montoEjemplo(ctx, 10000);
  const actual = montoEjemplo(ctx, 1000);
  return {
    h1: "Taupymo tikslo skaičiuoklė",
    title: tituloQueEntre(`Taupymo tikslo skaičiuoklė ${GRAMATICA.lt.en(ctx.nombrePais)}`, "Taupymo tikslo skaičiuoklė", "Taupymo tikslas"),
    description: "Sužinokite, kiek atidėti per mėnesį, kad reikiamą sumą sutaupytumėte laiku, įvertinant tai, ką jau turite, ir santaupų palūkanas.",
    intro: [
      "Atostogos, automobilis, pradinis įnašas būsto paskolai ar rezervas netikėtoms išlaidoms. Tikslą su konkrečia suma ir data pasiekti daug lengviau.",
      "Įveskite, kiek norite sutaupyti ir per kiek mėnesių. Skaičiuoklė parodys, kiek atidėti per mėnesį ir kiek per savaitę.",
    ],
    comoSeCalcula: [
      "Pirmiausia apskaičiuojama, kiek iki laikotarpio pabaigos išaugs jau turimos santaupos.",
      "Tai, ko dar trūksta, padalijama į vienodas mėnesines įmokas.",
      "Jei santaupos neša palūkanas, uždirba ir kiekviena įmoka, todėl pakanka atidėti šiek tiek mažiau.",
    ],
    ejemplo: [
      `Kad 24 mėnesių laikotarpiu be palūkanų sutaupytumėte ${m(meta)}, per mėnesį reikia atidėti ${m(meta / 24)}.`,
      `Jei jau turite ${m(actual)}, o santaupų metinė grąža yra 5 %, pakanka ${m(aporteNecesario(meta, actual, 24, 5))} per mėnesį.`,
    ],
    faq: [
      {
        pregunta: "Kaip laikytis taupymo tikslo?",
        respuesta: "Pinigus atidėkite iš karto po atlyginimo, dar prieš pradedant leisti. Jei galite, nustatykite periodinį pavedimą į atskirą taupomąją sąskaitą.",
      },
      {
        pregunta: "Ką daryti, jei mėnesio suma per didelė?",
        respuesta: "Skirkite daugiau laiko arba sumažinkite tikslą. Taip pat galite pradėti nuo to, ką pajėgiate, ir padidinti įmoką, kai augs pajamos.",
      },
      {
        pregunta: "Ar reikia atsižvelgti į infliaciją?",
        respuesta: "Jei tikslas nutolęs keleriais metais, prie sumos pridėkite numatomą infliaciją. Tai, kas šiandien kainuoja 100, po kelerių metų gali kainuoti pastebimai daugiau.",
      },
    ],
    glosario: [
      { termino: "Įmoka", definicion: "Pinigai, kuriuos tikslui atidedate kas mėnesį." },
      { termino: "Grąža", definicion: "Kiek santaupos uždirba sąskaitoje arba investicijoje." },
    ],
  };
};
