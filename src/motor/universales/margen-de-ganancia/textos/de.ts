import { textosConSuiza } from "../../comun/locales";
import type { TextosUi } from "../../tipos";
import type { UiMargenDeGanancia } from "../definicion";

const textos: TextosUi<UiMargenDeGanancia> = {
  slug: "margenrechner",
  ui: () => ({
    modo: "Was möchten Sie berechnen?",
    modoPrecio: "Die Marge aus Einkaufspreis und Verkaufspreis",
    modoMargen: "Den Verkaufspreis für eine Zielmarge",
    modoMarkup: "Den Verkaufspreis für einen Zielaufschlag",
    costo: "Kosten pro Stück",
    costoAyuda: "Was ein Stück im Einkauf oder in der Herstellung kostet, ohne die Mehrwertsteuer, die Sie weitergeben.",
    precio: "Verkaufspreis",
    precioAyuda: "Nur nötig, wenn Sie die Marge berechnen. Netto, ohne Mehrwertsteuer.",
    objetivo: "Zielmarge oder Zielaufschlag (%)",
    objetivoAyuda: "Nur nötig, wenn Sie den Preis berechnen.",
    precioResultado: "Verkaufspreis",
    margen: "Marge (Handelsspanne)",
    margenAyuda: "Der Gewinn in Prozent des Verkaufspreises.",
    markup: "Aufschlag",
    markupAyuda: "Der Gewinn in Prozent der Kosten.",
    ganancia: "Gewinn pro Stück",
    errorCosto: "Geben Sie die Kosten für ein Stück ein.",
    errorFaltaPrecio: "Geben Sie den Verkaufspreis ein, um die Marge zu berechnen.",
    errorFaltaObjetivo: "Geben Sie die Marge oder den Aufschlag ein, den Sie erreichen möchten.",
    errorMargen100: "Die Marge muss unter 100 % liegen. Sonst wäre der ganze Preis Gewinn, ganz ohne Kosten.",
    observacionPerdida: "Zu diesem Preis verkaufen Sie unter den Kosten und machen bei jedem Verkauf Verlust.",
  }),
};

export const textosDe = textosConSuiza(textos);
