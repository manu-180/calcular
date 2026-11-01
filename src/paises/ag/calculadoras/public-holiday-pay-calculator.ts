import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ag.public-holiday-pay-calculator",
  mercado: "ag",
  concepto: "propio",
  slug: "public-holiday-pay-calculator",
  estado: "publicado",
  requiere: {
    "ag.public-holiday-factor": "numero",
    "ag.normal-day-hours": "numero",
  },
  campos: [
    { id: "tarifa", tipo: "moneda", etiqueta: "Basic wage per hour", min: 0, porDefecto: 20 },
    { id: "horasNormales", tipo: "numero", etiqueta: "Hours in your normal working day", min: 1, max: 12, porDefecto: 8 },
    { id: "horasTrabajadas", tipo: "numero", etiqueta: "Hours you worked on the public holiday", min: 0, max: 24, porDefecto: 8 },
  ],
  calcular(e, v, { redondear }) {
    if (e.tarifa <= 0) throw new ErrorEntrada("Enter your basic wage per hour.", "tarifa");
    const factor = v["ag.public-holiday-factor"];
    const pagoFeriado = redondear(e.horasNormales * e.tarifa);
    const pagoTrabajado = redondear(e.horasTrabajadas * e.tarifa * factor);
    const observaciones: string[] = [];
    if (e.horasTrabajadas > v["ag.normal-day-hours"]) observaciones.push("Hours above 8 in the day may also earn overtime premium pay. Use the overtime calculator for those hours.");
    return { pagoFeriado, pagoTrabajado, total: redondear(pagoFeriado + pagoTrabajado), factor };
  },
  resultado: [
    { clave: "total", etiqueta: "Total pay for the holiday", formato: "moneda", destacada: true },
    { clave: "pagoFeriado", etiqueta: "Holiday wage for the day", formato: "moneda" },
    { clave: "pagoTrabajado", etiqueta: "Extra pay for hours worked", formato: "moneda" },
    { clave: "factor", etiqueta: "Multiple for hours worked", formato: "numero", decimales: 1 },
  ],
});
