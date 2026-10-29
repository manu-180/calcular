import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ws.npf-calculator",
  mercado: "ws",
  concepto: "aportes-seguridad-social",
  slug: "npf-calculator",
  estado: "borrador",
  requiere: {
    "ws.npf-employee-rate": "numero",
    "ws.npf-employer-rate": "numero",
    "ws.npf-late-surcharge": "numero",
    "ws.npf-due-day": "numero",
  },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Gross wages for the month", min: 0, porDefecto: 3000, ayuda: "Include overtime, allowances and bonuses." },
    { id: "extra", tipo: "porcentaje", etiqueta: "Extra contribution you choose to make (% of wages)", min: 0, max: 100, porDefecto: 0, ayuda: "Members can pay more than the minimum if the employer is told in writing." },
    { id: "mesesTarde", tipo: "entero", etiqueta: "Months the payment is late", min: 0, max: 36, porDefecto: 0, ayuda: "Leave at 0 if you pay by the due date." },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Enter the gross wages for the month.", "bruto");
    const empleado = redondear(porcentaje(e.bruto, v["ws.npf-employee-rate"]));
    const empleador = redondear(porcentaje(e.bruto, v["ws.npf-employer-rate"]));
    const adicional = redondear(porcentaje(e.bruto, e.extra));
    const total = redondear(empleado + empleador + adicional);
    const recargo = redondear(porcentaje(total, v["ws.npf-late-surcharge"]) * e.mesesTarde);
    return {
      empleado,
      empleador,
      adicional,
      total,
      recargo,
      aPagar: redondear(total + recargo),
      vencimiento: `${v["ws.npf-due-day"]}th day after the end of the month`,
      observaciones: [
        "NPF counts the surcharge from 21 days after month end. The exact figure is set by NPF, so treat the surcharge here as an estimate.",
        "If the wage is below the minimum wage, the employer pays the whole contribution and deducts nothing from the employee.",
      ],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Total to send to NPF for the month", formato: "moneda", destacada: true },
    { clave: "empleado", etiqueta: "Employee share (deducted from wages)", formato: "moneda" },
    { clave: "empleador", etiqueta: "Employer share", formato: "moneda" },
    { clave: "adicional", etiqueta: "Extra voluntary contribution", formato: "moneda", ocultarSiCero: true },
    { clave: "recargo", etiqueta: "Late surcharge", formato: "moneda", ocultarSiCero: true },
    { clave: "aPagar", etiqueta: "Amount to pay including surcharge", formato: "moneda" },
    { clave: "vencimiento", etiqueta: "Due", formato: "texto" },
  ],
});
