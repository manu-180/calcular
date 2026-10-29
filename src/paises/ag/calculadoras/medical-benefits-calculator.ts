import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ag.medical-benefits-calculator",
  mercado: "ag",
  concepto: "propio",
  slug: "medical-benefits-calculator",
  estado: "publicado",
  requiere: {
    "ag.mbs-employee-rate": "numero",
    "ag.mbs-employee-rate-60": "numero",
    "ag.mbs-employer-rate": "numero",
  },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Gross pay for the month", min: 0, porDefecto: 4000 },
    {
      id: "edad",
      tipo: "opcion",
      etiqueta: "Your age",
      opciones: [
        { valor: "under60", etiqueta: "16 to 59" },
        { valor: "60to69", etiqueta: "60 to 69" },
      ],
      porDefecto: "under60",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Enter your gross pay for the month.", "bruto");
    const joven = e.edad === "under60";
    const tasaEmpleado = joven ? v["ag.mbs-employee-rate"] : v["ag.mbs-employee-rate-60"];
    const tasaEmpleador = joven ? v["ag.mbs-employer-rate"] : 0;
    const empleado = redondear(porcentaje(e.bruto, tasaEmpleado));
    const empleador = redondear(porcentaje(e.bruto, tasaEmpleador));
    const observaciones: string[] = [];
    if (!joven) observaciones.push("Regulation 17(1) sets the employer rate for employees under 60 only, so no employer share is shown for this age.");
    return { tasaEmpleado, tasaEmpleador, empleado, empleador, total: redondear(empleado + empleador), observaciones };
  },
  resultado: [
    { clave: "empleado", etiqueta: "Your Medical Benefits deduction", formato: "moneda", destacada: true },
    { clave: "empleador", etiqueta: "Employer's contribution", formato: "moneda" },
    { clave: "total", etiqueta: "Total paid into the scheme", formato: "moneda" },
    { clave: "tasaEmpleado", etiqueta: "Your rate", formato: "porcentaje", decimales: 1 },
    { clave: "tasaEmpleador", etiqueta: "Employer's rate", formato: "porcentaje", decimales: 1 },
  ],
});
