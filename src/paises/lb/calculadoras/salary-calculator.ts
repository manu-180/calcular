import { aplicarEscalaMarginal, definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { tenzilFamiliar } from "../lib/laboral";

// Borrador: la cuota del trabajador la fija un decreto (art. 71 y 73 de la ley del seguro social) que no
// se pudo leer. Sin esa tasa el neto no se puede afirmar.
export default definirCalculadora({
  id: "lb.salary-calculator",
  mercado: "lb",
  concepto: "sueldo-neto",
  slug: "salary-calculator",
  estado: "borrador",
  requiere: {
    "lb.salary-tax": "escala",
    "lb.family-deduction": "mapa",
    "lb.deduction-children": "numero",
    "lb.nssf-rates": "mapa",
    "lb.nssf-ceiling-health": "numero",
  },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "الراتب الإجمالي في الشهر بالليرة", min: 0, porDefecto: 100000000 },
    { id: "casado", tipo: "si-no", etiqueta: "متزوج", porDefecto: false },
    { id: "conyugeTrabaja", tipo: "si-no", etiqueta: "الزوج أو الزوجة يعمل أيضًا", visibleSi: { casado: [true] }, porDefecto: false },
    { id: "hijos", tipo: "entero", etiqueta: "عدد الأولاد على عاتقك", min: 0, max: 20, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.bruto <= 0) throw new ErrorEntrada("أدخل الراتب.", "bruto");
    const base = Math.min(entrada.bruto, v["lb.nssf-ceiling-health"]);
    const ssn = redondear(porcentaje(base, enMapa(v["lb.nssf-rates"], "health-worker")));
    const tenzil = tenzilFamiliar(v["lb.family-deduction"], v["lb.deduction-children"], entrada.casado, entrada.conyugeTrabaja === true, entrada.hijos);
    const impuesto = redondear(aplicarEscalaMarginal(v["lb.salary-tax"], Math.max(entrada.bruto * 12 - tenzil, 0)) / 12);
    return { neto: redondear(entrada.bruto - ssn - impuesto), ssn, impuesto };
  },
  resultado: [
    { clave: "neto", etiqueta: "الراتب الصافي في الشهر", formato: "moneda", destacada: true },
    { clave: "ssn", etiqueta: "اشتراك الضمان", formato: "moneda" },
    { clave: "impuesto", etiqueta: "ضريبة الرواتب", formato: "moneda" },
  ],
});
