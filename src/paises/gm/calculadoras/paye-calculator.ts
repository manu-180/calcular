import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { payeAnual, tasaMarginal } from "../lib/impuestos";

export default definirCalculadora({
  id: "gm.paye-calculator",
  mercado: "gm",
  concepto: "impuesto-renta",
  slug: "paye-calculator",
  estado: "publicado",
  requiere: {
    "gm.paye-bands": "escala",
  },
  campos: [
    { id: "ingreso", tipo: "moneda", etiqueta: "Employment income", min: 0, porDefecto: 15000, ayuda: "Salary plus allowances, bonuses, overtime and any other cash pay from your job." },
    {
      id: "periodo",
      tipo: "opcion",
      etiqueta: "This amount is",
      opciones: [
        { valor: "mes", etiqueta: "A month" },
        { valor: "anio", etiqueta: "A year" },
      ],
      porDefecto: "mes",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.ingreso <= 0) throw new ErrorEntrada("Enter your employment income.", "ingreso");
    const anual = entrada.periodo === "mes" ? entrada.ingreso * 12 : entrada.ingreso;
    const impuestoAnual = payeAnual(v["gm.paye-bands"], anual);
    return {
      mensual: redondear(impuestoAnual / 12),
      anual: redondear(impuestoAnual),
      netoMensual: redondear((anual - impuestoAnual) / 12),
      efectiva: anual > 0 ? (impuestoAnual / anual) * 100 : 0,
      marginal: tasaMarginal(v["gm.paye-bands"], anual),
    };
  },
  resultado: [
    { clave: "mensual", etiqueta: "PAYE a month", formato: "moneda", destacada: true },
    { clave: "anual", etiqueta: "PAYE a year", formato: "moneda" },
    { clave: "netoMensual", etiqueta: "Income after PAYE a month", formato: "moneda" },
    { clave: "efectiva", etiqueta: "Share of your income paid in PAYE", formato: "porcentaje", decimales: 1 },
    { clave: "marginal", etiqueta: "Your top band rate", formato: "porcentaje", decimales: 0 },
  ],
});
