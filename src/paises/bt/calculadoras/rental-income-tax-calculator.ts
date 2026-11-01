import { aplicarEscalaMarginal, definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "bt.rental-income-tax-calculator",
  mercado: "bt",
  concepto: "propio",
  slug: "rental-income-tax-calculator",
  estado: "publicado",
  requiere: {
    "bt.pit-bands": "escala",
    "bt.rent-repairs-share": "numero",
    "bt.tds-rates": "mapa",
  },
  campos: [
    { id: "renta", tipo: "moneda", etiqueta: "Rent received in the year", min: 0, porDefecto: 600000 },
    { id: "gastos", tipo: "moneda", etiqueta: "Loan interest, property tax and insurance on the property", min: 0, porDefecto: 0 },
    { id: "otros", tipo: "moneda", etiqueta: "Your other taxable income for the year", min: 0, porDefecto: 0, ayuda: "It decides which band your rent falls in." },
    { id: "conRetencion", tipo: "opcion", etiqueta: "Do your tenants withhold tax?", opciones: [{ valor: "yes", etiqueta: "Yes" }, { valor: "no", etiqueta: "No" }], porDefecto: "yes" },
  ],
  calcular(e, v, { redondear }) {
    if (e.renta < 0 || e.gastos < 0 || e.otros < 0) throw new ErrorEntrada("Amounts cannot be negative.", "renta");
    const reparaciones = redondear(porcentaje(e.renta, v["bt.rent-repairs-share"]));
    const neto = redondear(Math.max(0, e.renta - reparaciones - e.gastos));
    const impuesto = redondear(aplicarEscalaMarginal(v["bt.pit-bands"], e.otros + neto) - aplicarEscalaMarginal(v["bt.pit-bands"], e.otros));
    const retenido = e.conRetencion === "yes" ? redondear(porcentaje(e.renta, enMapa(v["bt.tds-rates"], "rent"))) : 0;
    return {
      impuesto,
      reparaciones,
      neto,
      retenido,
      saldo: redondear(impuesto - retenido),
      observaciones: ["A negative balance means more was withheld than the tax on this rent. It counts toward your return for the year."],
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Income tax on the rent", formato: "moneda", destacada: true },
    { clave: "reparaciones", etiqueta: "Repairs and maintenance deduction", formato: "moneda" },
    { clave: "neto", etiqueta: "Net rental income", formato: "moneda" },
    { clave: "retenido", etiqueta: "Withheld by tenants", formato: "moneda", ocultarSiCero: true },
    { clave: "saldo", etiqueta: "Balance to pay with your return", formato: "moneda" },
  ],
});
