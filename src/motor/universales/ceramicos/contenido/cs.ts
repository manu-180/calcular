import { pluralCs } from "../../../i18n/plural";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoCs: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const dlazdice = (k: number) => pluralCs(k, "dlaždice", "dlaždice", "dlaždic");
  const krabice = (k: number) => pluralCs(k, "krabici", "krabice", "krabic");
  const ejemplo = imperial
    ? (() => {
        const piezas = Math.ceil((150 * 1.1) / 1 - 1e-9);
        return [
          `Na plochu 150 ft² s dlaždicemi 12 × 12 in (každá má 1 ft²) a rezervou 10 % potřebujete ${dlazdice(piezas)}.`,
          `Pokud je v krabici 10 dlaždic, kupte ${krabice(Math.ceil(piezas / 10))}.`,
        ];
      })()
    : (() => {
        const pieza = 0.6 * 0.6;
        const piezas = Math.ceil((20 * 1.1) / pieza - 1e-9);
        return [
          `Na plochu 20 m² s dlaždicemi 60 × 60 cm (každá má ${n(pieza)} m²) a rezervou 10 % potřebujete ${dlazdice(piezas)}.`,
          `Pokud jsou v krabici 4 dlaždice, kupte ${krabice(Math.ceil(piezas / 4))}.`,
        ];
      })();
  return {
    h1: "Kalkulačka dlažby a obkladů",
    title: tituloQueEntre(
      `Kalkulačka dlažby a obkladů (${ctx.nombrePais})`,
      "Kalkulačka dlažby: kolik krabic koupit",
      "Kalkulačka dlažby",
    ),
    description: "Spočítejte, kolik dlaždic potřebujete na podlahu nebo stěnu včetně rezervy na prořez a kolik krabic koupit.",
    intro: [
      "Zadejte plochu, rozměr jedné dlaždice a počet dlaždic v krabici. Uvidíte, kolik dlaždic a krabic je potřeba koupit.",
      "Rezerva na prořez pokryje řezání u okrajů a kusy, které při práci prasknou.",
    ],
    comoSeCalcula: [
      `Plocha jedné dlaždice = délka × šířka, ve ${imperial ? "čtverečních stopách" : "čtverečních metrech"}.`,
      "Počet dlaždic = plocha × (1 + rezerva ÷ 100) ÷ plocha jedné dlaždice, zaokrouhleno nahoru.",
      "Krabice = počet dlaždic ÷ dlaždice v krabici, zaokrouhleno nahoru.",
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Jakou rezervu na prořez počítat?",
        respuesta: "Při rovném kladení 10 %. Při kladení na diagonálu, do stromečku nebo v místnostech s velkým množstvím řezů 15 až 20 %.",
      },
      {
        pregunta: "Mám počítat se spárami?",
        respuesta: "Ne. Spáry mají jen pár milimetrů a rezerva na prořez tento rozdíl pokryje.",
      },
      {
        pregunta: "Vyplatí se koupit trochu víc?",
        respuesta: "Ano, nechte si pár dlaždic navíc ze stejné šarže. Když později některá praskne, stejný odstín se může shánět těžko.",
      },
    ],
    glosario: [
      { termino: "Rezerva na prořez", definicion: "Procento dlaždic, které se dokupuje na řezání a rozbité kusy." },
      { termino: "Šarže", definicion: "Výrobní série. Odstín dlaždic z různých šarží se může trochu lišit." },
    ],
  };
};
