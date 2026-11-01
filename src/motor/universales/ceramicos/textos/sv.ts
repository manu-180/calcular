import type { TextosUi } from "../../tipos";
import type { UiCeramicos } from "../definicion";

export const textosSv: TextosUi<UiCeramicos> = {
  slug: "hur-mycket-kakel",
  ui: () => ({
    superficie: (u) => `Yta att lägga (${u})`,
    largo: (u) => `Plattans längd (${u})`,
    ancho: (u) => `Plattans bredd (${u})`,
    desperdicio: "Spill (%)",
    desperdicioAyuda: "För kapning och plattor som går sönder. Räkna med 10 % vid rak läggning och 15 % vid diagonal.",
    porCaja: "Plattor per kartong",
    porCajaAyuda: "Valfritt. Fyll i för att se hur många kartonger du ska köpa.",
    piezas: "Antal plattor",
    cajas: "Kartonger att köpa",
    conDesperdicio: (u) => `Yta med spill (${u})`,
    cubre: (u) => `Yta som kartongerna räcker till (${u})`,
    errorSuperficie: "Ytan måste vara större än 0.",
    errorPieza: "Plattans mått måste vara större än 0.",
  }),
};
