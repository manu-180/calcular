import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ci.prime-de-fin-d-annee",
  mercado: "ci",
  concepto: "bono-semestral",
  slug: "prime-de-fin-d-annee",
  estado: "publicado",
  requiere: { "ci.prime-fin-annee": "numero" },
  campos: [
    {
      id: "salaire",
      tipo: "moneda",
      etiqueta: "Salaire minimum conventionnel mensuel de votre catégorie",
      min: 0,
      porDefecto: 150000,
    },
    { id: "mois", tipo: "entero", etiqueta: "Mois de service dans l'année", min: 1, max: 12, porDefecto: 12 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salaire <= 0) throw new ErrorEntrada("Indiquez un salaire supérieur à zéro.", "salaire");
    const pleine = redondear(porcentaje(entrada.salaire, v["ci.prime-fin-annee"]));
    return { prime: redondear((pleine * entrada.mois) / 12), pleine };
  },
  resultado: [
    { clave: "prime", etiqueta: "Prime de fin d'année minimale", formato: "moneda", destacada: true },
    { clave: "pleine", etiqueta: "Montant pour une année complète", formato: "moneda" },
  ],
});
