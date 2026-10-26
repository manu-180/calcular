import type { TextosUi } from "../../tipos";
import type { UiPuntoDeEquilibrio } from "../definicion";

export const textosPl: TextosUi<UiPuntoDeEquilibrio> = {
  slug: "kalkulator-progu-rentownosci",
  ui: () => ({
    fijos: "Koszty stałe miesięcznie",
    fijosAyuda: "To, co płacisz, nawet jeśli nic nie sprzedasz: najem, stałe pensje, media, oprogramowanie.",
    precio: "Cena sprzedaży za sztukę",
    variable: "Koszt zmienny na sztukę",
    variableAyuda: "Ile kosztuje cię każda sprzedana sztuka: materiały, towar, prowizje, wysyłka.",
    objetivo: "Docelowy zysk miesięcznie (opcjonalnie)",
    objetivoAyuda: "Żeby zobaczyć, ile trzeba sprzedać ponad pokrycie kosztów.",
    unidades: "Sztuki do progu rentowności",
    facturacion: "Przychód w progu rentowności",
    contribucion: "Marża na pokrycie na sztukę",
    contribucionAyuda: "Ile każda sprzedaż zostawia na pokrycie kosztów stałych: cena minus koszt zmienny.",
    contribucionPct: "Marża na pokrycie (%)",
    unidadesObjetivo: "Sztuki dla docelowego zysku",
    facturacionObjetivo: "Przychód dla docelowego zysku",
    errorPrecio: "Wpisz cenę sprzedaży jednej sztuki.",
    errorMargen: "Koszt zmienny jest równy cenie albo wyższy: każda sprzedaż przynosi stratę i nigdy nie osiągniesz progu rentowności. Sprawdź cenę albo koszt.",
    observacionRedondeo: "Liczbę sztuk zaokrąglamy w górę, bo nie da się sprzedać części sztuki.",
  }),
};
