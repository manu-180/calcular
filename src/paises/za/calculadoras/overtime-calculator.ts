import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { rand } from "../lib/impuestos";

export default definirCalculadora({
  id: "za.overtime-calculator",
  mercado: "za",
  concepto: "horas-extra",
  slug: "overtime-calculator",
  estado: "publicado",
  requiere: {
    "za.bcea-pay-multipliers": "mapa",
    "za.weeks-per-month": "numero",
    "za.bcea-earnings-threshold": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Monthly salary before deductions", min: 0, porDefecto: 12000 },
    { id: "horas", tipo: "numero", etiqueta: "Ordinary hours a week", min: 1, max: 45, porDefecto: 45 },
    { id: "extra", tipo: "numero", etiqueta: "Overtime hours on normal working days", min: 0, porDefecto: 10 },
    { id: "domingo", tipo: "numero", etiqueta: "Hours worked on a Sunday", min: 0, porDefecto: 0 },
    { id: "domingoHabitual", tipo: "si-no", etiqueta: "You normally work on Sundays", porDefecto: false },
    { id: "feriado", tipo: "numero", etiqueta: "Hours worked on a public holiday", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("Enter your monthly salary.", "salario");
    if (entrada.horas <= 0 || entrada.horas > 45) throw new ErrorEntrada("Ordinary hours are between 1 and 45 a week.", "horas");
    const m = v["za.bcea-pay-multipliers"];
    const hora = redondear(entrada.salario / (entrada.horas * v["za.weeks-per-month"]));
    const pagoExtra = redondear(entrada.extra * hora * enMapa(m, "overtime"));
    const pagoDomingo = redondear(entrada.domingo * hora * enMapa(m, entrada.domingoHabitual ? "sunday-usual" : "sunday"));
    const pagoFeriado = redondear(entrada.feriado * hora * enMapa(m, "public-holiday"));
    const observaciones: string[] = [];
    if (entrada.salario * 12 > v["za.bcea-earnings-threshold"]) {
      observaciones.push(
        `You earn more than the BCEA threshold of ${rand(v["za.bcea-earnings-threshold"])} a year, so the legal overtime, Sunday and public holiday rates do not cover you. Your contract decides.`,
      );
    }
    if (entrada.domingo > 0 || entrada.feriado > 0) {
      observaciones.push("If you are on a monthly salary and that Sunday or public holiday was a normal working day for you, part of this amount is already in your salary.");
    }
    return {
      total: redondear(pagoExtra + pagoDomingo + pagoFeriado),
      hora,
      pagoExtra,
      pagoDomingo,
      pagoFeriado,
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Pay for these hours", formato: "moneda", destacada: true },
    { clave: "hora", etiqueta: "Your ordinary hourly rate", formato: "moneda" },
    { clave: "pagoExtra", etiqueta: "Overtime pay", formato: "moneda", ocultarSiCero: true },
    { clave: "pagoDomingo", etiqueta: "Sunday pay", formato: "moneda", ocultarSiCero: true },
    { clave: "pagoFeriado", etiqueta: "Public holiday pay", formato: "moneda", ocultarSiCero: true },
  ],
});
