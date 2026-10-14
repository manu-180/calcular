import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "us.overtime",
  mercado: "us",
  concepto: "horas-extra",
  slug: "overtime",
  estado: "publicado",
  requiere: {
    "us.overtime-hours": "numero",
    "us.overtime-multiplier": "numero",
  },
  campos: [
    { id: "tarifa", tipo: "moneda", etiqueta: "Regular hourly rate", min: 0, porDefecto: 20 },
    { id: "horas", tipo: "numero", etiqueta: "Hours worked in the week", min: 0, max: 168, porDefecto: 45 },
  ],
  calcular(entrada, valores, { redondear }) {
    const limite = valores["us.overtime-hours"];
    const factor = valores["us.overtime-multiplier"];
    const regulares = Math.min(entrada.horas, limite);
    const extra = Math.max(0, entrada.horas - limite);
    const tarifaExtra = redondear(entrada.tarifa * factor);
    const pagoRegular = redondear(regulares * entrada.tarifa);
    const pagoExtra = redondear(extra * entrada.tarifa * factor);
    return {
      regulares,
      extra,
      tarifaExtra,
      pagoRegular,
      pagoExtra,
      total: redondear(pagoRegular + pagoExtra),
      prima: redondear(extra * entrada.tarifa * (factor - 1)),
      observaciones: [
        "This is the federal rule. Some states pay overtime after 8 hours in a day (California, Alaska and Nevada, for example) or double time.",
        "Salaried workers in executive, administrative or professional roles can be exempt from overtime.",
      ],
    };
  },
  resultado: [
    { clave: "regulares", etiqueta: "Regular hours", formato: "horas" },
    { clave: "extra", etiqueta: "Overtime hours", formato: "horas" },
    { clave: "tarifaExtra", etiqueta: "Overtime rate per hour", formato: "moneda" },
    { clave: "pagoRegular", etiqueta: "Regular pay", formato: "moneda" },
    { clave: "pagoExtra", etiqueta: "Overtime pay", formato: "moneda" },
    { clave: "total", etiqueta: "Total pay for the week", formato: "moneda", destacada: true },
    { clave: "prima", etiqueta: "Overtime premium (the extra half)", formato: "moneda", ayuda: "This is the part you may deduct under the no tax on overtime rule." },
  ],
});
