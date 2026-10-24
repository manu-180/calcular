import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

function cuota(prestamo: number, tasaAnual: number, meses: number): number {
  const r = tasaAnual / 100 / 12;
  if (r === 0) return prestamo / meses;
  return (prestamo * r) / (1 - Math.pow(1 + r, -meses));
}

export default definirCalculadora({
  id: "kw.discount-rate-calculator",
  mercado: "kw",
  concepto: "propio",
  slug: "discount-rate-calculator",
  estado: "publicado",
  requiere: {
    "kw.discount-rate": "serie",
  },
  campos: [
    { id: "saldo", tipo: "moneda", etiqueta: "Loan balance", min: 0, porDefecto: 15000 },
    { id: "tasa", tipo: "porcentaje", etiqueta: "Your current interest rate", min: 0, max: 30, porDefecto: 5.5 },
    { id: "meses", tipo: "entero", etiqueta: "Months left on the loan", min: 1, max: 480, porDefecto: 60 },
    { id: "cambio", tipo: "numero", etiqueta: "Change in the CBK discount rate to test (percentage points)", min: -3, max: 3, porDefecto: -0.25, ayuda: "-0.25 is a cut of 25 basis points. Use a positive number for a rise." },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.saldo <= 0) throw new ErrorEntrada("Enter your loan balance.", "saldo");
    const nuevaTasa = Math.max(0, entrada.tasa + entrada.cambio);
    const actual = redondear(cuota(entrada.saldo, entrada.tasa, entrada.meses));
    const nueva = redondear(cuota(entrada.saldo, nuevaTasa, entrada.meses));
    const dr = v["kw.discount-rate"];
    return {
      diferencia: redondear(nueva - actual),
      actual,
      nueva,
      nuevaTasa,
      total: redondear((nueva - actual) * entrada.meses),
      descuento: dr.valor,
      descuentoNuevo: Math.max(0, dr.valor + entrada.cambio),
      observaciones: ["Assumes your bank passes the whole change in the discount rate on to your loan rate. Fixed-rate loans do not change."],
    };
  },
  resultado: [
    { clave: "diferencia", etiqueta: "Change in your monthly instalment", formato: "moneda", destacada: true },
    { clave: "actual", etiqueta: "Instalment now", formato: "moneda" },
    { clave: "nueva", etiqueta: "Instalment after the change", formato: "moneda" },
    { clave: "nuevaTasa", etiqueta: "Your new interest rate", formato: "porcentaje", decimales: 2 },
    { clave: "total", etiqueta: "Change over the rest of the loan", formato: "moneda" },
    { clave: "descuento", etiqueta: "Current CBK discount rate", formato: "porcentaje", decimales: 2 },
    { clave: "descuentoNuevo", etiqueta: "Discount rate after the change", formato: "porcentaje", decimales: 2 },
  ],
});
