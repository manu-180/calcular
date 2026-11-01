import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoBs: ContenidoUniversal = (ctx) => {
  const precio = montoEjemplo(ctx, 50);
  const m = (n: number) => formatearMonto(ctx, n);
  const n = (x: number) => formatearNumero(ctx, x, 0);
  return {
    h1: "Kalkulator procenata",
    title: tituloQueEntre(`Kalkulator procenata ${GRAMATICA.bs.para(ctx.nombrePais)}`, "Kalkulator procenata: izračun procenta", "Kalkulator procenata"),
    description: "Izračunajte koliko je procenat od broja, koliko posto jedan broj čini od drugog i koliko iznosi cijena nakon poskupljenja ili popusta.",
    intro: [
      "Izaberite šta želite saznati, unesite oba broja i rezultat se odmah prikazuje.",
      "Kalkulator pokriva četiri najčešća izračuna s procentima: dio, udio, uvećanje i umanjenje.",
    ],
    comoSeCalcula: [
      "X % od Y = X × Y ÷ 100.",
      "Koliko posto od Y je X = X ÷ Y × 100.",
      "Y uvećano za X % = Y × (1 + X ÷ 100). Y umanjeno za X % = Y × (1 − X ÷ 100).",
    ],
    ejemplo: [
      `15 % od 200 iznosi ${n((15 * 200) / 100)}.`,
      `30 je ${n((30 / 120) * 100)} % od 120.`,
      `Cijena od ${m(precio)} nakon poskupljenja od 10 % iznosi ${m(precio * 1.1)}.`,
    ],
    faq: [
      {
        pregunta: "Kako se računa procenat od broja?",
        respuesta: `Broj pomnožite procentom i podijelite brojem 100. Na primjer, 20 % od 350 iznosi 350 × 20 ÷ 100 = ${n((350 * 20) / 100)}.`,
      },
      {
        pregunta: "Kako saznati koliko posto jedan broj čini od drugog?",
        respuesta: `Podijelite dio cjelinom i pomnožite brojem 100. Ako ste na testu tačno odgovorili na 45 od 60 pitanja, to je 45 ÷ 60 × 100 = ${n((45 / 60) * 100)} %.`,
      },
      {
        pregunta: "Kako se na cijenu dodaje procenat?",
        respuesta: `Cijenu pomnožite brojem 1 uvećanim za procenat zapisan kao decimalni broj. Za uvećanje od 10 % množite brojem ${formatearNumero(ctx, 1.1, 2)}.`,
      },
      {
        pregunta: "Ako cijenu povećam za 10 %, pa je smanjim za 10 %, vraća li se na početnu?",
        respuesta: `Ne. 100 uvećano za 10 % iznosi ${n(110)}, a ${n(110)} umanjeno za 10 % iznosi ${n(99)}. Umanjenje se računa od većeg broja.`,
      },
    ],
    glosario: [
      { termino: "Procenat", definicion: "Dio cjeline izražen u stotim dijelovima." },
      { termino: "Osnovica", definicion: "Broj od kojeg se procenat računa (u ovom kalkulatoru Y)." },
    ],
  };
};
