import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { anciennete, indemniteAnciennete } from "../lib/travail";

export default definirCalculadora({
  id: "ci.indemnite-depart-retraite",
  mercado: "ci",
  concepto: "propio",
  slug: "indemnite-depart-retraite",
  estado: "publicado",
  requiere: { "ci.licenciement-taux": "escala" },
  campos: [
    {
      id: "salaire",
      tipo: "moneda",
      etiqueta: "Salaire global mensuel moyen des 12 derniers mois",
      min: 0,
      porDefecto: 400000,
      ayuda: "Toutes les sommes versées en contrepartie du travail, sans les remboursements de frais.",
    },
    { id: "annees", tipo: "entero", etiqueta: "Années complètes de présence dans l'entreprise", min: 0, max: 60, porDefecto: 20 },
    { id: "mois", tipo: "entero", etiqueta: "Mois en plus", min: 0, max: 11, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salaire <= 0) throw new ErrorEntrada("Indiquez un salaire supérieur à zéro.", "salaire");
    const ans = anciennete(entrada.annees, entrada.mois);
    const r = indemniteAnciennete(entrada.salaire, ans, v["ci.licenciement-taux"], redondear);
    return { indemnite: r.indemnite, pourcentage: r.pourcentage, ans, enMois: Math.round(r.pourcentage) / 100 };
  },
  resultado: [
    { clave: "indemnite", etiqueta: "Indemnité de départ à la retraite", formato: "moneda", destacada: true },
    { clave: "enMois", etiqueta: "Équivalent en mois de salaire", formato: "numero", decimales: 2 },
    { clave: "pourcentage", etiqueta: "Total des pourcentages appliqués au salaire", formato: "porcentaje", decimales: 2 },
    { clave: "ans", etiqueta: "Ancienneté retenue", formato: "anios", decimales: 2 },
  ],
});
