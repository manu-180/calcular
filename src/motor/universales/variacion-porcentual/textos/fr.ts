import type { TextosUi } from "../../tipos";
import type { UiVariacion } from "../definicion";

export const textosFr: TextosUi<UiVariacion> = {
  slug: "calcul-taux-evolution",
  ui: () => ({
    inicial: "Valeur de départ",
    final: "Valeur d’arrivée",
    variacion: "Taux d’évolution",
    diferencia: "Écart",
    vuelta: "Pour revenir au départ",
    vueltaAyuda: "La variation qu’il faudrait appliquer à la valeur d’arrivée pour retrouver la valeur de départ.",
    errorInicialCero: "La valeur de départ ne peut pas être 0 : on ne calcule pas une évolution à partir de zéro.",
    subio: (p) => `Hausse de ${p} %.`,
    bajo: (p) => `Baisse de ${p} %.`,
    igual: "Aucune évolution : les deux valeurs sont identiques.",
  }),
};
