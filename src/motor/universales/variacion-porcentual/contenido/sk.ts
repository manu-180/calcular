import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSk: ContenidoUniversal = (ctx) => {
  const antes = montoEjemplo(ctx, 40);
  const despues = antes * 1.25;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Kalkulačka percentuálnej zmeny",
    title: tituloQueEntre(
      `Percentuálna zmena: kalkulačka ${GRAMATICA.sk.para(ctx.nombrePais)}`,
      "O koľko percent: výpočet percentuálnej zmeny",
      "Kalkulačka percentuálnej zmeny",
    ),
    description: "Vypočítajte, o koľko percent hodnota vzrástla alebo klesla: ceny, mzdy, tržby alebo akékoľvek číslo, ktoré sa v čase zmenilo.",
    intro: [
      "Zadajte pôvodnú a novú hodnotu. Uvidíte percentuálny nárast alebo pokles a rozdiel.",
      "Ukáže aj, o koľko by sa hodnota musela zmeniť, aby sa vrátila na pôvodnú. Takmer nikdy to nie je rovnaké percento.",
    ],
    comoSeCalcula: [
      "Percentuálna zmena = (nová hodnota − pôvodná hodnota) ÷ pôvodná hodnota × 100.",
      "Kladný výsledok znamená nárast, záporný pokles.",
      "Ak je pôvodná hodnota záporná, delí sa jej absolútnou hodnotou, aby znamienko naďalej ukazovalo, či sa situácia zlepšila.",
    ],
    ejemplo: [
      `Čo stálo ${m(antes)} a teraz stojí ${m(despues)}, zdraželo o 25 %.`,
      "Aby sa cena vrátila na pôvodnú, musela by klesnúť o 20 %, nie o 25 %.",
    ],
    faq: [
      {
        pregunta: "Ako vypočítať percentuálny nárast?",
        respuesta: "Od novej hodnoty odpočítajte pôvodnú, výsledok vydeľte pôvodnou hodnotou a vynásobte číslom 100. Z 80 na 100: 20 ÷ 80 × 100 = 25 %.",
      },
      {
        pregunta: "Ako vypočítať percentuálny pokles?",
        respuesta: "Počíta sa rovnako. Zo 100 na 80: −20 ÷ 100 × 100 = −20 %, hodnota teda klesla o 20 %.",
      },
      {
        pregunta: "Prečo sa nárast o 25 % a pokles o 25 % navzájom nevynulujú?",
        respuesta: "Každé percento sa počíta z iného základu. 80 plus 25 % je 100, ale 100 mínus 25 % je 75.",
      },
      {
        pregunta: "Aký je rozdiel medzi percentom a percentuálnym bodom?",
        respuesta: "Keď sadzba stúpne z 10 % na 12 %, vzrástla o 2 percentuálne body. Percentuálne vzrástla o 20 %.",
      },
    ],
    glosario: [
      { termino: "Percentuálna zmena", definicion: "O koľko sa hodnota zmenila, vyjadrené v percentách východiskovej hodnoty." },
      { termino: "Percentuálny bod", definicion: "Jednoduchý rozdiel medzi dvoma percentuálnymi hodnotami." },
    ],
  };
};
