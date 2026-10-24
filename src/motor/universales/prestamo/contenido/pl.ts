import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cuotaFrancesa, interesesTotales } from "../definicion";

export const contenidoPl: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const monto = montoEjemplo(ctx, 10000);
  const cuota36 = cuotaFrancesa(monto, 12, 36);
  const cuota60 = cuotaFrancesa(monto, 12, 60);
  return {
    h1: "Kalkulator kredytowy: rata kredytu",
    title: tituloQueEntre(
      `Kalkulator kredytowy: rata kredytu i odsetki | ${ctx.nombrePais}`,
      `Kalkulator kredytowy | ${ctx.nombrePais}`,
      "Kalkulator kredytowy",
    ),
    description: "Oblicz miesięczną ratę kredytu, sumę odsetek i pełny harmonogram spłat. Zobacz, ile zaoszczędzisz dzięki nadpłatom.",
    intro: [
      "Zanim podpiszesz umowę kredytu, liczą się dwie liczby: ile płacisz co miesiąc i ile kosztują cię odsetki.",
      "Wpisz kwotę, oprocentowanie roczne i okres. Jeśli planujesz co miesiąc trochę nadpłacać, dodaj nadpłatę i zobacz, o ile szybciej spłacisz kredyt.",
    ],
    comoSeCalcula: [
      "Kalkulator stosuje raty równe (annuitetowe), najczęstszy sposób spłaty kredytu gotówkowego, samochodowego i hipotecznego.",
      "Oprocentowanie miesięczne = oprocentowanie roczne ÷ 12.",
      "Rata = kwota × oprocentowanie miesięczne ÷ (1 − (1 + oprocentowanie miesięczne) do potęgi minus liczba rat).",
      "Co miesiąc odsetki liczy się od kwoty, która zostaje do spłaty. Reszta raty zmniejsza kapitał.",
    ],
    ejemplo: [
      `Kredyt ${m(monto)} na 12% rocznie na 36 miesięcy ma ratę ${m(cuota36)}. Łącznie zapłacisz ${m(interesesTotales(monto, 12, 36))} odsetek.`,
      `Jeśli wydłużysz okres do 60 miesięcy, rata spadnie do ${m(cuota60)}, ale odsetki wzrosną do ${m(interesesTotales(monto, 12, 60))}.`,
    ],
    faq: [
      {
        pregunta: "Jak oblicza się ratę kredytu?",
        respuesta:
          "Wzorem na ratę równą. Każda rata jest taka sama, ale pierwsze składają się głównie z odsetek, a ostatnie głównie z kapitału. Dlatego na początku dług maleje powoli.",
      },
      {
        pregunta: "Czy opłaca się wcześniej spłacić kredyt?",
        respuesta:
          "Zwykle tak, o ile bank nie pobiera wysokiej prowizji za wcześniejszą spłatę. Nadpłata od razu zmniejsza kapitał i przestają być od niej naliczane odsetki. Im wcześniej nadpłacisz, tym więcej zaoszczędzisz.",
      },
      {
        pregunta: "Czy dłuższy okres kredytowania jest lepszy?",
        respuesta: "Rata jest niższa, ale łącznie płacisz dużo więcej odsetek. Porównaj obie liczby, zanim zdecydujesz.",
      },
      {
        pregunta: "Dlaczego bank podaje inną ratę?",
        respuesta:
          "Banki często doliczają ubezpieczenie, prowizję albo opłaty. Dlatego oferty porównuj po RRSO i całkowitym koszcie kredytu, a nie tylko po oprocentowaniu.",
      },
    ],
    glosario: [
      { termino: "Kapitał", definicion: "Część długu, której jeszcze nie spłacono." },
      { termino: "Oprocentowanie nominalne", definicion: "Roczna stopa, którą dzieli się przez 12, żeby policzyć odsetki za każdy miesiąc." },
      { termino: "RRSO", definicion: "Rzeczywista roczna stopa oprocentowania: całkowity koszt kredytu z prowizjami i opłatami, wyrażony w skali roku." },
    ],
  };
};
