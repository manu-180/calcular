import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "mu.minimum-wage",
  mercado: "mu",
  concepto: "salario-minimo",
  slug: "minimum-wage",
  estado: "publicado",
  requiere: {
    "mu.minimum-wage": "numero",
    "mu.hours-per-month": "numero",
  },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Your monthly wage (optional)", min: 0, requerido: false, ayuda: "Your basic wage for full-time work." },
  ],
  calcular(e, v, { redondear }) {
    const minimo = v["mu.minimum-wage"];
    if (e.sueldo !== null && e.sueldo < 0) throw new ErrorEntrada("The wage cannot be negative.", "sueldo");
    const horas = v["mu.hours-per-month"];
    const faltante = e.sueldo === null ? null : redondear(Math.max(0, minimo - e.sueldo));
    const observaciones: string[] = [];
    if (faltante !== null && faltante > 0) observaciones.push("Your wage is below the national minimum. You can raise it with your employer or with the Ministry of Labour.");
    if (faltante === 0) observaciones.push("Your wage meets the national minimum wage.");
    return {
      minimo,
      anual: redondear(minimo * 12),
      porHora: redondear(minimo / horas),
      faltante,
      observaciones,
    };
  },
  resultado: [
    { clave: "minimo", etiqueta: "National minimum wage a month", formato: "moneda", destacada: true },
    { clave: "anual", etiqueta: "Over 12 months", formato: "moneda" },
    { clave: "porHora", etiqueta: "Basic hourly rate (195 hours a month)", formato: "moneda" },
    { clave: "faltante", etiqueta: "Short of the minimum each month", formato: "moneda" },
  ],
});
