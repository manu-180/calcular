import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoCs: ContenidoUniversal = (ctx) => {
  const precio = montoEjemplo(ctx, 50);
  const m = (n: number) => formatearMonto(ctx, n);
  const n = (x: number) => formatearNumero(ctx, x, 0);
  return {
    h1: "Výpočet procent",
    title: tituloQueEntre(`Výpočet procent: kalkulačka ${GRAMATICA.cs.para(ctx.nombrePais)}`, "Výpočet procent: kalkulačka", "Výpočet procent"),
    description: "Spočítejte procento z čísla, kolik procent tvoří jedno číslo z druhého a výsledek po přičtení nebo odečtení procent.",
    intro: [
      "Vyberte, co chcete zjistit, zadejte obě čísla a výsledek uvidíte hned.",
      "Kalkulačka pokrývá čtyři běžné výpočty s procenty: část, podíl, zvýšení a snížení.",
    ],
    comoSeCalcula: [
      "X % z Y = X × Y ÷ 100.",
      "Kolik procent z Y je X = X ÷ Y × 100.",
      "Y plus X % = Y × (1 + X ÷ 100). Y minus X % = Y × (1 − X ÷ 100).",
    ],
    ejemplo: [
      `15 % z 200 je ${n((15 * 200) / 100)}.`,
      `30 je ${n((30 / 120) * 100)} % ze 120.`,
      `Cena ${m(precio)} se po zdražení o 10 % zvýší na ${m(precio * 1.1)}.`,
    ],
    faq: [
      {
        pregunta: "Jak spočítat procento z čísla?",
        respuesta: `Číslo vynásobte procentem a vydělte 100. 20 % z 350 je 350 × 20 ÷ 100 = ${n((350 * 20) / 100)}.`,
      },
      {
        pregunta: "Jak zjistit, kolik procent tvoří jedno číslo z druhého?",
        respuesta: `Vydělte část celkem a vynásobte 100. Pokud máte v testu správně 45 otázek z 60, je to 45 ÷ 60 × 100 = ${n((45 / 60) * 100)} %.`,
      },
      {
        pregunta: "Jak k ceně přičíst procenta?",
        respuesta: `Vynásobte ji číslem 1 plus procento jako desetinné číslo. Pro přičtení 10 % násobte ${formatearNumero(ctx, 1.1, 2)}.`,
      },
      {
        pregunta: "Když cenu zvýším o 10 % a pak snížím o 10 %, vrátím se na začátek?",
        respuesta: `Ne. 100 plus 10 % je ${n(110)} a ${n(110)} minus 10 % je ${n(99)}. Snížení se totiž počítá z vyššího čísla.`,
      },
    ],
    glosario: [
      { termino: "Procento", definicion: "Část celku vyjádřená v setinách." },
      { termino: "Základ", definicion: "Číslo, ze kterého se procento počítá (v této kalkulačce Y)." },
    ],
  };
};
