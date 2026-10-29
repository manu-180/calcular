import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "sc.presumptive-tax-calculator",
  mercado: "sc",
  concepto: "regimen-simplificado",
  slug: "presumptive-tax-calculator",
  estado: "publicado",
  requiere: { "sc.presumptive-tax-rate": "numero", "sc.presumptive-tax-limit": "numero" },
  campos: [
    { id: "ventas", tipo: "moneda", etiqueta: "Turnover for the year", min: 0, porDefecto: 600000, ayuda: "Income received. No expenses are deducted." },
  ],
  calcular(e, v, { redondear }) {
    if (e.ventas <= 0) throw new ErrorEntrada("Enter the turnover for the year.", "ventas");
    if (e.ventas >= v["sc.presumptive-tax-limit"]) {
      throw new ErrorEntrada("Presumptive tax is only for businesses with turnover below the limit. Use the business tax calculator instead.", "ventas");
    }
    const impuesto = redondear(porcentaje(e.ventas, v["sc.presumptive-tax-rate"]));
    return { impuesto, mensual: redondear(impuesto / 12), despues: redondear(e.ventas - impuesto), limite: v["sc.presumptive-tax-limit"] };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Presumptive tax for the year", formato: "moneda", destacada: true },
    { clave: "mensual", etiqueta: "Equivalent for each month", formato: "moneda" },
    { clave: "despues", etiqueta: "Turnover after presumptive tax", formato: "moneda" },
    { clave: "limite", etiqueta: "Turnover limit of the regime", formato: "moneda" },
  ],
});
