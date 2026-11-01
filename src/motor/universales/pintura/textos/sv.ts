import type { TextosUi } from "../../tipos";
import type { UiPintura } from "../definicion";

const volumen = (u: string) => (u === "L" ? "liter" : "gallon");

export const textosSv: TextosUi<UiPintura> = {
  slug: "hur-mycket-farg",
  ui: () => ({
    modo: "Vilka mått har du?",
    modoMedidas: "Väggarnas längd och höjd",
    modoSuperficie: "Den totala ytan",
    largo: (u) => `Väggarnas sammanlagda längd (${u})`,
    largoAyuda: "Alla väggar du ska måla, tillsammans. För ett rum är det omkretsen.",
    alto: (u) => `Takhöjd (${u})`,
    superficie: (u) => `Yta att måla (${u})`,
    aberturas: (u) => `Dörrar och fönster att dra av (${u})`,
    aberturasAyuda: "En dörr är ungefär 2 m² (21 ft²) och ett vanligt fönster 1 till 2 m².",
    manos: "Antal strykningar",
    rendimiento: (u) => `Färgens åtgång (${u})`,
    rendimientoAyuda: "Det står på burken: hur stor yta en liter täcker per strykning. Vet du inte, behåll det föreslagna värdet.",
    recomendado: (u) => `Färg att köpa (${volumen(u)})`,
    recomendadoAyuda: "Med 10 % extra för bättringar och det som blir kvar i rollern.",
    necesario: (u) => `Exakt mängd (${volumen(u)})`,
    neta: (u) => `Yta att måla (${u})`,
    errorMedidas: "Fyll i väggarnas längd och höjd.",
    errorSuperficie: "Fyll i ytan som ska målas.",
    errorAberturas: "Dörrar och fönster kan inte ta upp hela väggen.",
    errorRendimiento: "Åtgången måste vara större än 0.",
  }),
};
