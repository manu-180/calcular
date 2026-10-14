import type { TextosUi } from "../../tipos";
import type { UiMetaDeAhorro } from "../definicion";

export const textosFr: TextosUi<UiMetaDeAhorro> = {
  slug: "objectif-epargne",
  ui: () => ({
    meta: "Combien voulez-vous mettre de côté ?",
    actual: "Ce que vous avez déjà épargné (facultatif)",
    meses: "Nombre de mois pour y arriver",
    rendimiento: "Rendement annuel de l’épargne (%, facultatif)",
    rendimientoAyuda: "Si l’argent est placé sur un livret ou un placement qui rapporte des intérêts. Laissez vide s’il ne rapporte rien.",
    aporteMensual: "À épargner chaque mois",
    aporteSemanal: "Soit par semaine",
    totalAportado: "Total versé",
    intereses: "Intérêts gagnés",
    errorMeta: "Indiquez combien vous voulez mettre de côté.",
    yaLlegas: "Ce que vous avez déjà suffit à atteindre l’objectif dans ce délai, sans rien ajouter.",
  }),
};
