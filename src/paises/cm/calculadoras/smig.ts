import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "cm.smig",
  mercado: "cm",
  concepto: "salario-minimo",
  slug: "smig",
  estado: "publicado",
  requiere: { "cm.smig": "mapa" },
  campos: [
    { id: "secteur", tipo: "opcion-dato", etiqueta: "Secteur", dato: "cm.smig", porDefecto: "general" },
    {
      id: "salaire",
      tipo: "moneda",
      etiqueta: "Votre salaire mensuel (facultatif)",
      min: 0,
      requerido: false,
      ayuda: "Pour comparer un salaire au minimum légal de votre secteur.",
    },
  ],
  calcular(entrada, v) {
    const smig = enMapa(v["cm.smig"], entrada.secteur);
    if (entrada.salaire !== null && entrada.salaire < 0) throw new ErrorEntrada("Le salaire ne peut pas être négatif.", "salaire");
    const ecart = entrada.salaire === null ? null : entrada.salaire - smig;
    const observaciones: string[] = [];
    if (ecart !== null && ecart < 0) observaciones.push("Ce salaire est inférieur au SMIG de votre secteur.");
    return { smig, annuel: smig * 12, ecart, observaciones };
  },
  resultado: [
    { clave: "smig", etiqueta: "SMIG mensuel", formato: "moneda", destacada: true },
    { clave: "annuel", etiqueta: "SMIG sur 12 mois", formato: "moneda" },
    { clave: "ecart", etiqueta: "Écart entre votre salaire et le SMIG", formato: "moneda" },
  ],
});
