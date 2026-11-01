import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ws.employer-cost-calculator",
  mercado: "ws",
  concepto: "costo-empleador",
  slug: "employer-cost-calculator",
  estado: "borrador",
  requiere: {
    "ws.npf-employer-rate": "numero",
    "ws.standard-week-hours": "numero",
  },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Gross pay per employee for the month", min: 0, porDefecto: 3000 },
    { id: "empleados", tipo: "entero", etiqueta: "Number of employees", min: 1, max: 10000, porDefecto: 1 },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Enter the gross pay per employee.", "bruto");
    const npf = redondear(porcentaje(e.bruto, v["ws.npf-employer-rate"]));
    const costoEmpleado = redondear(e.bruto + npf);
    const horasMes = (v["ws.standard-week-hours"] * 52) / 12;
    return {
      costoEmpleado,
      npf,
      costoMensual: redondear(costoEmpleado * e.empleados),
      costoAnual: redondear(costoEmpleado * e.empleados * 12),
      costoPorHora: redondear(costoEmpleado / horasMes),
      observaciones: [
        "The figure covers pay and the employer share of NPF. It leaves out insurance, training, uniforms and other costs that your own contracts add.",
      ],
    };
  },
  resultado: [
    { clave: "costoEmpleado", etiqueta: "Monthly cost of one employee", formato: "moneda", destacada: true },
    { clave: "npf", etiqueta: "Employer NPF contribution per employee", formato: "moneda" },
    { clave: "costoMensual", etiqueta: "Monthly cost for all employees", formato: "moneda" },
    { clave: "costoAnual", etiqueta: "Cost over 12 months", formato: "moneda" },
    { clave: "costoPorHora", etiqueta: "Cost of one working hour", formato: "moneda" },
  ],
});
