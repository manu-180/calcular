import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { anciennete, indemniteParAnnee } from "../lib/travail";

export default definirCalculadora({
  id: "ml.indemnite-depart-retraite",
  mercado: "ml",
  concepto: "propio",
  slug: "indemnite-depart-retraite",
  estado: "publicado",
  requiere: { "ml.licenciement-taux": "escala" },
  campos: [
    {
      id: "salaire",
      tipo: "moneda",
      etiqueta: "Rémunération mensuelle moyenne des 12 derniers mois",
      min: 0,
      porDefecto: 250000,
      ayuda: "Toutes les sommes versées en contrepartie du travail, sans les remboursements de frais.",
    },
    { id: "annees", tipo: "entero", etiqueta: "Années complètes de service dans l'entreprise", min: 0, max: 60, porDefecto: 25 },
    { id: "mois", tipo: "entero", etiqueta: "Mois en plus", min: 0, max: 11, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salaire <= 0) throw new ErrorEntrada("Indiquez une rémunération supérieure à zéro.", "salaire");
    const ans = anciennete(entrada.annees, entrada.mois);
    const r = indemniteParAnnee(entrada.salaire, ans, v["ml.licenciement-taux"], redondear);
    return { indemnite: r.indemnite, pourcentage: r.pourcentage, ans, enMois: r.pourcentage / 100 };
  },
  resultado: [
    { clave: "indemnite", etiqueta: "Indemnité de départ à la retraite", formato: "moneda", destacada: true },
    { clave: "pourcentage", etiqueta: "Total des pourcentages appliqués à la rémunération", formato: "porcentaje", decimales: 2 },
    { clave: "enMois", etiqueta: "Équivalent en mois de rémunération", formato: "numero", decimales: 2 },
    { clave: "ans", etiqueta: "Ancienneté retenue", formato: "anios", decimales: 2 },
  ],
});
