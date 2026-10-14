import type { TextosUi } from "../../tipos";
import type { UiPintura } from "../definicion";

const inhoud = (u: string) => (u === "L" ? "liter" : "gallon");

export const textosNl: TextosUi<UiPintura> = {
  slug: "verf-berekenen",
  ui: () => ({
    modo: "Welke maten heb je?",
    modoMedidas: "Lengte en hoogte van de muren",
    modoSuperficie: "De totale oppervlakte",
    largo: (u) => `Totale lengte van de muren (${u})`,
    largoAyuda: "Alle muren die je gaat verven bij elkaar opgeteld. Voor een kamer is dat de omtrek.",
    alto: (u) => `Hoogte van de muren (${u})`,
    superficie: (u) => `Te verven oppervlakte (${u})`,
    aberturas: (u) => `Deuren en ramen die je niet verft (${u})`,
    aberturasAyuda: "Een deur is ongeveer 2 m² (21 ft²) en een gewoon raam 1 tot 2 m².",
    manos: "Aantal lagen",
    rendimiento: (u) => `Rendement van de verf (${u})`,
    rendimientoAyuda: "Dat staat op het blik: hoeveel oppervlakte je met één laag dekt. Weet je het niet, laat dan de voorgestelde waarde staan.",
    recomendado: (u) => `Te kopen verf (${inhoud(u)})`,
    recomendadoAyuda: "Met 10% extra voor bijwerken en wat in de roller blijft zitten.",
    necesario: (u) => `Precieze hoeveelheid (${inhoud(u)})`,
    neta: (u) => `Te verven oppervlakte (${u})`,
    errorMedidas: "Vul de lengte en de hoogte van de muren in.",
    errorSuperficie: "Vul de oppervlakte in die je wilt verven.",
    errorAberturas: "Deuren en ramen kunnen niet de hele muur beslaan.",
    errorRendimiento: "Het rendement moet hoger zijn dan 0.",
  }),
};
