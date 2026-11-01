import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ws.overtime-calculator",
  mercado: "ws",
  concepto: "horas-extra",
  slug: "overtime-calculator",
  estado: "publicado",
  requiere: {
    "ws.standard-week-hours": "numero",
    "ws.overtime-multiplier": "numero",
    "ws.public-holiday-multiplier": "numero",
  },
  campos: [
    { id: "pago", tipo: "moneda", etiqueta: "Your ordinary pay", min: 0, porDefecto: 20 },
    {
      id: "base",
      tipo: "opcion",
      etiqueta: "The pay above is",
      opciones: [
        { valor: "hora", etiqueta: "Per hour" },
        { valor: "mes", etiqueta: "Per month" },
      ],
      porDefecto: "hora",
    },
    { id: "horas", tipo: "numero", etiqueta: "Hours worked", min: 0, max: 400, porDefecto: 10 },
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "Type of work",
      opciones: [
        { valor: "extra", etiqueta: "Overtime the employer asked for" },
        { valor: "feriado", etiqueta: "Public holiday that is not an ordinary working day" },
      ],
      porDefecto: "extra",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.pago <= 0) throw new ErrorEntrada("Enter your ordinary pay.", "pago");
    const horaBase = e.base === "hora" ? e.pago : (e.pago * 12) / (52 * v["ws.standard-week-hours"]);
    const factor = e.tipo === "extra" ? v["ws.overtime-multiplier"] : v["ws.public-holiday-multiplier"];
    const tarifa = horaBase * factor;
    return {
      horaBase: redondear(horaBase),
      tarifa: redondear(tarifa),
      total: redondear(tarifa * e.horas),
      factor,
      observaciones: [
        "Overtime is work beyond 8 hours in a day or beyond the weekly limit that the employer asked for. An employee can ask for time off in lieu instead.",
        "A contract can exclude overtime for managerial staff on an annual salary that already allows for extra hours.",
      ],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Pay for these hours", formato: "moneda", destacada: true },
    { clave: "horaBase", etiqueta: "Your ordinary hourly pay", formato: "moneda" },
    { clave: "tarifa", etiqueta: "Hourly rate for this work", formato: "moneda" },
    { clave: "factor", etiqueta: "Multiplier", formato: "numero", decimales: 1 },
  ],
});
