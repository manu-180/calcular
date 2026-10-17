import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { nssf } from "../lib/nomina";

export default definirCalculadora({
  id: "ke.employer-cost-calculator",
  mercado: "ke",
  concepto: "costo-empleador",
  slug: "employer-cost-calculator",
  estado: "publicado",
  requiere: {
    "ke.nssf-rate": "numero",
    "ke.nssf-lel": "numero",
    "ke.nssf-uel": "numero",
    "ke.housing-levy-rate": "numero",
  },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Gross monthly salary of the employee", min: 0, porDefecto: 60000 },
    { id: "empleados", tipo: "entero", etiqueta: "Number of employees on this salary", min: 1, porDefecto: 1 },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Enter the gross monthly salary.", "bruto");
    if (e.empleados < 1) throw new ErrorEntrada("Enter at least one employee.", "empleados");
    const nssfEmpleador = redondear(nssf(e.bruto, { tasa: v["ke.nssf-rate"], lel: v["ke.nssf-lel"], uel: v["ke.nssf-uel"] }).total);
    const housingLevy = redondear(porcentaje(e.bruto, v["ke.housing-levy-rate"]));
    const porEmpleado = redondear(e.bruto + nssfEmpleador + housingLevy);
    const total = redondear(porEmpleado * e.empleados);
    return {
      porEmpleado,
      nssfEmpleador,
      housingLevy,
      cargas: redondear(nssfEmpleador + housingLevy),
      sobreSueldo: ((nssfEmpleador + housingLevy) / e.bruto) * 100,
      total,
      anual: redondear(total * 12),
      observaciones: ["SHIF and PAYE come out of the employee's pay, so they are not an extra cost for you."],
    };
  },
  resultado: [
    { clave: "porEmpleado", etiqueta: "Monthly cost per employee", formato: "moneda", destacada: true },
    { clave: "nssfEmpleador", etiqueta: "Employer NSSF", formato: "moneda" },
    { clave: "housingLevy", etiqueta: "Employer Housing Levy", formato: "moneda" },
    { clave: "cargas", etiqueta: "Statutory costs on top of salary", formato: "moneda" },
    { clave: "sobreSueldo", etiqueta: "Statutory costs as a share of salary", formato: "porcentaje", decimales: 2 },
    { clave: "total", etiqueta: "Monthly cost for all these employees", formato: "moneda" },
    { clave: "anual", etiqueta: "Cost over 12 months", formato: "moneda" },
  ],
});
