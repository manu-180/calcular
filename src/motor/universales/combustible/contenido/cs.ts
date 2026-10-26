import { formaCs } from "../../../i18n/plural";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoCs: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const imperial = ctx.unidades === "imperial";
  const litru = (x: number) => formaCs(x, "litr", "litry", "litrů", "litru");
  const galonu = (x: number) => formaCs(x, "galon", "galony", "galonů", "galonu");
  const ejemplo = imperial
    ? (() => {
        const precio = montoEjemplo(ctx, 3.5);
        const galones = 300 / 30;
        return [
          `Na cestu 150 mil tam i zpět potřebuje auto, které ujede 30 mil na galon, ${formatearNumero(ctx, galones)} ${galonu(galones)} paliva.`,
          `Při ceně ${m(precio)} za galon to vyjde na ${m(galones * precio)}. Když se o náklady podělí 2 lidé, každý zaplatí ${m((galones * precio) / 2)}.`,
        ];
      })()
    : (() => {
        const precio = montoEjemplo(ctx, 1.2);
        const litros = (600 * 8) / 100;
        return [
          `Na cestu 300 km tam i zpět potřebuje auto se spotřebou 8 litrů na 100 km ${formatearNumero(ctx, litros)} ${litru(litros)} paliva.`,
          `Při ceně ${m(precio)} za litr to vyjde na ${m(litros * precio)}. Když se o náklady podělí 2 lidé, každý zaplatí ${m((litros * precio) / 2)}.`,
        ];
      })();
  const prevod = Math.round((235.215 / 30) * 10) / 10;
  return {
    h1: "Kalkulačka spotřeby paliva",
    title: tituloQueEntre(
      `Kalkulačka spotřeby paliva (${ctx.nombrePais})`,
      "Kalkulačka spotřeby paliva a nákladů na cestu",
      "Kalkulačka spotřeby paliva",
    ),
    description: "Spočítejte, kolik paliva spotřebujete na cestu a kolik vás bude stát, podle vzdálenosti, spotřeby auta a ceny paliva.",
    intro: [
      `Zadejte vzdálenost, spotřebu svého auta a cenu za ${imperial ? "galon" : "litr"}. Uvidíte, kolik paliva potřebujete a kolik cesta vyjde.`,
      imperial ? "Spotřeba se uvádí v mílích na galon." : "Spotřebu můžete zadat v litrech na 100 km nebo v kilometrech na litr.",
    ],
    comoSeCalcula: imperial
      ? ["Galony = vzdálenost ÷ míle na galon.", "Náklady = galony × cena za galon. Když zvolíte „Tam i zpět“, vzdálenost se zdvojnásobí."]
      : [
          "V litrech na 100 km: litry = vzdálenost × spotřeba ÷ 100.",
          "V kilometrech na litr: litry = vzdálenost ÷ spotřeba.",
          "Náklady = litry × cena za litr. Když zvolíte „Tam i zpět“, vzdálenost se zdvojnásobí.",
        ],
    ejemplo,
    faq: [
      {
        pregunta: "Jak převést míle na galon na litry na 100 km?",
        respuesta: `Vydělte číslo ${formatearNumero(ctx, 235.215, 1)} hodnotou mpg (americký galon). Auto, které ujede 30 mil na galon, spotřebuje zhruba ${formatearNumero(ctx, prevod, 1)} ${litru(prevod)} na 100 km.`,
      },
      {
        pregunta: "Počítá se s mýtným a dálniční známkou?",
        respuesta: "Ne. Počítá se jen palivo. Mýtné, dálniční známku a parkování připočtěte zvlášť.",
      },
      {
        pregunta: "Proč auto ve městě spotřebuje víc?",
        respuesta: "Jízda s častým zastavováním a rozjížděním potřebuje víc energie než jízda po dálnici stálou rychlostí. Proto bývá spotřeba ve městě vyšší.",
      },
    ],
    glosario: [
      { termino: "Spotřeba paliva", definicion: "Kolik paliva auto spotřebuje na určitou vzdálenost nebo kolik ujede na určité množství paliva." },
      { termino: "mpg", definicion: "Míle na galon. Čím vyšší hodnota, tím úspornější auto." },
    ],
  };
};
