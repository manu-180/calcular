import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { MARGEN } from "../definicion";

export const contenidoCs: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const neta = 48 * 8 - 40;
        const gal = (neta * 2) / 350;
        return [
          `Místnost se stěnami o délce 48 ft, výšce 8 ft a s 40 ft² dveří a oken má k malování ${n(neta, 0)} ft².`,
          `Při 2 nátěrech a barvě s vydatností 350 ft² na galon potřebujete ${n(gal, 2)} galonu. S rezervou ${n(gal * (1 + MARGEN), 2)} galonu.`,
        ];
      })()
    : (() => {
        const neta = 14 * 2.6 - 4;
        const litros = (neta * 2) / 10;
        return [
          `Místnost se stěnami o délce 14 m, výšce ${n(2.6)} m a se 4 m² dveří a oken má k malování ${n(neta)} m².`,
          `Při 2 nátěrech a barvě s vydatností 10 m² na litr potřebujete ${n(litros, 2)} litru. S rezervou ${n(litros * (1 + MARGEN), 2)} litru.`,
        ];
      })();
  return {
    h1: "Kalkulačka spotřeby barvy",
    title: tituloQueEntre(`Spotřeba barvy: kalkulačka ${GRAMATICA.cs.para(ctx.nombrePais)}`, "Kalkulačka spotřeby barvy", "Spotřeba barvy"),
    description: "Spočítejte, kolik barvy potřebujete na stěny podle jejich rozměrů, dveří a oken, počtu nátěrů a vydatnosti uvedené na obalu.",
    intro: [
      "Zadejte délku a výšku stěn (nebo rovnou plochu), kolik zabírají dveře a okna a kolik nátěrů plánujete.",
      "Kalkulačka přidá 10 % navíc, aby vám barva nedošla v půlce práce.",
    ],
    comoSeCalcula: [
      "Plocha = celková délka stěn × výška, bez dveří a oken.",
      "Barva = plocha × počet nátěrů ÷ vydatnost.",
      `Nakonec se přidá rezerva ${n(MARGEN * 100, 0)} %.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Kolik metrů čtverečních pokryje litr barvy?",
        respuesta: "Běžná interiérová barva pokryje jedním nátěrem zhruba 8 až 12 m² na litr. Přesný údaj najdete na obalu.",
      },
      {
        pregunta: "Kolik nátěrů je potřeba?",
        respuesta: "Obvykle dva. Nová omítka, hodně savé stěny nebo výrazná změna barvy mohou potřebovat třetí nátěr.",
      },
      {
        pregunta: "Mám odečítat dveře a okna?",
        respuesta: "Ano, pokud jsou velké. Malá okna je lepší neodečítat: přebytek pokryje hrany a zatírání rohů.",
      },
    ],
    glosario: [
      { termino: "Vydatnost", definicion: "Kolik plochy pokryje litr barvy jedním nátěrem." },
      { termino: "Nátěr", definicion: "Každá vrstva barvy nanesená na stěnu." },
    ],
  };
};
