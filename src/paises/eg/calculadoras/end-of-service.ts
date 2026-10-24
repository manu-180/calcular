import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "eg.end-of-service",
  mercado: "eg",
  concepto: "propio",
  slug: "end-of-service",
  estado: "publicado",
  requiere: { "eg.after60-reward": "mapa" },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "آخر أجر شهري", min: 0, porDefecto: 8000 },
    {
      id: "anios",
      tipo: "numero",
      etiqueta: "سنوات الخدمة غير المغطاة بتأمين الشيخوخة",
      min: 0,
      max: 40,
      porDefecto: 7,
      ayuda: "سنوات العمل بعد سن الستين، أو قبل سن الثامنة عشرة، التي ليس لك عنها حقوق في المعاش.",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.salario <= 0) throw new ErrorEntrada("أدخل آخر أجر شهري.", "salario");
    if (e.anios <= 0) throw new ErrorEntrada("أدخل سنوات الخدمة.", "anios");
    const m = v["eg.after60-reward"];
    const mesesPrimeros = (Math.min(e.anios, 5) * enMapa(m, "first5")) / 100;
    const mesesResto = (Math.max(0, e.anios - 5) * enMapa(m, "after5")) / 100;
    const observaciones: string[] = [];
    if (!Number.isInteger(e.anios)) observaciones.push("كسر السنة محسوب بنسبته.");
    return {
      total: redondear(e.salario * (mesesPrimeros + mesesResto)),
      parteInicial: redondear(e.salario * mesesPrimeros),
      parteResto: redondear(e.salario * mesesResto),
      meses: mesesPrimeros + mesesResto,
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "مكافأة نهاية الخدمة", formato: "moneda", destacada: true },
    { clave: "parteInicial", etiqueta: "عن السنوات الخمس الأولى", formato: "moneda" },
    { clave: "parteResto", etiqueta: "عن السنوات التالية", formato: "moneda", ocultarSiCero: true },
    { clave: "meses", etiqueta: "عدد الأشهر", formato: "meses", decimales: 1 },
  ],
});
