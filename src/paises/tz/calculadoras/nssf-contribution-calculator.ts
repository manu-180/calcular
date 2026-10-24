import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { APORTE_NSSF } from "../lib/nomina";

export default definirCalculadora({
  id: "tz.nssf-contribution-calculator",
  mercado: "tz",
  concepto: "aportes-seguridad-social",
  slug: "nssf-contribution-calculator",
  estado: "publicado",
  requiere: {
    "tz.nssf-rate": "numero",
    "tz.nssf-employee-max": "numero",
    "tz.nssf-late-penalty": "numero",
  },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Monthly wage", min: 0, porDefecto: 1000000 },
    { id: "aporte", tipo: "opcion", etiqueta: "Employee's share", opciones: APORTE_NSSF, porDefecto: "10" },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Enter the monthly wage.", "bruto");
    const tasaEmpleado = Math.min(Number(e.aporte), v["tz.nssf-employee-max"]);
    const total = redondear(porcentaje(e.bruto, v["tz.nssf-rate"]));
    const empleado = redondear(porcentaje(e.bruto, tasaEmpleado));
    return {
      total,
      empleado,
      empleador: redondear(total - empleado),
      anual: redondear(total * 12),
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Total NSSF contribution for the month", formato: "moneda", destacada: true },
    { clave: "empleado", etiqueta: "Deducted from the employee", formato: "moneda" },
    { clave: "empleador", etiqueta: "Paid by the employer", formato: "moneda" },
    { clave: "anual", etiqueta: "Total over 12 months", formato: "moneda" },
  ],
});
