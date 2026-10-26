import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { aportes, impuestoAnual, REQUIERE_NOMINA } from "../lib/nomina";

export default definirCalculadora({
  id: "eg.salary-tax",
  mercado: "eg",
  concepto: "impuesto-renta",
  slug: "salary-tax",
  estado: "publicado",
  requiere: REQUIERE_NOMINA,
  campos: [
    {
      id: "modo",
      tipo: "opcion",
      etiqueta: "من أين تبدأ؟",
      opciones: [
        { valor: "mensual", etiqueta: "من إجمالي المرتب الشهري" },
        { valor: "anual", etiqueta: "من الدخل السنوي بعد التأمينات" },
      ],
      porDefecto: "mensual",
    },
    { id: "bruto", tipo: "moneda", etiqueta: "إجمالي المرتب الشهري", min: 0, porDefecto: 20000, visibleSi: { modo: ["mensual"] } },
    {
      id: "asegurable",
      tipo: "moneda",
      etiqueta: "أجر الاشتراك التأميني الشهري",
      min: 0,
      requerido: false,
      ayuda: "اختياري. إذا تركته فارغًا نستخدم إجمالي المرتب في حدود أجر الاشتراك.",
      visibleSi: { modo: ["mensual"] },
    },
    {
      id: "anual",
      tipo: "moneda",
      etiqueta: "الدخل السنوي بعد خصم التأمينات",
      min: 0,
      porDefecto: 240000,
      ayuda: "قبل الإعفاء الشخصي. الحاسبة تخصمه.",
      visibleSi: { modo: ["anual"] },
    },
  ],
  calcular(e, v, { redondear }) {
    let ingresoAnual: number;
    let aporteMensual: number | null = null;
    if (e.modo === "mensual") {
      const bruto = e.bruto ?? 0;
      if (bruto <= 0) throw new ErrorEntrada("أدخل إجمالي مرتبك الشهري.", "bruto");
      const a = aportes(bruto, e.asegurable ?? null, v);
      aporteMensual = redondear(a.empleado);
      ingresoAnual = (bruto - a.empleado) * 12;
    } else {
      ingresoAnual = e.anual ?? 0;
      if (ingresoAnual <= 0) throw new ErrorEntrada("أدخل دخلك السنوي.", "anual");
    }
    const exencion = v["eg.personal-exemption"];
    const t = impuestoAnual(Math.max(0, ingresoAnual - exencion), v);
    const impuesto = redondear(t.impuesto);
    const observaciones: string[] = [];
    if (t.tramosPerdidos > 0) observaciones.push("دخلك الخاضع للضريبة تجاوز الحد الذي تسقط بعده الشرائح الأولى، فتبدأ الضريبة من أول جنيه بنسبة أعلى.");
    return {
      impuestoMensual: redondear(t.impuesto / 12),
      impuestoAnual: impuesto,
      gravable: t.base,
      exencion,
      aporteMensual,
      tasaEfectiva: ingresoAnual > 0 ? (t.impuesto / ingresoAnual) * 100 : 0,
      observaciones,
    };
  },
  resultado: [
    { clave: "impuestoMensual", etiqueta: "الضريبة الشهرية", formato: "moneda", destacada: true },
    { clave: "impuestoAnual", etiqueta: "الضريبة السنوية", formato: "moneda" },
    { clave: "gravable", etiqueta: "صافي الدخل السنوي الخاضع للضريبة", formato: "moneda" },
    { clave: "exencion", etiqueta: "الإعفاء الشخصي المخصوم", formato: "moneda" },
    { clave: "aporteMensual", etiqueta: "حصتك الشهرية في التأمينات", formato: "moneda" },
    { clave: "tasaEfectiva", etiqueta: "النسبة الفعلية من دخلك", formato: "porcentaje", decimales: 2 },
  ],
});
