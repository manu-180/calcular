import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { aportesSpf, CAMPO_NACIONALIDAD, REQUIERE_SPF } from "../lib/spf";

export default definirCalculadora({
  id: "om.salary-calculator",
  mercado: "om",
  concepto: "sueldo-neto",
  slug: "salary-calculator",
  estado: "publicado",
  requiere: REQUIERE_SPF,
  campos: [
    { id: "basico", tipo: "moneda", etiqueta: "الأجر الأساسي الشهري", min: 0, porDefecto: 600 },
    { id: "bdl", tipo: "moneda", etiqueta: "العلاوات والبدلات الشهرية", ayuda: "مثل بدل السكن وبدل النقل. تدخل كلها في الأجر الخاضع للاشتراك.", min: 0, porDefecto: 200 },
    CAMPO_NACIONALIDAD,
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.basico <= 0) throw new ErrorEntrada("أدخل الأجر الأساسي الشهري.", "basico");
    const omani = entrada.nacionalidad === "omani";
    const bruto = entrada.basico + entrada.bdl;
    const a = aportesSpf(bruto, omani, v);
    const vejez = redondear(a.vejezEmpleado);
    const seguridad = redondear(a.seguridadEmpleado);
    const descuento = redondear(vejez + seguridad);
    const neto = redondear(bruto - descuento);
    const observaciones = ["الحسم المحسوب هنا هو حصتك في اشتراكات صندوق الحماية الاجتماعية. أقساط القروض والسلف وأي حسومات أخرى في عقدك لا تدخل في الحساب."];
    if (!omani) observaciones.push("العامل غير العماني لا يُحسم من أجره اشتراك في صندوق الحماية الاجتماعية.");
    if (a.topeAplicado) observaciones.push("حُسب اشتراك فرع كبار السن على سقف أجر الاشتراك، أما الأمان الوظيفي فيُحسب على الأجر كله.");
    return {
      neto,
      bruto: redondear(bruto),
      descuento,
      vejez,
      seguridad,
      anual: redondear(neto * 12),
      observaciones,
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "صافي الأجر الشهري", formato: "moneda", destacada: true },
    { clave: "bruto", etiqueta: "الأجر الشامل", formato: "moneda" },
    { clave: "descuento", etiqueta: "حسم صندوق الحماية الاجتماعية", formato: "moneda" },
    { clave: "vejez", etiqueta: "منه فرع كبار السن والعجز والوفاة", formato: "moneda", ocultarSiCero: true },
    { clave: "seguridad", etiqueta: "منه فرع الأمان الوظيفي", formato: "moneda", ocultarSiCero: true },
    { clave: "anual", etiqueta: "صافي الأجر في السنة", formato: "moneda" },
  ],
  mundo: {
    bruto: "basico",
    periodoBruto: "mes",
    neto: "neto",
    periodoNeto: "mes",
    entrada: { bdl: 0, nacionalidad: "omani" },
  },
});
