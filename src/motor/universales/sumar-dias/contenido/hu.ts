import { conNeveloHu } from "../../../i18n/gramatica";
import { aDia, aFecha, esHabil, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoHu: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const inicio = "2026-03-02";
  const mas90 = aFecha(aDia(inicio) + 90);
  let habil = aDia(inicio);
  for (let n = 0; n < 15; ) if (esHabil(++habil)) n++;
  return {
    h1: "Dátum kalkulátor: napok hozzáadása és kivonása",
    title: tituloQueEntre(
      `Dátum kalkulátor: napok hozzáadása dátumhoz (${ctx.nombrePais})`,
      "Dátum kalkulátor: napok hozzáadása dátumhoz",
      "Dátum kalkulátor",
    ),
    description:
      "Adj hozzá vagy vonj ki naptári napokat vagy munkanapokat egy dátumból, és nézd meg, melyik napra esik az eredmény. Határidőkhöz és fizetési napokhoz.",
    intro: [
      "Válaszd ki a dátumot, a napok számát és azt, hogy hozzáadni vagy kivonni szeretnéd őket. Látod az eredmény dátumát és a hét napját.",
      "Munkanapoknál a kalkulátor kihagyja a szombatot és a vasárnapot.",
    ],
    comoSeCalcula: [
      "Naptári napoknál minden beírt nap egy nappal lépteti tovább a naptárban.",
      "Munkanapoknál csak a hétfőtől péntekig tartó napok számítanak. A kiinduló dátum nem számít bele.",
      "Az ünnepnapokat nem vonja le, mert országonként és régiónként eltérnek.",
    ],
    ejemplo: [
      `Ha ${conNeveloHu(f(inicio))} dátumhoz hozzáadsz 90 naptári napot, az eredmény: ${f(mas90)}.`,
      `Ha ${conNeveloHu(f(inicio))} dátumhoz hozzáadsz 15 munkanapot, az eredmény: ${f(aFecha(habil))}.`,
    ],
    faq: [
      {
        pregunta: "A kiinduló dátum számít az első napnak?",
        respuesta: "Nem. Ha egy hétfőhöz hozzáadsz egy napot, keddet kapsz. A legtöbb határidőt így számolják.",
      },
      {
        pregunta: "Mi történik, ha szombattól adok hozzá munkanapokat?",
        respuesta: "Az első munkanap a következő hétfő. Ha egy szombathoz hozzáadsz egy munkanapot, hétfőt kapsz.",
      },
      {
        pregunta: "Számol a kalkulátor a szökőévekkel?",
        respuesta: "Igen. Ha az időszakba beleesik február 29., az egy nappal többnek számít.",
      },
    ],
    glosario: [
      { termino: "Naptári napok", definicion: "A naptár összes napja, egyiket sem hagyja ki." },
      { termino: "Munkanapok", definicion: "Ebben a kalkulátorban a hétfőtől péntekig tartó napok." },
    ],
  };
};
