import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "lb.sick-leave-calculator",
  mercado: "lb",
  concepto: "propio",
  slug: "sick-leave-calculator",
  estado: "publicado",
  requiere: { "lb.sick-leave": "mapa" },
  campos: [
    { id: "meses", tipo: "entero", etiqueta: "مدة خدمتك بالأشهر", min: 0, max: 720, porDefecto: 36 },
    { id: "salario", tipo: "moneda", etiqueta: "أجرك الشهري بالليرة", min: 0, porDefecto: 30000000 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("أدخل الأجر الشهري.", "salario");
    const m = v["lb.sick-leave"];
    const n = entrada.meses;
    const completo = n < 3 ? 0 : n <= 24 ? enMapa(m, "t3m2y") : n <= 48 ? enMapa(m, "t2y4y") : n <= 72 ? enMapa(m, "t4y6y") : n <= 120 ? enMapa(m, "t6y10y") : enMapa(m, "t10y");
    return {
      completo,
      mitad: completo,
      total: redondear(completo * entrada.salario + (completo * entrada.salario) / 2),
      observaciones: ["تعطى الإجازة بتقرير طبي، وتتجدد عند الضرورة خلال السنة حتى هذا الحد. ولا يجوز الصرف ولا توجيه الإنذار خلالها. أما أمراض العمل وحوادثه فلها نظام آخر."],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "مجموع الأجر عن مدة الإجازة", formato: "moneda", destacada: true },
    { clave: "completo", etiqueta: "المدة بأجر كامل", formato: "meses", decimales: 1 },
    { clave: "mitad", etiqueta: "المدة بنصف أجر", formato: "meses", decimales: 1 },
  ],
});
