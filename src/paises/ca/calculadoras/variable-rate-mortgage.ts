import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

function cuota(prestamo: number, tasaAnual: number, meses: number): number {
  const r = tasaAnual / 100 / 12;
  if (r === 0) return prestamo / meses;
  return (prestamo * r) / (1 - Math.pow(1 + r, -meses));
}

export default definirCalculadora({
  id: "ca.variable-rate-mortgage",
  mercado: "ca",
  concepto: "propio",
  slug: "variable-rate-mortgage",
  estado: "publicado",
  requiere: {
    "ca.prime-rate": "serie",
    "ca.policy-rate": "serie",
  },
  campos: [
    { id: "prestamo", tipo: "moneda", etiqueta: "Mortgage amount", min: 0, porDefecto: 500000 },
    { id: "anios", tipo: "entero", etiqueta: "Amortization in years", min: 1, max: 30, porDefecto: 25 },
    { id: "margen", tipo: "porcentaje", etiqueta: "Your rate compared with prime (for example -0.5 for prime minus 0.5)", min: -5, max: 10, porDefecto: -0.5 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.prestamo <= 0) throw new ErrorEntrada("Enter the amount you borrow.", "prestamo");
    const prime = v["ca.prime-rate"].valor;
    const politica = v["ca.policy-rate"].valor;
    const tasa = Math.max(0, prime + entrada.margen);
    const meses = entrada.anios * 12;
    const pago = cuota(entrada.prestamo, tasa, meses);
    return {
      pago: redondear(pago),
      tasa,
      prime,
      politica,
      siSube: redondear(cuota(entrada.prestamo, tasa + 0.25, meses) - pago),
      siBaja: redondear(pago - cuota(entrada.prestamo, Math.max(0, tasa - 0.25), meses)),
      intereses: redondear(pago * meses - entrada.prestamo),
      observaciones: ["This uses the prime rate from the Bank of Canada weekly series. Your lender's prime and payment rules can differ, so check your mortgage agreement."],
    };
  },
  resultado: [
    { clave: "pago", etiqueta: "Monthly payment at today's prime", formato: "moneda", destacada: true },
    { clave: "tasa", etiqueta: "Your interest rate today", formato: "porcentaje", decimales: 2 },
    { clave: "prime", etiqueta: "Prime rate (Bank of Canada series)", formato: "porcentaje", decimales: 2 },
    { clave: "politica", etiqueta: "Bank of Canada policy rate", formato: "porcentaje", decimales: 2 },
    { clave: "siSube", etiqueta: "Extra a month if rates rise 0.25 points", formato: "moneda" },
    { clave: "siBaja", etiqueta: "Saving a month if rates fall 0.25 points", formato: "moneda" },
    { clave: "intereses", etiqueta: "Total interest if rates stay the same", formato: "moneda" },
  ],
});
