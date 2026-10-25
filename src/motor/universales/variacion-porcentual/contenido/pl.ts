import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoPl: ContenidoUniversal = (ctx) => {
  const antes = montoEjemplo(ctx, 40);
  const despues = antes * 1.25;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Kalkulator zmiany procentowej",
    title: tituloQueEntre(
      `Kalkulator zmiany procentowej: wzrost i spadek | ${ctx.nombrePais}`,
      `Kalkulator zmiany procentowej | ${ctx.nombrePais}`,
      "Kalkulator zmiany procentowej",
    ),
    description: "Oblicz, o ile procent wzrosła albo spadła wartość: ceny, pensja, sprzedaż albo dowolna liczba, która zmieniła się w czasie.",
    intro: [
      "Wpisz starą i nową wartość. Zobaczysz procentowy wzrost albo spadek i różnicę.",
      "Kalkulator pokazuje też, o ile musiałaby się zmienić wartość, żeby wrócić do punktu wyjścia. To prawie nigdy nie jest ten sam procent.",
    ],
    comoSeCalcula: [
      "Zmiana procentowa = (nowa wartość − stara wartość) ÷ stara wartość × 100.",
      "Wynik dodatni oznacza wzrost. Ujemny oznacza spadek.",
      "Jeśli stara wartość jest ujemna, dzielimy przez jej wartość bezwzględną, żeby znak dalej mówił, czy nastąpiła poprawa.",
    ],
    ejemplo: [
      `Coś, co kosztowało ${m(antes)}, a teraz kosztuje ${m(despues)}, podrożało o 25%.`,
      "Żeby wrócić do dawnej ceny, musiałoby potanieć o 20%, a nie o 25%.",
    ],
    faq: [
      {
        pregunta: "Jak obliczyć procentowy wzrost?",
        respuesta: "Od nowej wartości odejmij starą, podziel przez starą i pomnóż przez 100. Z 80 do 100: 20 ÷ 80 × 100 = 25%.",
      },
      {
        pregunta: "Jak obliczyć procentowy spadek?",
        respuesta: "Tak samo. Ze 100 do 80: −20 ÷ 100 × 100 = −20%, czyli spadek o 20%.",
      },
      {
        pregunta: "Dlaczego wzrost o 25% i spadek o 25% się nie znoszą?",
        respuesta: "Każdy procent liczy się od innej podstawy. 80 plus 25% to 100, ale 100 minus 25% to 75.",
      },
      {
        pregunta: "Czym różni się procent od punktu procentowego?",
        respuesta: "Jeśli stopa wzrosła z 10% do 12%, wzrosła o 2 punkty procentowe. W ujęciu procentowym wzrosła o 20%.",
      },
    ],
    glosario: [
      { termino: "Zmiana procentowa", definicion: "O ile zmieniła się wartość, jako procent wartości początkowej." },
      { termino: "Punkt procentowy", definicion: "Zwykła różnica między dwoma procentami." },
    ],
  };
};
