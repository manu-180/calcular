import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ne.taxe-transferts-argent",
  mercado: "ne",
  concepto: "propio",
  slug: "taxe-transferts-argent",
  estado: "publicado",
  requiere: { "ne.tdta-taux": "numero", "ne.tdta-taux-eleve": "numero", "ne.tdta-seuil": "numero" },
  campos: [
    {
      id: "montant",
      tipo: "moneda",
      etiqueta: "Montant brut déposé ou transféré",
      min: 0,
      porDefecto: 500000,
      ayuda: "Le montant avant déduction des frais de l'opérateur.",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.montant <= 0) throw new ErrorEntrada("Indiquez un montant supérieur à zéro.", "montant");
    const eleve = entrada.montant > v["ne.tdta-seuil"];
    const taux = eleve ? v["ne.tdta-taux-eleve"] : v["ne.tdta-taux"];
    const taxe = redondear(porcentaje(entrada.montant, taux));
    return {
      taxe,
      taux,
      montant: redondear(entrada.montant),
      observaciones: eleve ? ["Le montant dépasse le seuil : le texte porte le taux au niveau le plus haut. Le calcul l'applique à tout le montant."] : [],
    };
  },
  resultado: [
    { clave: "taxe", etiqueta: "Taxe sur le dépôt ou le transfert", formato: "moneda", destacada: true },
    { clave: "taux", etiqueta: "Taux appliqué", formato: "porcentaje", decimales: 1 },
    { clave: "montant", etiqueta: "Montant brut", formato: "moneda" },
  ],
});
