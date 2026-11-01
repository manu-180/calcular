import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSk: ContenidoUniversal = (ctx) => {
  const precio = montoEjemplo(ctx, 50);
  const m = (n: number) => formatearMonto(ctx, n);
  const n = (x: number) => formatearNumero(ctx, x, 0);
  return {
    h1: "Výpočet percent",
    title: tituloQueEntre(`Výpočet percent: kalkulačka ${GRAMATICA.sk.para(ctx.nombrePais)}`, "Výpočet percent: kalkulačka", "Výpočet percent"),
    description: "Vypočítajte percento z čísla, koľko percent tvorí jedno číslo z druhého a výsledok po pripočítaní alebo odpočítaní percent.",
    intro: [
      "Vyberte, čo chcete zistiť, zadajte obe čísla a výsledok uvidíte hneď.",
      "Kalkulačka pokrýva štyri bežné výpočty s percentami: časť, podiel, zvýšenie a zníženie.",
    ],
    comoSeCalcula: [
      "X % z Y = X × Y ÷ 100.",
      "Koľko percent z Y je X = X ÷ Y × 100.",
      "Y plus X % = Y × (1 + X ÷ 100). Y mínus X % = Y × (1 − X ÷ 100).",
    ],
    ejemplo: [
      `15 % z 200 je ${n((15 * 200) / 100)}.`,
      `30 je ${n((30 / 120) * 100)} % zo 120.`,
      `Cena ${m(precio)} sa po zdražení o 10 % zvýši na ${m(precio * 1.1)}.`,
    ],
    faq: [
      {
        pregunta: "Ako vypočítať percento z čísla?",
        respuesta: `Číslo vynásobte percentom a vydeľte 100. 20 % z 350 je 350 × 20 ÷ 100 = ${n((350 * 20) / 100)}.`,
      },
      {
        pregunta: "Ako zistiť, koľko percent tvorí jedno číslo z druhého?",
        respuesta: `Vydeľte časť celkom a vynásobte 100. Ak máte v teste správne 45 otázok zo 60, je to 45 ÷ 60 × 100 = ${n((45 / 60) * 100)} %.`,
      },
      {
        pregunta: "Ako k cene pripočítať percentá?",
        respuesta: `Vynásobte ju číslom 1 plus percento ako desatinné číslo. Na pripočítanie 10 % násobte číslom ${formatearNumero(ctx, 1.1, 2)}.`,
      },
      {
        pregunta: "Keď cenu zvýšim o 10 % a potom znížim o 10 %, vrátim sa na začiatok?",
        respuesta: `Nie. 100 plus 10 % je ${n(110)} a ${n(110)} mínus 10 % je ${n(99)}. Zníženie sa totiž počíta z vyššieho čísla.`,
      },
    ],
    glosario: [
      { termino: "Percento", definicion: "Časť celku vyjadrená v stotinách." },
      { termino: "Základ", definicion: "Číslo, z ktorého sa percento počíta (v tejto kalkulačke Y)." },
    ],
  };
};
