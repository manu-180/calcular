import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ag.maternity-allowance-calculator",
  mercado: "ag",
  concepto: "propio",
  slug: "maternity-allowance-calculator",
  estado: "borrador",
  requiere: {
    "ag.maternity-allowance-rate": "numero",
    "ag.maternity-allowance-weeks": "numero",
    "ag.maternity-min-weeks-averaged": "numero",
    "ag.ss-ceiling-weekly": "numero",
  },
  campos: [
    { id: "ganancias", tipo: "moneda", etiqueta: "Insurable earnings in the 52 weeks before the 6 weeks that precede the birth", min: 0, porDefecto: 40000 },
    { id: "semanas", tipo: "entero", etiqueta: "Weeks you worked in that period", min: 1, max: 52, porDefecto: 52 },
  ],
  calcular(e, v, { redondear }) {
    if (e.ganancias <= 0) throw new ErrorEntrada("Enter your insurable earnings for the period.", "ganancias");
    const minimo = v["ag.maternity-min-weeks-averaged"];
    if (e.semanas < minimo) throw new ErrorEntrada("The weeks worked used for the average cannot be fewer than 26.", "semanas");
    const promedio = redondear(e.ganancias / e.semanas);
    const base = Math.min(promedio, v["ag.ss-ceiling-weekly"]);
    const semanal = redondear(porcentaje(base, v["ag.maternity-allowance-rate"]));
    const semanasPago = v["ag.maternity-allowance-weeks"];
    return { promedio, base, semanal, semanasPago, total: redondear(semanal * semanasPago) };
  },
  resultado: [
    { clave: "total", etiqueta: "Maternity allowance for the full period", formato: "moneda", destacada: true },
    { clave: "semanal", etiqueta: "Weekly allowance", formato: "moneda" },
    { clave: "semanasPago", etiqueta: "Weeks paid", formato: "semanas" },
    { clave: "promedio", etiqueta: "Average weekly earnings", formato: "moneda" },
    { clave: "base", etiqueta: "Weekly earnings used", formato: "moneda" },
  ],
});
