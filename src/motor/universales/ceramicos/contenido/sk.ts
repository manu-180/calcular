import { pluralSk } from "../../../i18n/plural";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSk: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const dlazdice = (k: number) => pluralSk(k, "dlaždicu", "dlaždice", "dlaždíc");
  const krabice = (k: number) => pluralSk(k, "krabicu", "krabice", "krabíc");
  const ejemplo = imperial
    ? (() => {
        const piezas = Math.ceil((150 * 1.1) / 1 - 1e-9);
        return [
          `Na plochu 150 ft² s dlaždicami 12 × 12 in (každá má 1 ft²) a rezervou 10 % potrebujete ${dlazdice(piezas)}.`,
          `Ak je v krabici 10 dlaždíc, kúpte ${krabice(Math.ceil(piezas / 10))}.`,
        ];
      })()
    : (() => {
        const pieza = 0.6 * 0.6;
        const piezas = Math.ceil((20 * 1.1) / pieza - 1e-9);
        return [
          `Na plochu 20 m² s dlaždicami 60 × 60 cm (každá má ${n(pieza)} m²) a rezervou 10 % potrebujete ${dlazdice(piezas)}.`,
          `Ak sú v krabici 4 dlaždice, kúpte ${krabice(Math.ceil(piezas / 4))}.`,
        ];
      })();
  return {
    h1: "Kalkulačka dlažby a obkladov",
    title: tituloQueEntre(
      `Kalkulačka dlažby a obkladov (${ctx.nombrePais})`,
      "Kalkulačka dlažby: koľko krabíc kúpiť",
      "Kalkulačka dlažby",
    ),
    description: "Vypočítajte, koľko dlaždíc potrebujete na podlahu alebo stenu vrátane rezervy na rezanie a koľko krabíc kúpiť.",
    intro: [
      "Zadajte plochu, rozmer jednej dlaždice a počet dlaždíc v krabici. Uvidíte, koľko dlaždíc a krabíc treba kúpiť.",
      "Rezerva na rezanie pokryje rezanie pri okrajoch a kusy, ktoré pri práci prasknú.",
    ],
    comoSeCalcula: [
      `Plocha jednej dlaždice = dĺžka × šírka, v ${imperial ? "štvorcových stopách" : "štvorcových metroch"}.`,
      "Počet dlaždíc = plocha × (1 + rezerva ÷ 100) ÷ plocha jednej dlaždice, zaokrúhlené nahor.",
      "Krabice = počet dlaždíc ÷ dlaždice v krabici, zaokrúhlené nahor.",
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Akú rezervu na rezanie počítať?",
        respuesta: "Pri rovnom kladení 10 %. Pri kladení na diagonálu, do stromčeka alebo v miestnostiach s veľkým množstvom rezov 15 až 20 %.",
      },
      {
        pregunta: "Mám počítať so škárami?",
        respuesta: "Nie. Škáry majú len pár milimetrov a rezerva na rezanie tento rozdiel pokryje.",
      },
      {
        pregunta: "Oplatí sa kúpiť trochu viac?",
        respuesta: "Áno, nechajte si pár dlaždíc navyše z tej istej šarže. Keď neskôr niektorá praskne, rovnaký odtieň sa môže zháňať ťažko.",
      },
    ],
    glosario: [
      { termino: "Rezerva na rezanie", definicion: "Percento dlaždíc, ktoré sa prikupuje na rezanie a rozbité kusy." },
      { termino: "Šarža", definicion: "Výrobná séria. Odtieň dlaždíc z rôznych šarží sa môže trochu líšiť." },
    ],
  };
};
