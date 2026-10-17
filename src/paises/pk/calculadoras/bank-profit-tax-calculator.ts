import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "pk.bank-profit-tax-calculator",
  mercado: "pk",
  concepto: "propio",
  slug: "bank-profit-tax-calculator",
  estado: "publicado",
  requiere: {
    "pk.profit-on-debt-bank": "numero",
  },
  campos: [
    { id: "deposito", tipo: "moneda", etiqueta: "Amount in the account or deposit", min: 0, porDefecto: 1000000 },
    { id: "tasa", tipo: "porcentaje", etiqueta: "Profit rate a year", min: 0, max: 40, porDefecto: 10 },
    { id: "meses", tipo: "entero", etiqueta: "Months", min: 1, max: 120, porDefecto: 12 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.deposito <= 0) throw new ErrorEntrada("Enter the amount deposited.", "deposito");
    const bruto = (entrada.deposito * entrada.tasa * entrada.meses) / 1200;
    const impuesto = porcentaje(bruto, v["pk.profit-on-debt-bank"]);
    return { bruto: redondear(bruto), impuesto: redondear(impuesto), neto: redondear(bruto - impuesto), netaAnual: entrada.tasa * (1 - v["pk.profit-on-debt-bank"] / 100) };
  },
  resultado: [
    { clave: "neto", etiqueta: "Profit after tax", formato: "moneda", destacada: true },
    { clave: "bruto", etiqueta: "Profit before tax", formato: "moneda" },
    { clave: "impuesto", etiqueta: "Tax deducted by the bank", formato: "moneda" },
    { clave: "netaAnual", etiqueta: "Rate after tax", formato: "porcentaje", decimales: 2 },
  ],
});
