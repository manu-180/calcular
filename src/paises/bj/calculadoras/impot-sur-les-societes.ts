import { definirCalculadora } from "@/motor/calculo";
import { impotSurBenefices } from "../lib/benefices";

export default definirCalculadora({
  id: "bj.impot-sur-les-societes",
  mercado: "bj",
  concepto: "propio",
  slug: "impot-sur-les-societes",
  estado: "publicado",
  requiere: { "bj.is-taux": "mapa", "bj.is-minimum-taux": "mapa", "bj.impot-minimum-plancher": "numero" },
  campos: [
    { id: "benefice", tipo: "moneda", etiqueta: "Bénéfice imposable de l'exercice", min: 0, porDefecto: 30000000 },
    { id: "produits", tipo: "moneda", etiqueta: "Produits encaissables de l'exercice", min: 0, porDefecto: 200000000, ayuda: "Produits d'exploitation, financiers et hors activité ordinaire effectivement encaissables." },
    {
      id: "activite",
      tipo: "opcion",
      etiqueta: "Activité de la société",
      opciones: [
        { valor: "general", etiqueta: "Commerce, services et autres activités" },
        { valor: "industrie-enseignement", etiqueta: "Industrie (hors industries extractives) ou école privée" },
      ],
      porDefecto: "general",
    },
    {
      id: "secteur",
      tipo: "opcion",
      etiqueta: "Secteur pour le minimum de perception",
      opciones: [
        { valor: "general", etiqueta: "Cas général" },
        { valor: "btp", etiqueta: "Bâtiment et travaux publics" },
        { valor: "immobilier", etiqueta: "Société à prépondérance immobilière" },
      ],
      porDefecto: "general",
    },
  ],
  calcular(e, v, { redondear }) {
    const r = impotSurBenefices(e.benefice, e.produits, v["bj.is-taux"][e.activite], v["bj.is-minimum-taux"][e.secteur], v["bj.impot-minimum-plancher"], 4000, redondear);
    return {
      total: r.total,
      impot: r.impot,
      calcule: r.calcule,
      minimumProduits: r.minimumProduits,
      redevance: 4000,
      taux: v["bj.is-taux"][e.activite],
      minimumApplique: r.minimumApplique,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Impôt et redevance à payer", formato: "moneda", destacada: true },
    { clave: "impot", etiqueta: "Impôt sur les sociétés retenu", formato: "moneda" },
    { clave: "calcule", etiqueta: "Impôt sur le bénéfice imposable", formato: "moneda" },
    { clave: "minimumProduits", etiqueta: "Minimum de perception sur les produits", formato: "moneda" },
    { clave: "redevance", etiqueta: "Redevance de radiodiffusion et télévision", formato: "moneda" },
    { clave: "taux", etiqueta: "Taux appliqué au bénéfice", formato: "porcentaje" },
    { clave: "minimumApplique", etiqueta: "Minimum appliqué", formato: "texto" },
  ],
});
