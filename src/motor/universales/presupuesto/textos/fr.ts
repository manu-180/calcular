import type { TextosUi } from "../../tipos";
import type { UiPresupuesto } from "../definicion";

export const textosFr: TextosUi<UiPresupuesto> = {
  slug: "budget-50-30-20",
  ui: () => ({
    ingreso: "Revenu net mensuel",
    ingresoAyuda: "Ce qui arrive sur votre compte chaque mois, après impôts et cotisations.",
    pctNecesidades: "Besoins (%)",
    pctNecesidadesAyuda: "Logement, courses, énergie, transport, santé et remboursements minimums de crédits.",
    pctGustos: "Envies (%)",
    pctGustosAyuda: "Restaurants, achats non essentiels, abonnements, voyages.",
    pctAhorro: "Épargne (%)",
    pctAhorroAyuda: "Épargne de précaution, projets, retraite et remboursements anticipés.",
    necesidades: "Pour les besoins",
    gustos: "Pour les envies",
    ahorro: "Pour l’épargne",
    ahorroAnual: "Épargne sur un an",
    errorIngreso: "Saisissez votre revenu mensuel.",
    errorSuma: (suma) => `Les trois pourcentages font ${suma} % au total. Ils doivent faire 100 %.`,
    observacionAhorroBajo: "Épargner moins de 10 % laisse peu de marge pour les imprévus. Si vous le pouvez, réduisez un peu les envies.",
  }),
};
