import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { dolares, leerHelp, repagoHelp } from "../lib/impuestos";

export default definirCalculadora({
  id: "au.hecs-help-repayment-calculator",
  mercado: "au",
  concepto: "propio",
  slug: "hecs-help-repayment-calculator",
  estado: "publicado",
  requiere: {
    "au.help-2026-27": "mapa",
    "au.help-2025-26": "mapa",
    "au.help-tasas": "mapa",
  },
  campos: [
    {
      id: "ingreso",
      tipo: "moneda",
      etiqueta: "Repayment income for the year",
      ayuda: "Taxable income plus reportable fringe benefits, net investment losses, reportable super contributions and exempt foreign employment income.",
      min: 0,
      porDefecto: 85000,
    },
    {
      id: "anio",
      tipo: "opcion",
      etiqueta: "Income year",
      opciones: [
        { valor: "2026-27", etiqueta: "2026-27" },
        { valor: "2025-26", etiqueta: "2025-26" },
      ],
      porDefecto: "2026-27",
    },
    { id: "deuda", tipo: "moneda", etiqueta: "What you still owe (optional)", min: 0, requerido: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.ingreso < 0) throw new ErrorEntrada("Enter an income of zero or more.", "ingreso");
    const h = leerHelp(entrada.anio === "2025-26" ? v["au.help-2025-26"] : v["au.help-2026-27"], v["au.help-tasas"]);
    let repago = redondear(repagoHelp(entrada.ingreso, h));
    const observaciones: string[] = [];
    if (entrada.deuda !== null && repago > entrada.deuda) {
      repago = redondear(entrada.deuda);
      observaciones.push("Your compulsory repayment is capped at what you still owe.");
    }
    const tramo =
      entrada.ingreso <= h.umbral
        ? `No compulsory repayment: your income is ${dolares(h.umbral)} or less.`
        : entrada.ingreso <= h.tramo2
          ? `${h.tasa1}c for each dollar over ${dolares(h.umbral)}.`
          : entrada.ingreso <= h.tope
            ? `${dolares(h.cuota2)} plus ${h.tasa2}c for each dollar over ${dolares(h.tramo2)}.`
            : `${h.tasaTotal}% of your total repayment income.`;
    return {
      repago,
      porSemana: redondear(repago / 52),
      tramo,
      restante: entrada.deuda === null ? null : redondear(Math.max(0, entrada.deuda - repago)),
      observaciones,
    };
  },
  resultado: [
    { clave: "repago", etiqueta: "Compulsory repayment for the year", formato: "moneda", destacada: true },
    { clave: "porSemana", etiqueta: "About this much a week", formato: "moneda" },
    { clave: "tramo", etiqueta: "How it is worked out", formato: "texto" },
    { clave: "restante", etiqueta: "Debt left after this repayment (before indexation)", formato: "moneda" },
  ],
});
