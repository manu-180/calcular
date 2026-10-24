import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

// Borrador: el monto mensual por acompañante (sa.dependent-fee) no se pudo leer en una fuente oficial
// (الجوازات y my.gov.sa responden 403). Se publica cuando ese dato quede verificado.
export default definirCalculadora({
  id: "sa.dependent-fee-calculator",
  mercado: "sa",
  concepto: "propio",
  slug: "dependent-fee-calculator",
  estado: "borrador",
  requiere: {
    "sa.dependent-fee": "numero",
  },
  campos: [
    { id: "acompanantes", tipo: "entero", etiqueta: "عدد المرافقين", min: 0, max: 20, porDefecto: 2 },
    { id: "meses", tipo: "entero", etiqueta: "عدد الأشهر", ayuda: "تُدفع عادة مقدمًا عن مدة الإقامة عند إصدارها أو تجديدها.", min: 1, max: 24, porDefecto: 12 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.acompanantes <= 0) throw new ErrorEntrada("أدخل عدد المرافقين.", "acompanantes");
    const mensual = entrada.acompanantes * v["sa.dependent-fee"];
    return {
      total: redondear(mensual * entrada.meses),
      mensual: redondear(mensual),
      porPersona: v["sa.dependent-fee"],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "المقابل المالي عن المدة", formato: "moneda", destacada: true },
    { clave: "mensual", etiqueta: "المقابل المالي في الشهر", formato: "moneda" },
    { clave: "porPersona", etiqueta: "عن كل مرافق في الشهر", formato: "moneda" },
  ],
});
