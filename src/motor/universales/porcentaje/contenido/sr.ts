import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSr: ContenidoUniversal = (ctx) => {
  const precio = montoEjemplo(ctx, 50);
  const m = (n: number) => formatearMonto(ctx, n);
  const n = (x: number) => formatearNumero(ctx, x, 0);
  return {
    h1: "Kalkulator procenata",
    title: tituloQueEntre(`Kalkulator procenata ${GRAMATICA.sr.para(ctx.nombrePais)}`, "Kalkulator procenata: koliko je procenat", "Kalkulator procenata"),
    description: "Izračunajte koliko je procenat od broja, koliko procenata jedan broj čini od drugog i koliko iznosi cena posle poskupljenja ili popusta.",
    intro: [
      "Izaberite šta želite da saznate, unesite oba broja i rezultat se odmah prikazuje.",
      "Kalkulator pokriva četiri najčešća računa sa procentima: deo, udeo, uvećanje i umanjenje.",
    ],
    comoSeCalcula: [
      "X% od Y = X × Y ÷ 100.",
      "Koliko procenata od Y je X = X ÷ Y × 100.",
      "Y uvećano za X% = Y × (1 + X ÷ 100). Y umanjeno za X% = Y × (1 − X ÷ 100).",
    ],
    ejemplo: [
      `15% od 200 je ${n((15 * 200) / 100)}.`,
      `30 je ${n((30 / 120) * 100)}% od 120.`,
      `Cena od ${m(precio)} posle poskupljenja od 10% iznosi ${m(precio * 1.1)}.`,
    ],
    faq: [
      {
        pregunta: "Kako se računa procenat od broja?",
        respuesta: `Broj pomnožite procentom i podelite sa 100. Na primer, 20% od 350 je 350 × 20 ÷ 100 = ${n((350 * 20) / 100)}.`,
      },
      {
        pregunta: "Kako da saznam koliko procenata jedan broj čini od drugog?",
        respuesta: `Podelite deo celinom i pomnožite sa 100. Ako ste na testu tačno odgovorili na 45 od 60 pitanja, to je 45 ÷ 60 × 100 = ${n((45 / 60) * 100)}%.`,
      },
      {
        pregunta: "Kako se na cenu dodaje procenat?",
        respuesta: `Cenu pomnožite brojem 1 uvećanim za procenat zapisan kao decimalni broj. Za uvećanje od 10% množite sa ${formatearNumero(ctx, 1.1, 2)}.`,
      },
      {
        pregunta: "Ako cenu povećam za 10%, pa je smanjim za 10%, da li se vraća na početnu?",
        respuesta: `Ne. 100 uvećano za 10% je ${n(110)}, a ${n(110)} umanjeno za 10% je ${n(99)}. Umanjenje se računa od većeg broja.`,
      },
    ],
    glosario: [
      { termino: "Procenat", definicion: "Deo celine izražen u stotim delovima." },
      { termino: "Osnovica", definicion: "Broj od kojeg se procenat računa (u ovom kalkulatoru Y)." },
    ],
  };
};
