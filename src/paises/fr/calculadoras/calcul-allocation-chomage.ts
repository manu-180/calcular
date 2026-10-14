import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "fr.allocation-chomage",
  mercado: "fr",
  concepto: "propio",
  slug: "calcul-allocation-chomage",
  estado: "publicado",
  requiere: {
    "fr.are-partie-fixe": "numero",
    "fr.are-taux-variable": "numero",
    "fr.are-taux-minimum": "numero",
    "fr.are-taux-maximum": "numero",
    "fr.are-minimum": "numero",
    "fr.are-retraite": "numero",
    "fr.are-plancher-degressivite": "numero",
    "fr.are-degressivite": "numero",
  },
  campos: [
    {
      id: "mode",
      tipo: "opcion",
      etiqueta: "Vous connaissez",
      opciones: [
        { valor: "salaire", etiqueta: "Mon salaire brut mensuel moyen" },
        { valor: "sjr", etiqueta: "Mon salaire journalier de référence (SJR)" },
      ],
      porDefecto: "salaire",
    },
    { id: "montant", tipo: "moneda", etiqueta: "Montant brut", min: 0, porDefecto: 2500 },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.montant <= 0) throw new ErrorEntrada("Indiquez un montant supérieur à zéro.", "montant");
    const sjr = entrada.mode === "sjr" ? redondear(entrada.montant) : redondear((entrada.montant * 12) / 365);
    const formule1 = valores["fr.are-partie-fixe"] + porcentaje(sjr, valores["fr.are-taux-variable"]);
    const formule2 = porcentaje(sjr, valores["fr.are-taux-minimum"]);
    const minimum = valores["fr.are-minimum"];
    let aj = Math.max(formule1, formule2, minimum);
    aj = redondear(Math.min(aj, porcentaje(sjr, valores["fr.are-taux-maximum"])));
    const retraite = redondear(Math.min(porcentaje(sjr, valores["fr.are-retraite"]), Math.max(0, aj - minimum)));
    const ajApres = redondear(aj - retraite);
    const plancher = valores["fr.are-plancher-degressivite"];
    const degressive = aj > plancher ? redondear(Math.max(plancher, aj * (1 - valores["fr.are-degressivite"] / 100))) : null;
    return {
      sjr,
      aj,
      retraite,
      ajApres,
      mensuel: redondear(ajApres * 30),
      degressive,
      observaciones: [
        ...(entrada.mode === "salaire" ? ["Le SJR est estimé à partir d'un salaire constant sur 12 mois. France Travail le calcule sur vos salaires réels de la période de référence."] : []),
        "Montants avant CSG et CRDS, qui peuvent être retenues selon votre niveau d'allocation.",
      ],
    };
  },
  resultado: [
    { clave: "sjr", etiqueta: "Salaire journalier de référence (SJR)", formato: "moneda" },
    { clave: "aj", etiqueta: "Allocation journalière brute", formato: "moneda" },
    { clave: "retraite", etiqueta: "Retenue pour la retraite complémentaire", formato: "moneda", ocultarSiCero: true },
    { clave: "ajApres", etiqueta: "Allocation journalière après retenue", formato: "moneda", destacada: true },
    { clave: "mensuel", etiqueta: "Soit pour un mois de 30 jours", formato: "moneda" },
    { clave: "degressive", etiqueta: "Allocation journalière brute à partir du 7e mois", formato: "moneda" },
  ],
});
