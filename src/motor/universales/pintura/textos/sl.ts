import type { TextosUi } from "../../tipos";
import type { UiPintura } from "../definicion";

const volumen = (u: string) => (u === "L" ? "litri" : "galone");

export const textosSl: TextosUi<UiPintura> = {
  slug: "izracun-barve",
  ui: () => ({
    modo: "Katere mere poznate?",
    modoMedidas: "Dolžino in višino sten",
    modoSuperficie: "Skupno površino",
    largo: (u) => `Skupna dolžina sten (${u})`,
    largoAyuda: "Vse stene, ki jih barvate, skupaj. Pri sobi je to obseg.",
    alto: (u) => `Višina sten (${u})`,
    superficie: (u) => `Površina za barvanje (${u})`,
    aberturas: (u) => `Vrata in okna, ki se odštejejo (${u})`,
    aberturasAyuda: "Vrata imajo približno 2 m², navadno okno pa 1 do 2 m².",
    manos: "Število slojev",
    rendimiento: (u) => `Izdatnost barve (${u})`,
    rendimientoAyuda: "Piše na embalaži: koliko površine pokrije en sloj. Če je ne poznate, pustite predlagano vrednost.",
    recomendado: (u) => `Barva za nakup (${volumen(u)})`,
    recomendadoAyuda: "Vključuje 10 % več za popravke in to, kar ostane na valjčku.",
    necesario: (u) => `Točna količina (${volumen(u)})`,
    neta: (u) => `Površina za barvanje (${u})`,
    errorMedidas: "Vnesite dolžino in višino sten.",
    errorSuperficie: "Vnesite površino za barvanje.",
    errorAberturas: "Vrata in okna ne morejo zavzemati cele stene.",
    errorRendimiento: "Izdatnost mora biti večja od 0.",
  }),
};
