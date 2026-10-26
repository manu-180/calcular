import type { TextosUi } from "../../tipos";
import type { UiVariacion } from "../definicion";

export const textosDa: TextosUi<UiVariacion> = {
  slug: "procentvis-aendring",
  ui: () => ({
    inicial: "Gammel værdi",
    final: "Ny værdi",
    variacion: "Procentvis ændring",
    diferencia: "Forskel",
    vuelta: "For at komme tilbage",
    vueltaAyuda: "Hvor meget den nye værdi skal ændre sig for at komme tilbage til den gamle.",
    errorInicialCero: "Den gamle værdi kan ikke være 0. Man kan ikke regne en procentvis ændring ud fra nul.",
    subio: (p) => `Den er steget med ${p} %.`,
    bajo: (p) => `Den er faldet med ${p} %.`,
    igual: "Ingen ændring. De to værdier er ens.",
  }),
};
