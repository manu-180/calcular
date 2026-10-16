import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { aporteMensual } from "../lib/mpf";

export default definirCalculadora({
  id: "hk.employer-cost-calculator",
  mercado: "hk",
  concepto: "costo-empleador",
  slug: "employer-cost-calculator",
  estado: "publicado",
  requiere: {
    "hk.mpf-rate": "numero",
    "hk.mpf-min-relevant-income": "numero",
    "hk.mpf-max-relevant-income": "numero",
  },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Monthly salary", min: 0, porDefecto: 25000 },
    { id: "meses", tipo: "numero", etiqueta: "Months of pay in the year", ayuda: "13 if the contract gives a double pay.", min: 12, max: 16, porDefecto: 13 },
    { id: "otros", tipo: "moneda", etiqueta: "Other yearly costs (insurance, benefits, training)", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.sueldo <= 0) throw new ErrorEntrada("Enter the monthly salary.", "sueldo");
    const reglas = { tasa: v["hk.mpf-rate"], minimo: v["hk.mpf-min-relevant-income"], maximo: v["hk.mpf-max-relevant-income"] };
    const mpfMes = redondear(aporteMensual(entrada.sueldo, reglas).empleador);
    const extra = Math.max(0, entrada.meses - 12) * entrada.sueldo;
    const mpfExtra = redondear(aporteMensual(entrada.sueldo + extra, reglas).empleador) - mpfMes;
    const sueldos = redondear(entrada.sueldo * entrada.meses);
    const mpfAnual = redondear(mpfMes * 12 + mpfExtra);
    const total = redondear(sueldos + mpfAnual + entrada.otros);
    return {
      total,
      sueldos,
      mpfAnual,
      mpfMes,
      otros: entrada.otros,
      mensual: redondear(total / 12),
      sobreSueldo: ((total - sueldos) / sueldos) * 100,
      observaciones: ["The extra months of pay are counted as paid in one month, where the MPF cap still applies."],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Total yearly cost", formato: "moneda", destacada: true },
    { clave: "mensual", etiqueta: "Average monthly cost", formato: "moneda" },
    { clave: "sueldos", etiqueta: "Salary for the year", formato: "moneda" },
    { clave: "mpfAnual", etiqueta: "Employer's MPF for the year", formato: "moneda" },
    { clave: "mpfMes", etiqueta: "Employer's MPF in a normal month", formato: "moneda" },
    { clave: "otros", etiqueta: "Other costs", formato: "moneda", ocultarSiCero: true },
    { clave: "sobreSueldo", etiqueta: "Cost on top of salary", formato: "porcentaje", decimales: 1 },
  ],
});
