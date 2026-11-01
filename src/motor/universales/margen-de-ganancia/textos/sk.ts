import type { TextosUi } from "../../tipos";
import type { UiMargenDeGanancia } from "../definicion";

export const textosSk: TextosUi<UiMargenDeGanancia> = {
  slug: "vypocet-marze",
  ui: () => ({
    modo: "Čo chcete vypočítať?",
    modoPrecio: "Maržu z nákladov a predajnej ceny",
    modoMargen: "Predajnú cenu pre požadovanú maržu",
    modoMarkup: "Predajnú cenu pre požadovanú prirážku",
    costo: "Náklady na kus",
    costoAyuda: "Koľko vás stojí nákup alebo výroba jedného kusu, bez DPH, ktorú prenášate na zákazníka.",
    precio: "Predajná cena",
    precioAyuda: "Len ak počítate maržu. Bez DPH.",
    objetivo: "Požadovaná marža alebo prirážka (%)",
    objetivoAyuda: "Len ak počítate predajnú cenu.",
    precioResultado: "Predajná cena",
    margen: "Marža",
    margenAyuda: "Zisk v percentách z predajnej ceny.",
    markup: "Prirážka",
    markupAyuda: "Zisk v percentách z nákladov.",
    ganancia: "Zisk na kus",
    errorCosto: "Zadajte náklady na jeden kus.",
    errorFaltaPrecio: "Na výpočet marže zadajte predajnú cenu.",
    errorFaltaObjetivo: "Zadajte maržu alebo prirážku, ktorú chcete dosiahnuť.",
    errorMargen100: "Marža musí byť nižšia ako 100 %: to by znamenalo, že celá cena je zisk bez akýchkoľvek nákladov.",
    observacionPerdida: "Za túto cenu predávate pod náklady: na každom predaji strácate.",
  }),
};
