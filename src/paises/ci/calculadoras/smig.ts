import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ci.smig",
  mercado: "ci",
  concepto: "salario-minimo",
  slug: "smig",
  estado: "publicado",
  requiere: { "ci.smig": "numero" },
  campos: [
    {
      id: "salaire",
      tipo: "moneda",
      etiqueta: "Salaire mensuel de base proposé ou reçu",
      min: 0,
      porDefecto: 75000,
      ayuda: "Pour un emploi à temps plein, avant les retenues.",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salaire < 0) throw new ErrorEntrada("Le salaire ne peut pas être négatif.", "salaire");
    const smig = v["ci.smig"];
    const ecart = redondear(entrada.salaire - smig);
    return {
      smig,
      smigAnnuel: redondear(smig * 12),
      ecart,
      manque: ecart < 0 ? -ecart : 0,
      verdict: ecart >= 0 ? "Le salaire atteint au moins le SMIG." : "Le salaire est inférieur au SMIG.",
      enSmig: redondear((entrada.salaire / smig) * 100) / 100,
    };
  },
  resultado: [
    { clave: "verdict", etiqueta: "Résultat", formato: "texto", destacada: true },
    { clave: "smig", etiqueta: "SMIG mensuel", formato: "moneda" },
    { clave: "manque", etiqueta: "Montant manquant pour atteindre le SMIG", formato: "moneda", ocultarSiCero: true },
    { clave: "enSmig", etiqueta: "Salaire exprimé en SMIG", formato: "numero", decimales: 2 },
    { clave: "smigAnnuel", etiqueta: "SMIG sur 12 mois", formato: "moneda" },
  ],
});
