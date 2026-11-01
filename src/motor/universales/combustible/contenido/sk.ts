import { formaSk } from "../../../i18n/plural";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSk: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const imperial = ctx.unidades === "imperial";
  const litrov = (x: number) => formaSk(x, "liter", "litre", "litrov", "litra");
  const galonov = (x: number) => formaSk(x, "galón", "galóny", "galónov", "galónu");
  const ejemplo = imperial
    ? (() => {
        const precio = montoEjemplo(ctx, 3.5);
        const galones = 300 / 30;
        return [
          `Na cestu 150 míľ tam aj späť potrebuje auto, ktoré prejde 30 míľ na galón, ${formatearNumero(ctx, galones)} ${galonov(galones)} paliva.`,
          `Pri cene ${m(precio)} za galón to vyjde na ${m(galones * precio)}. Ak sa o náklady podelia 2 ľudia, každý zaplatí ${m((galones * precio) / 2)}.`,
        ];
      })()
    : (() => {
        const precio = montoEjemplo(ctx, 1.2);
        const litros = (600 * 8) / 100;
        return [
          `Na cestu 300 km tam aj späť potrebuje auto so spotrebou 8 litrov na 100 km ${formatearNumero(ctx, litros)} ${litrov(litros)} paliva.`,
          `Pri cene ${m(precio)} za liter to vyjde na ${m(litros * precio)}. Ak sa o náklady podelia 2 ľudia, každý zaplatí ${m((litros * precio) / 2)}.`,
        ];
      })();
  const prevod = Math.round((235.215 / 30) * 10) / 10;
  return {
    h1: "Kalkulačka spotreby paliva",
    title: tituloQueEntre(
      `Kalkulačka spotreby paliva (${ctx.nombrePais})`,
      "Kalkulačka spotreby paliva a nákladov na cestu",
      "Kalkulačka spotreby paliva",
    ),
    description: "Vypočítajte, koľko paliva spotrebujete na cestu a koľko vás bude stáť, podľa vzdialenosti, spotreby auta a ceny paliva.",
    intro: [
      `Zadajte vzdialenosť, spotrebu svojho auta a cenu za ${imperial ? "galón" : "liter"}. Uvidíte, koľko paliva potrebujete a koľko cesta vyjde.`,
      imperial ? "Spotreba sa uvádza v míľach na galón." : "Spotrebu môžete zadať v litroch na 100 km alebo v kilometroch na liter.",
    ],
    comoSeCalcula: imperial
      ? ["Galóny = vzdialenosť ÷ míle na galón.", "Náklady = galóny × cena za galón. Keď zvolíte „Tam aj späť“, vzdialenosť sa zdvojnásobí."]
      : [
          "V litroch na 100 km: litre = vzdialenosť × spotreba ÷ 100.",
          "V kilometroch na liter: litre = vzdialenosť ÷ spotreba.",
          "Náklady = litre × cena za liter. Keď zvolíte „Tam aj späť“, vzdialenosť sa zdvojnásobí.",
        ],
    ejemplo,
    faq: [
      {
        pregunta: "Ako previesť míle na galón na litre na 100 km?",
        respuesta: `Vydeľte číslo ${formatearNumero(ctx, 235.215, 1)} hodnotou mpg (americký galón). Auto, ktoré prejde 30 míľ na galón, spotrebuje približne ${formatearNumero(ctx, prevod, 1)} ${litrov(prevod)} na 100 km.`,
      },
      {
        pregunta: "Počíta sa s mýtom a diaľničnou známkou?",
        respuesta: "Nie. Počíta sa len palivo. Mýto, diaľničnú známku a parkovanie pripočítajte zvlášť.",
      },
      {
        pregunta: "Prečo auto v meste spotrebuje viac?",
        respuesta: "Jazda s častým zastavovaním a rozbiehaním potrebuje viac energie ako jazda po diaľnici stálou rýchlosťou. Preto býva spotreba v meste vyššia.",
      },
    ],
    glosario: [
      { termino: "Spotreba paliva", definicion: "Koľko paliva auto spotrebuje na určitú vzdialenosť alebo koľko prejde na určité množstvo paliva." },
      { termino: "mpg", definicion: "Míle na galón. Čím vyššia hodnota, tým úspornejšie auto." },
    ],
  };
};
