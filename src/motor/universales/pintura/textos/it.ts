import type { TextosUi } from "../../tipos";
import type { UiPintura } from "../definicion";

const volume = (u: string) => (u === "L" ? "litri" : "galloni");

export const textosIt: TextosUi<UiPintura> = {
  slug: "calcolo-pittura",
  ui: () => ({
    modo: "Quali misure hai?",
    modoMedidas: "Lunghezza e altezza delle pareti",
    modoSuperficie: "La superficie totale",
    largo: (u) => `Lunghezza totale delle pareti (${u})`,
    largoAyuda: "Tutte le pareti che vuoi pitturare, sommate. Per una stanza intera, il perimetro.",
    alto: (u) => `Altezza delle pareti (${u})`,
    superficie: (u) => `Superficie da pitturare (${u})`,
    aberturas: (u) => `Porte e finestre da escludere (${u})`,
    aberturasAyuda: "Una porta misura circa 2 m², una finestra normale da 1 a 2 m².",
    manos: "Numero di mani",
    rendimiento: (u) => `Resa della pittura (${u})`,
    rendimientoAyuda: "È scritta sulla latta: quanta superficie copre per ogni mano. Se non la sai, lascia il valore suggerito.",
    recomendado: (u) => `Pittura da comprare (${volume(u)})`,
    recomendadoAyuda: "Comprende un 10% in più per i ritocchi e per quello che resta nel rullo.",
    necesario: (u) => `Quantità esatta (${volume(u)})`,
    neta: (u) => `Superficie da pitturare (${u})`,
    errorMedidas: "Inserisci lunghezza e altezza delle pareti.",
    errorSuperficie: "Inserisci la superficie da pitturare.",
    errorAberturas: "Porte e finestre non possono occupare tutta la parete.",
    errorRendimiento: "La resa deve essere maggiore di 0.",
  }),
};
