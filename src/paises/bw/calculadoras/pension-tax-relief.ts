import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { impuesto } from "../lib/impuestos";

export default definirCalculadora({
  id: "bw.pension-tax-relief",
  mercado: "bw",
  concepto: "propio",
  slug: "pension-tax-relief",
  estado: "publicado",
  requiere: {
    "bw.paye-resident": "escala",
    "bw.pension-deduction-cap": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Gross salary a month", min: 0, porDefecto: 20000 },
    { id: "aporte", tipo: "moneda", etiqueta: "What you pay into the fund a month", min: 0, porDefecto: 1500 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("Enter a salary above zero.", "salario");
    if (entrada.aporte <= 0) throw new ErrorEntrada("Enter your monthly contribution.", "aporte");
    if (entrada.aporte >= entrada.salario) throw new ErrorEntrada("Your contribution has to be less than your salary.", "aporte");
    const anual = entrada.salario * 12;
    const aporte = entrada.aporte * 12;
    // El tope es el 15 % del ingreso gravable, que ya descuenta el aporte: d ≤ 15 % × (bruto − d).
    const tope = (anual * v["bw.pension-deduction-cap"]) / (100 + v["bw.pension-deduction-cap"]);
    const deducible = Math.min(aporte, tope);
    const sin = impuesto(v["bw.paye-resident"], anual);
    const con = impuesto(v["bw.paye-resident"], anual - deducible);
    const ahorro = redondear((sin - con) / 12);
    return {
      ahorro,
      costoReal: redondear(entrada.aporte - ahorro),
      ahorroAnual: redondear(sin - con),
      maximo: redondear(tope / 12),
      noDeducible: redondear(Math.max(0, aporte - tope) / 12),
    };
  },
  resultado: [
    { clave: "ahorro", etiqueta: "PAYE you save a month", formato: "moneda", destacada: true },
    { clave: "costoReal", etiqueta: "What the contribution really costs you a month", formato: "moneda" },
    { clave: "ahorroAnual", etiqueta: "PAYE you save a year", formato: "moneda" },
    { clave: "maximo", etiqueta: "Most you can deduct a month", formato: "moneda" },
    { clave: "noDeducible", etiqueta: "Part of your contribution above the cap", formato: "moneda", ocultarSiCero: true },
  ],
});
