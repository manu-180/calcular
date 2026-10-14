import { conVariantes } from "../../comun/locales";
import type { TextosUi } from "../../tipos";
import type { UiIva } from "../definicion";

const base: TextosUi<UiIva> = {
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

const canada = (): Partial<UiIva> => ({
  agregar: "Ajouter les taxes à un prix avant taxes",
  quitar: "Retirer les taxes d’un prix taxes incluses",
  montoAyuda: "Avant taxes si vous les ajoutez, taxes incluses si vous les retirez.",
  otraTasa: "Autre taux de taxe (%)",
  otraTasaAyuda: "Facultatif. Si votre province applique un autre taux, ou si le produit est détaxé, indiquez-le ici. Sinon, le taux par défaut s’applique.",
  neto: "Prix avant taxes",
  impuesto: "Montant des taxes",
  total: "Prix taxes incluses",
  errorTasa: "Ce taux de taxe n’est pas valide.",
});

export const textosFr = conVariantes(base, { "fr-CA": canada });
