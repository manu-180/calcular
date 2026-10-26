import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { nisMes } from "../lib/nomina";

export default definirCalculadora({
  id: "jm.employer-cost-calculator",
  mercado: "jm",
  concepto: "costo-empleador",
  slug: "employer-cost-calculator",
  estado: "publicado",
  requiere: {
    "jm.nis-employee-rate": "numero",
    "jm.nis-employer-rate": "numero",
    "jm.nis-ceiling": "numero",
    "jm.nht-employer-rate": "numero",
    "jm.education-tax-employer-rate": "numero",
    "jm.heart-rate": "numero",
    "jm.heart-payroll-threshold": "numero",
  },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Gross monthly salary of the employee", min: 0, porDefecto: 250000 },
    { id: "pension", tipo: "moneda", etiqueta: "Employee's approved pension contribution for the month", min: 0, porDefecto: 0 },
    { id: "heart", tipo: "si-no", etiqueta: "Your total payroll is above the HEART/NSTA Trust threshold", porDefecto: true },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Enter the employee's gross monthly salary.", "bruto");
    if (e.pension > e.bruto) throw new ErrorEntrada("The pension contribution cannot be more than the salary.", "pension");
    const nis = redondear(nisMes(e.bruto, v["jm.nis-employer-rate"], v["jm.nis-ceiling"]));
    const nisEmpleado = redondear(nisMes(e.bruto, v["jm.nis-employee-rate"], v["jm.nis-ceiling"]));
    const nht = redondear(porcentaje(e.bruto, v["jm.nht-employer-rate"]));
    const ingresoEstatutario = Math.max(0, e.bruto - nisEmpleado - e.pension);
    const educationTax = redondear(porcentaje(ingresoEstatutario, v["jm.education-tax-employer-rate"]));
    const heart = e.heart ? redondear(porcentaje(e.bruto, v["jm.heart-rate"])) : 0;
    const contribuciones = redondear(nis + nht + educationTax + heart);
    const costo = redondear(e.bruto + contribuciones);
    return {
      costo,
      contribuciones,
      nis,
      nht,
      educationTax,
      heart,
      costoAnual: redondear(costo * 12),
      recargo: (contribuciones / e.bruto) * 100,
    };
  },
  resultado: [
    { clave: "costo", etiqueta: "Total monthly cost of the employee", formato: "moneda", destacada: true },
    { clave: "contribuciones", etiqueta: "Employer contributions", formato: "moneda" },
    { clave: "nis", etiqueta: "NIS, employer share", formato: "moneda" },
    { clave: "nht", etiqueta: "NHT, employer share", formato: "moneda" },
    { clave: "educationTax", etiqueta: "Education Tax, employer share", formato: "moneda" },
    { clave: "heart", etiqueta: "HEART/NSTA Trust", formato: "moneda", ocultarSiCero: true },
    { clave: "costoAnual", etiqueta: "Cost over 12 months", formato: "moneda" },
    { clave: "recargo", etiqueta: "Contributions as a share of salary", formato: "porcentaje", decimales: 1 },
  ],
});
