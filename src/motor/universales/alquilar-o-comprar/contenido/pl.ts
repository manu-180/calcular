import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { comparar } from "../definicion";

export const contenidoPl: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 200000);
  const alquiler = montoEjemplo(ctx, 1000);
  const base = { precio, entrada: 20, gastosCompra: 4, tasa: 7, aniosHipoteca: 25, alquiler, aumentoAlquiler: 3, gastosPropietario: 1.5, revalorizacion: 3, rendimiento: 5 };
  const a10 = comparar({ ...base, horizonte: 10 }).anios[9];
  const a3 = comparar({ ...base, horizonte: 3 }).anios[2];
  const kto = (a: { comprar: number; alquilar: number }) => (a.comprar >= a.alquilar ? "zakup" : "najem");
  return {
    h1: "Kupić czy wynająć mieszkanie: kalkulator",
    title: tituloQueEntre(
      `Kupić czy wynająć mieszkanie: kalkulator | ${ctx.nombrePais}`,
      `Kupić czy wynająć mieszkanie | ${ctx.nombrePais}`,
      "Kupić czy wynająć mieszkanie",
    ),
    description: "Porównaj najem z zakupem mieszkania na kredyt w wybranym okresie. Zobacz, co bardziej się opłaca, od którego roku i o ile.",
    intro: [
      "Samo porównanie raty kredytu z czynszem nie wystarczy. Kupujący płaci odsetki, remonty i podatek, ale na końcu ma mieszkanie. Najemca może trzymać wkład własny w inwestycji.",
      "Kalkulator sumuje to wszystko rok po roku i pokazuje, przy której opcji zostaniesz z większym majątkiem.",
    ],
    comoSeCalcula: [
      "Zakup: co miesiąc płacisz ratę kredytu hipotecznego i koszty właściciela. Majątek to wartość mieszkania minus kredyt, który zostaje do spłaty.",
      "Najem: wkład własny i koszty zakupu zostają zainwestowane według stopy zwrotu z innej inwestycji, a czynsz rośnie co roku.",
      "Co miesiąc ta strona, która wydaje mniej, inwestuje różnicę. Obie opcje korzystają więc z tego samego budżetu.",
      "Lepsza jest opcja, która na końcu daje większy majątek.",
    ],
    ejemplo: [
      `Mieszkanie za ${m(precio)} z wkładem własnym 20% i kredytem na 7% na 25 lat, w porównaniu z najmem za ${m(alquiler)} miesięcznie.`,
      `W horyzoncie 10 lat lepszy jest ${kto(a10)}, o ${m(Math.abs(a10.comprar - a10.alquilar))}. W horyzoncie 3 lat lepszy jest ${kto(a3)}, o ${m(Math.abs(a3.comprar - a3.alquilar))}.`,
    ],
    faq: [
      {
        pregunta: "Czy wynajmowanie to wyrzucanie pieniędzy?",
        respuesta:
          "Nie do końca. Kupujący też ponosi koszty, które nie wracają: odsetki, podatek od nieruchomości i remonty. Liczy się to, ile masz na końcu w każdym z wariantów.",
      },
      {
        pregunta: "Dlaczego wynik zmienia się z liczbą lat?",
        respuesta:
          "Zakup ma duże koszty na starcie (koszty transakcji i wysokie odsetki w pierwszych latach), które zwracają się dopiero z czasem. Jeśli planujesz przeprowadzkę za kilka lat, zwykle lepiej wychodzi najem.",
      },
      {
        pregunta: "Które dane najbardziej zmieniają wynik?",
        respuesta:
          "Relacja ceny mieszkania do czynszu, oprocentowanie kredytu i tempo wzrostu cen mieszkań. Zmień wzrost cen i zysk z inwestycji, a zobaczysz, jak bardzo przesuwa się wynik.",
      },
    ],
    glosario: [
      { termino: "Majątek netto", definicion: "To, co posiadasz, minus twoje długi." },
      { termino: "Wzrost cen mieszkań", definicion: "O ile procent rocznie rośnie wartość mieszkania." },
      { termino: "Koszt utraconych korzyści", definicion: "Ile zarobiłby wkład własny, gdyby został zainwestowany." },
    ],
  };
};
