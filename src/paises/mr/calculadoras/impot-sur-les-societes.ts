import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "mr.impot-sur-les-societes",
  mercado: "mr",
  concepto: "propio",
  slug: "impot-sur-les-societes",
  estado: "publicado",
  requiere: { "mr.is-taux": "numero", "mr.is-minimum": "mapa", "mr.is-minimum-perception": "numero" },
  campos: [
    { id: "regime", tipo: "opcion-dato", dato: "mr.is-minimum", etiqueta: "نظام فرض الضريبة", porDefecto: "reel-normal" },
    { id: "benefice", tipo: "moneda", etiqueta: "الربح الصافي الخاضع للضريبة", ayuda: "أدخل 0 إن كانت السنة خاسرة.", min: 0, porDefecto: 2000000 },
    { id: "produits", tipo: "moneda", etiqueta: "المداخيل الخاضعة للضريبة (رقم الأعمال)", ayuda: "دون تحويلات الأعباء واستردادها.", min: 0, porDefecto: 50000000 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.benefice <= 0 && entrada.produits <= 0) throw new ErrorEntrada("أدخل الربح أو المداخيل.", "produits");
    const surBenefice = porcentaje(entrada.benefice, v["mr.is-taux"]);
    const tauxMinimum = enMapa(v["mr.is-minimum"], entrada.regime);
    const surProduits = porcentaje(entrada.produits, tauxMinimum);
    const plancher = entrada.regime === "reel-normal" ? v["mr.is-minimum-perception"] : 0;
    const impot = Math.max(surBenefice, surProduits, plancher);
    const base = impot === surBenefice ? "النسبة العادية على الربح" : impot === surProduits ? "الحد الأدنى النسبي على المداخيل" : "الحد الأدنى للتحصيل";
    return {
      impot: redondear(impot),
      surBenefice: redondear(surBenefice),
      surProduits: redondear(surProduits),
      base,
      effectif: entrada.benefice > 0 ? (impot / entrada.benefice) * 100 : null,
    };
  },
  resultado: [
    { clave: "impot", etiqueta: "الضريبة على الشركات المستحقة", formato: "moneda", destacada: true },
    { clave: "base", etiqueta: "الحساب الذي طُبق", formato: "texto" },
    { clave: "surBenefice", etiqueta: "الضريبة على الربح", formato: "moneda" },
    { clave: "surProduits", etiqueta: "الحد الأدنى على المداخيل", formato: "moneda" },
    { clave: "effectif", etiqueta: "النسبة الفعلية من الربح", formato: "porcentaje", decimales: 2 },
  ],
});
