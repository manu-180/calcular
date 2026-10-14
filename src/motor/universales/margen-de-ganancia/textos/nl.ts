import type { TextosUi } from "../../tipos";
import type { UiMargenDeGanancia } from "../definicion";

export const textosNl: TextosUi<UiMargenDeGanancia> = {
  slug: "winstmarge-berekenen",
  ui: () => ({
    modo: "Wat wil je uitrekenen?",
    modoPrecio: "De marge, uit kostprijs en verkoopprijs",
    modoMargen: "De verkoopprijs voor een gewenste marge",
    modoMarkup: "De verkoopprijs voor een gewenste opslag",
    costo: "Kostprijs per stuk",
    costoAyuda: "Wat het kost om één stuk in te kopen of te maken, zonder de btw die je aan de klant doorrekent.",
    precio: "Verkoopprijs",
    precioAyuda: "Alleen als je de marge uitrekent. Exclusief btw.",
    objetivo: "Gewenste marge of opslag (%)",
    objetivoAyuda: "Alleen als je de verkoopprijs uitrekent.",
    precioResultado: "Verkoopprijs",
    margen: "Winstmarge",
    margenAyuda: "De winst als percentage van de verkoopprijs.",
    markup: "Opslag",
    markupAyuda: "De winst als percentage van de kostprijs.",
    ganancia: "Winst per stuk",
    errorCosto: "Vul de kostprijs van één stuk in.",
    errorFaltaPrecio: "Vul de verkoopprijs in om de marge uit te rekenen.",
    errorFaltaObjetivo: "Vul de marge of opslag in die je wilt halen.",
    errorMargen100: "Een marge moet onder de 100% liggen. Anders zou de hele prijs winst zijn, zonder kosten.",
    observacionPerdida: "Bij deze prijs verkoop je onder de kostprijs: je verliest op elke verkoop.",
  }),
};
