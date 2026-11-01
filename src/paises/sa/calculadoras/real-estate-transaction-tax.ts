import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "sa.real-estate-transaction-tax",
  mercado: "sa",
  concepto: "propio",
  slug: "real-estate-transaction-tax",
  estado: "publicado",
  requiere: {
    "sa.rett": "numero",
    "sa.rett-first-home": "numero",
  },
  campos: [
    { id: "valor", tipo: "moneda", etiqueta: "قيمة العقار", min: 0, porDefecto: 1200000 },
    {
      id: "primera",
      tipo: "si-no",
      etiqueta: "مواطن يشتري مسكنه الأول",
      ayuda: "تتحمل الدولة ضريبة المسكن الأول للمواطن حتى حد معين من القيمة، إذا استوفى شروط الدعم.",
      porDefecto: false,
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.valor <= 0) throw new ErrorEntrada("أدخل قيمة العقار.", "valor");
    const tasa = v["sa.rett"];
    const impuesto = redondear(porcentaje(entrada.valor, tasa));
    const apoyo = entrada.primera ? redondear(porcentaje(Math.min(entrada.valor, v["sa.rett-first-home"]), tasa)) : 0;
    const observaciones = ["التصرف العقاري معفى من ضريبة القيمة المضافة، وتُسدد ضريبة التصرفات العقارية قبل الإفراغ أو أثناءه."];
    if (entrada.primera) observaciones.push("يُشترط للدعم أن يكون العقار المسكن الأول للمواطن. تحقق من أهليتك قبل الإفراغ.");
    return {
      pagar: redondear(impuesto - apoyo),
      impuesto,
      apoyo,
      tasa,
      total: redondear(entrada.valor + impuesto - apoyo),
      observaciones,
    };
  },
  resultado: [
    { clave: "pagar", etiqueta: "الضريبة المستحقة الدفع", formato: "moneda", destacada: true },
    { clave: "impuesto", etiqueta: "ضريبة التصرفات العقارية كاملة", formato: "moneda" },
    { clave: "apoyo", etiqueta: "ما تتحمله الدولة عن المسكن الأول", formato: "moneda", ocultarSiCero: true },
    { clave: "tasa", etiqueta: "نسبة الضريبة", formato: "porcentaje" },
    { clave: "total", etiqueta: "قيمة العقار مع الضريبة المدفوعة", formato: "moneda" },
  ],
});
