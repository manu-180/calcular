import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "jm.overtime-calculator",
  mercado: "jm",
  concepto: "horas-extra",
  slug: "overtime-calculator",
  estado: "publicado",
  requiere: {
    "jm.normal-week-hours": "numero",
    "jm.overtime-multiplier": "numero",
    "jm.double-time-multiplier": "numero",
    "jm.minimum-wage-hourly": "numero",
  },
  campos: [
    { id: "tarifa", tipo: "moneda", etiqueta: "Your normal pay per hour", min: 0, porDefecto: 600 },
    { id: "horas", tipo: "numero", etiqueta: "Hours worked on normal days this week", min: 0, max: 168, porDefecto: 45 },
    { id: "horasDobles", tipo: "numero", etiqueta: "Hours worked on your rest day or a public holiday", min: 0, max: 48, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.tarifa <= 0) throw new ErrorEntrada("Enter your normal pay per hour.", "tarifa");
    if (e.horas + e.horasDobles <= 0) throw new ErrorEntrada("Enter the hours you worked.", "horas");
    const normales = Math.min(e.horas, v["jm.normal-week-hours"]);
    const extra = Math.max(0, e.horas - v["jm.normal-week-hours"]);
    const pagoNormal = redondear(normales * e.tarifa);
    const tarifaExtra = redondear(e.tarifa * v["jm.overtime-multiplier"]);
    const tarifaDoble = redondear(e.tarifa * v["jm.double-time-multiplier"]);
    const pagoExtra = redondear(extra * tarifaExtra);
    const pagoDoble = redondear(e.horasDobles * tarifaDoble);
    const observaciones: string[] = [];
    if (e.tarifa < v["jm.minimum-wage-hourly"]) observaciones.push("Your hourly pay is below the national minimum wage.");
    return {
      total: redondear(pagoNormal + pagoExtra + pagoDoble),
      pagoNormal,
      horasExtra: extra,
      tarifaExtra,
      pagoExtra,
      tarifaDoble,
      pagoDoble,
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Pay for the week", formato: "moneda", destacada: true },
    { clave: "pagoNormal", etiqueta: "Pay for normal hours", formato: "moneda" },
    { clave: "horasExtra", etiqueta: "Overtime hours (above 40)", formato: "horas" },
    { clave: "tarifaExtra", etiqueta: "Overtime rate per hour", formato: "moneda" },
    { clave: "pagoExtra", etiqueta: "Overtime pay", formato: "moneda" },
    { clave: "tarifaDoble", etiqueta: "Double time rate per hour", formato: "moneda" },
    { clave: "pagoDoble", etiqueta: "Rest day and public holiday pay", formato: "moneda", ocultarSiCero: true },
  ],
});
