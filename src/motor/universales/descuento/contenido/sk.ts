import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSk: ContenidoUniversal = (ctx) => {
  const precio = montoEjemplo(ctx, 80);
  const m = (n: number) => formatearMonto(ctx, n);
  const n = (x: number) => formatearNumero(ctx, x);
  const efectiva = Math.round((1 - 0.7 * 0.9) * 100);
  return {
    h1: "Výpočet zľavy",
    title: tituloQueEntre(`Výpočet zľavy online (${ctx.nombrePais})`, "Výpočet zľavy online: kalkulačka", "Výpočet zľavy"),
    description: "Vypočítajte cenu po zľave a koľko ušetríte, aj keď sa zľavy uplatňujú za sebou, napríklad 30 % a k tomu ďalších 10 %.",
    intro: [
      "Zadajte cenu a zľavu a hneď uvidíte, koľko zaplatíte a koľko ušetríte.",
      "Ak akcia ponúka ešte ďalšiu zľavu, pridajte ju tiež: dve zľavy po sebe sa nikdy len tak nesčítajú.",
    ],
    comoSeCalcula: [
      "Cena po zľave = pôvodná cena × (1 − zľava ÷ 100).",
      "Ďalšia zľava sa počíta z ceny, ktorá je už po prvej zľave.",
      "Úspora je pôvodná cena mínus cena po zľave.",
    ],
    ejemplo: [
      `Tovar za ${m(precio)} so zľavou 25 % vás vyjde na ${m(precio * 0.75)}.`,
      `So zľavou 30 % a potom ešte 10 % vyjde na ${m(precio * 0.7 * 0.9)}: celková zľava je ${n(efectiva)} %, nie 40 %.`,
    ],
    faq: [
      {
        pregunta: "Ako sa počíta zľava?",
        respuesta: "Vynásobte cenu percentom zľavy a vydeľte 100. To je vaša úspora. Odpočítajte ju od ceny a dostanete sumu na zaplatenie.",
      },
      {
        pregunta: "Je zľava 30 % plus 10 % to isté ako 40 %?",
        respuesta: `Nie. Druhá zľava sa počíta z už zníženej ceny, takže spolu vychádza ${n(efectiva)} %.`,
      },
      {
        pregunta: "Ako zistiť pôvodnú cenu z ceny po zľave?",
        respuesta: `Vydeľte cenu po zľave výrazom (1 − zľava ÷ 100). Pri zľave 25 % deľte číslom ${formatearNumero(ctx, 0.75, 2)}.`,
      },
    ],
    glosario: [
      { termino: "Zľava", definicion: "Percento, o ktoré sa znižuje pôvodná cena." },
      { termino: "Efektívna zľava", definicion: "Celkové percento úspory, keď sa uplatní viac ako jedna zľava." },
    ],
  };
};
