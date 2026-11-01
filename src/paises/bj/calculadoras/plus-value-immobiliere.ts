import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "bj.plus-value-immobiliere",
  mercado: "bj",
  concepto: "propio",
  slug: "plus-value-immobiliere",
  estado: "publicado",
  requiere: { "bj.tpvi-taux": "numero", "bj.tpvi-minimum": "numero", "bj.tpvi-plus-value-construction": "numero" },
  campos: [
    { id: "prixTerrain", tipo: "moneda", etiqueta: "Prix de cession de la parcelle", min: 0, porDefecto: 20000000 },
    { id: "prixConstruction", tipo: "moneda", etiqueta: "Prix de cession de la construction", min: 0, porDefecto: 0, ayuda: "Zéro si le terrain est vendu nu. La déclaration doit distinguer la parcelle de la construction." },
    { id: "acquisition", tipo: "moneda", etiqueta: "Valeur d'acquisition de la parcelle", min: 0, porDefecto: 8000000, ayuda: "Prix d'achat révélé par un acte de date certaine." },
  ],
  calcular(e, v, { redondear }) {
    const cession = e.prixTerrain + e.prixConstruction;
    if (cession <= 0) throw new ErrorEntrada("Indiquez un prix de cession supérieur à zéro.", "prixTerrain");
    const pvTerrain = Math.max(0, e.prixTerrain - e.acquisition);
    const pvConstruction = redondear(porcentaje(e.prixConstruction, v["bj.tpvi-plus-value-construction"]));
    const plusValue = redondear(pvTerrain + pvConstruction);
    const calculee = redondear(porcentaje(plusValue, v["bj.tpvi-taux"]));
    const minimum = redondear(porcentaje(cession, v["bj.tpvi-minimum"]));
    const taxe = Math.max(calculee, minimum);
    return {
      taxe,
      plusValue,
      calculee,
      minimum,
      netVendeur: redondear(cession - taxe),
      minimumApplique: taxe === minimum && calculee < minimum ? "Oui, le minimum de 1 % du prix de cession s'applique." : "Non, 5 % de la plus-value dépassent le minimum.",
    };
  },
  resultado: [
    { clave: "taxe", etiqueta: "Taxe sur la plus-value immobilière", formato: "moneda", destacada: true },
    { clave: "plusValue", etiqueta: "Plus-value imposable", formato: "moneda" },
    { clave: "calculee", etiqueta: "Taxe à 5 % de la plus-value", formato: "moneda" },
    { clave: "minimum", etiqueta: "Minimum de 1 % du prix de cession", formato: "moneda" },
    { clave: "netVendeur", etiqueta: "Prix de cession après la taxe", formato: "moneda" },
    { clave: "minimumApplique", etiqueta: "Minimum appliqué", formato: "texto" },
  ],
});
