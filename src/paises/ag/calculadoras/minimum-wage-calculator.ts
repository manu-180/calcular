import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "ag.minimum-wage-calculator",
  mercado: "ag",
  concepto: "salario-minimo",
  slug: "minimum-wage-calculator",
  estado: "borrador",
  requiere: { "ag.minimum-wage-hourly": "numero" },
  campos: [{ id: "horas", tipo: "numero", etiqueta: "Hours worked in a week", min: 1, max: 80, porDefecto: 40 }],
  calcular(e, v, { redondear }) {
    const hora = v["ag.minimum-wage-hourly"];
    const semana = redondear(hora * e.horas);
    return { hora, semana, mes: redondear((semana * 52) / 12) };
  },
  resultado: [
    { clave: "mes", etiqueta: "Minimum pay per month", formato: "moneda", destacada: true },
    { clave: "semana", etiqueta: "Minimum pay per week", formato: "moneda" },
    { clave: "hora", etiqueta: "Minimum wage per hour", formato: "moneda" },
  ],
});
