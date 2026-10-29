import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ne.taxe-paiements-numeraire",
  mercado: "ne",
  concepto: "propio",
  slug: "taxe-paiements-numeraire",
  estado: "publicado",
  requiere: { "ne.numeraire-taux": "numero", "ne.numeraire-seuil": "numero" },
  campos: [
    {
      id: "montant",
      tipo: "moneda",
      etiqueta: "Montant du paiement hors TVA",
      min: 0,
      porDefecto: 500000,
      ayuda: "La taxe se calcule sur le montant hors taxe sur la valeur ajoutée.",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.montant <= 0) throw new ErrorEntrada("Indiquez un montant supérieur à zéro.", "montant");
    const exonere = entrada.montant <= v["ne.numeraire-seuil"];
    const taxe = exonere ? 0 : redondear(porcentaje(entrada.montant, v["ne.numeraire-taux"]));
    return {
      taxe,
      taux: exonere ? 0 : v["ne.numeraire-taux"],
      total: redondear(entrada.montant + taxe),
      observaciones: exonere ? ["Ce paiement est exonéré : il ne dépasse pas le plafond."] : [],
    };
  },
  resultado: [
    { clave: "taxe", etiqueta: "Taxe sur le paiement en numéraire", formato: "moneda", destacada: true },
    { clave: "taux", etiqueta: "Taux appliqué", formato: "porcentaje", decimales: 0 },
    { clave: "total", etiqueta: "Montant hors TVA plus taxe", formato: "moneda" },
  ],
});
