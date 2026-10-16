import { aplicarEscala, definirCalculadora, ErrorEntrada } from "@/motor/calculo";

function cuota(prestamo: number, tasaAnual: number, meses: number): number {
  const r = tasaAnual / 100 / 12;
  if (r === 0) return prestamo / meses;
  return (prestamo * r) / (1 - Math.pow(1 + r, -meses));
}

export default definirCalculadora({
  id: "za.bond-calculator",
  mercado: "za",
  concepto: "hipoteca",
  slug: "bond-calculator",
  estado: "publicado",
  requiere: {
    "za.prime-rate": "serie",
    "za.transfer-duty": "escala",
  },
  campos: [
    { id: "precio", tipo: "moneda", etiqueta: "Purchase price", min: 0, porDefecto: 1800000 },
    { id: "deposito", tipo: "moneda", etiqueta: "Deposit", min: 0, porDefecto: 180000 },
    { id: "anios", tipo: "entero", etiqueta: "Bond term in years", min: 1, max: 30, porDefecto: 20 },
    { id: "margen", tipo: "porcentaje", etiqueta: "Your rate compared with prime (for example -0.5 or 1)", min: -5, max: 10, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.precio <= 0) throw new ErrorEntrada("Enter the purchase price.", "precio");
    if (entrada.deposito >= entrada.precio) throw new ErrorEntrada("The deposit has to be less than the price.", "deposito");
    const prime = v["za.prime-rate"].valor;
    const tasa = Math.max(0, prime + entrada.margen);
    const prestado = redondear(entrada.precio - entrada.deposito);
    const meses = entrada.anios * 12;
    const pago = cuota(prestado, tasa, meses);
    return {
      pago: redondear(pago),
      tasa,
      prime,
      prestado,
      intereses: redondear(pago * meses - prestado),
      total: redondear(pago * meses),
      siSube: redondear(cuota(prestado, tasa + 0.25, meses) - pago),
      derecho: redondear(aplicarEscala(v["za.transfer-duty"], entrada.precio)),
      observaciones: ["If your bond is linked to prime, your repayment changes every time prime changes."],
    };
  },
  resultado: [
    { clave: "pago", etiqueta: "Monthly bond repayment", formato: "moneda", destacada: true },
    { clave: "tasa", etiqueta: "Your interest rate", formato: "porcentaje", decimales: 2 },
    { clave: "prime", etiqueta: "Prime lending rate today", formato: "porcentaje", decimales: 2 },
    { clave: "prestado", etiqueta: "Bond amount", formato: "moneda" },
    { clave: "siSube", etiqueta: "Extra a month if prime rises 0.25 points", formato: "moneda" },
    { clave: "intereses", etiqueta: "Total interest if the rate stays the same", formato: "moneda" },
    { clave: "total", etiqueta: "Total repaid", formato: "moneda" },
    { clave: "derecho", etiqueta: "Transfer duty on the price", formato: "moneda" },
  ],
});
