import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { aportes } from "../lib/nomina";

export default definirCalculadora({
  id: "lk.employer-cost-calculator",
  mercado: "lk",
  concepto: "costo-empleador",
  slug: "employer-cost-calculator",
  estado: "publicado",
  requiere: {
    "lk.epf-employer": "numero",
    "lk.etf-employer": "numero",
  },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Gross monthly salary of the employee", min: 0, porDefecto: 150000 },
    { id: "empleados", tipo: "entero", etiqueta: "Number of employees on this salary", min: 1, max: 100000, porDefecto: 1 },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Enter the gross monthly salary.", "bruto");
    const a = aportes(e.bruto, 0, v["lk.epf-employer"], v["lk.etf-employer"]);
    const epf = redondear(a.epfEmpleador);
    const etf = redondear(a.etf);
    const costoMes = redondear(e.bruto + epf + etf);
    return {
      costoMes,
      epf,
      etf,
      costoAnual: redondear(costoMes * 12),
      costoTotalMes: redondear(costoMes * e.empleados),
      costoTotalAnual: redondear(costoMes * 12 * e.empleados),
      recargo: ((epf + etf) / e.bruto) * 100,
    };
  },
  resultado: [
    { clave: "costoMes", etiqueta: "Monthly cost of one employee", formato: "moneda", destacada: true },
    { clave: "epf", etiqueta: "Employer EPF", formato: "moneda" },
    { clave: "etf", etiqueta: "ETF", formato: "moneda" },
    { clave: "recargo", etiqueta: "On top of the salary", formato: "porcentaje", decimales: 1 },
    { clave: "costoAnual", etiqueta: "Cost of one employee over 12 months", formato: "moneda" },
    { clave: "costoTotalMes", etiqueta: "Monthly cost of all these employees", formato: "moneda" },
    { clave: "costoTotalAnual", etiqueta: "Cost of all these employees over 12 months", formato: "moneda" },
  ],
});
