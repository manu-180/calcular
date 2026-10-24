import type { ClaveFamilia } from "../ofertas-intl";
import { F, type TextosFamilia } from "./tipos";

// Quebec y el resto de Canadá en francés no tienen TVA: tienen TPS, TVQ y TVH. Solo cambia la familia
// de facturación; las demás usan el francés general. Mismas piezas que fr.ts (lo revisa
// check_ofertas_intl).
export const frCA: Partial<Record<ClaveFamilia, TextosFamilia>> = {
  "kit-facturacion": {
    nombre: "Rapport de taxes (TPS et TVQ)",
    tituloCorto: "rapport de taxes",
    paraQuien: F(
      "Pour facturer ou vérifier un prix avec les taxes bien séparées, prêt pour tes archives ou ton comptable",
      "Pour facturer ou vérifier un prix avec les taxes bien séparées, prêt pour vos archives ou votre comptable",
    ),
    descripcion: [
      F(
        "Un rapport PDF avec ton calcul : prix avant taxes, TPS, TVQ ou TVH et total, avec les taux appliqués et leur source.",
        "Un rapport PDF avec votre calcul : prix avant taxes, TPS, TVQ ou TVH et total, avec les taux appliqués et leur source.",
      ),
      "Il ajoute un tableau avec d'autres montants, pratique pour établir une grille de prix avant et après taxes.",
    ],
    gancho: F("Garde le prix avant et après taxes par écrit", "Gardez le prix avant et après taxes par écrit"),
    incluye: [
      { titulo: "Les taxes séparées", texto: "TPS, TVQ ou TVH et total, avec les taux en vigueur." },
      { titulo: "Avec d'autres montants", texto: "Pour établir une grille de prix d'un coup." },
      { titulo: F("Pour ton comptable", "Pour votre comptable"), texto: "Avec la source des taux et la date." },
    ],
    pasos: {
      titulo: "Avant de facturer",
      items: [
        F("Vérifie si ton produit ou service est taxable, détaxé ou exonéré.", "Vérifiez si votre produit ou service est taxable, détaxé ou exonéré."),
        F("Vérifie que la facture affiche la TPS et la TVQ séparément, avec tes numéros d'inscription.", "Vérifiez que la facture affiche la TPS et la TVQ séparément, avec vos numéros d'inscription."),
        F("Garde ce rapport avec la facture pour ta comptabilité.", "Gardez ce rapport avec la facture pour votre comptabilité."),
      ],
    },
    escenarios: { titulo: "Avec d'autres montants", explica: "Le même calcul avec des montants un peu plus bas et plus élevés." },
  },
};
