import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoFi: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const piezas = Math.ceil((150 * 1.1) / 1 - 1e-9);
        return [
          `150 neliöjalan alaan tarvitset ${n(piezas, 0)} laattaa, kun laatan koko on 12 × 12 in (1 ft² kukin) ja hukka 10 %.`,
          `Jos laatikossa on 10 laattaa, ostat ${n(Math.ceil(piezas / 10), 0)} laatikkoa.`,
        ];
      })()
    : (() => {
        const pieza = 0.6 * 0.6;
        const piezas = Math.ceil((20 * 1.1) / pieza - 1e-9);
        return [
          `20 neliömetrin alaan tarvitset ${n(piezas, 0)} laattaa, kun laatan koko on 60 × 60 cm (${n(pieza)} m² kukin) ja hukka 10 %.`,
          `Jos laatikossa on 4 laattaa, ostat ${n(Math.ceil(piezas / 4), 0)} laatikkoa.`,
        ];
      })();
  return {
    h1: "Paljonko laattoja tarvitsen?",
    title: tituloQueEntre(
      `Laattalaskuri: paljonko laattoja tarvitsen | ${ctx.nombrePais}`,
      `Laattalaskuri | ${ctx.nombrePais}`,
      "Laattalaskuri",
    ),
    description: "Laske, montako lattia- tai seinälaattaa tarvitset hukka mukaan luettuna, ja montako laatikkoa sinun kannattaa ostaa.",
    intro: [
      "Syötä pinta-ala, laattojen koko ja montako laattaa laatikossa on. Näet, montako laattaa ja laatikkoa ostat.",
      "Hukka kattaa reunojen leikkaukset ja satunnaisen rikkoutuvan laatan.",
    ],
    comoSeCalcula: [
      `Yhden laatan ala = pituus × leveys ${imperial ? "neliöjalkoina" : "neliömetreinä"}.`,
      "Laatat = pinta-ala × (1 + hukka ÷ 100) ÷ yhden laatan ala, pyöristettynä ylöspäin.",
      "Laatikot = laatat ÷ laattoja laatikossa, pyöristettynä ylöspäin.",
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Kuinka paljon hukkaa pitää varata?",
        respuesta: "Suoraan ladontaan 10 %. Vinoladontaan, kalanruotokuvioon tai huoneeseen, jossa on paljon leikkauksia, varaa 15 tai 20 %.",
      },
      {
        pregunta: "Pitääkö saumat ottaa huomioon?",
        respuesta: "Ei tarvitse. Saumat ovat vain muutaman millimetrin levyisiä, ja ero sisältyy jo hukkaan.",
      },
      {
        pregunta: "Kannattaako ostaa muutama ylimääräinen laatta?",
        respuesta: "Kannattaa, ja samasta valmistuserästä. Jos laatta rikkoutuu myöhemmin, täsmälleen samaa sävyä voi olla vaikea löytää.",
      },
    ],
    glosario: [
      { termino: "Hukka", definicion: "Ylimääräinen prosenttiosuus, joka ostetaan leikkauksia ja rikkoutuvia laattoja varten." },
      { termino: "Saumaus", definicion: "Laattojen välisten rakojen täyttäminen saumalaastilla." },
    ],
  };
};
