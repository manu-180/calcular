import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { ESCALAS, impuestoRenta, OPCIONES_ESTADO, tasaMarginal } from "../lib/malta";

export default definirCalculadora({
  id: "mt.income-tax-calculator",
  mercado: "mt",
  concepto: "impuesto-renta",
  slug: "income-tax-calculator",
  estado: "publicado",
  requiere: ESCALAS,
  campos: [
    { id: "ingreso", tipo: "moneda", etiqueta: "Chargeable income for the year", min: 0, porDefecto: 30000 },
    { id: "estado", tipo: "opcion", etiqueta: "Tax rates that apply to you", opciones: OPCIONES_ESTADO, porDefecto: "single" },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.ingreso <= 0) throw new ErrorEntrada("Enter an income above zero.", "ingreso");
    const impuesto = redondear(impuestoRenta(entrada.estado, entrada.ingreso, v));
    const observaciones: string[] = [];
    if (entrada.estado.endsWith("child") || entrada.estado.endsWith("children")) {
      observaciones.push("These rates need the child to be 18 or under, or 23 or under in full-time education, and at least one parent to be an EU or EEA national or a long-term resident.");
    }
    return {
      impuesto,
      mensual: redondear(impuesto / 12),
      despues: redondear(entrada.ingreso - impuesto),
      efectiva: redondear((impuesto / entrada.ingreso) * 100),
      marginal: tasaMarginal(entrada.estado, entrada.ingreso, v),
      observaciones,
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Income tax for the year", formato: "moneda", destacada: true },
    { clave: "mensual", etiqueta: "Income tax a month", formato: "moneda" },
    { clave: "despues", etiqueta: "Income after tax", formato: "moneda" },
    { clave: "efectiva", etiqueta: "Average tax rate", formato: "porcentaje", decimales: 2 },
    { clave: "marginal", etiqueta: "Your top tax band", formato: "porcentaje", decimales: 0 },
  ],
});
