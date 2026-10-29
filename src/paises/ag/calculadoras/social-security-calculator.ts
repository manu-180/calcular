import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ag.social-security-calculator",
  mercado: "ag",
  concepto: "aportes-seguridad-social",
  slug: "social-security-calculator",
  estado: "borrador",
  requiere: {
    "ag.ss-employee-rate": "mapa",
    "ag.ss-employer-rate": "mapa",
    "ag.ss-ceiling-monthly": "numero",
  },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Gross pay for the month", min: 0, porDefecto: 4000 },
    { id: "sector", tipo: "opcion-dato", etiqueta: "Sector", dato: "ag.ss-employee-rate", porDefecto: "private" },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Enter your gross pay for the month.", "bruto");
    const tope = v["ag.ss-ceiling-monthly"];
    const base = Math.min(e.bruto, tope);
    const tasaEmpleado = enMapa(v["ag.ss-employee-rate"], e.sector);
    const tasaEmpleador = enMapa(v["ag.ss-employer-rate"], e.sector);
    const empleado = redondear(porcentaje(base, tasaEmpleado));
    const empleador = redondear(porcentaje(base, tasaEmpleador));
    const observaciones: string[] = [];
    if (e.bruto > tope) observaciones.push("Your pay is above the monthly ceiling, so contributions are worked out on the ceiling only.");
    return { base, tasaEmpleado, tasaEmpleador, empleado, empleador, total: redondear(empleado + empleador), observaciones };
  },
  resultado: [
    { clave: "empleado", etiqueta: "Your Social Security deduction", formato: "moneda", destacada: true },
    { clave: "empleador", etiqueta: "Employer's contribution", formato: "moneda" },
    { clave: "total", etiqueta: "Total paid into Social Security", formato: "moneda" },
    { clave: "base", etiqueta: "Insurable earnings used", formato: "moneda" },
    { clave: "tasaEmpleado", etiqueta: "Your rate", formato: "porcentaje", decimales: 0 },
    { clave: "tasaEmpleador", etiqueta: "Employer's rate", formato: "porcentaje", decimales: 0 },
  ],
});
