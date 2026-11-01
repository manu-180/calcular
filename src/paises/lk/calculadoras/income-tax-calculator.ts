import { aplicarEscala, definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "lk.income-tax-calculator",
  mercado: "lk",
  concepto: "propio",
  slug: "income-tax-calculator",
  estado: "publicado",
  requiere: {
    "lk.income-tax-bands": "escala",
    "lk.personal-relief": "numero",
  },
  campos: [
    { id: "empleo", tipo: "moneda", etiqueta: "Employment income for the year of assessment", min: 0, porDefecto: 3600000, ayuda: "Salary, allowances and benefits from 1 April to 31 March." },
    { id: "otros", tipo: "moneda", etiqueta: "Other income for the year (business, rent, interest)", min: 0, porDefecto: 0, ayuda: "Gains and profits after the expenses the law lets you deduct." },
    { id: "pagado", tipo: "moneda", etiqueta: "Tax already paid (APIT and advance income tax)", min: 0, porDefecto: 0, ayuda: "From the certificates your employer and bank give you." },
  ],
  calcular(e, v, { redondear }) {
    const total = e.empleo + e.otros;
    if (total <= 0) throw new ErrorEntrada("Enter your income for the year.", "empleo");
    const alivio = Math.min(v["lk.personal-relief"], total);
    const gravable = total - alivio;
    const impuesto = redondear(aplicarEscala(v["lk.income-tax-bands"], gravable));
    const saldo = redondear(impuesto - e.pagado);
    return {
      impuesto,
      total,
      alivio,
      gravable,
      tasaEfectiva: (impuesto / total) * 100,
      aPagar: saldo > 0 ? saldo : 0,
      aFavor: saldo < 0 ? -saldo : 0,
      porMes: redondear(impuesto / 12),
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Income tax for the year", formato: "moneda", destacada: true },
    { clave: "total", etiqueta: "Assessable income", formato: "moneda" },
    { clave: "alivio", etiqueta: "Personal relief", formato: "moneda" },
    { clave: "gravable", etiqueta: "Taxable income", formato: "moneda" },
    { clave: "tasaEfectiva", etiqueta: "Effective rate", formato: "porcentaje", decimales: 2 },
    { clave: "porMes", etiqueta: "Average a month", formato: "moneda" },
    { clave: "aPagar", etiqueta: "Balance still to pay", formato: "moneda", ocultarSiCero: true },
    { clave: "aFavor", etiqueta: "Paid in excess", formato: "moneda", ocultarSiCero: true },
  ],
});
