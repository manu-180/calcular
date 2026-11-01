import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { MARGEN } from "../definicion";

export const contenidoSk: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const neta = 48 * 8 - 40;
        const gal = (neta * 2) / 350;
        return [
          `Miestnosť so stenami s dĺžkou 48 ft, výškou 8 ft a so 40 ft² dverí a okien má na maľovanie ${n(neta, 0)} ft².`,
          `Pri 2 náteroch a farbe s výdatnosťou 350 ft² na galón potrebujete ${n(gal, 2)} galónu. S rezervou ${n(gal * (1 + MARGEN), 2)} galónu.`,
        ];
      })()
    : (() => {
        const neta = 14 * 2.6 - 4;
        const litros = (neta * 2) / 10;
        return [
          `Miestnosť so stenami s dĺžkou 14 m, výškou ${n(2.6)} m a so 4 m² dverí a okien má na maľovanie ${n(neta)} m².`,
          `Pri 2 náteroch a farbe s výdatnosťou 10 m² na liter potrebujete ${n(litros, 2)} litra. S rezervou ${n(litros * (1 + MARGEN), 2)} litra.`,
        ];
      })();
  return {
    h1: "Kalkulačka spotreby farby",
    title: tituloQueEntre(`Spotreba farby: kalkulačka ${GRAMATICA.sk.para(ctx.nombrePais)}`, "Kalkulačka spotreby farby", "Spotreba farby"),
    description: "Vypočítajte, koľko farby potrebujete na steny podľa ich rozmerov, dverí a okien, počtu náterov a výdatnosti uvedenej na obale.",
    intro: [
      "Zadajte dĺžku a výšku stien (alebo rovno plochu), koľko zaberajú dvere a okná a koľko náterov plánujete.",
      "Kalkulačka pridá 10 % navyše, aby vám farba nedošla v polovici práce.",
    ],
    comoSeCalcula: [
      "Plocha = celková dĺžka stien × výška, bez dverí a okien.",
      "Farba = plocha × počet náterov ÷ výdatnosť.",
      `Nakoniec sa pridá rezerva ${n(MARGEN * 100, 0)} %.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Koľko metrov štvorcových pokryje liter farby?",
        respuesta: "Bežná interiérová farba pokryje jedným náterom približne 8 až 12 m² na liter. Presný údaj nájdete na obale.",
      },
      {
        pregunta: "Koľko náterov treba?",
        respuesta: "Zvyčajne dva. Nová omietka, veľmi savé steny alebo výrazná zmena farby môžu vyžadovať tretí náter.",
      },
      {
        pregunta: "Mám odpočítavať dvere a okná?",
        respuesta: "Áno, ak sú veľké. Malé okná je lepšie neodpočítavať: prebytok pokryje hrany a zatieranie rohov.",
      },
    ],
    glosario: [
      { termino: "Výdatnosť", definicion: "Koľko plochy pokryje liter farby jedným náterom." },
      { termino: "Náter", definicion: "Každá vrstva farby nanesená na stenu." },
    ],
  };
};
