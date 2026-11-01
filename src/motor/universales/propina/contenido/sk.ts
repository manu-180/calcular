import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSk: ContenidoUniversal = (ctx) => {
  const cuenta = montoEjemplo(ctx, 60);
  const propina = cuenta * 0.1;
  const m = (n: number) => formatearMonto(ctx, n);
  const n = (x: number) => formatearNumero(ctx, x);
  return {
    h1: "Kalkulačka prepitného",
    title: tituloQueEntre(
      `Kalkulačka prepitného ${GRAMATICA.sk.para(ctx.nombrePais)}`,
      "Koľko nechať prepitné: kalkulačka",
      "Kalkulačka prepitného",
    ),
    description: "Vypočítajte prepitné, celkovú sumu účtu a podiel každého, keď platíte spoločne. Podiel možno zaokrúhliť nahor na celú sumu.",
    intro: [
      "Zadajte sumu na účte, percento prepitného a počet ľudí, ktorí platia. Uvidíte prepitné, celkovú sumu a podiel každého.",
      "Ak máte radšej okrúhle čísla, kalkulačka podiel každého zaokrúhli nahor a rozdiel pripadne na prepitné.",
    ],
    comoSeCalcula: ["Prepitné = účet × percento prepitného ÷ 100.", "Spolu = účet + prepitné.", "Podiel každého je celková suma vydelená počtom ľudí."],
    ejemplo: [
      `K účtu ${m(cuenta)} pridá prepitné 10 % sumu ${m(propina)}, spolu teda ${m(cuenta + propina)}.`,
      `Keď platia traja ľudia, každý zaplatí ${m((cuenta + propina) / 3)}.`,
    ],
    faq: [
      {
        pregunta: "Koľko sa dáva prepitné?",
        respuesta: `Závisí to od miestnych zvyklostí. Zistite, čo je obvyklé ${GRAMATICA.sk.en(ctx.nombrePais)}, a pozrite sa, či účet už neobsahuje poplatok za obsluhu.`,
      },
      {
        pregunta: "Počíta sa prepitné zo sumy s daňou, alebo bez nej?",
        respuesta: "Zvyčajne z celkovej sumy na účte. Ak ho chcete počítať zo sumy bez dane, zadajte tú.",
      },
      {
        pregunta: "Ako rýchlo vypočítať 10 % alebo 15 % prepitné?",
        respuesta: `Účet vydeľte desiatimi, tým máte 10 %. Na 15 % k tomu pripočítajte ešte polovicu. Pri účte 850 je 10 % rovných ${n(850 * 0.1)} a 15 % je ${n(850 * 0.15)}.`,
      },
    ],
    glosario: [
      { termino: "Prepitné", definicion: "Suma navyše, ktorú nechávate za obsluhu nad rámec ceny." },
      { termino: "Poplatok za obsluhu", definicion: "Suma, ktorú podnik už pripočítal k účtu za obsluhu." },
    ],
  };
};
