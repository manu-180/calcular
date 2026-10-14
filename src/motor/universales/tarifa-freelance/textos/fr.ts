import { conVariantes } from "../../comun/locales";
import type { TextosUi } from "../../tipos";
import type { UiTarifaFreelance } from "../definicion";

const base: TextosUi<UiTarifaFreelance> = {
  slug: "calcul-tjm-freelance",
  ui: () => ({
    ingreso: "Ce que vous voulez gagner net par an",
    ingresoAyuda: "Après impôts, cotisations et frais. C’est votre salaire d’indépendant.",
    gastos: "Frais professionnels par an",
    gastosAyuda: "Matériel, logiciels, internet, formations, comptable, mutuelle et épargne retraite.",
    impuestos: "Impôts et cotisations estimés (%)",
    impuestosAyuda: "Ce que prélèvent impôts et cotisations sur votre chiffre d’affaires moins vos frais. Dans le doute, demandez à un comptable. 25 % est un point de départ.",
    diasLibres: "Jours non travaillés par an",
    diasLibresAyuda: "Congés, jours fériés et jours de maladie. Personne ne vous les paie : votre tarif doit les couvrir.",
    diasSemana: "Jours travaillés par semaine",
    horasSemana: "Heures facturables par semaine",
    horasSemanaAyuda: "Seulement les heures que vous facturez. Prospection, administratif et formation ne le sont pas. On compte souvent 20 à 30 sur 40.",
    tarifaHora: "Taux horaire",
    tarifaDia: "Taux journalier (TJM)",
    facturacionMensual: "Chiffre d’affaires nécessaire par mois",
    facturacionAnual: "Chiffre d’affaires nécessaire par an",
    horasAnio: "Heures facturables par an",
    errorIngreso: "Indiquez combien vous voulez gagner par an.",
    errorImpuestos: "Les impôts et cotisations doivent rester sous 100 %.",
    errorDias: "Avec autant de jours non travaillés, il ne reste aucun jour de travail dans l’année.",
    errorHoras: "Indiquez combien d’heures par semaine vous pouvez facturer.",
    observacionFacturables: "Si vous facturez moins, vous gagnerez moins que prévu ou travaillerez plus d’heures.",
  }),
};

const canada = (): Partial<UiTarifaFreelance> => ({
  ingresoAyuda: "Après impôts, cotisations et dépenses. C’est votre salaire de travailleur autonome.",
  gastosAyuda: "Matériel, logiciels, internet, formations, comptable, assurances collectives et épargne-retraite (REER).",
});

export const textosFr = conVariantes(base, { "fr-CA": canada });
