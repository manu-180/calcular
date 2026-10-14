import type { TextosUi } from "../../tipos";
import type { UiTarjetaDeCredito } from "../definicion";

export const textosFr: TextosUi<UiTarjetaDeCredito> = {
  slug: "rembourser-carte-de-credit",
  ui: () => ({
    saldo: "Solde dû sur la carte",
    tasa: "Taux d’intérêt annuel (%)",
    tasaAyuda: "Le taux appliqué aux achats. Il figure sur votre relevé.",
    modo: "Comment allez-vous rembourser ?",
    modoFijo: "Un montant fixe chaque mois",
    modoMinimo: "Le paiement minimum",
    pagoFijo: "Remboursement mensuel fixe",
    minimoPorcentaje: "Paiement minimum (% du solde)",
    minimoPorcentajeAyuda: "Ce que l’émetteur de la carte demande chaque mois. Dans le doute, 5 % est courant.",
    minimoPiso: "Paiement minimum jamais inférieur à",
    meses: "Mois pour tout rembourser",
    intereses: "Intérêts payés",
    total: "Total remboursé",
    primerPago: "Premier paiement minimum",
    tabla: "Plan mois par mois",
    colMes: "Mois",
    colPago: "Paiement",
    colInteres: "Intérêts",
    colCapital: "Capital",
    colSaldo: "Solde",
    errorSaldo: "Saisissez le solde que vous devez sur la carte.",
    errorFaltaPago: "Indiquez combien vous paierez chaque mois.",
    errorNoCubre: (interes) => `Avec ce paiement, le solde ne baisse jamais : les intérêts du premier mois atteignent déjà ${interes}. Augmentez le paiement.`,
    errorMuyLargo: "Avec ce paiement, il faudrait plus de 50 ans pour tout rembourser. Augmentez le paiement.",
    observacionAnios: (anios, meses) => {
      const a = anios === "1" ? "1 an" : `${anios} ans`;
      const m = meses === "0" ? "" : ` et ${meses} mois`;
      return `Soit ${a}${m}.`;
    },
    observacionFijo: (pago, meses, ahorro) =>
      `Si vous payez toujours ${pago}, comme le premier minimum, vous avez fini en ${meses} mois et économisez ${ahorro} d’intérêts.`,
    observacionNoGastar: "Le calcul suppose que vous ne faites aucun nouvel achat avec la carte pendant le remboursement.",
  }),
};
