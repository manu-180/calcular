import type { TextosUi } from "../../tipos";
import type { UiMargenDeGanancia } from "../definicion";

export const textosPl: TextosUi<UiMargenDeGanancia> = {
  slug: "kalkulator-marzy",
  ui: () => ({
    modo: "Co chcesz policzyć?",
    modoPrecio: "Marżę, z kosztu i ceny",
    modoMargen: "Cenę dla docelowej marży",
    modoMarkup: "Cenę dla docelowego narzutu",
    costo: "Koszt jednostkowy",
    costoAyuda: "Ile kosztuje zakup albo wytworzenie jednej sztuki, bez VAT przerzucanego na klienta.",
    precio: "Cena sprzedaży",
    precioAyuda: "Tylko jeśli liczysz marżę. Netto, bez VAT.",
    objetivo: "Docelowa marża albo narzut (%)",
    objetivoAyuda: "Tylko jeśli liczysz cenę.",
    precioResultado: "Cena sprzedaży",
    margen: "Marża",
    margenAyuda: "Zysk jako procent ceny sprzedaży.",
    markup: "Narzut",
    markupAyuda: "Zysk jako procent kosztu.",
    ganancia: "Zysk na sztuce",
    errorCosto: "Wpisz koszt jednej sztuki.",
    errorFaltaPrecio: "Wpisz cenę sprzedaży, żeby policzyć marżę.",
    errorFaltaObjetivo: "Wpisz marżę albo narzut, które chcesz osiągnąć.",
    errorMargen100: "Marża musi być niższa niż 100%: przy 100% cała cena byłaby zyskiem bez żadnego kosztu.",
    observacionPerdida: "Przy tej cenie sprzedajesz poniżej kosztu: na każdej sprzedaży tracisz pieniądze.",
  }),
};
