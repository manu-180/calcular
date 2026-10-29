import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

// Borrador: no encontramos la orden de salario mínimo vigente en un sitio oficial.
export default definirCalculadora({
  id: "bw.minimum-wage",
  mercado: "bw",
  concepto: "salario-minimo",
  slug: "minimum-wage",
  estado: "borrador",
  requiere: {
    "bw.minimum-wage-hourly": "numero",
  },
  campos: [
    { id: "horas", tipo: "numero", etiqueta: "Hours you work a week", min: 1, max: 80, porDefecto: 45 },
    { id: "pago", tipo: "moneda", etiqueta: "What you are paid a month", min: 0, porDefecto: 0, requerido: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.horas <= 0) throw new ErrorEntrada("Enter your weekly hours.", "horas");
    const hora = v["bw.minimum-wage-hourly"];
    const semanal = redondear(hora * entrada.horas);
    const mensual = redondear((hora * entrada.horas * 52) / 12);
    const falta = entrada.pago === null || entrada.pago <= 0 ? null : redondear(Math.max(0, mensual - entrada.pago));
    return { mensual, semanal, hora, falta };
  },
  resultado: [
    { clave: "mensual", etiqueta: "Minimum pay a month", formato: "moneda", destacada: true },
    { clave: "semanal", etiqueta: "Minimum pay a week", formato: "moneda" },
    { clave: "hora", etiqueta: "Minimum wage an hour", formato: "moneda" },
    { clave: "falta", etiqueta: "Shortfall against the minimum", formato: "moneda" },
  ],
});
