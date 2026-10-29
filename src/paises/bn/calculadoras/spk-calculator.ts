import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { empleadoSpk, empleadorSpk, REQUIERE_SPK } from "../lib/spk";

export default definirCalculadora({
  id: "bn.spk-calculator",
  mercado: "bn",
  concepto: "aportes-seguridad-social",
  slug: "spk-calculator",
  estado: "publicado",
  requiere: { ...REQUIERE_SPK, "bn.spk-payment-day": "numero" },
  campos: [{ id: "sueldo", tipo: "moneda", etiqueta: "Basic salary for the month", min: 0, porDefecto: 2000, ayuda: "Basic salary, or the pay for work done if you have no basic salary." }],
  calcular(e, v, { redondear }) {
    if (e.sueldo <= 0) throw new ErrorEntrada("Enter your basic salary for the month.", "sueldo");
    const p = { tasaEmpleado: v["bn.spk-employee-rate"], bandas: v["bn.spk-employer-bands"], minimoEmpleador: v["bn.spk-employer-minimum"] };
    const empleado = redondear(empleadoSpk(e.sueldo, p));
    const empleador = redondear(empleadorSpk(e.sueldo, p));
    const total = redondear(empleado + empleador);
    const observaciones: string[] = [];
    if (e.sueldo <= 500) observaciones.push("At this salary the employer pays the fixed contribution for the lowest salary group, whatever the exact pay.");
    observaciones.push("SPK covers citizens and permanent residents under 60. Other employees are not registered.");
    return {
      empleado,
      empleador,
      total,
      anual: redondear(total * 12),
      porcentajeTotal: (total / e.sueldo) * 100,
      observaciones,
    };
  },
  resultado: [
    { clave: "empleado", etiqueta: "Your SPK contribution", formato: "moneda", destacada: true },
    { clave: "empleador", etiqueta: "Employer's SPK contribution", formato: "moneda" },
    { clave: "total", etiqueta: "Total paid into SPK this month", formato: "moneda" },
    { clave: "anual", etiqueta: "Total over 12 months", formato: "moneda" },
    { clave: "porcentajeTotal", etiqueta: "Total as a share of salary", formato: "porcentaje", decimales: 1 },
  ],
});
