import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { aportesGpssa } from "../lib/aportes";

export default definirCalculadora({
  id: "ae.gpssa-contribution-calculator",
  mercado: "ae",
  concepto: "aportes-seguridad-social",
  slug: "gpssa-contribution-calculator",
  estado: "publicado",
  requiere: {
    "ae.gpssa": "mapa",
  },
  campos: [{ id: "salario", tipo: "moneda", etiqueta: "Monthly salary used for contributions", min: 0, porDefecto: 25000 }],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("Enter the monthly salary.", "salario");
    const a = aportesGpssa(entrada.salario, v["ae.gpssa"]);
    const empleado = redondear(a.empleado);
    const empleador = redondear(a.empleador);
    const gobierno = redondear(a.gobierno);
    return {
      total: redondear(empleado + empleador + gobierno),
      empleado,
      empleador,
      gobierno,
      anual: redondear((empleado + empleador + gobierno) * 12),
      observaciones: ["This applies to Emiratis working in the private sector. The employer must register them with GPSSA within a month of the work permit."],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Total monthly contribution", formato: "moneda", destacada: true },
    { clave: "empleado", etiqueta: "Employee", formato: "moneda" },
    { clave: "empleador", etiqueta: "Employer", formato: "moneda" },
    { clave: "gobierno", etiqueta: "Government", formato: "moneda" },
    { clave: "anual", etiqueta: "Total over 12 months", formato: "moneda" },
  ],
});
