import type { TextosUi } from "../../tipos";
import type { UiPuntoDeEquilibrio } from "../definicion";

export const textosFr: TextosUi<UiPuntoDeEquilibrio> = {
  slug: "seuil-de-rentabilite",
  ui: () => ({
    fijos: "Charges fixes par mois",
    fijosAyuda: "Ce que vous payez même sans rien vendre : loyer, salaires fixes, énergie, logiciels.",
    precio: "Prix de vente unitaire",
    variable: "Coût variable unitaire",
    variableAyuda: "Ce que vous coûte chaque unité vendue : matières, marchandises, commissions, livraison.",
    objetivo: "Bénéfice visé par mois (facultatif)",
    objetivoAyuda: "Pour savoir combien vendre en plus de couvrir vos charges.",
    unidades: "Unités pour atteindre le seuil",
    facturacion: "Chiffre d’affaires au seuil de rentabilité",
    contribucion: "Marge sur coût variable par unité",
    contribucionAyuda: "Ce que chaque vente laisse pour payer les charges fixes : prix moins coût variable.",
    contribucionPct: "Taux de marge sur coût variable (%)",
    unidadesObjetivo: "Unités pour votre bénéfice visé",
    facturacionObjetivo: "Chiffre d’affaires pour votre bénéfice visé",
    errorPrecio: "Saisissez le prix de vente d’une unité.",
    errorMargen: "Le coût variable est égal ou supérieur au prix : chaque vente fait perdre de l’argent et le seuil n’est jamais atteint. Vérifiez le prix ou le coût.",
    observacionRedondeo: "Les unités sont arrondies au-dessus, car on ne vend pas une fraction d’unité.",
  }),
};
