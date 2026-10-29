import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { BASES_PAGO, semanalDesde } from "../lib/pago";

export default definirCalculadora({
  id: "bz.overtime-calculator",
  mercado: "bz",
  concepto: "horas-extra",
  slug: "overtime-calculator",
  estado: "publicado",
  requiere: {
    "bz.normal-week-hours": "numero",
    "bz.normal-day-hours": "numero",
    "bz.overtime-factor": "numero",
    "bz.overtime-double-factor": "numero",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Your normal pay", min: 0, porDefecto: 10 },
    { id: "base", tipo: "opcion", etiqueta: "Paid", opciones: BASES_PAGO, porDefecto: "hora" },
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "When you worked the extra hours",
      opciones: [
        { valor: "exceso", etiqueta: "Beyond the daily or weekly limit" },
        { valor: "descanso", etiqueta: "On a Sunday or agreed rest day" },
        { valor: "feriado", etiqueta: "On a public holiday" },
        { valor: "doble", etiqueta: "On Christmas Day, Good Friday or Easter Monday" },
      ],
      porDefecto: "exceso",
    },
    { id: "horas", tipo: "numero", etiqueta: "Hours worked at that rate", min: 0, porDefecto: 8 },
  ],
  calcular(e, v, { redondear }) {
    if (e.monto <= 0) throw new ErrorEntrada("Enter your normal pay.", "monto");
    const semana = v["bz.normal-week-hours"];
    // Sección 116(2): el sueldo semanal de una semana de 45 horas es la tarifa ordinaria.
    const ordinaria = redondear(semanalDesde(e.monto, e.base, semana) / semana);
    const factor = e.tipo === "doble" ? v["bz.overtime-double-factor"] : v["bz.overtime-factor"];
    const tarifa = redondear(ordinaria * factor);
    const total = redondear(tarifa * e.horas);
    return {
      total,
      tarifa,
      ordinaria,
      factor,
      extra: redondear(total - ordinaria * e.horas),
      observaciones: [
        "People in supervision, management or a confidential role are outside these overtime rules (section 119 of the Labour Act).",
        "Overtime must be worked at the employer's request.",
      ],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Pay for the hours", formato: "moneda", destacada: true },
    { clave: "tarifa", etiqueta: "Rate per hour", formato: "moneda" },
    { clave: "ordinaria", etiqueta: "Ordinary rate per hour", formato: "moneda" },
    { clave: "factor", etiqueta: "Multiple of the ordinary rate", formato: "numero", decimales: 1 },
    { clave: "extra", etiqueta: "Amount above ordinary pay", formato: "moneda" },
  ],
});
