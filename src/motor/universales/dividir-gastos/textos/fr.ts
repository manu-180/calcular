import type { TextosUi } from "../../tipos";
import type { UiDividirGastos } from "../definicion";

export const textosFr: TextosUi<UiDividirGastos> = {
  slug: "partage-des-depenses",
  ui: () => ({
    persona: (n) => `Personne ${n}`,
    personaAyuda: "Indiquez ce que chaque personne a payé. Si quelqu’un n’a rien payé mais participe aux frais, mettez 0. Laissez vides les autres cases.",
    total: "Total dépensé",
    personas: "Personnes",
    cuota: "Part de chacun",
    transferencias: "Virements pour être quittes",
    tabla: "Qui doit combien à qui",
    colDe: "Paie",
    colPara: "Reçoit",
    colMonto: "Montant",
    errorPocas: "Il faut au moins deux personnes pour partager une dépense.",
    aMano: "Vous êtes quittes : tout le monde a payé la même chose.",
  }),
};
