import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoPl: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const capital = montoEjemplo(ctx, 1000);
  return {
    h1: "Kalkulator odsetek prostych",
    title: tituloQueEntre(
      `Kalkulator odsetek prostych: lokata i pożyczka | ${ctx.nombrePais}`,
      `Kalkulator odsetek prostych | ${ctx.nombrePais}`,
      "Kalkulator odsetek prostych",
    ),
    description: "Oblicz odsetki proste od kapitału przy rocznym oprocentowaniu za okres w dniach, miesiącach albo latach. Wybierz rok 365 albo 360 dni.",
    intro: [
      "Odsetki proste liczy się zawsze od kapitału początkowego: w trakcie okresu nie są dopisywane do salda.",
      "Tak liczy się odsetki od krótkich lokat, pożyczek między znajomymi i w wielu zadaniach szkolnych.",
    ],
    comoSeCalcula: [
      "Odsetki = kapitał × oprocentowanie roczne × czas w latach.",
      "Przy miesiącach dzielimy przez 12. Przy dniach dzielimy przez 365 albo 360, zależnie od roku, który przyjmuje bank.",
      "Razem = kapitał + odsetki.",
    ],
    ejemplo: [
      `Kapitał ${m(capital)} przy oprocentowaniu 10% rocznie przez 6 miesięcy daje ${m(capital * 0.1 * 0.5)} odsetek.`,
      `Ten sam kapitał przez 90 dni daje ${m((capital * 0.1 * 90) / 365)} przy roku 365-dniowym i ${m((capital * 0.1 * 90) / 360)} przy roku 360-dniowym.`,
    ],
    faq: [
      {
        pregunta: "Jaki jest wzór na odsetki proste?",
        respuesta: `O = K × r × t. K to kapitał, r to roczne oprocentowanie zapisane jako ułamek (10% to ${formatearNumero(ctx, 0.1, 2)}), a t to czas w latach.`,
      },
      {
        pregunta: "Czym różnią się od procentu składanego?",
        respuesta: "Odsetki proste liczy się zawsze od tego samego kapitału. Przy procencie składanym odsetki są dopisywane do salda i też zarabiają.",
      },
      {
        pregunta: "Dlaczego niektóre banki przyjmują rok 360-dniowy?",
        respuesta: "To konwencja bankowa, która upraszcza rachunki. Przy 360 dniach odsetki wychodzą trochę wyższe. Sprawdź w umowie, który rok przyjmuje twój bank.",
      },
    ],
    glosario: [
      { termino: "Kapitał", definicion: "Pieniądze, które się pożycza albo inwestuje." },
      { termino: "Rok bankowy", definicion: "Rok liczony jako 360 dni, z miesiącami po 30 dni." },
    ],
  };
};
