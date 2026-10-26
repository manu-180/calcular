import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { aportes, apitMensual } from "../lib/nomina";

export default definirCalculadora({
  id: "lk.salary-calculator",
  mercado: "lk",
  concepto: "sueldo-neto",
  slug: "salary-calculator",
  estado: "publicado",
  requiere: {
    "lk.apit-table-1": "escala",
    "lk.epf-employee": "numero",
    "lk.epf-employer": "numero",
    "lk.personal-relief": "numero",
  },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Gross salary for the month", min: 0, porDefecto: 250000, ayuda: "Basic salary plus allowances and any taxable benefits." },
    { id: "otrasDeducciones", tipo: "moneda", etiqueta: "Other deductions on your payslip", min: 0, porDefecto: 0, ayuda: "Loan instalments, welfare society, union dues. They do not change your tax." },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Enter your gross salary for the month.", "bruto");
    const epf = redondear(aportes(e.bruto, v["lk.epf-employee"], 0, 0).epfEmpleado);
    const apit = redondear(apitMensual(e.bruto, v["lk.apit-table-1"]));
    const totalDeducido = redondear(epf + apit + e.otrasDeducciones);
    const neto = redondear(e.bruto - totalDeducido);
    const observaciones: string[] = [];
    if (neto < 0) observaciones.push("Your deductions are larger than your salary. Check the amounts you entered.");
    return {
      neto,
      apit,
      epf,
      otrasDeducciones: e.otrasDeducciones,
      totalDeducido,
      netoAnual: redondear(neto * 12),
      porcentajeNeto: (neto / e.bruto) * 100,
      observaciones,
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "Take-home pay for the month", formato: "moneda", destacada: true },
    { clave: "apit", etiqueta: "APIT (income tax)", formato: "moneda" },
    { clave: "epf", etiqueta: "EPF, your share", formato: "moneda" },
    { clave: "otrasDeducciones", etiqueta: "Other deductions", formato: "moneda", ocultarSiCero: true },
    { clave: "totalDeducido", etiqueta: "Total deductions", formato: "moneda" },
    { clave: "netoAnual", etiqueta: "Take-home pay over 12 months", formato: "moneda" },
    { clave: "porcentajeNeto", etiqueta: "Share of gross salary you keep", formato: "porcentaje", decimales: 1 },
  ],
  mundo: { bruto: "bruto", periodoBruto: "mes", neto: "neto", periodoNeto: "mes", entrada: { otrasDeducciones: 0 } },
});
