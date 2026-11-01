import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { valorDia } from "../lib/nomina";

export default definirCalculadora({
  id: "na.sick-leave-calculator",
  mercado: "na",
  concepto: "propio",
  slug: "sick-leave-calculator",
  estado: "publicado",
  requiere: {
    "na.sick-leave-days": "mapa",
    "na.sick-leave-first-year-divisor": "numero",
    "na.weeks-per-month": "numero",
  },
  campos: [
    { id: "dias", tipo: "entero", etiqueta: "Days you work in a normal week", min: 1, max: 6, porDefecto: 5 },
    { id: "primerAnio", tipo: "si-no", etiqueta: "You are in your first year with this employer", porDefecto: false },
    { id: "trabajados", tipo: "entero", etiqueta: "Days worked so far", min: 0, max: 366, porDefecto: 0, visibleSi: { primerAnio: [true] } },
    { id: "salario", tipo: "moneda", etiqueta: "Monthly pay (optional, for sick pay per day)", min: 0, requerido: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.dias < 1 || e.dias > 6) throw new ErrorEntrada("Enter between 1 and 6 work days a week.", "dias");
    const mapa = v["na.sick-leave-days"];
    const ciclo = e.dias === 6 ? enMapa(mapa, "six-days") : redondear((enMapa(mapa, "five-days") * e.dias) / 5);
    const primerAnio = e.primerAnio ? Math.floor((e.trabajados ?? 0) / v["na.sick-leave-first-year-divisor"]) : null;
    const diaria = e.salario === null ? null : redondear(valorDia(e.salario, v["na.weeks-per-month"], e.dias));
    return {
      disponibles: primerAnio ?? ciclo,
      ciclo,
      primerAnio,
      diaria,
      observaciones: ["Your employer can refuse to pay if you are away for more than two days in a row without a medical certificate."],
    };
  },
  resultado: [
    { clave: "disponibles", etiqueta: "Paid sick leave you can take now", formato: "dias", destacada: true },
    { clave: "ciclo", etiqueta: "Sick leave per 36-month cycle", formato: "dias", decimales: 0 },
    { clave: "primerAnio", etiqueta: "Earned so far in your first year", formato: "dias", decimales: 0 },
    { clave: "diaria", etiqueta: "Sick pay for one day", formato: "moneda" },
  ],
});
