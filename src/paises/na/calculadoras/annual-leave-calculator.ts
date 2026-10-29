import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { valorDia } from "../lib/nomina";

export default definirCalculadora({
  id: "na.annual-leave-calculator",
  mercado: "na",
  concepto: "vacaciones",
  slug: "annual-leave-calculator",
  estado: "publicado",
  requiere: {
    "na.annual-leave-weeks": "numero",
    "na.weeks-per-month": "numero",
  },
  campos: [
    { id: "dias", tipo: "entero", etiqueta: "Days you work in a normal week", min: 1, max: 6, porDefecto: 5 },
    { id: "meses", tipo: "numero", etiqueta: "Months worked in the current leave cycle", min: 0, max: 12, porDefecto: 12 },
    { id: "tomados", tipo: "numero", etiqueta: "Leave days already taken this cycle", min: 0, porDefecto: 0 },
    { id: "salario", tipo: "moneda", etiqueta: "Monthly pay (optional, for leave pay)", min: 0, requerido: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.dias < 1 || e.dias > 6) throw new ErrorEntrada("Enter between 1 and 6 work days a week.", "dias");
    if (e.meses < 0 || e.meses > 12) throw new ErrorEntrada("A leave cycle has 12 months.", "meses");
    const anual = v["na.annual-leave-weeks"] * e.dias;
    const acumulados = redondear((anual * e.meses) / 12);
    const pendientes = Math.max(0, redondear(acumulados - e.tomados));
    const diaria = e.salario === null ? null : redondear(valorDia(e.salario, v["na.weeks-per-month"], e.dias));
    const valor = diaria === null ? null : redondear(diaria * pendientes);
    return { anual, acumulados, pendientes, diaria, valor };
  },
  resultado: [
    { clave: "anual", etiqueta: "Annual leave a year", formato: "dias", destacada: true },
    { clave: "acumulados", etiqueta: "Leave earned so far this cycle", formato: "dias", decimales: 2 },
    { clave: "pendientes", etiqueta: "Leave days still due", formato: "dias", decimales: 2 },
    { clave: "diaria", etiqueta: "Pay for one leave day", formato: "moneda" },
    { clave: "valor", etiqueta: "Value of leave still due", formato: "moneda" },
  ],
});
