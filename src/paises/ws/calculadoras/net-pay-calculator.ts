import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { impuestoPaye, PERIODOS_ANIO, REQUIERE_PAYE } from "../lib/nomina";

export default definirCalculadora({
  id: "ws.net-pay-calculator",
  mercado: "ws",
  concepto: "sueldo-neto",
  slug: "net-pay-calculator",
  estado: "publicado",
  requiere: { ...REQUIERE_PAYE, "ws.npf-employee-rate": "numero" },
  mundo: { bruto: "bruto", periodoBruto: "mes", neto: "neto", periodoNeto: "mes", entrada: { periodo: "month" } },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Gross pay for the period", min: 0, porDefecto: 4000, ayuda: "Salary or wages plus taxable allowances, overtime and bonuses." },
    {
      id: "periodo",
      tipo: "opcion",
      etiqueta: "Pay period",
      opciones: [
        { valor: "fortnight", etiqueta: "Per fortnight" },
        { valor: "month", etiqueta: "Per month" },
      ],
      porDefecto: "month",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Enter your gross pay for the period.", "bruto");
    const paye = redondear(impuestoPaye(e.bruto, e.periodo, v["ws.paye-fortnightly-bands"], v["ws.income-tax-bands"]));
    const npf = redondear(porcentaje(e.bruto, v["ws.npf-employee-rate"]));
    const totalDeducido = redondear(paye + npf);
    const neto = redondear(e.bruto - totalDeducido);
    return {
      neto,
      paye,
      npf,
      totalDeducido,
      netoAnual: redondear(neto * PERIODOS_ANIO[e.periodo]),
      porcentajeNeto: (neto / e.bruto) * 100,
      observaciones: [
        "PAYE is worked out on gross pay. The Ministry for Revenue treats it as a final tax, so your NPF contribution does not lower it.",
        "Other deductions on your payslip, such as loans or union dues, are not included.",
      ],
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "Take-home pay for the period", formato: "moneda", destacada: true },
    { clave: "paye", etiqueta: "PAYE", formato: "moneda" },
    { clave: "npf", etiqueta: "NPF (your share)", formato: "moneda" },
    { clave: "totalDeducido", etiqueta: "Total deductions", formato: "moneda" },
    { clave: "netoAnual", etiqueta: "Take-home pay over a year", formato: "moneda" },
    { clave: "porcentajeNeto", etiqueta: "Share of gross pay you keep", formato: "porcentaje", decimales: 1 },
  ],
});
