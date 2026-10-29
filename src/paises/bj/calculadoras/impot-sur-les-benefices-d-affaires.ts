import { definirCalculadora } from "@/motor/calculo";
import { impotSurBenefices } from "../lib/benefices";

export default definirCalculadora({
  id: "bj.impot-sur-les-benefices-d-affaires",
  mercado: "bj",
  concepto: "propio",
  slug: "impot-sur-les-benefices-d-affaires",
  estado: "publicado",
  requiere: { "bj.iba-taux": "mapa", "bj.iba-minimum-taux": "mapa", "bj.impot-minimum-plancher": "numero" },
  campos: [
    { id: "benefice", tipo: "moneda", etiqueta: "Bénéfice imposable de l'exercice", min: 0, porDefecto: 8000000 },
    { id: "produits", tipo: "moneda", etiqueta: "Produits encaissables de l'exercice", min: 0, porDefecto: 60000000 },
    {
      id: "activite",
      tipo: "opcion",
      etiqueta: "Activité",
      opciones: [
        { valor: "general", etiqueta: "Cas général" },
        { valor: "enseignement", etiqueta: "Établissement privé d'enseignement" },
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
        { valor: "immobilier", etiqueta: "Entreprise à prépondérance immobilière" },
      ],
      porDefecto: "general",
    },
  ],
  calcular(e, v, { redondear }) {
    const taux = v["bj.iba-taux"][e.activite === "enseignement" ? "enseignement" : "general"];
    const r = impotSurBenefices(e.benefice, e.produits, taux, v["bj.iba-minimum-taux"][e.secteur], v["bj.impot-minimum-plancher"], 4000, redondear);
    return {
      total: r.total,
      impot: r.impot,
      calcule: r.calcule,
      minimumProduits: r.minimumProduits,
      redevance: 4000,
      taux,
      minimumApplique: r.minimumApplique,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Impôt et redevance à payer", formato: "moneda", destacada: true },
    { clave: "impot", etiqueta: "Impôt sur les bénéfices d'affaires retenu", formato: "moneda" },
    { clave: "calcule", etiqueta: "Impôt sur le bénéfice imposable", formato: "moneda" },
    { clave: "minimumProduits", etiqueta: "Minimum de perception sur les produits", formato: "moneda" },
    { clave: "redevance", etiqueta: "Redevance de radiodiffusion et télévision", formato: "moneda" },
    { clave: "taux", etiqueta: "Taux appliqué au bénéfice", formato: "porcentaje" },
    { clave: "minimumApplique", etiqueta: "Minimum appliqué", formato: "texto" },
  ],
});
