import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { aportes } from "../lib/nomina";

export default definirCalculadora({
  id: "lk.epf-etf-calculator",
  mercado: "lk",
  concepto: "aportes-seguridad-social",
  slug: "epf-etf-calculator",
  estado: "publicado",
  requiere: {
    "lk.epf-employee": "numero",
    "lk.epf-employer": "numero",
    "lk.etf-employer": "numero",
  },
  campos: [
    { id: "ganancias", tipo: "moneda", etiqueta: "Total earnings for the month", min: 0, porDefecto: 100000, ayuda: "Salary, cost of living allowance and similar allowances, holiday pay." },
    { id: "meses", tipo: "entero", etiqueta: "Months to add up", min: 1, max: 600, porDefecto: 12 },
  ],
  calcular(e, v, { redondear }) {
    if (e.ganancias <= 0) throw new ErrorEntrada("Enter your total earnings for the month.", "ganancias");
    const a = aportes(e.ganancias, v["lk.epf-employee"], v["lk.epf-employer"], v["lk.etf-employer"]);
    const epfEmpleado = redondear(a.epfEmpleado);
    const epfEmpleador = redondear(a.epfEmpleador);
    const etf = redondear(a.etf);
    const totalMes = redondear(epfEmpleado + epfEmpleador + etf);
    return {
      epfEmpleado,
      epfEmpleador,
      epfTotal: redondear(epfEmpleado + epfEmpleador),
      etf,
      totalMes,
      totalPeriodo: redondear(totalMes * e.meses),
      epfPeriodo: redondear((epfEmpleado + epfEmpleador) * e.meses),
      etfPeriodo: redondear(etf * e.meses),
    };
  },
  resultado: [
    { clave: "totalMes", etiqueta: "Paid into EPF and ETF this month", formato: "moneda", destacada: true },
    { clave: "epfEmpleado", etiqueta: "EPF deducted from your pay", formato: "moneda" },
    { clave: "epfEmpleador", etiqueta: "EPF paid by your employer", formato: "moneda" },
    { clave: "epfTotal", etiqueta: "EPF for the month", formato: "moneda" },
    { clave: "etf", etiqueta: "ETF paid by your employer", formato: "moneda" },
    { clave: "epfPeriodo", etiqueta: "EPF over the months you entered (before interest)", formato: "moneda" },
    { clave: "etfPeriodo", etiqueta: "ETF over the months you entered (before interest)", formato: "moneda" },
    { clave: "totalPeriodo", etiqueta: "EPF and ETF over the months you entered", formato: "moneda" },
  ],
});
