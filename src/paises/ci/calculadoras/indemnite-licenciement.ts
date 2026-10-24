import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { anciennete, indemniteAnciennete } from "../lib/travail";

export default definirCalculadora({
  id: "ci.indemnite-licenciement",
  mercado: "ci",
  concepto: "indemnizacion-despido",
  slug: "indemnite-licenciement",
  estado: "publicado",
  requiere: { "ci.licenciement-taux": "escala", "ci.licenciement-anciennete-min": "numero" },
  campos: [
    {
      id: "salaire",
      tipo: "moneda",
      etiqueta: "Salaire global mensuel moyen des 12 derniers mois",
      min: 0,
      porDefecto: 400000,
      ayuda: "Toutes les sommes versées en contrepartie du travail, sans les remboursements de frais.",
    },
    { id: "annees", tipo: "entero", etiqueta: "Années complètes de présence dans l'entreprise", min: 0, max: 60, porDefecto: 7 },
    { id: "mois", tipo: "entero", etiqueta: "Mois en plus", min: 0, max: 11, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salaire <= 0) throw new ErrorEntrada("Indiquez un salaire supérieur à zéro.", "salaire");
    const ans = anciennete(entrada.annees, entrada.mois);
    if (ans < v["ci.licenciement-anciennete-min"]) {
      return {
        indemnite: 0,
        pourcentage: 0,
        ans,
        observaciones: [`Il faut au moins ${v["ci.licenciement-anciennete-min"]} an de présence pour avoir droit à l'indemnité de licenciement.`],
      };
    }
    const r = indemniteAnciennete(entrada.salaire, ans, v["ci.licenciement-taux"], redondear);
    return { indemnite: r.indemnite, pourcentage: r.pourcentage, ans, observaciones: [] as string[] };
  },
  resultado: [
    { clave: "indemnite", etiqueta: "Indemnité de licenciement", formato: "moneda", destacada: true },
    { clave: "pourcentage", etiqueta: "Total des pourcentages appliqués au salaire", formato: "porcentaje", decimales: 2 },
    { clave: "ans", etiqueta: "Ancienneté retenue", formato: "anios", decimales: 2 },
  ],
});
