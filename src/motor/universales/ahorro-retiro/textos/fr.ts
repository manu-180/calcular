import type { TextosUi } from "../../tipos";
import type { UiAhorroRetiro } from "../definicion";

export const textosFr: TextosUi<UiAhorroRetiro> = {
  slug: "simulation-epargne-retraite",
  ui: () => ({
    edadActual: "Votre âge aujourd’hui",
    edadRetiro: "Âge de départ à la retraite souhaité",
    actual: "Ce que vous avez déjà épargné",
    aporte: "Versement mensuel",
    rendimiento: "Rendement annuel réel (%)",
    rendimientoAyuda: "Ce que rapporte le placement au-delà de l’inflation. 2 % à 5 % est une hypothèse prudente sur le long terme.",
    aniosRenta: "Années de retraite à financer",
    aniosRentaAyuda: "Pendant combien d’années vous voulez puiser dans cette épargne.",
    capital: "Épargne au départ à la retraite",
    renta: "Revenu mensuel tiré de cette épargne",
    aportado: "Total versé",
    intereses: "Gains totaux",
    tabla: "Évolution selon l’âge",
    colEdad: "Âge",
    colAportado: "Versé à ce jour",
    colSaldo: "Épargne",
    errorEdades: "L’âge de départ à la retraite doit être supérieur à votre âge actuel.",
    errorSinAhorro: "Saisissez votre épargne actuelle ou un versement mensuel.",
    observacionDineroDeHoy: "Les montants sont exprimés en pouvoir d’achat d’aujourd’hui, car le rendement réel retire déjà l’inflation.",
    observacionPublica: "Il s’agit seulement de votre épargne personnelle. Les pensions des régimes obligatoires ne sont pas comprises.",
  }),
};
