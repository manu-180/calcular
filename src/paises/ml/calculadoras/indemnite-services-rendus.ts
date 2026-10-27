import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { anciennete, indemniteParAnnee } from "../lib/travail";

export default definirCalculadora({
  id: "ml.indemnite-services-rendus",
  mercado: "ml",
  concepto: "propio",
  slug: "indemnite-services-rendus",
  estado: "publicado",
  requiere: { "ml.licenciement-taux": "escala", "ml.services-rendus-anciennete-min": "numero" },
  campos: [
    {
      id: "salaire",
      tipo: "moneda",
      etiqueta: "Rémunération mensuelle moyenne des 12 derniers mois",
      min: 0,
      porDefecto: 200000,
      ayuda: "Toutes les sommes versées en contrepartie du travail, sans les remboursements de frais.",
    },
    { id: "annees", tipo: "entero", etiqueta: "Années complètes de service continu", min: 0, max: 60, porDefecto: 12 },
    { id: "mois", tipo: "entero", etiqueta: "Mois en plus", min: 0, max: 11, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salaire <= 0) throw new ErrorEntrada("Indiquez une rémunération supérieure à zéro.", "salaire");
    const ans = anciennete(entrada.annees, entrada.mois);
    const minimum = v["ml.services-rendus-anciennete-min"];
    if (ans < minimum) {
      return { indemnite: 0, pourcentage: 0, ans, observaciones: [`En cas de démission, l'indemnité de services rendus demande au moins ${minimum} ans de services continus.`] };
    }
    const r = indemniteParAnnee(entrada.salaire, ans, v["ml.licenciement-taux"], redondear);
    return { indemnite: r.indemnite, pourcentage: r.pourcentage, ans, observaciones: [] as string[] };
  },
  resultado: [
    { clave: "indemnite", etiqueta: "Indemnité de services rendus", formato: "moneda", destacada: true },
    { clave: "pourcentage", etiqueta: "Total des pourcentages appliqués à la rémunération", formato: "porcentaje", decimales: 2 },
    { clave: "ans", etiqueta: "Ancienneté retenue", formato: "anios", decimales: 2 },
  ],
});
