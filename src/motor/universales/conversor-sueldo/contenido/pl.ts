import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoPl: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const anual = montoEjemplo(ctx, 50000);
  const hora = montoEjemplo(ctx, 20);
  return {
    h1: "Kalkulator stawki godzinowej",
    title: tituloQueEntre(
      `Kalkulator stawki godzinowej: z godzin na miesiąc i rok | ${ctx.nombrePais}`,
      `Kalkulator stawki godzinowej | ${ctx.nombrePais}`,
      "Kalkulator stawki godzinowej",
    ),
    description: "Przelicz wynagrodzenie między stawką za godzinę, dzień, tydzień, miesiąc i rok, według twoich godzin pracy i płatnych tygodni.",
    intro: [
      "Ile wynosi twoja pensja za godzinę? Ile daje rocznie oferta ze stawką godzinową? Wpisz kwotę, wybierz okres, a pokażemy wszystkie pozostałe.",
      "Przyda się do porównania ofert pracy, wyceny nadgodzin albo sprawdzenia, ile jest wart twój czas.",
    ],
    comoSeCalcula: [
      "Najpierw wszystko przeliczamy na kwotę roczną.",
      "Stawka godzinowa = kwota roczna ÷ (godziny w tygodniu × płatne tygodnie).",
      "Za dzień = kwota roczna ÷ (dni w tygodniu × płatne tygodnie). Za tydzień = kwota roczna ÷ płatne tygodnie.",
      "Za miesiąc = kwota roczna ÷ 12. Za pół miesiąca = kwota roczna ÷ 24.",
    ],
    ejemplo: [
      `Wynagrodzenie ${m(anual)} rocznie przy 40 godzinach tygodniowo to ${m(anual / 2080)} za godzinę i ${m(anual / 12)} miesięcznie.`,
      `Oferta ${m(hora)} za godzinę na pełny etat daje ${m(hora * 2080)} rocznie.`,
    ],
    faq: [
      {
        pregunta: "Ile godzin pracy jest w roku?",
        respuesta: `Przy 40 godzinach tygodniowo i 52 płatnych tygodniach to ${formatearNumero(ctx, 2080)} godzin. Dlatego w przybliżeniu wystarczy pomnożyć stawkę godzinową przez około ${formatearNumero(ctx, 2000)}.`,
      },
      {
        pregunta: "Dlaczego stawka tygodniowa razy 4 nie daje kwoty miesięcznej?",
        respuesta: `Bo przeciętny miesiąc ma ${formatearNumero(ctx, 52 / 12, 2)} tygodnia, a nie 4. Żeby przejść z tygodnia na miesiąc, pomnóż przez 52 i podziel przez 12.`,
      },
      {
        pregunta: "Czy kalkulator uwzględnia premie albo podatki?",
        respuesta: "Nie. Przelicza tę samą kwotę między okresami. Jeśli dostajesz premie, dolicz je osobno, kiedy porównujesz oferty.",
      },
    ],
    glosario: [
      { termino: "Wynagrodzenie brutto", definicion: "Wynagrodzenie przed odliczeniem podatku i składek." },
      { termino: "Etat", definicion: "Wymiar czasu pracy. Pełny etat to zwykle 40 godzin w tygodniu." },
    ],
  };
};
