import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "tz.tax-penalty-calculator",
  mercado: "tz",
  concepto: "propio",
  slug: "tax-penalty-calculator",
  estado: "publicado",
  requiere: {
    "tz.late-filing-rate": "numero",
    "tz.late-filing-points-individual": "numero",
    "tz.late-filing-points-company": "numero",
    "tz.currency-point": "numero",
  },
  campos: [
    { id: "impuesto", tipo: "moneda", etiqueta: "Tax assessed on the return, less tax already paid", min: 0, porDefecto: 2000000 },
    { id: "meses", tipo: "entero", etiqueta: "Months late, counting part of a month as a full month", min: 1, porDefecto: 2 },
    {
      id: "persona",
      tipo: "opcion",
      etiqueta: "Taxpayer",
      opciones: [
        { valor: "individual", etiqueta: "Individual" },
        { valor: "company", etiqueta: "Company or other body corporate" },
      ],
      porDefecto: "individual",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.impuesto < 0) throw new ErrorEntrada("Tax cannot be negative.", "impuesto");
    if (e.meses < 1) throw new ErrorEntrada("Enter at least one month.", "meses");
    const puntos = e.persona === "individual" ? v["tz.late-filing-points-individual"] : v["tz.late-filing-points-company"];
    const minimo = puntos * v["tz.currency-point"];
    const porMes = Math.max(porcentaje(e.impuesto, v["tz.late-filing-rate"]), minimo);
    return {
      total: redondear(porMes * e.meses),
      porMes: redondear(porMes),
      minimo,
      observaciones: ["Interest at the statutory rate is charged on top for tax paid late. This calculator shows only the penalty."],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Late filing penalty", formato: "moneda", destacada: true },
    { clave: "porMes", etiqueta: "Penalty for each month", formato: "moneda" },
    { clave: "minimo", etiqueta: "Minimum penalty for each month", formato: "moneda" },
  ],
});
