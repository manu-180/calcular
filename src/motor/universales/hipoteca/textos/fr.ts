import type { TextosUi } from "../../tipos";
import type { UiHipoteca } from "../definicion";

export const textosFr: TextosUi<UiHipoteca> = {
  slug: "simulation-pret-immobilier",
  ui: () => ({
    precio: "Prix du logement",
    entradaPorcentaje: "Apport personnel (% du prix)",
    entradaMonto: "Montant de l’apport (facultatif)",
    entradaMontoAyuda: "Si vous le saisissez, il remplace le pourcentage.",
    tasa: "Taux d’intérêt annuel (%)",
    anios: "Durée en années",
    gastos: "Charges mensuelles du logement (facultatif)",
    gastosAyuda: "Assurance emprunteur, assurance habitation, taxe foncière ou charges de copropriété payées avec le crédit, ramenées au mois.",
    cuota: "Mensualité du prêt",
    cuotaTotal: "Mensualité avec les charges",
    entrada: "Apport",
    prestado: "Montant emprunté",
    intereses: "Total des intérêts",
    total: "Total des mensualités",
    tabla: "Année par année",
    colAnio: "Année",
    colIntereses: "Intérêts payés",
    colCapital: "Capital remboursé",
    colSaldo: "Capital restant dû en fin d’année",
    errorPrecio: "Saisissez le prix du logement.",
    errorEntrada: "L’apport couvre tout le prix : il n’y a pas de prêt à calculer. Baissez l’apport.",
    observacionPrestado: (porcentaje) => `Vous empruntez ${porcentaje} % de la valeur du logement. Plus cette part est élevée, plus la banque se montre exigeante.`,
    observacionCostos: "Les frais d’achat (notaire, garantie, frais de dossier) ne sont pas compris. Prévoyez-les en plus de l’apport.",
  }),
};
