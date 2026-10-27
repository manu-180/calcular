import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "om.job-security-benefit",
  mercado: "om",
  concepto: "propio",
  slug: "job-security-benefit",
  estado: "publicado",
  requiere: {
    "om.job-security-rate": "numero",
    "om.job-security-min": "numero",
    "om.job-security-months": "numero",
  },
  campos: [
    { id: "promedio", tipo: "moneda", etiqueta: "متوسط أجرك الشهري في آخر عامين", ayuda: "الأجر الشامل الخاضع للاشتراك، دون سقف.", min: 0, porDefecto: 700 },
    { id: "meses", tipo: "entero", etiqueta: "عدد الأشهر المتوقعة دون عمل", min: 1, max: 12, porDefecto: 6 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.promedio <= 0) throw new ErrorEntrada("أدخل متوسط أجرك الشهري.", "promedio");
    const minimo = v["om.job-security-min"];
    const maxMeses = v["om.job-security-months"];
    const calculado = porcentaje(entrada.promedio, v["om.job-security-rate"]);
    const mensual = Math.max(calculado, minimo);
    const meses = Math.min(entrada.meses, maxMeses);
    const observaciones = [
      "بدل الأمان الوظيفي للعمانيين المؤمن عليهم في فرع تأمين الأمان الوظيفي. شروط الاستحقاق ومدد الاشتراك اللازمة تبينها اللائحة التنفيذية وتقررها وزارة العمل.",
    ];
    if (calculado < minimo) observaciones.push("النسبة من متوسط أجرك أقل من الحد الأدنى للبدل، فيُصرف الحد الأدنى.");
    if (entrada.meses > maxMeses) observaciones.push("يُصرف البدل لمدة أقصاها ستة أشهر متصلة أو متقطعة.");
    return {
      mensual: redondear(mensual),
      meses,
      total: redondear(mensual * meses),
      observaciones,
    };
  },
  resultado: [
    { clave: "mensual", etiqueta: "بدل الأمان الوظيفي الشهري", formato: "moneda", destacada: true },
    { clave: "meses", etiqueta: "أشهر الصرف", formato: "meses" },
    { clave: "total", etiqueta: "مجموع البدل", formato: "moneda" },
  ],
});
