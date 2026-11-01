import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "mr.calcul-tva",
  mercado: "mr",
  concepto: "iva",
  slug: "calcul-tva",
  estado: "publicado",
  requiere: { "mr.tva": "numero", "mr.tva-telephonie": "numero" },
  campos: [
    { id: "montant", tipo: "moneda", etiqueta: "المبلغ", min: 0, porDefecto: 10000 },
    {
      id: "sens",
      tipo: "opcion",
      etiqueta: "المبلغ المدخل",
      opciones: [
        { valor: "ht", etiqueta: "دون الضريبة (HT)، أريد السعر مع الضريبة" },
        { valor: "ttc", etiqueta: "مع الضريبة (TTC)، أريد استخراج الضريبة" },
      ],
      porDefecto: "ht",
    },
    {
      id: "taux",
      tipo: "opcion",
      etiqueta: "النسبة",
      opciones: [
        { valor: "normal", etiqueta: "النسبة العادية" },
        { valor: "telephonie", etiqueta: "الاتصالات الهاتفية" },
        { valor: "export", etiqueta: "التصدير (نسبة صفر)" },
      ],
      porDefecto: "normal",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.montant <= 0) throw new ErrorEntrada("أدخل المبلغ.", "montant");
    const tasa = entrada.taux === "export" ? 0 : entrada.taux === "telephonie" ? v["mr.tva-telephonie"] : v["mr.tva"];
    const ht = entrada.sens === "ht" ? entrada.montant : entrada.montant / (1 + tasa / 100);
    const tva = (ht * tasa) / 100;
    return {
      ttc: redondear(ht + tva),
      ht: redondear(ht),
      tva: redondear(tva),
      tasa,
    };
  },
  resultado: [
    { clave: "ttc", etiqueta: "المبلغ مع الضريبة (TTC)", formato: "moneda", destacada: true },
    { clave: "ht", etiqueta: "المبلغ دون الضريبة (HT)", formato: "moneda" },
    { clave: "tva", etiqueta: "الضريبة على القيمة المضافة", formato: "moneda" },
    { clave: "tasa", etiqueta: "النسبة المطبقة", formato: "porcentaje" },
  ],
});
