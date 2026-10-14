import type { TextosUi } from "../../tipos";
import type { UiPrestamo } from "../definicion";

export const textosFr: TextosUi<UiPrestamo> = {
  slug: "calcul-mensualite-pret",
  ui: () => ({
    monto: "Montant emprunté",
    tasa: "Taux d’intérêt annuel (%)",
    tasaAyuda: "Le taux nominal annuel de l’offre, hors frais et hors assurance.",
    meses: "Durée en mois",
    extra: "Remboursement en plus chaque mois (facultatif)",
    extraAyuda: "Ce que vous ajouteriez chaque mois pour finir plus tôt. Tout va au capital.",
    cuota: "Mensualité",
    intereses: "Total des intérêts",
    total: "Total remboursé",
    mesesReales: "Mois pour rembourser avec le versement en plus",
    ahorro: "Intérêts économisés",
    tabla: "Tableau d’amortissement",
    colMes: "Mois",
    colPago: "Mensualité",
    colInteres: "Intérêts",
    colCapital: "Capital",
    colSaldo: "Capital restant dû",
    errorMonto: "Saisissez un montant supérieur à zéro.",
    observacionCostos: "La mensualité ne comprend pas l’assurance, les frais de dossier ni les taxes que le prêteur peut ajouter. Demandez le coût total (le TAEG) avant de signer.",
    observacionExtra: (meses, ahorro) => `Avec ce versement en plus, vous terminez en ${meses} mois et économisez ${ahorro} d’intérêts.`,
  }),
};
