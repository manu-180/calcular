import type { TextosUi } from "../../tipos";
import type { UiPintura } from "../definicion";

const volumen = (u: string) => (u === "L" ? "litres" : "gallons");

export const textosEn: TextosUi<UiPintura> = {
  slug: "paint-calculator",
  ui: () => ({
    modo: "What measurements do you have?",
    modoMedidas: "Wall length and height",
    modoSuperficie: "The total area",
    largo: (u) => `Total length of the walls (${u})`,
    largoAyuda: "All the walls you'll paint added together. For a room, the perimeter.",
    alto: (u) => `Wall height (${u})`,
    superficie: (u) => `Area to paint (${u})`,
    aberturas: (u) => `Doors and windows to leave out (${u})`,
    aberturasAyuda: "A door is about 21 ft² (2 m²) and a standard window 10 to 20 ft².",
    manos: "Number of coats",
    rendimiento: (u) => `Paint coverage (${u})`,
    rendimientoAyuda: "It's on the tin: how much area it covers per coat. If you don't know, keep the suggested value.",
    recomendado: (u) => `Paint to buy (${volumen(u)})`,
    recomendadoAyuda: "Includes 10% extra for touch-ups and what stays in the roller.",
    necesario: (u) => `Exact amount (${volumen(u)})`,
    neta: (u) => `Area to paint (${u})`,
    errorMedidas: "Fill in the wall length and height.",
    errorSuperficie: "Fill in the area to paint.",
    errorAberturas: "Doors and windows can't take up the whole wall.",
    errorRendimiento: "Coverage has to be more than 0.",
  }),
};
