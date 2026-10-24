import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cagr, roi } from "../definicion";

export const contenidoPl: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  const inicial = montoEjemplo(ctx, 10000);
  const final = montoEjemplo(ctx, 15000);
  return {
    h1: "Kalkulator ROI: stopa zwrotu z inwestycji",
    title: tituloQueEntre(
      `Kalkulator ROI i CAGR: stopa zwrotu z inwestycji | ${ctx.nombrePais}`,
      `Kalkulator ROI | ${ctx.nombrePais}`,
      "Kalkulator ROI i CAGR",
    ),
    description: "Oblicz całkowitą stopę zwrotu (ROI) i roczną stopę zwrotu (CAGR) z inwestycji na podstawie wpłaty, obecnej wartości i liczby lat.",
    intro: [
      "Zysk 50% brzmi świetnie, ale co innego znaczy po 2 latach, a co innego po 10. Żeby porównać inwestycje, potrzebujesz stopy zwrotu w skali roku.",
      "Wpisz, ile zainwestowano, ile inwestycja jest warta dziś i ile minęło lat. Pokażemy całkowitą stopę zwrotu i składaną roczną stopę zwrotu.",
    ],
    comoSeCalcula: [
      "ROI = (wartość końcowa + wypłacone dochody − zainwestowana kwota) ÷ zainwestowana kwota × 100.",
      "CAGR = ((wartość końcowa + wypłacone dochody) ÷ zainwestowana kwota) do potęgi (1 ÷ liczba lat), minus 1.",
      "CAGR to składana stopa roczna: taka, która daje ten sam wynik, jeśli powtarza się co roku.",
    ],
    ejemplo: [
      `Inwestycja ${m(inicial)}, która urosła do ${m(final)}, daje ${m(final - inicial)} zysku, czyli ROI ${p(roi(inicial, final))}.`,
      `Jeśli trwało to 5 lat, roczna stopa zwrotu wynosi ${p(cagr(inicial, final, 5))}. Jeśli 2 lata, ${p(cagr(inicial, final, 2))}.`,
    ],
    faq: [
      {
        pregunta: "Czym różni się ROI od CAGR?",
        respuesta: "ROI to całkowity zysk w stosunku do wpłaty, bez względu na czas. CAGR rozkłada go na lata, więc można porównać inwestycje o różnej długości.",
      },
      {
        pregunta: "Dlaczego roczna stopa zwrotu to nie całkowity zysk podzielony przez lata?",
        respuesta: `Bo zyski z każdego roku dopisują się do salda i też zarabiają. Zysk 50% w 5 lat to ${p(cagr(1, 1.5, 5))} rocznie w ujęciu składanym, a nie 10%.`,
      },
      {
        pregunta: "Jak uwzględnić dywidendy albo odsetki?",
        respuesta: "Wpisz je jako wypłacone dochody, jeśli trafiły na twoje konto. Jeśli zostały ponownie zainwestowane, są już w wartości końcowej.",
      },
    ],
    glosario: [
      { termino: "ROI", definicion: "Zwrot z inwestycji (z angielskiego return on investment): całkowity zysk jako procent wpłaty." },
      { termino: "CAGR", definicion: "Składana roczna stopa wzrostu: średni roczny zysk z uwzględnieniem procentu składanego." },
    ],
  };
};
