import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

// Sigue el الدليل المبسط لزكاة الأفراد de ZATCA: oro, plata, dinero y bienes de comercio suman, el
// نصاب del dinero es el menor de los dos (en la práctica, el de la plata) y se paga un cuarto del
// décimo. El precio del gramo lo pone la persona: no hay una serie oficial saudí del oro o la plata.
export default definirCalculadora({
  id: "sa.zakat-calculator",
  mercado: "sa",
  concepto: "propio",
  slug: "zakat-calculator",
  estado: "publicado",
  requiere: {
    "sa.zakat-rate": "numero",
    "sa.nisab-silver": "numero",
    "sa.nisab-gold": "numero",
  },
  campos: [
    { id: "efectivo", tipo: "moneda", etiqueta: "النقد والأرصدة في البنوك", min: 0, porDefecto: 50000 },
    { id: "metales", tipo: "moneda", etiqueta: "قيمة الذهب والفضة المدخرة", ayuda: "بسعر اليوم. الحلي المعدّ للاستعمال أو الإعارة لا زكاة فيه.", min: 0, porDefecto: 0 },
    { id: "inversiones", tipo: "moneda", etiqueta: "الأسهم وعروض التجارة بقيمتها يوم الزكاة", min: 0, porDefecto: 0 },
    {
      id: "metal",
      tipo: "opcion",
      etiqueta: "النصاب الذي تحسب به",
      ayuda: "حسب دليل هيئة الزكاة والضريبة والجمارك، نصاب الأوراق النقدية هو الأقل من نصابي الذهب والفضة، وهو عادة نصاب الفضة.",
      opciones: [
        { valor: "silver", etiqueta: "نصاب الفضة" },
        { valor: "gold", etiqueta: "نصاب الذهب" },
      ],
      porDefecto: "silver",
    },
    { id: "precioGramo", tipo: "moneda", etiqueta: "سعر الغرام اليوم (فضة خالصة أو ذهب عيار 24)", ayuda: "اسأل عنه محل الذهب أو البنك. الحاسبة لا تعرض سعرًا من عندها.", min: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.precioGramo <= 0) throw new ErrorEntrada("أدخل سعر الغرام اليوم.", "precioGramo");
    const patrimonio = entrada.efectivo + entrada.metales + entrada.inversiones;
    const gramos = entrada.metal === "gold" ? v["sa.nisab-gold"] : v["sa.nisab-silver"];
    const nisab = redondear(gramos * entrada.precioGramo);
    const alcanza = patrimonio >= nisab && patrimonio > 0;
    return {
      zakat: alcanza ? redondear(porcentaje(patrimonio, v["sa.zakat-rate"])) : 0,
      patrimonio: redondear(patrimonio),
      nisab,
      gramos,
      observaciones: alcanza
        ? ["تجب الزكاة إذا مر على المال حول كامل وهو في ملكك. ويمكنك أن تحدد يومًا في السنة تزكي فيه جميع ما تملكه من نقود."]
        : ["أموالك أقل من النصاب، فلا زكاة عليها الآن."],
    };
  },
  resultado: [
    { clave: "zakat", etiqueta: "الزكاة الواجبة", formato: "moneda", destacada: true },
    { clave: "patrimonio", etiqueta: "المال الخاضع للزكاة", formato: "moneda" },
    { clave: "nisab", etiqueta: "النصاب اليوم", formato: "moneda" },
    { clave: "gramos", etiqueta: "النصاب بالغرام", formato: "numero" },
  ],
});
