import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

function cuota(prestamo: number, tasaAnual: number, meses: number): number {
  const r = tasaAnual / 100 / 12;
  if (r === 0) return prestamo / meses;
  return (prestamo * r) / (1 - Math.pow(1 + r, -meses));
}

export default definirCalculadora({
  id: "gb.tracker-mortgage",
  mercado: "gb",
  concepto: "propio",
  slug: "tracker-mortgage",
  estado: "publicado",
  requiere: {
    "gb.bank-rate": "serie",
  },
  campos: [
    { id: "prestamo", tipo: "moneda", etiqueta: "Amount you borrow", min: 0, porDefecto: 200000 },
    { id: "anios", tipo: "entero", etiqueta: "Mortgage term in years", min: 1, max: 40, porDefecto: 25 },
    { id: "margen", tipo: "porcentaje", etiqueta: "Margin above Bank Rate", min: -5, max: 10, porDefecto: 1 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.prestamo <= 0) throw new ErrorEntrada("Enter the amount you want to borrow.", "prestamo");
    const bankRate = v["gb.bank-rate"].valor;
    const tasa = Math.max(0, bankRate + entrada.margen);
    const meses = entrada.anios * 12;
    const pago = cuota(entrada.prestamo, tasa, meses);
    const pagoSube = cuota(entrada.prestamo, tasa + 0.25, meses);
    const pagoBaja = cuota(entrada.prestamo, Math.max(0, tasa - 0.25), meses);
    return {
      pago: redondear(pago),
      tasa,
      bankRate,
      intereses: redondear(pago * meses - entrada.prestamo),
      total: redondear(pago * meses),
      siSube: redondear(pagoSube - pago),
      siBaja: redondear(pago - pagoBaja),
      observaciones: [
        "A tracker rate moves with Bank Rate, usually from the month after each change. Most trackers have a fixed margin for an initial period, then switch to the lender's standard variable rate.",
      ],
    };
  },
  resultado: [
    { clave: "pago", etiqueta: "Monthly repayment", formato: "moneda", destacada: true },
    { clave: "tasa", etiqueta: "Your interest rate today", formato: "porcentaje", decimales: 2 },
    { clave: "bankRate", etiqueta: "Bank Rate today", formato: "porcentaje", decimales: 2 },
    { clave: "siSube", etiqueta: "Extra a month if Bank Rate rises 0.25 points", formato: "moneda" },
    { clave: "siBaja", etiqueta: "Saving a month if Bank Rate falls 0.25 points", formato: "moneda" },
    { clave: "intereses", etiqueta: "Total interest if rates stay the same", formato: "moneda" },
    { clave: "total", etiqueta: "Total repaid", formato: "moneda" },
  ],
});
