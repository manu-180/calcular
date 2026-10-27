import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "bb.nis-calculator",
  mercado: "bb",
  concepto: "aportes-seguridad-social",
  slug: "nis-calculator",
  estado: "publicado",
  requiere: {
    "bb.nis-employee-rate": "numero",
    "bb.nis-employer-rate": "numero",
    "bb.rrf-employee-rate": "numero",
    "bb.rrf-employer-rate": "numero",
    "bb.nis-ceiling-monthly": "numero",
    "bb.nis-ceiling-weekly": "numero",
  },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Gross pay for the period", min: 0, porDefecto: 4000 },
    {
      id: "periodo",
      tipo: "opcion",
      etiqueta: "How often you are paid",
      opciones: [
        { valor: "mes", etiqueta: "Monthly" },
        { valor: "semana", etiqueta: "Weekly" },
      ],
      porDefecto: "mes",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Enter your gross pay for the period.", "bruto");
    const tope = e.periodo === "semana" ? v["bb.nis-ceiling-weekly"] : v["bb.nis-ceiling-monthly"];
    const asegurable = Math.min(e.bruto, tope);
    const nisEmpleado = redondear(porcentaje(asegurable, v["bb.nis-employee-rate"]));
    const rrfEmpleado = redondear(porcentaje(e.bruto, v["bb.rrf-employee-rate"]));
    const nisEmpleador = redondear(porcentaje(asegurable, v["bb.nis-employer-rate"]));
    const rrfEmpleador = redondear(porcentaje(e.bruto, v["bb.rrf-employer-rate"]));
    const empleado = redondear(nisEmpleado + rrfEmpleado);
    const empleador = redondear(nisEmpleador + rrfEmpleador);
    const observaciones: string[] = [];
    if (e.bruto > tope) observaciones.push("Your pay is above the insurable earnings ceiling, so NIS is worked out on the ceiling. The Resilience and Regeneration Fund uses your full pay.");
    return {
      empleado,
      nisEmpleado,
      rrfEmpleado,
      empleador,
      nisEmpleador,
      rrfEmpleador,
      total: redondear(empleado + empleador),
      asegurable,
      tope,
      observaciones,
    };
  },
  resultado: [
    { clave: "empleado", etiqueta: "Deducted from your pay", formato: "moneda", destacada: true },
    { clave: "nisEmpleado", etiqueta: "Your NIS contribution", formato: "moneda" },
    { clave: "rrfEmpleado", etiqueta: "Your Resilience and Regeneration Fund contribution", formato: "moneda" },
    { clave: "empleador", etiqueta: "Paid by your employer", formato: "moneda" },
    { clave: "nisEmpleador", etiqueta: "Employer NIS contribution", formato: "moneda" },
    { clave: "rrfEmpleador", etiqueta: "Employer Resilience and Regeneration Fund contribution", formato: "moneda" },
    { clave: "total", etiqueta: "Total sent to NISSS", formato: "moneda" },
    { clave: "asegurable", etiqueta: "Insurable earnings for NIS", formato: "moneda" },
    { clave: "tope", etiqueta: "Insurable earnings ceiling for the period", formato: "moneda" },
  ],
});
