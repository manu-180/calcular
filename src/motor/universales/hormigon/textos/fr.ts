import type { TextosUi } from "../../tipos";
import type { UiHormigon } from "../definicion";

export const textosFr: TextosUi<UiHormigon> = {
  slug: "calcul-beton",
  ui: () => ({
    largo: (u) => `Longueur (${u})`,
    ancho: (u) => `Largeur (${u})`,
    espesor: (u) => `Épaisseur (${u})`,
    espesorAyuda: "Une terrasse ou une allée fait en général 10 cm. Une dalle de garage, 12 à 15 cm.",
    margen: "Marge supplémentaire (%)",
    margenAyuda: "Pour les irrégularités du sol et les pertes. On prévoit souvent 5 % à 10 %.",
    bolsa: (u) => `Poids d’un sac de ciment (${u})`,
    volumen: (u) => `Volume exact (${u})`,
    volumenTotal: (u) => `Béton nécessaire (${u})`,
    volumenPies: "Béton nécessaire (ft³)",
    cemento: (u) => `Ciment (${u})`,
    bolsas: "Sacs de ciment",
    arena: (u) => `Sable (${u})`,
    piedra: (u) => `Gravier (${u})`,
    agua: (u) => (u === "L" ? "Eau (litres)" : "Eau (gallons)"),
    errorMedida: "Cette mesure doit être supérieure à 0.",
    aviso: "Les quantités sont un repère pour un béton courant dosé à 350 kg de ciment par m³ (proportions 1:2:3). Elles changent selon le dosage, l’ouvrage et les matériaux : vérifiez-les avec la personne qui dirige le chantier.",
  }),
};
