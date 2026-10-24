import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { proyectar } from "../definicion";

export const contenidoPl: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const capital = montoEjemplo(ctx, 1000);
  const aporte = montoEjemplo(ctx, 100);
  const a10 = proyectar(capital, aporte, 7, 10, "mensual")[9].saldo;
  const a20 = proyectar(capital, aporte, 7, 20, "mensual")[19].saldo;
  return {
    h1: "Kalkulator procentu składanego",
    title: tituloQueEntre(
      `Kalkulator procentu składanego z wpłatami | ${ctx.nombrePais}`,
      `Kalkulator procentu składanego | ${ctx.nombrePais}`,
      "Kalkulator procentu składanego",
    ),
    description: "Zobacz, jak rosną pieniądze dzięki procentowi składanemu i comiesięcznym wpłatom. Kwota końcowa, zarobione odsetki i tabela rok po roku.",
    intro: [
      "Przy procencie składanym odsetki dopisują się do salda i same zaczynają zarabiać. Dlatego oszczędności rosną coraz szybciej.",
      "Wpisz, ile masz dziś, ile możesz dokładać co miesiąc, oprocentowanie i liczbę lat. Pokażemy kwotę końcową i to, ile z niej stanowią odsetki.",
    ],
    comoSeCalcula: [
      "Kwota końcowa = kwota początkowa × (1 + i) do potęgi n + wpłata × ((1 + i) do potęgi n − 1) ÷ i.",
      "Tutaj i to stopa miesięczna odpowiadająca wybranej kapitalizacji, a n to liczba miesięcy.",
      "Wpłaty są dodawane na koniec każdego miesiąca.",
    ],
    ejemplo: [
      `Zaczynasz od ${m(capital)} i dokładasz ${m(aporte)} miesięcznie przy oprocentowaniu 7% rocznie. Po 10 latach masz ${m(a10)}.`,
      `Jeśli wytrwasz kolejne 10 lat, saldo dojdzie do ${m(a20)}. Druga dekada przynosi dużo więcej niż pierwsza.`,
    ],
    faq: [
      {
        pregunta: "Czym różni się procent prosty od składanego?",
        respuesta:
          "Procent prosty liczy się zawsze od kwoty początkowej. Procent składany liczy się od kwoty początkowej powiększonej o odsetki, które już zostały dopisane.",
      },
      {
        pregunta: "Co to jest reguła 72?",
        respuesta: "Szybki sposób, żeby sprawdzić, po ilu latach pieniądze się podwoją: podziel 72 przez roczne oprocentowanie. Przy 6% podwoją się po około 12 latach.",
      },
      {
        pregunta: "Jakie oprocentowanie przyjąć?",
        respuesta:
          ctx.pais === "PL"
            ? "Realne dla tego, co zrobisz z pieniędzmi. Pamiętaj, że od odsetek z lokat i obligacji zwykle pobiera się podatek od zysków kapitałowych (podatek Belki), którego kalkulator nie odejmuje. Żeby zobaczyć wynik w dzisiejszych pieniądzach, odejmij od oprocentowania przewidywaną inflację."
            : "Realne dla tego, co zrobisz z pieniędzmi. Żeby zobaczyć wynik w dzisiejszych pieniądzach, odejmij od oprocentowania przewidywaną inflację.",
      },
    ],
    glosario: [
      { termino: "Kapitalizacja odsetek", definicion: "Moment, w którym odsetki są dopisywane do salda." },
      { termino: "Procent składany", definicion: "Odsetki liczone od salda razem z odsetkami, które już zostały dopisane." },
    ],
  };
};
