import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoCs: ContenidoUniversal = (ctx) => {
  const antes = montoEjemplo(ctx, 40);
  const despues = antes * 1.25;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Kalkulačka procentuální změny",
    title: tituloQueEntre(
      `Procentuální změna: kalkulačka ${GRAMATICA.cs.para(ctx.nombrePais)}`,
      "O kolik procent: výpočet procentuální změny",
      "Kalkulačka procentuální změny",
    ),
    description: "Spočítejte, o kolik procent hodnota vzrostla nebo klesla: ceny, mzdy, tržby nebo jakékoli číslo, které se v čase změnilo.",
    intro: [
      "Zadejte původní a novou hodnotu. Uvidíte procentuální nárůst nebo pokles a rozdíl.",
      "Ukáže také, o kolik by se hodnota musela změnit, aby se vrátila na původní. Skoro nikdy to není stejné procento.",
    ],
    comoSeCalcula: [
      "Procentuální změna = (nová hodnota − původní hodnota) ÷ původní hodnota × 100.",
      "Kladný výsledek znamená nárůst, záporný pokles.",
      "Pokud je původní hodnota záporná, dělí se její absolutní hodnotou, aby znaménko dál ukazovalo, jestli se situace zlepšila.",
    ],
    ejemplo: [
      `Co stálo ${m(antes)} a teď stojí ${m(despues)}, zdražilo o 25 %.`,
      "Aby se cena vrátila na původní, musela by klesnout o 20 %, ne o 25 %.",
    ],
    faq: [
      {
        pregunta: "Jak spočítat procentuální nárůst?",
        respuesta: "Od nové hodnoty odečtěte původní, výsledek vydělte původní hodnotou a vynásobte 100. Z 80 na 100: 20 ÷ 80 × 100 = 25 %.",
      },
      {
        pregunta: "Jak spočítat procentuální pokles?",
        respuesta: "Počítá se stejně. Ze 100 na 80: −20 ÷ 100 × 100 = −20 %, hodnota tedy klesla o 20 %.",
      },
      {
        pregunta: "Proč se nárůst o 25 % a pokles o 25 % navzájem nevyruší?",
        respuesta: "Každé procento se počítá z jiného základu. 80 plus 25 % je 100, ale 100 minus 25 % je 75.",
      },
      {
        pregunta: "Jaký je rozdíl mezi procentem a procentním bodem?",
        respuesta: "Když sazba stoupne z 10 % na 12 %, vzrostla o 2 procentní body. Procentuálně vzrostla o 20 %.",
      },
    ],
    glosario: [
      { termino: "Procentuální změna", definicion: "O kolik se hodnota změnila, vyjádřeno v procentech výchozí hodnoty." },
      { termino: "Procentní bod", definicion: "Prostý rozdíl mezi dvěma procenty." },
    ],
  };
};
