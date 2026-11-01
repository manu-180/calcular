import { aplicarEscala, definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { MESES_POR_ANIO, SEMANAS_POR_ANIO, semanalDesdeMensual } from "../lib/pago";

export default definirCalculadora({
  id: "bz.employer-cost-calculator",
  mercado: "bz",
  concepto: "costo-empleador",
  slug: "employer-cost-calculator",
  estado: "publicado",
  requiere: {
    "bz.ssb-employer-weekly": "escala",
    "bz.ssb-employee-weekly": "escala",
    "bz.ssb-total-rate": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Gross monthly pay of the employee", min: 0, porDefecto: 2000 },
    { id: "otros", tipo: "moneda", etiqueta: "Other monthly costs you carry for this person", min: 0, porDefecto: 0, ayuda: "Medical cover, transport, uniforms or training." },
  ],
  calcular(e, v, { redondear }) {
    if (e.salario <= 0) throw new ErrorEntrada("Enter the gross monthly pay.", "salario");
    const semanal = semanalDesdeMensual(e.salario);
    const ssbEmpleador = redondear((aplicarEscala(v["bz.ssb-employer-weekly"], semanal) * SEMANAS_POR_ANIO) / MESES_POR_ANIO);
    const ssbTrabajador = redondear((aplicarEscala(v["bz.ssb-employee-weekly"], semanal) * SEMANAS_POR_ANIO) / MESES_POR_ANIO);
    const costoMes = redondear(e.salario + ssbEmpleador + e.otros);
    return {
      costoMes,
      costoAnio: redondear(costoMes * MESES_POR_ANIO),
      ssbEmpleador,
      ssbTotal: redondear(ssbEmpleador + ssbTrabajador),
      recargo: ((costoMes - e.salario) / e.salario) * 100,
      observaciones: [
        "The employer pays the whole Social Security amount to the Board and deducts the employee share from the employee's pay, so the employee share is not an extra cost.",
        "Only the employer's Social Security share and the costs you enter are counted.",
      ],
    };
  },
  resultado: [
    { clave: "costoMes", etiqueta: "Monthly cost to the employer", formato: "moneda", destacada: true },
    { clave: "costoAnio", etiqueta: "Cost over 12 months", formato: "moneda" },
    { clave: "ssbEmpleador", etiqueta: "Employer Social Security share each month", formato: "moneda" },
    { clave: "ssbTotal", etiqueta: "Total sent to the Board each month", formato: "moneda" },
    { clave: "recargo", etiqueta: "Cost above gross pay", formato: "porcentaje", decimales: 1 },
  ],
});
