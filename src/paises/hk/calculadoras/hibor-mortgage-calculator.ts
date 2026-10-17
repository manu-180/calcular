import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

function cuota(principal: number, tasaAnual: number, meses: number): number {
  const i = tasaAnual / 100 / 12;
  if (i === 0) return principal / meses;
  return (principal * i) / (1 - (1 + i) ** -meses);
}

export default definirCalculadora({
  id: "hk.hibor-mortgage-calculator",
  mercado: "hk",
  concepto: "propio",
  slug: "hibor-mortgage-calculator",
  estado: "publicado",
  requiere: {
    "hk.hibor-1m": "serie",
  },
  campos: [
    { id: "prestamo", tipo: "moneda", etiqueta: "Loan amount", min: 0, porDefecto: 4000000 },
    { id: "anios", tipo: "entero", etiqueta: "Loan term in years", min: 1, max: 40, porDefecto: 30 },
    { id: "margen", tipo: "porcentaje", etiqueta: "Margin over one-month HIBOR in your offer", min: 0, max: 10, porDefecto: 1.3 },
    {
      id: "tope",
      tipo: "porcentaje",
      etiqueta: "Cap rate in your offer (prime rate less the discount)",
      ayuda: "Leave it at 0 if your mortgage has no cap.",
      min: 0,
      max: 15,
      porDefecto: 3.5,
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.prestamo <= 0) throw new ErrorEntrada("Enter the loan amount.", "prestamo");
    const hibor = v["hk.hibor-1m"].valor;
    const sinTope = hibor + entrada.margen;
    const conTope = entrada.tope > 0 && entrada.tope < sinTope;
    const tasa = conTope ? entrada.tope : sinTope;
    const meses = entrada.anios * 12;
    const mensual = redondear(cuota(entrada.prestamo, tasa, meses));
    const total = redondear(mensual * meses);
    return {
      mensual,
      tasa,
      hibor,
      intereses: redondear(total - entrada.prestamo),
      total,
      observaciones: [
        conTope
          ? "HIBOR plus your margin is above the cap, so the cap rate applies."
          : entrada.tope > 0
            ? "HIBOR plus your margin is below the cap, so you pay the HIBOR-based rate."
            : "Without a cap, you pay HIBOR plus your margin.",
        "HIBOR changes every business day, so treat the payment as an estimate at the latest fixing.",
      ],
    };
  },
  resultado: [
    { clave: "mensual", etiqueta: "Monthly repayment", formato: "moneda", destacada: true },
    { clave: "tasa", etiqueta: "Mortgage rate used", formato: "porcentaje", decimales: 3 },
    { clave: "hibor", etiqueta: "One-month HIBOR fixing", formato: "porcentaje", decimales: 5 },
    { clave: "intereses", etiqueta: "Total interest over the term", formato: "moneda" },
    { clave: "total", etiqueta: "Total repaid", formato: "moneda" },
  ],
});
