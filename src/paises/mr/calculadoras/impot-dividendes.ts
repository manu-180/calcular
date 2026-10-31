import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "mr.impot-dividendes",
  mercado: "mr",
  concepto: "propio",
  slug: "impot-dividendes",
  estado: "publicado",
  requiere: { "mr.ircm": "mapa" },
  campos: [
    {
      id: "nature",
      tipo: "opcion",
      etiqueta: "نوع الدخل",
      opciones: [
        { valor: "dividendes", etiqueta: "أرباح موزعة على الأسهم والحصص" },
        { valor: "interets", etiqueta: "فوائد الديون والسندات والودائع" },
        { valor: "plus-value", etiqueta: "فائض قيمة التنازل عن أوراق مالية" },
        { valor: "plus-value-paradis", etiqueta: "فائض قيمة لمتنازل مقيم في دولة ذات ضريبة تفضيلية" },
      ],
      porDefecto: "dividendes",
    },
    { id: "montant", tipo: "moneda", etiqueta: "المبلغ الإجمالي", ayuda: "لفائض القيمة: سعر التنازل ناقص سعر الاقتناء.", min: 0, porDefecto: 1000000 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.montant <= 0) throw new ErrorEntrada("أدخل المبلغ الإجمالي.", "montant");
    const taux = enMapa(v["mr.ircm"], entrada.nature === "plus-value-paradis" ? "paradis" : "general");
    const impot = porcentaje(entrada.montant, taux);
    return {
      net: redondear(entrada.montant - impot),
      impot: redondear(impot),
      taux,
      observaciones: ["الاتفاقيات الدولية لتفادي الازدواج الضريبي قد تخفض النسبة لغير المقيمين."],
    };
  },
  resultado: [
    { clave: "net", etiqueta: "المبلغ الصافي بعد الاقتطاع", formato: "moneda", destacada: true },
    { clave: "impot", etiqueta: "الضريبة على مداخيل رؤوس الأموال المنقولة", formato: "moneda" },
    { clave: "taux", etiqueta: "النسبة المطبقة", formato: "porcentaje" },
  ],
});
