import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ag.overtime-calculator",
  mercado: "ag",
  concepto: "horas-extra",
  slug: "overtime-calculator",
  estado: "publicado",
  requiere: {
    "ag.overtime-factor": "numero",
    "ag.normal-day-hours": "numero",
    "ag.normal-week-hours": "numero",
  },
  campos: [
    { id: "tarifa", tipo: "moneda", etiqueta: "Basic wage per hour", min: 0, porDefecto: 20 },
    {
      id: "periodo",
      tipo: "opcion",
      etiqueta: "Hours you worked in",
      opciones: [
        { valor: "day", etiqueta: "One day" },
        { valor: "week", etiqueta: "One week" },
      ],
      porDefecto: "day",
    },
    { id: "horas", tipo: "numero", etiqueta: "Hours worked", min: 0, max: 168, porDefecto: 10 },
  ],
  calcular(e, v, { redondear }) {
    if (e.tarifa <= 0) throw new ErrorEntrada("Enter your basic wage per hour.", "tarifa");
    const limite = e.periodo === "day" ? v["ag.normal-day-hours"] : v["ag.normal-week-hours"];
    const maximo = e.periodo === "day" ? 24 : 168;
    if (e.horas > maximo) throw new ErrorEntrada(e.periodo === "day" ? "A day has 24 hours." : "A week has 168 hours.", "horas");
    const horasExtra = Math.max(0, e.horas - limite);
    const factor = v["ag.overtime-factor"];
    const pagoExtra = redondear(horasExtra * e.tarifa * factor);
    const pagoNormal = redondear(Math.min(e.horas, limite) * e.tarifa);
    return { horasExtra, factor, pagoExtra, pagoNormal, total: redondear(pagoNormal + pagoExtra), limite };
  },
  resultado: [
    { clave: "pagoExtra", etiqueta: "Overtime pay", formato: "moneda", destacada: true },
    { clave: "horasExtra", etiqueta: "Overtime hours", formato: "horas" },
    { clave: "limite", etiqueta: "Hours paid at the basic wage", formato: "horas" },
    { clave: "pagoNormal", etiqueta: "Pay for those hours", formato: "moneda" },
    { clave: "total", etiqueta: "Total pay for the period", formato: "moneda" },
    { clave: "factor", etiqueta: "Premium multiple", formato: "numero", decimales: 1 },
  ],
});
