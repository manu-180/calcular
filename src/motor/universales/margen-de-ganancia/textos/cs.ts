import type { TextosUi } from "../../tipos";
import type { UiMargenDeGanancia } from "../definicion";

export const textosCs: TextosUi<UiMargenDeGanancia> = {
  slug: "vypocet-marze",
  ui: () => ({
    modo: "Co chcete spočítat?",
    modoPrecio: "Marži z nákladů a prodejní ceny",
    modoMargen: "Prodejní cenu pro požadovanou marži",
    modoMarkup: "Prodejní cenu pro požadovanou přirážku",
    costo: "Náklady na kus",
    costoAyuda: "Kolik vás stojí nákup nebo výroba jednoho kusu, bez DPH, kterou přenášíte na zákazníka.",
    precio: "Prodejní cena",
    precioAyuda: "Jen pokud počítáte marži. Bez DPH.",
    objetivo: "Požadovaná marže nebo přirážka (%)",
    objetivoAyuda: "Jen pokud počítáte prodejní cenu.",
    precioResultado: "Prodejní cena",
    margen: "Marže",
    margenAyuda: "Zisk v procentech z prodejní ceny.",
    markup: "Přirážka",
    markupAyuda: "Zisk v procentech z nákladů.",
    ganancia: "Zisk na kus",
    errorCosto: "Zadejte náklady na jeden kus.",
    errorFaltaPrecio: "Pro výpočet marže zadejte prodejní cenu.",
    errorFaltaObjetivo: "Zadejte marži nebo přirážku, které chcete dosáhnout.",
    errorMargen100: "Marže musí být nižší než 100 %: to by znamenalo, že celá cena je zisk bez jakýchkoli nákladů.",
    observacionPerdida: "Za tuto cenu prodáváte pod náklady: na každém prodeji tratíte.",
  }),
};
