import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { aportesSsc, REQUIERE_SSC } from "../lib/ssc";

export default definirCalculadora({
  id: "jo.employee-cost-calculator",
  mercado: "jo",
  concepto: "costo-empleador",
  slug: "employee-cost-calculator",
  estado: "publicado",
  requiere: REQUIERE_SSC,
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "الراتب الإجمالي الشهري للموظف", min: 0, porDefecto: 800 },
    { id: "otros", tipo: "moneda", etiqueta: "تكاليف شهرية أخرى على المنشأة", ayuda: "مثل التأمين الصحي الخاص أو بدل المواصلات الذي تدفعه خارج الراتب. اتركها صفرًا إن لم توجد.", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("أدخل الراتب الإجمالي الشهري.", "salario");
    const a = aportesSsc(entrada.salario, v);
    const ssc = redondear(a.empleador);
    const mensual = redondear(entrada.salario + ssc + entrada.otros);
    const observaciones = ["لا يشمل الحساب الإجازات المدفوعة ولا بدل الإشعار ولا أي مكافأة عند انتهاء الخدمة."];
    if (a.topeAplicado) observaciones.push("حُسب اشتراك المنشأة على الحد الأعلى للأجر الخاضع للاقتطاع.");
    return {
      mensual,
      anual: redondear(mensual * 12),
      ssc,
      tasa: a.tasaEmpleador,
      sobreSalario: Math.round(((mensual - entrada.salario) / entrada.salario) * 10000) / 100,
      observaciones,
    };
  },
  resultado: [
    { clave: "mensual", etiqueta: "تكلفة الموظف الشهرية على المنشأة", formato: "moneda", destacada: true },
    { clave: "anual", etiqueta: "التكلفة في السنة", formato: "moneda" },
    { clave: "ssc", etiqueta: "اشتراك المنشأة في الضمان الاجتماعي", formato: "moneda" },
    { clave: "tasa", etiqueta: "نسبة اشتراك المنشأة", formato: "porcentaje", decimales: 2 },
    { clave: "sobreSalario", etiqueta: "الزيادة فوق الراتب", formato: "porcentaje", decimales: 2 },
  ],
});
