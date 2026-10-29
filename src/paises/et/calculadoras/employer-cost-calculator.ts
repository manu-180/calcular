import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { nomina } from "../lib/nomina";

export default definirCalculadora({
  id: "et.employer-cost-calculator",
  mercado: "et",
  concepto: "costo-empleador",
  slug: "employer-cost-calculator",
  estado: "publicado",
  requiere: {
    "et.employment-income-tax": "escala",
    "et.pension-employee": "numero",
    "et.pension-employer": "numero",
  },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Gross monthly salary", min: 0, porDefecto: 15000 },
    { id: "empleados", tipo: "entero", etiqueta: "Number of employees on this salary", min: 1, max: 10000, porDefecto: 1 },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Enter the gross monthly salary.", "bruto");
    const pensionEmpleador = redondear(porcentaje(e.bruto, v["et.pension-employer"]));
    const n = nomina(e.bruto, v["et.employment-income-tax"], v["et.pension-employee"]);
    const costo = redondear(e.bruto + pensionEmpleador);
    return {
      costo,
      pensionEmpleador,
      impuesto: redondear(n.impuesto),
      pensionEmpleado: redondear(n.pension),
      neto: redondear(e.bruto - redondear(n.impuesto) - redondear(n.pension)),
      costoTotal: redondear(costo * e.empleados),
      costoAnual: redondear(costo * e.empleados * 12),
    };
  },
  resultado: [
    { clave: "costo", etiqueta: "Monthly cost of one employee", formato: "moneda", destacada: true },
    { clave: "pensionEmpleador", etiqueta: "Employer pension contribution", formato: "moneda" },
    { clave: "impuesto", etiqueta: "Income tax you withhold", formato: "moneda" },
    { clave: "pensionEmpleado", etiqueta: "Employee pension you withhold", formato: "moneda" },
    { clave: "neto", etiqueta: "Net salary paid to the employee", formato: "moneda" },
    { clave: "costoTotal", etiqueta: "Monthly cost for all these employees", formato: "moneda" },
    { clave: "costoAnual", etiqueta: "Cost over 12 months", formato: "moneda" },
  ],
});
