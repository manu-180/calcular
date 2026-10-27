import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { aporteSemanal, claseNis, OPCIONES_LUNES, REQUIERE_NIS, SEMANAS_POR_ANIO, semanasDelMes } from "../lib/nomina";

export default definirCalculadora({
  id: "tt.employer-cost-calculator",
  mercado: "tt",
  concepto: "costo-empleador",
  slug: "employer-cost-calculator",
  estado: "publicado",
  requiere: REQUIERE_NIS,
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Employee's gross monthly salary", min: 0, porDefecto: 10000 },
    { id: "lunes", tipo: "opcion", etiqueta: "Mondays in the pay month", opciones: OPCIONES_LUNES, porDefecto: "promedio" },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Enter the gross monthly salary.", "bruto");
    const semanas = semanasDelMes(e.lunes);
    const empleadorSemana = aporteSemanal(v["tt.nis-employer-monthly"], e.bruto);
    const empleadoSemana = aporteSemanal(v["tt.nis-employee-monthly"], e.bruto);
    const nisEmpleador = redondear(empleadorSemana * semanas);
    const costo = redondear(e.bruto + nisEmpleador);
    return {
      costo,
      nisEmpleador,
      nisEmpleado: redondear(empleadoSemana * semanas),
      clase: claseNis(v["tt.nis-employer-monthly"], e.bruto),
      costoAnual: redondear(e.bruto * 12 + empleadorSemana * SEMANAS_POR_ANIO),
      recargo: (nisEmpleador / e.bruto) * 100,
      observaciones: ["The employee's NIS and PAYE come out of the gross salary, so they do not add to your cost."],
    };
  },
  resultado: [
    { clave: "costo", etiqueta: "Total cost for the month", formato: "moneda", destacada: true },
    { clave: "nisEmpleador", etiqueta: "Employer NIS for the month", formato: "moneda" },
    { clave: "nisEmpleado", etiqueta: "Employee NIS deducted from the salary", formato: "moneda" },
    { clave: "clase", etiqueta: "NIS earnings class", formato: "numero", decimales: 0 },
    { clave: "costoAnual", etiqueta: "Cost over a year (12 salaries, 52 weeks of NIS)", formato: "moneda" },
    { clave: "recargo", etiqueta: "Employer NIS as a share of salary", formato: "porcentaje", decimales: 1 },
  ],
});
