import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { aportesSpf, CAMPO_NACIONALIDAD, REQUIERE_SPF } from "../lib/spf";

export default definirCalculadora({
  id: "om.employee-cost-calculator",
  mercado: "om",
  concepto: "costo-empleador",
  slug: "employee-cost-calculator",
  estado: "publicado",
  requiere: REQUIERE_SPF,
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "الأجر الشهري الشامل", ayuda: "الأجر الأساسي مع جميع العلاوات والبدلات.", min: 0, porDefecto: 800 },
    CAMPO_NACIONALIDAD,
    { id: "otros", tipo: "moneda", etiqueta: "تكاليف شهرية أخرى", ayuda: "مثل التأمين الصحي أو رسوم التصاريح أو السكن الذي توفره المنشأة.", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("أدخل الأجر الشهري الشامل.", "salario");
    const omani = entrada.nacionalidad === "omani";
    const a = aportesSpf(entrada.salario, omani, v);
    const aportes = redondear(a.empleador);
    const mensual = redondear(entrada.salario + aportes + entrada.otros);
    const observaciones: string[] = [];
    if (!omani) observaciones.push("لا تُسدد اليوم اشتراكات في صندوق الحماية الاجتماعية عن غير العماني، لكن صاحب العمل يتحمل مكافأة نهاية الخدمة عند انتهاء العلاقة.");
    return {
      mensual,
      aportes,
      anual: redondear(mensual * 12),
      porcentaje: entrada.salario > 0 ? (aportes / entrada.salario) * 100 : 0,
      observaciones,
    };
  },
  resultado: [
    { clave: "mensual", etiqueta: "التكلفة الشهرية على جهة العمل", formato: "moneda", destacada: true },
    { clave: "aportes", etiqueta: "اشتراكات جهة العمل في الصندوق", formato: "moneda" },
    { clave: "porcentaje", etiqueta: "الاشتراكات من الأجر", formato: "porcentaje", decimales: 2 },
    { clave: "anual", etiqueta: "التكلفة في السنة", formato: "moneda" },
  ],
});
