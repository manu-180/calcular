import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { sumarMeses } from "../lib/fechas";

export default definirCalculadora({
  id: "eg.notice-period",
  mercado: "eg",
  concepto: "preaviso",
  slug: "notice-period",
  estado: "publicado",
  requiere: { "eg.notice-months": "numero" },
  campos: [
    { id: "fecha", tipo: "fecha", etiqueta: "تاريخ تسلم الإخطار الكتابي", porDefecto: "hoy" },
    {
      id: "quien",
      tipo: "opcion",
      etiqueta: "من أنهى العقد؟",
      opciones: [
        { valor: "empleador", etiqueta: "صاحب العمل" },
        { valor: "trabajador", etiqueta: "العامل" },
      ],
      porDefecto: "empleador",
    },
    { id: "salario", tipo: "moneda", etiqueta: "أجرك الشهري", min: 0, requerido: false, ayuda: "اختياري، لحساب مقابل المهلة إذا لم تُمنح." },
  ],
  calcular(e, v, { redondear }) {
    const meses = v["eg.notice-months"];
    if (!/^\d{4}-\d{2}-\d{2}$/.test(e.fecha)) throw new ErrorEntrada("أدخل تاريخًا صحيحًا.", "fecha");
    const fin = sumarMeses(e.fecha, meses);
    const observaciones: string[] = [];
    if (e.quien === "empleador") {
      observaciones.push("خلال المهلة يحق لك أن تتغيب يومًا كاملًا في الأسبوع أو ثماني ساعات للبحث عن عمل آخر، مع أجرك عنها.");
      observaciones.push("إذا كنت في إجازة لا تبدأ المهلة إلا من اليوم التالي لانتهائها، وتتوقف إذا حصلت على إجازة مرضية خلالها.");
    }
    return {
      fin,
      meses,
      pagoSustitutivo: e.salario !== null && e.quien === "empleador" ? redondear(e.salario * meses) : null,
      observaciones,
    };
  },
  resultado: [
    { clave: "fin", etiqueta: "ينتهي العقد في", formato: "fecha", destacada: true },
    { clave: "meses", etiqueta: "مدة المهلة", formato: "meses" },
    { clave: "pagoSustitutivo", etiqueta: "مقابل المهلة إذا أنهى صاحب العمل العقد دونها", formato: "moneda" },
  ],
});
