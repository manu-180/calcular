import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "fj.overtime-calculator",
  mercado: "fj",
  concepto: "horas-extra",
  slug: "overtime-calculator",
  estado: "borrador",
  requiere: { "fj.overtime-factor": "numero" },
  campos: [
    { id: "tarifa", tipo: "moneda", etiqueta: "Your normal hourly rate", min: 0, porDefecto: 8 },
    { id: "horas", tipo: "numero", etiqueta: "Overtime hours", min: 0, porDefecto: 5 },
  ],
  calcular(e, v, { redondear }) {
    if (e.tarifa <= 0) throw new ErrorEntrada("Enter your normal hourly rate.", "tarifa");
    const tarifaExtra = redondear(e.tarifa * v["fj.overtime-factor"]);
    return { tarifaExtra, pago: redondear(tarifaExtra * e.horas) };
  },
  resultado: [
    { clave: "tarifaExtra", etiqueta: "Overtime rate per hour", formato: "moneda" },
    { clave: "pago", etiqueta: "Overtime pay", formato: "moneda", destacada: true },
  ],
});
