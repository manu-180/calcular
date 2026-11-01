import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

// Borrador: las tasas de registro y el impuesto a la venta de inmuebles están en la ley de tasas de
// registro de tierras y en decisiones del Consejo de Ministros que dls.gov.jo y lob.gov.jo no dejaron
// leer el 24/10/2026. Faltan también las exenciones para departamentos según superficie.
export default definirCalculadora({
  id: "jo.land-registration-fees",
  mercado: "jo",
  concepto: "propio",
  slug: "land-registration-fees",
  estado: "borrador",
  requiere: {
    "jo.land-registration-fee": "numero",
    "jo.property-sales-tax": "numero",
  },
  campos: [
    { id: "precio", tipo: "moneda", etiqueta: "قيمة العقار المعتمدة للتسجيل", min: 0, porDefecto: 60000 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.precio <= 0) throw new ErrorEntrada("أدخل قيمة العقار.", "precio");
    const registro = redondear(porcentaje(entrada.precio, v["jo.land-registration-fee"]));
    const impuesto = redondear(porcentaje(entrada.precio, v["jo.property-sales-tax"]));
    return {
      total: redondear(registro + impuesto),
      registro,
      impuesto,
      observaciones: ["لا يشمل الحساب الإعفاءات التي تقررها الحكومة لبعض الشقق بحسب مساحتها."],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "مجموع رسوم التسجيل وضريبة البيع", formato: "moneda", destacada: true },
    { clave: "registro", etiqueta: "رسوم تسجيل البيع", formato: "moneda" },
    { clave: "impuesto", etiqueta: "ضريبة بيع العقار", formato: "moneda" },
  ],
});
