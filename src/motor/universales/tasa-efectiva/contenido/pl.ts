import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aEfectiva, aNominal } from "../definicion";

export const contenidoPl: ContenidoUniversal = (ctx) => {
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  return {
    h1: "Kalkulator oprocentowania efektywnego",
    title: tituloQueEntre(
      `Kalkulator oprocentowania efektywnego i nominalnego | ${ctx.nombrePais}`,
      `Oprocentowanie efektywne | ${ctx.nombrePais}`,
      "Kalkulator oprocentowania efektywnego",
    ),
    description: "Przelicz nominalną stopę roczną na efektywną i odwrotnie, przy kapitalizacji miesięcznej, kwartalnej, półrocznej albo dziennej.",
    intro: [
      "Dwie oferty z tym samym oprocentowaniem mogą kosztować różnie. Różnica wynika z tego, jak często naliczane albo wypłacane są odsetki.",
      "Efektywna stopa roczna sprowadza wszystko do wspólnego mianownika: pokazuje, ile naprawdę płacisz albo zarabiasz w ciągu roku. Wybierz stopę, którą znasz, a pokażemy drugą.",
    ],
    comoSeCalcula: [
      "Stopa efektywna = (1 + stopa nominalna ÷ m) do potęgi m, minus 1. Tutaj m to liczba kapitalizacji w roku: 12 przy miesięcznej, 4 przy kwartalnej.",
      "Stopa nominalna = m × ((1 + stopa efektywna) do potęgi 1 ÷ m, minus 1).",
      "Stopa za okres to stopa nominalna podzielona przez m.",
    ],
    ejemplo: [
      `Oprocentowanie nominalne 12% z kapitalizacją miesięczną to stopa efektywna ${p(aEfectiva(12, 12))}.`,
      `Stopa efektywna 10% to oprocentowanie nominalne ${p(aNominal(10, 12))}, jeśli odsetki są kapitalizowane co miesiąc.`,
    ],
    faq: [
      {
        pregunta: "Czym różni się oprocentowanie nominalne od efektywnego?",
        respuesta:
          "Nominalne to stopa roczna przed kapitalizacją. Efektywne uwzględnia to, że odsetki też zarabiają odsetki. Dlatego stopa efektywna jest zawsze równa nominalnej albo wyższa.",
      },
      {
        pregunta: "Którą stopą porównywać oferty?",
        respuesta:
          "Przy oszczędnościach efektywną, bo pokazuje, ile naprawdę zarabiasz. Przy kredytach porównuj też RRSO, które obejmuje prowizje i inne koszty.",
      },
      {
        pregunta: "Dlaczego częstsza kapitalizacja podnosi stopę efektywną?",
        respuesta:
          "Odsetki szybciej trafiają do salda i same zaczynają zarabiać. Przy kapitalizacji rocznej stopa nominalna i efektywna są takie same.",
      },
    ],
    glosario: [
      { termino: "Oprocentowanie nominalne", definicion: "Roczna stopa procentowa przed uwzględnieniem kapitalizacji." },
      { termino: "Oprocentowanie efektywne", definicion: "Roczna stopa procentowa razem z efektem kapitalizacji." },
      { termino: "Kapitalizacja odsetek", definicion: "Dopisanie odsetek do salda." },
    ],
  };
};
