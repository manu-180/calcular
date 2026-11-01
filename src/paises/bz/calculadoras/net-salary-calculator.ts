import { aplicarEscala, definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { MESES_POR_ANIO, SEMANAS_POR_ANIO, semanalDesdeMensual } from "../lib/pago";

// Borrador: depende del impuesto a la renta, que no está verificado (ver income-tax-calculator).
export default definirCalculadora({
  id: "bz.net-salary-calculator",
  mercado: "bz",
  concepto: "sueldo-neto",
  slug: "net-salary-calculator",
  estado: "borrador",
  requiere: {
    "bz.ssb-employee-weekly": "escala",
    "bz.income-tax-exemption": "numero",
    "bz.income-tax-rate": "numero",
  },
  campos: [{ id: "bruto", tipo: "moneda", etiqueta: "Gross monthly pay", min: 0, porDefecto: 3000 }],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Enter your gross monthly pay.", "bruto");
    const ssb = redondear((aplicarEscala(v["bz.ssb-employee-weekly"], semanalDesdeMensual(e.bruto)) * SEMANAS_POR_ANIO) / MESES_POR_ANIO);
    const impuestoAnual = porcentaje(Math.max(0, e.bruto * MESES_POR_ANIO - v["bz.income-tax-exemption"]), v["bz.income-tax-rate"]);
    const impuesto = redondear(impuestoAnual / MESES_POR_ANIO);
    return { neto: redondear(e.bruto - ssb - impuesto), ssb, impuesto };
  },
  resultado: [
    { clave: "neto", etiqueta: "Net pay for the month", formato: "moneda", destacada: true },
    { clave: "impuesto", etiqueta: "Income tax", formato: "moneda" },
    { clave: "ssb", etiqueta: "Social Security", formato: "moneda" },
  ],
});
