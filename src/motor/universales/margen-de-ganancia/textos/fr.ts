import type { TextosUi } from "../../tipos";
import type { UiMargenDeGanancia } from "../definicion";

// En francés "taux de marge" es la ganancia sobre el costo (markup) y "taux de marque" sobre el precio (margin): no invertir.
export const textosFr: TextosUi<UiMargenDeGanancia> = {
  slug: "calcul-taux-de-marge",
  ui: () => ({
    modo: "Que voulez-vous calculer ?",
    modoPrecio: "Les taux, à partir du coût et du prix",
    modoMargen: "Le prix pour un taux de marque visé",
    modoMarkup: "Le prix pour un taux de marge visé",
    costo: "Coût d’achat unitaire HT",
    costoAyuda: "Ce que coûte une unité à l’achat ou à la fabrication, hors taxes.",
    precio: "Prix de vente HT",
    precioAyuda: "Seulement si vous calculez les taux. Hors taxes.",
    objetivo: "Taux visé (%)",
    objetivoAyuda: "Seulement si vous calculez le prix.",
    precioResultado: "Prix de vente HT",
    margen: "Taux de marque",
    margenAyuda: "La marge en pourcentage du prix de vente.",
    markup: "Taux de marge",
    markupAyuda: "La marge en pourcentage du coût d’achat.",
    ganancia: "Marge par unité",
    errorCosto: "Saisissez le coût d’une unité.",
    errorFaltaPrecio: "Saisissez le prix de vente pour calculer les taux.",
    errorFaltaObjetivo: "Saisissez le taux que vous visez.",
    errorMargen100: "Un taux de marque doit rester sous 100 % : sinon tout le prix serait de la marge, sans aucun coût.",
    observacionPerdida: "À ce prix, vous vendez à perte : chaque vente vous fait perdre de l’argent.",
  }),
};
