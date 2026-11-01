import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { precioConMargen } from "../definicion";

export const contenidoCs: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)} %`;
  const costo = montoEjemplo(ctx, 60);
  const precio = montoEjemplo(ctx, 100);
  return {
    h1: "Výpočet marže a přirážky",
    title: tituloQueEntre(`Výpočet marže ${GRAMATICA.cs.para(ctx.nombrePais)}`, "Výpočet marže a přirážky", "Výpočet marže"),
    description: "Spočítejte marži a přirážku z nákladů a prodejní ceny, nebo prodejní cenu, se kterou dosáhnete požadované marže.",
    intro: [
      "Marže a přirážka se často pletou a ten rozdíl vás může stát peníze. Obě měří stejný zisk, jen vůči jinému základu.",
      "Zadejte náklady a prodejní cenu a uvidíte obojí. Nebo zvolte marži a kalkulačka vám řekne, za kolik prodávat.",
    ],
    comoSeCalcula: [
      "Zisk = prodejní cena − náklady.",
      "Marže = zisk ÷ prodejní cena × 100.",
      "Přirážka = zisk ÷ náklady × 100.",
      "Cena pro požadovanou marži = náklady ÷ (1 − marže ÷ 100).",
    ],
    ejemplo: [
      `Výrobek s náklady ${m(costo)} prodávaný za ${m(precio)} přinese zisk ${m(precio - costo)}: marže je ${p(((precio - costo) / precio) * 100)} a přirážka ${p(((precio - costo) / costo) * 100)}.`,
      `Pro marži 50 % při stejných nákladech musíte prodávat za ${m(precioConMargen(costo, 50))}. Když k nákladům jen přičtete 50 %, marže bude pouze ${p(100 / 3)}.`,
    ],
    faq: [
      {
        pregunta: "Jaký je rozdíl mezi marží a přirážkou?",
        respuesta: "Marže je zisk vztažený k prodejní ceně. Přirážka je zisk vztažený k nákladům. Při stejném zisku je přirážka vždy vyšší číslo.",
      },
      {
        pregunta: "Jak nastavit cenu pro požadovanou marži?",
        respuesta: `Vydělte náklady výrazem (1 − marže). Pro marži 30 % vydělte náklady číslem ${formatearNumero(ctx, 0.7, 2)}. Nepřičítejte k nákladům 30 %: vydělali byste méně, než čekáte.`,
      },
      {
        pregunta: "Mají náklady zahrnovat daně?",
        respuesta: "Počítejte s náklady i cenou bez daní, které přenášíte na zákazníka, například bez DPH. Jinak marže vyjde vyšší, než skutečně je.",
      },
    ],
    glosario: [
      { termino: "Marže", definicion: "Zisk v procentech z prodejní ceny." },
      { termino: "Přirážka", definicion: "Zisk v procentech z nákladů." },
    ],
  };
};
