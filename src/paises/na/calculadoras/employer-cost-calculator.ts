import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { baseSsc, noNegativo } from "../lib/nomina";

export default definirCalculadora({
  id: "na.employer-cost-calculator",
  mercado: "na",
  concepto: "costo-empleador",
  slug: "employer-cost-calculator",
  estado: "publicado",
  requiere: {
    "na.ssc-employer-rate": "numero",
    "na.ssc-ceiling": "numero",
    "na.ssc-floor": "numero",
    "na.vet-levy-rate": "numero",
    "na.vet-levy-threshold": "numero",
  },
  campos: [
    { id: "basico", tipo: "moneda", etiqueta: "Basic salary a month", min: 0, porDefecto: 15000 },
    { id: "asignaciones", tipo: "moneda", etiqueta: "Allowances a month", min: 0, porDefecto: 0 },
    { id: "pension", tipo: "moneda", etiqueta: "Employer pension or medical aid contribution a month", min: 0, porDefecto: 0 },
    {
      id: "vet",
      tipo: "si-no",
      etiqueta: "Your yearly payroll is N$1 million or more",
      porDefecto: true,
      ayuda: "Employers at or above this payroll pay the VET levy to the Namibia Training Authority.",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.basico <= 0) throw new ErrorEntrada("Enter the basic salary.", "basico");
    noNegativo(e.asignaciones, "asignaciones", "Allowances cannot be negative.");
    noNegativo(e.pension, "pension", "The contribution cannot be negative.");
    const remuneracion = e.basico + e.asignaciones;
    const ssc = redondear(porcentaje(baseSsc(e.basico, v["na.ssc-floor"], v["na.ssc-ceiling"]), v["na.ssc-employer-rate"]));
    const vet = e.vet ? redondear(porcentaje(remuneracion, v["na.vet-levy-rate"])) : 0;
    const total = redondear(remuneracion + ssc + vet + e.pension);
    return {
      total,
      remuneracion,
      ssc,
      vet,
      pension: e.pension,
      anual: redondear(total * 12),
      recargo: ((total - remuneracion) / remuneracion) * 100,
      observaciones: [
        "The Employees' Compensation Fund assessment is not included. Add your own assessment on top.",
      ],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Cost to the employer a month", formato: "moneda", destacada: true },
    { clave: "remuneracion", etiqueta: "Salary and allowances", formato: "moneda" },
    { clave: "ssc", etiqueta: "Employer Social Security", formato: "moneda" },
    { clave: "vet", etiqueta: "VET levy", formato: "moneda", ocultarSiCero: true },
    { clave: "pension", etiqueta: "Pension or medical aid", formato: "moneda", ocultarSiCero: true },
    { clave: "anual", etiqueta: "Cost over 12 months", formato: "moneda" },
    { clave: "recargo", etiqueta: "On top of salary", formato: "porcentaje", decimales: 1 },
  ],
});
