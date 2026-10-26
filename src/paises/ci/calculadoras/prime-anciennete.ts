import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ci.prime-anciennete",
  mercado: "ci",
  concepto: "propio",
  slug: "prime-anciennete",
  estado: "publicado",
  requiere: { "ci.prime-anciennete-taux": "mapa", "ci.prime-anciennete-annees": "mapa" },
  campos: [
    {
      id: "salaire",
      tipo: "moneda",
      etiqueta: "Salaire minimum de votre catégorie (par mois)",
      min: 0,
      porDefecto: 150000,
      ayuda: "Le salaire minimum de la catégorie de classement prévu par la convention collective, pas votre salaire réel.",
    },
    { id: "annees", tipo: "entero", etiqueta: "Années d'ancienneté continue dans l'entreprise", min: 0, max: 60, porDefecto: 10 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salaire <= 0) throw new ErrorEntrada("Indiquez un salaire supérieur à zéro.", "salaire");
    const t = v["ci.prime-anciennete-taux"];
    const a = v["ci.prime-anciennete-annees"];
    const taux = entrada.annees < a.debut ? 0 : t.initial + (Math.min(entrada.annees, a.plafond) - a.debut) * t["par-annee"];
    const prime = redondear(porcentaje(entrada.salaire, taux));
    return { prime, taux, primeAnnuelle: redondear(prime * 12) };
  },
  resultado: [
    { clave: "prime", etiqueta: "Prime d'ancienneté par mois", formato: "moneda", destacada: true },
    { clave: "taux", etiqueta: "Taux de la prime", formato: "porcentaje" },
    { clave: "primeAnnuelle", etiqueta: "Prime sur 12 mois", formato: "moneda" },
  ],
});
