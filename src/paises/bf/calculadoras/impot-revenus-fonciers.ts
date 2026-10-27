import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "bf.impot-revenus-fonciers",
  mercado: "bf",
  concepto: "propio",
  slug: "impot-revenus-fonciers",
  estado: "publicado",
  requiere: { "bf.irf-abattement": "numero", "bf.irf-bareme": "escala" },
  campos: [
    {
      id: "loyer",
      tipo: "moneda",
      etiqueta: "Loyer brut mensuel d'une location (hors TVA)",
      min: 0,
      porDefecto: 150000,
      ayuda: "Loyer et charges du bailleur mises à la charge du locataire. Faites un calcul par location.",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.loyer < 0) throw new ErrorEntrada("Le loyer ne peut pas être négatif.", "loyer");
    const abattement = redondear(porcentaje(entrada.loyer, v["bf.irf-abattement"]));
    const net = redondear(entrada.loyer - abattement);
    const impot = redondear(aplicarEscalaMarginal(v["bf.irf-bareme"], net));
    return { impot, abattement, net, impotAnnuel: redondear(impot * 12), loyerNet: redondear(entrada.loyer - impot) };
  },
  resultado: [
    { clave: "impot", etiqueta: "Impôt sur les revenus fonciers du mois", formato: "moneda", destacada: true },
    { clave: "abattement", etiqueta: "Abattement forfaitaire", formato: "moneda" },
    { clave: "net", etiqueta: "Revenu net imposable", formato: "moneda" },
    { clave: "loyerNet", etiqueta: "Loyer restant après impôt", formato: "moneda" },
    { clave: "impotAnnuel", etiqueta: "Impôt sur 12 mois", formato: "moneda" },
  ],
});
