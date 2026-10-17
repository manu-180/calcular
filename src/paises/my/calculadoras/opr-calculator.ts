import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

function cuota(prestamo: number, tasaAnual: number, anios: number): number {
  const r = tasaAnual / 100 / 12;
  const n = anios * 12;
  if (r === 0) return prestamo / n;
  return (prestamo * r) / (1 - Math.pow(1 + r, -n));
}

export default definirCalculadora({
  id: "my.opr-calculator",
  mercado: "my",
  concepto: "propio",
  slug: "opr-calculator",
  estado: "publicado",
  requiere: {
    "my.opr": "serie",
  },
  campos: [
    { id: "saldo", tipo: "moneda", etiqueta: "Home loan balance", min: 0, porDefecto: 400000 },
    { id: "tasa", tipo: "porcentaje", etiqueta: "Your current interest rate", min: 0, max: 30, porDefecto: 4 },
    { id: "anios", tipo: "entero", etiqueta: "Years left on the loan", min: 1, max: 40, porDefecto: 30 },
    { id: "cambio", tipo: "numero", etiqueta: "OPR change to test (percentage points)", min: -3, max: 3, porDefecto: -0.25, ayuda: "-0.25 is a cut of 25 basis points. Use a positive number for a rise." },
    { id: "traspaso", tipo: "porcentaje", etiqueta: "How much of the change your bank passes on", min: 0, max: 200, porDefecto: 100 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.saldo <= 0) throw new ErrorEntrada("Enter your loan balance.", "saldo");
    if (entrada.anios <= 0) throw new ErrorEntrada("Enter the years left on the loan.", "anios");
    const nuevaTasa = Math.max(0, entrada.tasa + (entrada.cambio * entrada.traspaso) / 100);
    const actual = redondear(cuota(entrada.saldo, entrada.tasa, entrada.anios));
    const nueva = redondear(cuota(entrada.saldo, nuevaTasa, entrada.anios));
    const opr = v["my.opr"];
    return {
      diferencia: redondear(nueva - actual),
      actual,
      nueva,
      nuevaTasa,
      anual: redondear((nueva - actual) * 12),
      opr: opr.valor,
      oprNueva: Math.max(0, opr.valor + entrada.cambio),
    };
  },
  resultado: [
    { clave: "diferencia", etiqueta: "Change in your monthly instalment", formato: "moneda", destacada: true },
    { clave: "actual", etiqueta: "Instalment now", formato: "moneda" },
    { clave: "nueva", etiqueta: "Instalment after the change", formato: "moneda" },
    { clave: "nuevaTasa", etiqueta: "Your new interest rate", formato: "porcentaje", decimales: 2 },
    { clave: "anual", etiqueta: "Change over a year", formato: "moneda" },
    { clave: "opr", etiqueta: "Current OPR", formato: "porcentaje", decimales: 2 },
    { clave: "oprNueva", etiqueta: "OPR after the change", formato: "porcentaje", decimales: 2 },
  ],
});
