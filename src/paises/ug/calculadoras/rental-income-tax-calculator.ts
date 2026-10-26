import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ug.rental-income-tax-calculator",
  mercado: "ug",
  concepto: "propio",
  slug: "rental-income-tax-calculator",
  estado: "publicado",
  requiere: {
    "ug.rental-tax-rate": "numero",
    "ug.rental-tax-threshold": "numero",
    "ug.company-tax-rate": "numero",
    "ug.rental-expense-cap": "numero",
  },
  campos: [
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "Landlord",
      opciones: [
        { valor: "individual", etiqueta: "An individual" },
        { valor: "company", etiqueta: "A company, trust or retirement fund" },
      ],
      porDefecto: "individual",
    },
    { id: "renta", tipo: "moneda", etiqueta: "Gross rent for the year", min: 0, porDefecto: 6000000, ayuda: "All rent from every property for the year of income (1 July to 30 June)." },
    { id: "gastos", tipo: "moneda", etiqueta: "Expenses on the property for the year", min: 0, porDefecto: 0, visibleSi: { tipo: ["company"] } },
  ],
  calcular(e, v, { redondear }) {
    if (e.renta <= 0) throw new ErrorEntrada("Enter the gross rent for the year.", "renta");
    const observaciones: string[] = [];
    if (e.tipo === "individual") {
      const gravable = Math.max(0, e.renta - v["ug.rental-tax-threshold"]);
      const impuesto = redondear(porcentaje(gravable, v["ug.rental-tax-rate"]));
      if (impuesto === 0) observaciones.push("Your rent is below the threshold, so no rental tax is due. You still declare it.");
      observaciones.push("Individuals cannot deduct expenses. Only the threshold comes off.");
      return { impuesto, gravable: redondear(gravable), deducido: v["ug.rental-tax-threshold"], mensual: redondear(impuesto / 12), observaciones };
    }
    const tope = porcentaje(e.renta, v["ug.rental-expense-cap"]);
    const deducido = redondear(Math.min(e.gastos ?? 0, tope));
    if ((e.gastos ?? 0) > tope) observaciones.push("Expenses are capped at half of the gross rent.");
    const gravable = redondear(e.renta - deducido);
    const impuesto = redondear(porcentaje(gravable, v["ug.company-tax-rate"]));
    return { impuesto, gravable, deducido, mensual: redondear(impuesto / 12), observaciones };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Rental income tax for the year", formato: "moneda", destacada: true },
    { clave: "gravable", etiqueta: "Chargeable rental income", formato: "moneda" },
    { clave: "deducido", etiqueta: "Threshold or expenses deducted", formato: "moneda" },
    { clave: "mensual", etiqueta: "Average a month", formato: "moneda" },
  ],
});
