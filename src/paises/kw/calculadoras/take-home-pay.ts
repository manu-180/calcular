import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { aportesPifss, REQUIERE_PIFSS } from "../lib/pifss";

export default definirCalculadora({
  id: "kw.take-home-pay",
  mercado: "kw",
  concepto: "sueldo-neto",
  slug: "take-home-pay",
  estado: "publicado",
  requiere: REQUIERE_PIFSS,
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Gross monthly salary", min: 0, porDefecto: 1200 },
    { id: "kuwaiti", tipo: "si-no", etiqueta: "You are a Kuwaiti national insured with PIFSS", porDefecto: true },
    { id: "anios", tipo: "numero", etiqueta: "Years you have already contributed", min: 0, max: 60, porDefecto: 5 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.sueldo <= 0) throw new ErrorEntrada("Enter your gross monthly salary.", "sueldo");
    const pifss = entrada.kuwaiti ? aportesPifss(v, entrada.sueldo, entrada.anios, redondear).empleado : 0;
    const neto = redondear(entrada.sueldo - pifss);
    return {
      neto,
      pifss,
      anual: redondear(neto * 12),
      observaciones: entrada.kuwaiti ? ([] as string[]) : ["The PIFSS contributions in this calculator apply to Kuwaiti nationals. Other deductions in your contract are not included."],
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "Take-home pay a month", formato: "moneda", destacada: true },
    { clave: "pifss", etiqueta: "PIFSS contributions", formato: "moneda" },
    { clave: "anual", etiqueta: "Take-home pay a year", formato: "moneda" },
  ],
});
