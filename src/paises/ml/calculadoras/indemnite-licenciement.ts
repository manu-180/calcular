import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { anciennete, indemniteParAnnee } from "../lib/travail";

export default definirCalculadora({
  id: "ml.indemnite-licenciement",
  mercado: "ml",
  concepto: "indemnizacion-despido",
  slug: "indemnite-licenciement",
  estado: "publicado",
  requiere: { "ml.licenciement-taux": "escala", "ml.licenciement-anciennete-min": "numero" },
  campos: [
    {
      id: "salaire",
      tipo: "moneda",
      etiqueta: "Rémunération mensuelle moyenne des 12 derniers mois",
      min: 0,
      porDefecto: 200000,
      ayuda: "Toutes les sommes versées en contrepartie du travail, sans les remboursements de frais.",
    },
    { id: "annees", tipo: "entero", etiqueta: "Années complètes de service continu", min: 0, max: 60, porDefecto: 8 },
    { id: "mois", tipo: "entero", etiqueta: "Mois en plus", min: 0, max: 11, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salaire <= 0) throw new ErrorEntrada("Indiquez une rémunération supérieure à zéro.", "salaire");
    const ans = anciennete(entrada.annees, entrada.mois);
    const minimum = v["ml.licenciement-anciennete-min"];
    if (ans < minimum) {
      return { indemnite: 0, pourcentage: 0, ans, observaciones: [`Il faut au moins ${minimum} an de service continu pour avoir droit à l'indemnité de licenciement.`] };
    }
    const r = indemniteParAnnee(entrada.salaire, ans, v["ml.licenciement-taux"], redondear);
    return { indemnite: r.indemnite, pourcentage: r.pourcentage, ans, observaciones: ["L'indemnité n'est pas due en cas de faute lourde."] };
  },
  resultado: [
    { clave: "indemnite", etiqueta: "Indemnité de licenciement", formato: "moneda", destacada: true },
    { clave: "pourcentage", etiqueta: "Total des pourcentages appliqués à la rémunération", formato: "porcentaje", decimales: 2 },
    { clave: "ans", etiqueta: "Ancienneté retenue", formato: "anios", decimales: 2 },
  ],
});
