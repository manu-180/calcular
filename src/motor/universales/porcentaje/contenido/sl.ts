import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSl: ContenidoUniversal = (ctx) => {
  const precio = montoEjemplo(ctx, 50);
  const m = (n: number) => formatearMonto(ctx, n);
  const n = (x: number) => formatearNumero(ctx, x, 0);
  return {
    h1: "Izračun odstotkov",
    title: tituloQueEntre(`Izračun odstotkov ${GRAMATICA.sl.para(ctx.nombrePais)}`, "Izračun odstotkov: kalkulator odstotkov", "Izračun odstotkov"),
    description: "Izračunajte, koliko je odstotek od števila, koliko odstotkov eno število predstavlja od drugega in koliko znaša cena po podražitvi ali popustu.",
    intro: [
      "Izberite, kaj želite izvedeti, vnesite obe števili in rezultat se takoj prikaže.",
      "Kalkulator pokriva štiri najpogostejše izračune z odstotki: del, delež, povečanje in zmanjšanje.",
    ],
    comoSeCalcula: [
      "X % od Y = X × Y ÷ 100.",
      "Koliko odstotkov od Y je X = X ÷ Y × 100.",
      "Y, povečano za X % = Y × (1 + X ÷ 100). Y, zmanjšano za X % = Y × (1 − X ÷ 100).",
    ],
    ejemplo: [
      `15 % od 200 je ${n((15 * 200) / 100)}.`,
      `30 je ${n((30 / 120) * 100)} % od 120.`,
      `Cena ${m(precio)} po podražitvi za 10 % znaša ${m(precio * 1.1)}.`,
    ],
    faq: [
      {
        pregunta: "Kako izračunam odstotek od števila?",
        respuesta: `Število pomnožite z odstotkom in delite s 100. Na primer, 20 % od 350 je 350 × 20 ÷ 100 = ${n((350 * 20) / 100)}.`,
      },
      {
        pregunta: "Kako ugotovim, koliko odstotkov eno število predstavlja od drugega?",
        respuesta: `Del delite s celoto in pomnožite s 100. Če ste na testu pravilno odgovorili na 45 od 60 vprašanj, je to 45 ÷ 60 × 100 = ${n((45 / 60) * 100)} %.`,
      },
      {
        pregunta: "Kako ceni dodam odstotek?",
        respuesta: `Ceno pomnožite z 1, ki ste ji prišteli odstotek, zapisan kot decimalno število. Za povečanje za 10 % množite z ${formatearNumero(ctx, 1.1, 2)}.`,
      },
      {
        pregunta: "Če ceno povečam za 10 % in jo nato zmanjšam za 10 %, ali se vrne na začetno?",
        respuesta: `Ne. 100, povečano za 10 %, je ${n(110)}, ${n(110)}, zmanjšano za 10 %, pa je ${n(99)}. Zmanjšanje se računa od večjega števila.`,
      },
    ],
    glosario: [
      { termino: "Odstotek", definicion: "Del celote, izražen v stotinah." },
      { termino: "Osnova", definicion: "Število, od katerega se računa odstotek (v tem kalkulatorju Y)." },
    ],
  };
};
