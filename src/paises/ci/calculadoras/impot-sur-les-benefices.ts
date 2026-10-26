import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ci.impot-sur-les-benefices",
  mercado: "ci",
  concepto: "propio",
  slug: "impot-sur-les-benefices",
  estado: "publicado",
  requiere: { "ci.bic-taux": "mapa" },
  campos: [
    { id: "benefice", tipo: "moneda", etiqueta: "Bénéfice fiscal de l'exercice", min: 0, porDefecto: 20000000 },
    { id: "secteur", tipo: "opcion-dato", dato: "ci.bic-taux", etiqueta: "Secteur", porDefecto: "general" },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.benefice < 0) throw new ErrorEntrada("Indiquez un bénéfice positif. En cas de perte, l'impôt sur le bénéfice n'est pas dû.", "benefice");
    const taux = enMapa(v["ci.bic-taux"], entrada.secteur);
    const impot = redondear(porcentaje(entrada.benefice, taux));
    return { impot, taux, apresImpot: redondear(entrada.benefice - impot) };
  },
  resultado: [
    { clave: "impot", etiqueta: "Impôt sur les bénéfices", formato: "moneda", destacada: true },
    { clave: "taux", etiqueta: "Taux", formato: "porcentaje" },
    { clave: "apresImpot", etiqueta: "Bénéfice après impôt", formato: "moneda" },
  ],
});
