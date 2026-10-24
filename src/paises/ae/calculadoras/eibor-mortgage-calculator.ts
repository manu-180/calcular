import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

function cuota(principal: number, tasaAnual: number, meses: number): number {
  const i = tasaAnual / 100 / 12;
  if (i === 0) return principal / meses;
  return (principal * i) / (1 - (1 + i) ** -meses);
}

export default definirCalculadora({
  id: "ae.eibor-mortgage-calculator",
  mercado: "ae",
  concepto: "propio",
  slug: "eibor-mortgage-calculator",
  estado: "borrador",
  requiere: {
    "ae.eibor-3m": "serie",
  },
  campos: [
    { id: "prestamo", tipo: "moneda", etiqueta: "Loan amount", min: 0, porDefecto: 1500000 },
    { id: "anios", tipo: "entero", etiqueta: "Loan term in years", min: 1, max: 30, porDefecto: 25 },
    { id: "margen", tipo: "porcentaje", etiqueta: "Margin over 3-month EIBOR in your offer", min: 0, max: 10, porDefecto: 1.5 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.prestamo <= 0) throw new ErrorEntrada("Enter the loan amount.", "prestamo");
    const eibor = v["ae.eibor-3m"].valor;
    const tasa = eibor + entrada.margen;
    const meses = entrada.anios * 12;
    const mensual = redondear(cuota(entrada.prestamo, tasa, meses));
    const total = redondear(mensual * meses);
    return {
      mensual,
      tasa,
      eibor,
      intereses: redondear(total - entrada.prestamo),
      total,
      observaciones: ["EIBOR changes every business day, so treat the payment as an estimate at the latest fixing. Check how often your bank resets the rate."],
    };
  },
  resultado: [
    { clave: "mensual", etiqueta: "Monthly repayment", formato: "moneda", destacada: true },
    { clave: "tasa", etiqueta: "Mortgage rate used", formato: "porcentaje", decimales: 3 },
    { clave: "eibor", etiqueta: "3-month EIBOR fixing", formato: "porcentaje", decimales: 5 },
    { clave: "intereses", etiqueta: "Total interest over the term", formato: "moneda" },
    { clave: "total", etiqueta: "Total repaid", formato: "moneda" },
  ],
});
