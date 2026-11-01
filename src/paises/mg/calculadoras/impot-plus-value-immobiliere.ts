import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "mg.impot-plus-value-immobiliere",
  mercado: "mg",
  concepto: "propio",
  slug: "impot-plus-value-immobiliere",
  estado: "publicado",
  requiere: {
    "mg.ipvi-taux": "numero",
    "mg.ipvi-prix-revient": "numero",
  },
  campos: [
    { id: "prix", tipo: "moneda", etiqueta: "Prix de vente", min: 0, porDefecto: 200000000 },
    {
      id: "valeurAdministrative",
      tipo: "moneda",
      etiqueta: "Valeur minimale de l'administration",
      min: 0,
      requerido: false,
      ayuda: "Si le service des impôts vous l'a communiquée. Elle remplace le prix quand elle est plus élevée.",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.prix <= 0) throw new ErrorEntrada("Indiquez un prix de vente supérieur à zéro.", "prix");
    const base = Math.max(e.prix, e.valeurAdministrative ?? 0);
    const prixRevient = redondear(porcentaje(base, v["mg.ipvi-prix-revient"]));
    const plusValue = redondear(base - prixRevient);
    const impot = redondear(porcentaje(plusValue, v["mg.ipvi-taux"]));
    return { impot, base, prixRevient, plusValue, partDuPrix: (impot / base) * 100, netVendeur: redondear(e.prix - impot) };
  },
  resultado: [
    { clave: "impot", etiqueta: "IPVI à payer", formato: "moneda", destacada: true },
    { clave: "base", etiqueta: "Prix retenu", formato: "moneda" },
    { clave: "prixRevient", etiqueta: "Prix de revient forfaitaire", formato: "moneda" },
    { clave: "plusValue", etiqueta: "Plus-value imposable", formato: "moneda" },
    { clave: "partDuPrix", etiqueta: "Impôt rapporté au prix", formato: "porcentaje", decimales: 1 },
    { clave: "netVendeur", etiqueta: "Reste au vendeur après IPVI", formato: "moneda" },
  ],
});
