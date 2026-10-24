import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoPl: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  // Oceny de la escala escolar polaca (1 a 6) con las wagi típicas del dziennik elektroniczny.
  const oceny = [
    { ocena: 4, waga: 3 },
    { ocena: 5, waga: 2 },
    { ocena: 3, waga: 1 },
  ];
  const wazona = oceny.reduce((s, o) => s + o.ocena * o.waga, 0) / oceny.reduce((s, o) => s + o.waga, 0);
  const zwykla = oceny.reduce((s, o) => s + o.ocena, 0) / oceny.length;
  return {
    h1: "Kalkulator średniej ważonej",
    title: tituloQueEntre(
      `Kalkulator średniej ważonej ocen | ${ctx.nombrePais}`,
      `Kalkulator średniej ważonej | ${ctx.nombrePais}`,
      "Kalkulator średniej ważonej",
    ),
    description: "Oblicz średnią ocen, arytmetyczną albo ważoną, z maksymalnie 10 wartości i wagą każdej z nich: procentami, punktami ECTS albo liczbą.",
    intro: [
      "Wpisz każdą ocenę i to, ile się liczy. Zobaczysz średnią ważoną, a obok średnią arytmetyczną.",
      "Przyda się przy ocenach w szkole i na studiach, a także przy każdej średniej, w której niektóre wartości liczą się bardziej niż inne.",
    ],
    comoSeCalcula: [
      "Średnia arytmetyczna = suma wartości ÷ liczba wartości.",
      "Średnia ważona = suma (wartość × waga) ÷ suma wag.",
      "Wagi nie muszą sumować się do 100: wynik dzielimy przez ich sumę.",
    ],
    ejemplo: [
      `Przy ocenach 4 z wagą 3, 5 z wagą 2 i 3 z wagą 1 średnia ważona wynosi ${n(wazona)}.`,
      `Średnia arytmetyczna tych trzech ocen to ${n(zwykla)}: piątka z wyższą wagą podnosi średnią ważoną.`,
    ],
    faq: [
      {
        pregunta: "Jak obliczyć średnią ważoną?",
        respuesta: "Pomnóż każdą wartość przez jej wagę, zsumuj wyniki i podziel przez sumę wag.",
      },
      {
        pregunta: "Co, jeśli wagi nie sumują się do 100%?",
        respuesta: "Nic nie szkodzi. Jeśli jeden przedmiot ma 6 punktów ECTS, a drugi 4, wpisz 6 i 4. Wynik dzielimy przez sumę wag.",
      },
      {
        pregunta: "Czym różni się średnia arytmetyczna od ważonej?",
        respuesta: "W średniej arytmetycznej każda wartość liczy się tak samo. W średniej ważonej każda liczy się według swojej wagi.",
      },
    ],
    glosario: [
      { termino: "Waga", definicion: "Ile dana wartość liczy się do średniej końcowej." },
      { termino: "Średnia ważona", definicion: "Średnia, w której każdą wartość mnoży się przez jej wagę." },
    ],
  };
};
