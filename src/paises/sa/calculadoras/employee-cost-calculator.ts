import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { aportesGosi, CAMPO_NACIONALIDAD, CAMPO_REGIMEN, REQUIERE_GOSI } from "../lib/gosi";

export default definirCalculadora({
  id: "sa.employee-cost-calculator",
  mercado: "sa",
  concepto: "costo-empleador",
  slug: "employee-cost-calculator",
  estado: "publicado",
  requiere: { ...REQUIERE_GOSI, "sa.eos": "mapa" },
  campos: [
    { id: "basico", tipo: "moneda", etiqueta: "الراتب الأساسي الشهري", min: 0, porDefecto: 10000 },
    { id: "vivienda", tipo: "moneda", etiqueta: "بدل السكن الشهري", min: 0, porDefecto: 2500 },
    { id: "otros", tipo: "moneda", etiqueta: "بدلات أخرى شهرية", min: 0, porDefecto: 1000 },
    CAMPO_NACIONALIDAD,
    CAMPO_REGIMEN,
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.basico <= 0) throw new ErrorEntrada("أدخل الراتب الأساسي الشهري.", "basico");
    const saudi = entrada.nacionalidad === "saudi";
    const a = aportesGosi(entrada.basico, entrada.vivienda, saudi, entrada.regimen, v);
    const bruto = entrada.basico + entrada.vivienda + entrada.otros;
    // La مكافأة se devenga cada mes: medio sueldo por año en los primeros cinco (art. 84). Se reserva
    // sobre el sueldo total, que es el الأجر الفعلي sobre el que se paga.
    const provision = (bruto * enMapa(v["sa.eos"], "first-5-years")) / 12;
    const aportes = redondear(a.empleador);
    const mensual = redondear(bruto + aportes + provision);
    return {
      mensual,
      anual: redondear(mensual * 12),
      bruto: redondear(bruto),
      aportes,
      provision: redondear(provision),
      recargo: bruto > 0 ? ((mensual - bruto) / bruto) * 100 : 0,
      observaciones: ["لا يشمل التقدير رسوم الإقامة ورخص العمل والتأمين الطبي والمقابل المالي، فهي تختلف من منشأة إلى أخرى."],
    };
  },
  resultado: [
    { clave: "mensual", etiqueta: "تكلفة الموظف الشهرية على المنشأة", formato: "moneda", destacada: true },
    { clave: "anual", etiqueta: "التكلفة السنوية", formato: "moneda" },
    { clave: "bruto", etiqueta: "إجمالي الراتب", formato: "moneda" },
    { clave: "aportes", etiqueta: "اشتراكات التأمينات على صاحب العمل", formato: "moneda" },
    { clave: "provision", etiqueta: "مخصص مكافأة نهاية الخدمة في الشهر", formato: "moneda" },
    { clave: "recargo", etiqueta: "الزيادة فوق الراتب", formato: "porcentaje", decimales: 2 },
  ],
});
