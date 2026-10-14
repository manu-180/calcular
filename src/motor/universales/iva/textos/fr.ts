import type { TextosUi } from "../../tipos";
import type { UiIva } from "../definicion";

export const textosFr: TextosUi<UiIva> = {
  slug: "calcul-tva",
  ui: () => ({
    operacion: "Que voulez-vous faire ?",
    agregar: "Passer du HT au TTC (ajouter la TVA)",
    quitar: "Passer du TTC au HT (retirer la TVA)",
    monto: "Prix",
    montoAyuda: "Hors taxes si vous ajoutez la TVA, toutes taxes comprises si vous la retirez.",
    otraTasa: "Autre taux de TVA (%)",
    otraTasaAyuda: "Facultatif. Si votre produit relève d’un taux réduit, indiquez-le ici. Sinon, le taux normal s’applique.",
    neto: "Prix HT",
    impuesto: "Montant de la TVA",
    total: "Prix TTC",
    tasaUsada: "Taux appliqué",
    errorTasa: "Ce taux de TVA n’est pas valide.",
  }),
};
