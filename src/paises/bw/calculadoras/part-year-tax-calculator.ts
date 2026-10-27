import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { impuesto } from "../lib/impuestos";

export default definirCalculadora({
  id: "bw.part-year-tax-calculator",
  mercado: "bw",
  concepto: "propio",
  slug: "part-year-tax-calculator",
  estado: "publicado",
  requiere: {
    "bw.paye-resident": "escala",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salary a month", min: 0, porDefecto: 8000 },
    {
      id: "meses",
      tipo: "entero",
      etiqueta: "Months you are paid in this tax year (July to June)",
      min: 1,
      max: 12,
      porDefecto: 9,
      ayuda: "If you start in October, you are paid for 9 months up to June.",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("Enter a salary above zero.", "salario");
    if (entrada.meses < 1 || entrada.meses > 12) throw new ErrorEntrada("A tax year has between 1 and 12 months.", "meses");
    const total = entrada.salario * entrada.meses;
    const impuestoAnio = impuesto(v["bw.paye-resident"], total);
    const anualizado = impuesto(v["bw.paye-resident"], entrada.salario * 12) / 12;
    const paye = redondear(impuestoAnio / entrada.meses);
    return {
      paye,
      impuestoAnio: redondear(impuestoAnio),
      total: redondear(total),
      anualizado: redondear(anualizado),
      diferencia: redondear((anualizado - impuestoAnio / entrada.meses) * entrada.meses),
    };
  },
  resultado: [
    { clave: "paye", etiqueta: "PAYE a month", formato: "moneda", destacada: true },
    { clave: "impuestoAnio", etiqueta: "Tax for the months you work this year", formato: "moneda" },
    { clave: "total", etiqueta: "Pay for those months", formato: "moneda" },
    { clave: "anualizado", etiqueta: "PAYE a month on a full year", formato: "moneda" },
    { clave: "diferencia", etiqueta: "Tax you avoid paying by starting mid-year", formato: "moneda", ocultarSiCero: true },
  ],
});
