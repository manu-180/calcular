import type { TextosUi } from "../../tipos";
import type { UiPropina } from "../definicion";

export const textosFr: TextosUi<UiPropina> = {
  slug: "calcul-pourboire",
  ui: () => ({
    cuenta: "Montant de l’addition",
    porcentaje: "Pourboire (%)",
    porcentajeAyuda: "Les usages changent selon le pays et le lieu. Choisissez ce qui vous semble juste.",
    personas: "Nombre de personnes qui paient",
    redondear: "Arrondir chaque part au-dessus",
    redondearAyuda: "Chacun paie un montant rond. La différence s’ajoute au pourboire.",
    propina: "Pourboire",
    total: "Total avec pourboire",
    porPersona: "Chacun paie",
    propinaEfectiva: "Pourboire après arrondi",
    errorPersonas: "Il faut au moins une personne pour payer.",
    observacionRedondeo: (efectiva) => `Après arrondi, le pourboire représente ${efectiva} % de l’addition.`,
  }),
};
