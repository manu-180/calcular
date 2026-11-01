import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { DIAS_MES } from "../lib/laboral";

export default definirCalculadora({
  id: "ps.salary-deduction-calculator",
  mercado: "ps",
  concepto: "propio",
  slug: "salary-deduction-calculator",
  estado: "publicado",
  requiere: {
    "ps.deduction-advance": "numero",
    "ps.deduction-total": "numero",
    "ps.fine-max": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "الأجر الأساسي الشهري", min: 0, porDefecto: 3000 },
    { id: "sulfa", tipo: "moneda", etiqueta: "قسط السلفة المطلوب حسمه هذا الشهر", min: 0, porDefecto: 400 },
    { id: "multa", tipo: "moneda", etiqueta: "الغرامات التأديبية المفروضة هذا الشهر", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("أدخل الأجر الأساسي.", "salario");
    const maxSulfa = redondear(porcentaje(entrada.salario, v["ps.deduction-advance"]));
    const maxTotal = redondear(porcentaje(entrada.salario, v["ps.deduction-total"]));
    const maxMulta = redondear((entrada.salario / DIAS_MES) * v["ps.fine-max"]);
    const sulfa = Math.min(entrada.sulfa, maxSulfa);
    const multa = Math.max(Math.min(entrada.multa, maxMulta, maxTotal - sulfa), 0);
    const total = redondear(sulfa + multa);
    const exceso = redondear(entrada.sulfa + entrada.multa - total);
    const observaciones = ["الحدود هنا للسلف والغرامات فقط. ما يُحسم تنفيذًا لحكم قضائي قطعي لا يدخل فيها."];
    if (exceso > 0) observaciones.push("المطلوب حسمه يزيد على ما يجيزه القانون هذا الشهر، فلا يُحسم الفرق من أجرك.");
    return {
      total,
      neto: redondear(entrada.salario - total),
      sulfa: redondear(sulfa),
      multa: redondear(multa),
      maxSulfa,
      maxMulta,
      maxTotal,
      exceso,
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "أقصى ما يجوز حسمه هذا الشهر", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "الأجر بعد الحسم", formato: "moneda" },
    { clave: "sulfa", etiqueta: "حسم السلفة المسموح", formato: "moneda" },
    { clave: "multa", etiqueta: "حسم الغرامات المسموح", formato: "moneda", ocultarSiCero: true },
    { clave: "maxSulfa", etiqueta: "سقف قسط السلفة", formato: "moneda" },
    { clave: "maxMulta", etiqueta: "سقف الغرامة الشهرية", formato: "moneda" },
    { clave: "maxTotal", etiqueta: "سقف مجموع السلفة والغرامات", formato: "moneda" },
    { clave: "exceso", etiqueta: "ما يزيد على المسموح", formato: "moneda", ocultarSiCero: true },
  ],
});
