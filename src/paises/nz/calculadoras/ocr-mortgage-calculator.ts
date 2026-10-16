import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

const PAGOS = { monthly: 12, fortnightly: 26, weekly: 52 } as const;

function cuota(prestamo: number, tasaAnual: number, porAnio: number, anios: number): number {
  const r = tasaAnual / 100 / porAnio;
  const n = anios * porAnio;
  if (r === 0) return prestamo / n;
  return (prestamo * r) / (1 - Math.pow(1 + r, -n));
}

export default definirCalculadora({
  id: "nz.ocr-mortgage-calculator",
  mercado: "nz",
  concepto: "propio",
  slug: "ocr-mortgage-calculator",
  estado: "publicado",
  requiere: {
    "nz.ocr": "serie",
  },
  campos: [
    { id: "saldo", tipo: "moneda", etiqueta: "Mortgage balance", min: 0, porDefecto: 500000 },
    { id: "tasa", tipo: "porcentaje", etiqueta: "Your current interest rate", min: 0, max: 30, porDefecto: 5 },
    { id: "anios", tipo: "entero", etiqueta: "Years left on the mortgage", min: 1, max: 40, porDefecto: 25 },
    {
      id: "frecuencia",
      tipo: "opcion",
      etiqueta: "How often you pay",
      opciones: [
        { valor: "monthly", etiqueta: "Monthly" },
        { valor: "fortnightly", etiqueta: "Fortnightly" },
        { valor: "weekly", etiqueta: "Weekly" },
      ],
      porDefecto: "monthly",
    },
    { id: "cambio", tipo: "numero", etiqueta: "OCR change to test (percentage points)", min: -5, max: 5, porDefecto: 0.25, ayuda: "0.25 is a rise of 25 basis points. Use a minus sign for a cut." },
    { id: "traspaso", tipo: "porcentaje", etiqueta: "How much of the change your bank passes on", min: 0, max: 200, porDefecto: 100 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.saldo <= 0) throw new ErrorEntrada("Enter your mortgage balance.", "saldo");
    const porAnio = PAGOS[entrada.frecuencia];
    const nuevaTasa = Math.max(0, entrada.tasa + (entrada.cambio * entrada.traspaso) / 100);
    const actual = redondear(cuota(entrada.saldo, entrada.tasa, porAnio, entrada.anios));
    const nuevo = redondear(cuota(entrada.saldo, nuevaTasa, porAnio, entrada.anios));
    return {
      nuevo,
      actual,
      diferencia: redondear(nuevo - actual),
      alAnio: redondear((nuevo - actual) * porAnio),
      nuevaTasa,
      ocr: v["nz.ocr"].valor,
      ocrDesde: v["nz.ocr"].fecha,
      observaciones: [
        "This assumes your interest rate moves with the OCR by the share you entered. Banks set their own rates, and a fixed rate doesn't change until its fixed term ends.",
      ],
    };
  },
  resultado: [
    { clave: "nuevo", etiqueta: "Repayment after the change", formato: "moneda", destacada: true },
    { clave: "actual", etiqueta: "Repayment today", formato: "moneda" },
    { clave: "diferencia", etiqueta: "Change each payment", formato: "moneda" },
    { clave: "alAnio", etiqueta: "Change over a year", formato: "moneda" },
    { clave: "nuevaTasa", etiqueta: "Interest rate after the change", formato: "porcentaje", decimales: 2 },
    { clave: "ocr", etiqueta: "Official Cash Rate today", formato: "porcentaje", decimales: 2 },
    { clave: "ocrDesde", etiqueta: "Last OCR decision", formato: "fecha" },
  ],
});
