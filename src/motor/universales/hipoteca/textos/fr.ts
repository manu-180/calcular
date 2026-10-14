import { conVariantes } from "../../comun/locales";
import type { TextosUi } from "../../tipos";
import type { UiHipoteca } from "../definicion";

const base: TextosUi<UiHipoteca> = {
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

const canada = (): Partial<UiHipoteca> => ({
  entradaPorcentaje: "Mise de fonds (% du prix)",
  entradaMonto: "Montant de la mise de fonds (facultatif)",
  gastosAyuda: "Assurance prêt hypothécaire, assurance habitation, taxes municipales et scolaires ou frais de condo payés avec le prêt, ramenés au mois.",
  cuota: "Versement hypothécaire mensuel",
  cuotaTotal: "Versement mensuel avec les frais",
  entrada: "Mise de fonds",
  prestado: "Montant du prêt hypothécaire",
  total: "Total des versements",
  errorEntrada: "La mise de fonds couvre tout le prix : il n’y a pas de prêt à calculer. Réduisez la mise de fonds.",
  observacionCostos: "Les frais d’achat (notaire, taxe de bienvenue, inspection) ne sont pas compris. Prévoyez-les en plus de la mise de fonds.",
});

export const textosFr = conVariantes(base, { "fr-CA": canada });
