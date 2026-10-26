import { aDia, fechaLarga, mesesYDias } from "../../comun/fechas";
import { duracionPl } from "../../dias-entre-fechas/textos/pl";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoPl: ContenidoUniversal = (ctx) => {
  const nac = "1990-05-15";
  const ref = "2026-10-13";
  const { meses, dias } = mesesYDias(nac, ref);
  const total = aDia(ref) - aDia(nac);
  return {
    h1: "Kalkulator wieku",
    title: tituloQueEntre(
      `Kalkulator wieku: ile mam lat, miesięcy i dni | ${ctx.nombrePais}`,
      `Kalkulator wieku | ${ctx.nombrePais}`,
      "Kalkulator wieku",
    ),
    description: "Oblicz dokładny wiek w latach, miesiącach i dniach, ile dni już przeżyłeś lub przeżyłaś i ile zostało do najbliższych urodzin.",
    intro: [
      "Wpisz datę urodzenia, a zobaczysz dokładny wiek na dziś, także w miesiącach, tygodniach i dniach.",
      "Zmień drugą datę, żeby sprawdzić, ile ktoś miał lat w danym dniu albo ile będzie miał.",
    ],
    comoSeCalcula: [
      "Liczymy pełne miesiące od dnia urodzenia do wybranej daty. Każde 12 miesięcy to rok.",
      "Dni, które zostają po ostatnim pełnym miesiącu, to dni wieku.",
      "Lata przestępne liczą się jako 366 dni.",
    ],
    ejemplo: [
      `Osoba urodzona ${fechaLarga(ctx.locale, nac)} r. w dniu ${fechaLarga(ctx.locale, ref)} r. miała ${duracionPl(Math.floor(meses / 12), meses % 12, dias)}.`,
      `To ${formatearNumero(ctx, total)} dni.`,
    ],
    faq: [
      {
        pregunta: "Jak oblicza się dokładny wiek?",
        respuesta: "Najpierw liczymy pełne lata, potem pełne miesiące od ostatnich urodzin, a na końcu dni, które zostały.",
      },
      {
        pregunta: "A co z osobami urodzonymi 29 lutego?",
        respuesta: "W latach nieprzestępnych kalkulator przyjmuje 28 lutego jako dzień urodzin. Niektóre przepisy przyjmują w takim przypadku 1 marca.",
      },
      {
        pregunta: "Ile dni już żyję?",
        respuesta: "Zobacz wiersz „W dniach”. Liczy każdy dzień od urodzenia do wybranej daty, bez tego ostatniego dnia.",
      },
    ],
    glosario: [
      { termino: "Wiek", definicion: "Liczba pełnych lat od dnia urodzenia." },
      { termino: "Rok przestępny", definicion: "Rok, który ma 366 dni i 29 lutego. Wypada co cztery lata, z wyjątkiem niektórych lat kończących stulecie." },
    ],
  };
};
