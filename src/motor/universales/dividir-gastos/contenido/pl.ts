import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoPl: ContenidoUniversal = (ctx) => {
  const a = montoEjemplo(ctx, 90);
  const b = montoEjemplo(ctx, 30);
  const cuota = (a + b) / 3;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Kalkulator podziału kosztów",
    title: tituloQueEntre(
      `Kalkulator podziału kosztów: kto komu ile oddaje | ${ctx.nombrePais}`,
      `Kalkulator podziału kosztów | ${ctx.nombrePais}`,
      "Kalkulator podziału kosztów",
    ),
    description: "Podziel wspólne wydatki między maksymalnie 8 osób: ile przypada na każdą i kto komu ile oddaje, przy jak najmniejszej liczbie przelewów.",
    intro: [
      "Przyda się po wyjeździe, kolacji, imprezie albo przy wspólnym wynajmie, kiedy każdy zapłacił inną kwotę.",
      "Wpisz, ile zapłaciła każda osoba. Dostaniesz kwotę na osobę i listę przelewów, które wszystkich rozliczą.",
    ],
    comoSeCalcula: [
      "Kwota na osobę = łączne wydatki ÷ liczba osób.",
      "Kto zapłacił mniej niż swoją część, oddaje różnicę. Kto zapłacił więcej, dostaje ją z powrotem.",
      "Przelewy idą od największego długu do największej nadpłaty, więc nikt nie robi zbędnych przelewów.",
    ],
    ejemplo: [
      `Ania zapłaciła ${m(a)}, Bartek ${m(b)}, a Kasia nic. Razem to ${m(a + b)}, więc na każdą osobę przypada ${m(cuota)}.`,
      `Kasia oddaje Ani ${m(cuota)}, a Bartek oddaje Ani ${m(cuota - b)}.`,
    ],
    faq: [
      {
        pregunta: "Jak podzielić rachunek, kiedy każdy zapłacił inną kwotę?",
        respuesta: "Zsumuj wszystko, podziel przez liczbę osób i porównaj z tym, co zapłaciła każda osoba. Różnica to kwota do oddania albo do odebrania.",
      },
      {
        pregunta: "Co, jeśli ktoś nic nie zapłacił?",
        respuesta: "Wpisz przy tej osobie 0, żeby liczyła się w podziale. Jeśli zostawisz puste pole, kalkulator ją pominie.",
      },
      {
        pregunta: "Dlaczego przelewów jest mniej niż osób?",
        respuesta: "Długi są grupowane: osoba, która jest winna najwięcej, oddaje temu, kto najwięcej wyłożył, i tak dalej. Przelewów nigdy nie trzeba więcej niż liczba osób minus jeden.",
      },
    ],
    glosario: [
      { termino: "Kwota na osobę", definicion: "Ile z łącznych wydatków powinna zapłacić każda osoba." },
      { termino: "Saldo", definicion: "Różnica między tym, co ktoś zapłacił, a jego częścią kosztów." },
    ],
  };
};
