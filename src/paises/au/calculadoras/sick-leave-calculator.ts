import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "au.sick-leave-calculator",
  mercado: "au",
  concepto: "propio",
  slug: "sick-leave-calculator",
  estado: "publicado",
  requiere: {
    "au.personal-leave-divisor": "numero",
  },
  campos: [
    { id: "horas", tipo: "numero", etiqueta: "Ordinary hours you work a week", min: 1, max: 60, porDefecto: 38 },
    { id: "semanas", tipo: "numero", etiqueta: "Weeks worked (52 for a full year)", min: 0, max: 520, porDefecto: 52 },
    { id: "tasa", tipo: "moneda", etiqueta: "Your base pay an hour (optional)", min: 0, requerido: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.horas <= 0) throw new ErrorEntrada("Enter your ordinary hours a week.", "horas");
    if (entrada.semanas < 0) throw new ErrorEntrada("Enter the weeks you worked.", "semanas");
    const divisor = v["au.personal-leave-divisor"];
    const anuales = redondear((entrada.horas * 52) / divisor);
    const acumuladas = redondear((entrada.horas * entrada.semanas) / divisor);
    return {
      acumuladas,
      anuales,
      dias: redondear((acumuladas / entrada.horas) * 5),
      valor: entrada.tasa === null ? null : redondear(acumuladas * entrada.tasa),
    };
  },
  resultado: [
    { clave: "acumuladas", etiqueta: "Sick and carer's leave accrued", formato: "horas", destacada: true },
    { clave: "dias", etiqueta: "Same as working days (5-day week)", formato: "dias", decimales: 1 },
    { clave: "anuales", etiqueta: "Leave for a full year", formato: "horas" },
    { clave: "valor", etiqueta: "Value at your base pay", formato: "moneda" },
  ],
});
