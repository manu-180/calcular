import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { aportesPifss, REQUIERE_PIFSS } from "../lib/pifss";

export default definirCalculadora({
  id: "kw.employer-cost",
  mercado: "kw",
  concepto: "costo-empleador",
  slug: "employer-cost",
  estado: "publicado",
  requiere: REQUIERE_PIFSS,
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Monthly salary", min: 0, porDefecto: 1200 },
    { id: "kuwaiti", tipo: "si-no", etiqueta: "Kuwaiti employee insured with PIFSS", porDefecto: true },
    { id: "otros", tipo: "moneda", etiqueta: "Other monthly costs (allowances, insurance, visa, housing)", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.sueldo <= 0) throw new ErrorEntrada("Enter the monthly salary.", "sueldo");
    const pifss = entrada.kuwaiti ? aportesPifss(v, entrada.sueldo, 0, redondear).empleador : 0;
    const mensual = redondear(entrada.sueldo + pifss + entrada.otros);
    return {
      mensual,
      anual: redondear(mensual * 12),
      pifss,
      porcentaje: ((mensual - entrada.sueldo) / entrada.sueldo) * 100,
    };
  },
  resultado: [
    { clave: "mensual", etiqueta: "Cost to the employer a month", formato: "moneda", destacada: true },
    { clave: "anual", etiqueta: "Cost a year", formato: "moneda" },
    { clave: "pifss", etiqueta: "Employer PIFSS contribution", formato: "moneda" },
    { clave: "porcentaje", etiqueta: "On top of the salary", formato: "porcentaje", decimales: 1 },
  ],
});
