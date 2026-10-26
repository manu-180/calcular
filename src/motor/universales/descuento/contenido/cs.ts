import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoCs: ContenidoUniversal = (ctx) => {
  const precio = montoEjemplo(ctx, 80);
  const m = (n: number) => formatearMonto(ctx, n);
  const n = (x: number) => formatearNumero(ctx, x);
  const efectiva = Math.round((1 - 0.7 * 0.9) * 100);
  return {
    h1: "Výpočet slevy",
    title: tituloQueEntre(`Výpočet slevy online (${ctx.nombrePais})`, "Výpočet slevy online: kalkulačka", "Výpočet slevy"),
    description: "Spočítejte cenu po slevě a kolik ušetříte, i když se slevy sčítají za sebou, třeba 30 % a k tomu dalších 10 %.",
    intro: [
      "Zadejte cenu a slevu a hned uvidíte, kolik zaplatíte a kolik ušetříte.",
      "Pokud akce nabízí ještě další slevu, přidejte ji také: dvě slevy po sobě se nikdy jen tak nesečtou.",
    ],
    comoSeCalcula: [
      "Cena po slevě = původní cena × (1 − sleva ÷ 100).",
      "Další sleva se počítá z ceny, která už je po první slevě.",
      "Úspora je původní cena minus cena po slevě.",
    ],
    ejemplo: [
      `Zboží za ${m(precio)} se slevou 25 % vás vyjde na ${m(precio * 0.75)}.`,
      `Se slevou 30 % a pak ještě 10 % vyjde na ${m(precio * 0.7 * 0.9)}: celková sleva je ${n(efectiva)} %, ne 40 %.`,
    ],
    faq: [
      {
        pregunta: "Jak se počítá sleva?",
        respuesta: "Vynásobte cenu procentem slevy a vydělte 100. To je vaše úspora. Odečtěte ji od ceny a dostanete částku k zaplacení.",
      },
      {
        pregunta: "Je sleva 30 % plus 10 % totéž co 40 %?",
        respuesta: `Ne. Druhá sleva se počítá z už zlevněné ceny, takže celkem vychází ${n(efectiva)} %.`,
      },
      {
        pregunta: "Jak zjistit původní cenu z ceny po slevě?",
        respuesta: `Vydělte cenu po slevě výrazem (1 − sleva ÷ 100). U slevy 25 % dělte číslem ${formatearNumero(ctx, 0.75, 2)}.`,
      },
    ],
    glosario: [
      { termino: "Sleva", definicion: "Procento, o které se snižuje původní cena." },
      { termino: "Efektivní sleva", definicion: "Celkové procento úspory, když se uplatní víc než jedna sleva." },
    ],
  };
};
