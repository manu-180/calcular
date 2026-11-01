import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { OPCIONES_PERIODO, PERIODOS_POR_ANIO } from "../lib/nomina";

export default definirCalculadora({
  id: "fj.fnpf-calculator",
  mercado: "fj",
  concepto: "aportes-seguridad-social",
  slug: "fnpf-calculator",
  estado: "publicado",
  requiere: {
    "fj.fnpf-employee-rate": "numero",
    "fj.fnpf-employer-rate": "numero",
    "fj.fnpf-excess-deduction": "numero",
  },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Gross pay", min: 0, porDefecto: 3000 },
    { id: "periodo", tipo: "opcion", etiqueta: "Pay period", opciones: [...OPCIONES_PERIODO], porDefecto: "month" },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Enter your gross pay for the period.", "bruto");
    const n = PERIODOS_POR_ANIO[e.periodo];
    const empleado = redondear(porcentaje(e.bruto, v["fj.fnpf-employee-rate"]));
    const empleador = redondear(porcentaje(e.bruto, v["fj.fnpf-employer-rate"]));
    const total = redondear(empleado + empleador);
    return {
      empleado,
      empleador,
      total,
      totalAnual: redondear(total * n),
      tasaTotal: v["fj.fnpf-employee-rate"] + v["fj.fnpf-employer-rate"],
    };
  },
  resultado: [
    { clave: "empleado", etiqueta: "Your contribution", formato: "moneda", destacada: true },
    { clave: "empleador", etiqueta: "Employer contribution", formato: "moneda" },
    { clave: "total", etiqueta: "Paid into your FNPF account", formato: "moneda" },
    { clave: "totalAnual", etiqueta: "Paid into your account over a full year", formato: "moneda" },
    { clave: "tasaTotal", etiqueta: "Combined rate", formato: "porcentaje", decimales: 0 },
  ],
});
