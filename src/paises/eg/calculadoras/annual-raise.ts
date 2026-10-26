import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "eg.annual-raise",
  mercado: "eg",
  concepto: "propio",
  slug: "annual-raise",
  estado: "publicado",
  requiere: { "eg.raise-rate": "numero", "eg.raise-min": "numero" },
  campos: [
    { id: "asegurable", tipo: "moneda", etiqueta: "أجرك التأميني الشهري", min: 0, porDefecto: 8000, ayuda: "أجر الاشتراك المسجل لك في التأمينات." },
    { id: "salario", tipo: "moneda", etiqueta: "مرتبك الشهري الحالي", min: 0, requerido: false, ayuda: "اختياري، لتعرف مرتبك بعد العلاوة." },
  ],
  calcular(e, v, { redondear }) {
    if (e.asegurable <= 0) throw new ErrorEntrada("أدخل أجرك التأميني.", "asegurable");
    const porTasa = redondear(porcentaje(e.asegurable, v["eg.raise-rate"]));
    const minimo = v["eg.raise-min"];
    const alza = Math.max(porTasa, minimo);
    return {
      alza,
      porTasa,
      minimo,
      nuevoSalario: e.salario !== null ? redondear(e.salario + alza) : null,
      anual: redondear(alza * 12),
    };
  },
  resultado: [
    { clave: "alza", etiqueta: "العلاوة الدورية الشهرية على الأقل", formato: "moneda", destacada: true },
    { clave: "porTasa", etiqueta: "النسبة من الأجر التأميني", formato: "moneda" },
    { clave: "minimo", etiqueta: "الحد الأدنى بالجنيه", formato: "moneda" },
    { clave: "nuevoSalario", etiqueta: "مرتبك بعد العلاوة", formato: "moneda" },
    { clave: "anual", etiqueta: "قيمة العلاوة في 12 شهرًا", formato: "moneda" },
  ],
});
