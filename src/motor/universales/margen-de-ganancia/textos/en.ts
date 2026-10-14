import type { TextosUi } from "../../tipos";
import type { UiMargenDeGanancia } from "../definicion";

export const textosEn: TextosUi<UiMargenDeGanancia> = {
  slug: "profit-margin",
  ui: () => ({
    modo: "What do you want to work out?",
    modoPrecio: "The margin, from cost and price",
    modoMargen: "The price for a target margin",
    modoMarkup: "The price for a target markup",
    costo: "Unit cost",
    costoAyuda: "What it costs to buy or make one unit, without sales tax passed on to the customer.",
    precio: "Selling price",
    precioAyuda: "Only if you are working out the margin. Without sales tax.",
    objetivo: "Target margin or markup (%)",
    objetivoAyuda: "Only if you are working out the price.",
    precioResultado: "Selling price",
    margen: "Profit margin",
    margenAyuda: "Profit as a percentage of the selling price.",
    markup: "Markup",
    markupAyuda: "Profit as a percentage of the cost.",
    ganancia: "Profit per unit",
    errorCosto: "Enter the cost of one unit.",
    errorFaltaPrecio: "Enter the selling price to work out the margin.",
    errorFaltaObjetivo: "Enter the margin or markup you are aiming for.",
    errorMargen100: "A margin has to be below 100%: that would mean the whole price is profit with no cost.",
    observacionPerdida: "At that price you sell below cost: you lose money on every sale.",
  }),
};
