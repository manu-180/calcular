import { pluralPl } from "../../../i18n/plural";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { saldar } from "../definicion";

const r2 = (n: number) => Math.round(n * 100) / 100;

export const contenidoPl: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const miesiecy = (n: number) => pluralPl(n, "miesiąc", "miesiące", "miesięcy");
  const saldo = montoEjemplo(ctx, 2000);
  const fijo = montoEjemplo(ctx, 100);
  const conFijo = saldar(saldo, 22, { modo: "fijo", fijo, porcentaje: 0, piso: 0 }, r2);
  const conMinimo = saldar(saldo, 22, { modo: "minimo", fijo: 0, porcentaje: 3, piso: montoEjemplo(ctx, 25) }, r2);
  return {
    h1: "Kalkulator spłaty karty kredytowej",
    title: tituloQueEntre(
      `Kalkulator spłaty karty kredytowej | ${ctx.nombrePais}`,
      `Spłata karty kredytowej | ${ctx.nombrePais}`,
      "Kalkulator spłaty karty kredytowej",
    ),
    description: "Sprawdź, ile miesięcy zajmie spłata karty kredytowej i ile zapłacisz odsetek, spłacając stałą kwotę albo tylko minimum.",
    intro: [
      "Karta kredytowa to zwykle najdroższy dług. Spłacanie tylko minimum rozciąga go na lata i dokłada odsetek.",
      "Wpisz zadłużenie, oprocentowanie i kwotę, którą możesz spłacać co miesiąc. Pokażemy, kiedy skończysz, ile zapłacisz odsetek i plan miesiąc po miesiącu.",
    ],
    comoSeCalcula: [
      "Co miesiąc doliczane są odsetki: zadłużenie × oprocentowanie roczne ÷ 12.",
      "Potem odejmowana jest spłata. Przy spłacie minimalnej to procent zadłużenia, ale nie mniej niż ustalona kwota.",
      "Powtarza się to, aż zadłużenie spadnie do zera. Jeśli spłata nie jest wyższa od odsetek, dług nigdy nie maleje.",
    ],
    ejemplo: [
      `Zadłużenie ${m(saldo)} na karcie oprocentowanej na 22% rocznie, spłacane po ${m(fijo)} miesięcznie, znika po ${conFijo.meses} miesiącach, a odsetki wynoszą ${m(conFijo.intereses)}.`,
      `Spłacając tylko minimum 3%, potrzebujesz ${miesiecy(conMinimo.meses)}, a odsetki rosną do ${m(conMinimo.intereses)}.`,
    ],
    faq: [
      {
        pregunta: "Co się stanie, jeśli spłacam tylko minimum?",
        respuesta:
          "Spłata minimalna maleje razem z zadłużeniem, więc co miesiąc płacisz mniej, a dług ciągnie się latami. Jeśli możesz, spłacaj wyższą stałą kwotę, nawet o trochę.",
      },
      {
        pregunta: "Czy przenieść zadłużenie na kredyt gotówkowy?",
        respuesta: "Jeśli kredyt ma wyraźnie niższe oprocentowanie niż karta, zwykle się to opłaca. Porównaj łączne odsetki obu opcji razem z prowizjami.",
      },
      {
        pregunta: "Którą kartę spłacić najpierw?",
        respuesta: "Na wszystkich płać minimum, a resztę przeznacz na tę z najwyższym oprocentowaniem. W ten sposób zapłacisz łącznie najmniej odsetek.",
      },
    ],
    glosario: [
      { termino: "Spłata minimalna", definicion: "Najniższa kwota, jaką możesz spłacić w miesiącu bez opłaty za opóźnienie. Nie spłaca długu." },
      { termino: "Okres bezodsetkowy", definicion: "Czas, w którym bank nie nalicza odsetek, jeśli spłacisz całe zadłużenie w terminie." },
    ],
  };
};
