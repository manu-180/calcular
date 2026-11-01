import type { TextosUi } from "../../tipos";
import type { UiVariacion } from "../definicion";

export const textosNb: TextosUi<UiVariacion> = {
  slug: "prosentvis-endring",
  ui: () => ({
    inicial: "Gammel verdi",
    final: "Ny verdi",
    variacion: "Prosentvis endring",
    diferencia: "Differanse",
    vuelta: "For å komme tilbake",
    vueltaAyuda: "Hvor mye den nye verdien må endres for å komme tilbake til den gamle.",
    errorInicialCero: "Den gamle verdien kan ikke være 0. Det går ikke å regne prosentvis endring fra null.",
    subio: (p) => `Det har økt med ${p} %.`,
    bajo: (p) => `Det har gått ned med ${p} %.`,
    igual: "Ingen endring. Begge verdiene er like.",
  }),
};
