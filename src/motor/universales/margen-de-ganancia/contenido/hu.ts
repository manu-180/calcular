import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { precioConMargen } from "../definicion";

export const contenidoHu: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  const costo = montoEjemplo(ctx, 60);
  const precio = montoEjemplo(ctx, 100);
  return {
    h1: "Árrés kalkulátor",
    title: tituloQueEntre(`Árrés kalkulátor (${ctx.nombrePais})`, `Árrés számítás (${ctx.nombrePais})`, "Árrés kalkulátor"),
    description: "Árrés számítás egyszerűen: árrésszint és haszonkulcs a beszerzési árból és az eladási árból, vagy az eladási ár, amellyel eléred a kívánt árrést.",
    intro: [
      "Az árrésszintet és a haszonkulcsot sokan összekeverik, és ez pénzbe kerülhet. Mindkettő ugyanazt a hasznot méri, csak más alaphoz viszonyítva.",
      "Írd be a beszerzési árat és az eladási árat, és mindkettőt megmutatjuk. Vagy válassz egy árrésszintet, és megmondjuk, mennyiért kell eladnod.",
    ],
    comoSeCalcula: [
      "Árrés = eladási ár − beszerzési ár.",
      "Árrésszint = árrés ÷ eladási ár × 100.",
      "Haszonkulcs = árrés ÷ beszerzési ár × 100.",
      "Eladási ár a kívánt árrésszinthez = beszerzési ár ÷ (1 − árrésszint ÷ 100).",
    ],
    ejemplo: [
      `Egy termék beszerzési ára ${m(costo)}, eladási ára ${m(precio)}. Az árrés ${m(precio - costo)}, az árrésszint ${p(((precio - costo) / precio) * 100)}, a haszonkulcs ${p(((precio - costo) / costo) * 100)}.`,
      `Ha ugyanerre a beszerzési árra 50 százalék árrésszintet szeretnél, ennyiért kell eladnod: ${m(precioConMargen(costo, 50))}. Ha csak 50 százalékot teszel a beszerzési árra, az árrésszint mindössze ${p(100 / 3)} lesz.`,
    ],
    faq: [
      {
        pregunta: "Mi a különbség az árrésszint és a haszonkulcs között?",
        respuesta: "Az árrésszint a haszon az eladási árhoz viszonyítva. A haszonkulcs a haszon a beszerzési árhoz viszonyítva. Ugyanakkora haszonnál a haszonkulcs mindig a nagyobb szám.",
      },
      {
        pregunta: "Hogyan állapítom meg az árat a kívánt árrésszinthez?",
        respuesta: `Oszd el a beszerzési árat ezzel: (1 − árrésszint). Ha 30 százalék árrésszintet szeretnél, oszd el a beszerzési árat ennyivel: ${formatearNumero(ctx, 0.7, 2)}. Ne csak 30 százalékot tegyél rá, mert kevesebbet keresnél, mint gondolod.`,
      },
      {
        pregunta: "Az ÁFA-t bele kell számolni?",
        respuesta: "A beszerzési árat és az eladási árat a vevőre áthárított adó (például ÁFA) nélkül add meg. Különben az árrés nagyobbnak látszik, mint amekkora valójában.",
      },
    ],
    glosario: [
      { termino: "Árrésszint", definicion: "A haszon az eladási ár százalékában." },
      { termino: "Haszonkulcs", definicion: "A haszon a beszerzési ár százalékában." },
    ],
  };
};
