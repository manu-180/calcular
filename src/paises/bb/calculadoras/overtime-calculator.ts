import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "bb.overtime-calculator",
  mercado: "bb",
  concepto: "horas-extra",
  slug: "overtime-calculator",
  estado: "publicado",
  requiere: {
    "bb.overtime-multiplier": "numero",
    "bb.public-holiday-multiplier": "numero",
    "bb.shop-weekly-hours": "numero",
    "bb.shop-daily-hours": "numero",
  },
  campos: [
    { id: "tarifa", tipo: "moneda", etiqueta: "Ordinary pay per hour", min: 0, porDefecto: 12 },
    { id: "horas", tipo: "numero", etiqueta: "Hours worked in the week (not on a public holiday)", min: 0, max: 100, porDefecto: 48 },
    { id: "feriado", tipo: "numero", etiqueta: "Hours worked on a public holiday", min: 0, max: 24, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.tarifa <= 0) throw new ErrorEntrada("Enter your ordinary hourly pay.", "tarifa");
    const semana = v["bb.shop-weekly-hours"];
    const normales = Math.min(e.horas, semana);
    const extras = Math.max(0, e.horas - semana);
    const pagoNormal = redondear(normales * e.tarifa);
    const tarifaExtra = redondear(e.tarifa * v["bb.overtime-multiplier"]);
    const pagoExtra = redondear(extras * e.tarifa * v["bb.overtime-multiplier"]);
    const pagoFeriado = redondear(e.feriado * e.tarifa * v["bb.public-holiday-multiplier"]);
    const observaciones: string[] = [];
    if (extras > 0) observaciones.push(`${extras} hour${extras === 1 ? "" : "s"} above the ${semana} hour week are paid as overtime.`);
    observaciones.push(`The Shops Act sets a ${v["bb.shop-daily-hours"]} hour day. This calculator works from the weekly total.`);
    return { pagoNormal, tarifaExtra, extras, pagoExtra, pagoFeriado, total: redondear(pagoNormal + pagoExtra + pagoFeriado), observaciones };
  },
  resultado: [
    { clave: "total", etiqueta: "Total pay for the week", formato: "moneda", destacada: true },
    { clave: "pagoNormal", etiqueta: "Ordinary hours", formato: "moneda" },
    { clave: "extras", etiqueta: "Overtime hours", formato: "numero", decimales: 1 },
    { clave: "tarifaExtra", etiqueta: "Overtime rate per hour", formato: "moneda" },
    { clave: "pagoExtra", etiqueta: "Overtime pay", formato: "moneda" },
    { clave: "pagoFeriado", etiqueta: "Public holiday pay", formato: "moneda" },
  ],
});
