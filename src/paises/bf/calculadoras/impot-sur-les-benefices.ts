import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "bf.impot-sur-les-benefices",
  mercado: "bf",
  concepto: "propio",
  slug: "impot-sur-les-benefices",
  estado: "publicado",
  requiere: { "bf.bic-bareme": "escala", "bf.bic-reduction-cga": "numero" },
  campos: [
    {
      id: "benefice",
      tipo: "moneda",
      etiqueta: "Bénéfice imposable de l'année",
      min: 0,
      porDefecto: 2000000,
      ayuda: "Bénéfice industriel, commercial ou agricole d'une entreprise individuelle.",
    },
    { id: "cga", tipo: "si-no", etiqueta: "Adhérent d'un centre de gestion agréé", porDefecto: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.benefice < 0) throw new ErrorEntrada("Le bénéfice ne peut pas être négatif.", "benefice");
    // Article 13 du CGI : le bénéfice est arrondi aux mille francs inférieurs.
    const base = Math.floor(entrada.benefice / 1000) * 1000;
    const bareme = redondear(aplicarEscalaMarginal(v["bf.bic-bareme"], base));
    const reduction = entrada.cga ? redondear(porcentaje(bareme, v["bf.bic-reduction-cga"])) : 0;
    const impot = redondear(bareme - reduction);
    return {
      impot,
      base,
      bareme,
      reduction,
      tauxMoyen: base > 0 ? Math.round((impot / base) * 10000) / 100 : 0,
      observaciones: ["Si cet impôt est inférieur au minimum forfaitaire de perception, c'est le minimum qui est dû."],
    };
  },
  resultado: [
    { clave: "impot", etiqueta: "Impôt sur les bénéfices", formato: "moneda", destacada: true },
    { clave: "base", etiqueta: "Bénéfice arrondi aux mille francs", formato: "moneda" },
    { clave: "bareme", etiqueta: "Impôt selon le barème", formato: "moneda" },
    { clave: "reduction", etiqueta: "Réduction centre de gestion agréé", formato: "moneda", ocultarSiCero: true },
    { clave: "tauxMoyen", etiqueta: "Taux moyen d'imposition", formato: "porcentaje", decimales: 2 },
  ],
});
