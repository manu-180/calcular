import type { TextosUi } from "../../tipos";
import type { UiAumentoDeSueldo } from "../definicion";

export const textosPl: TextosUi<UiAumentoDeSueldo> = {
  slug: "kalkulator-podwyzki",
  ui: () => ({
    sueldo: "Obecne wynagrodzenie miesięczne",
    sueldoAyuda: "Brutto albo netto, jak wolisz. Wynik będzie liczony od tej samej kwoty.",
    aumentoPorcentaje: "Podwyżka (%)",
    aumentoMonto: "Podwyżka kwotowo (opcjonalnie)",
    aumentoMontoAyuda: "Jeśli dostajesz stałą kwotę podwyżki, wpisz ją tutaj. Zastąpi procent.",
    inflacion: "Inflacja w tym okresie (%, opcjonalnie)",
    inflacionAyuda: "Inflacja od ostatniej podwyżki. Pokaże, czy za nową pensję kupisz więcej, czy mniej niż wcześniej.",
    sueldosAnio: "Liczba pensji w roku",
    sueldosAnioAyuda: "12 przy pensji miesięcznej. 13, jeśli dostajesz też trzynastkę.",
    nuevo: "Nowe wynagrodzenie miesięczne",
    diferenciaMensual: "Różnica miesięcznie",
    diferenciaAnual: "Różnica rocznie",
    porcentaje: "Podwyżka w procentach",
    real: "Realna podwyżka (po inflacji)",
    realAyuda: "O ile więcej kupisz za nową pensję niż za poprzednią.",
    errorSueldo: "Wpisz obecne wynagrodzenie.",
    errorSinAumento: "Wpisz podwyżkę w procentach albo kwotowo.",
    observacionGana: (puntos) => `Podwyżka jest wyższa od inflacji: za pensję kupisz o ${puntos}% więcej niż wcześniej.`,
    observacionPierde: (puntos) => `Podwyżka nie dogania inflacji: za pensję kupisz o ${puntos}% mniej niż wcześniej.`,
    observacionIgual: "Podwyżka jest równa inflacji: za pensję kupisz tyle samo co wcześniej.",
  }),
};
