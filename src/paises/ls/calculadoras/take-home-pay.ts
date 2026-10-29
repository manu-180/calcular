import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { maloti, payeMensual, tasaMarginal } from "../lib/comun";

export default definirCalculadora({
  id: "ls.take-home-pay",
  mercado: "ls",
  concepto: "sueldo-neto",
  slug: "take-home-pay",
  estado: "publicado",
  requiere: {
    "ls.income-tax-bands": "escala",
    "ls.tax-credit": "numero",
    "ls.superannuation-cap": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Gross salary a month", min: 0, porDefecto: 10000 },
    {
      id: "pension",
      tipo: "moneda",
      etiqueta: "Your contribution to an approved pension fund a month",
      min: 0,
      porDefecto: 0,
      ayuda: "Only what comes off your own pay. Leave 0 if you are not in a pension or provident fund.",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("Enter a salary above zero.", "salario");
    if (entrada.pension >= entrada.salario) throw new ErrorEntrada("Your pension contribution has to be less than your salary.", "pension");
    const tope = porcentaje(entrada.salario, v["ls.superannuation-cap"]);
    const deducible = Math.min(entrada.pension, tope);
    const imponible = entrada.salario - deducible;
    const paye = redondear(payeMensual(v["ls.income-tax-bands"], v["ls.tax-credit"], imponible));
    const neto = redondear(entrada.salario - paye - entrada.pension);
    const observaciones: string[] = [];
    if (entrada.pension > tope) {
      observaciones.push(
        `Only ${maloti(redondear(tope))} of your pension contribution lowers your tax. The deduction is capped at ${v["ls.superannuation-cap"]}% of your pay, and your employer's contribution counts towards the same cap.`,
      );
    }
    if (paye === 0) observaciones.push("The tax credit covers all the tax on this salary, so no PAYE is due.");
    return {
      neto,
      paye,
      pension: entrada.pension,
      imponible: redondear(imponible),
      credito: redondear(v["ls.tax-credit"] / 12),
      anualNeto: redondear(neto * 12),
      marginal: tasaMarginal(v["ls.income-tax-bands"], imponible * 12),
      observaciones,
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "Take-home pay a month", formato: "moneda", destacada: true },
    { clave: "paye", etiqueta: "PAYE a month", formato: "moneda" },
    { clave: "pension", etiqueta: "Pension contribution", formato: "moneda", ocultarSiCero: true },
    { clave: "imponible", etiqueta: "Chargeable income a month", formato: "moneda" },
    { clave: "credito", etiqueta: "Tax credit a month", formato: "moneda" },
    { clave: "anualNeto", etiqueta: "Take-home pay a year", formato: "moneda" },
    { clave: "marginal", etiqueta: "Your marginal tax rate", formato: "porcentaje", decimales: 0 },
  ],
  mundo: { bruto: "salario", periodoBruto: "mes", neto: "neto", periodoNeto: "mes", entrada: { pension: 0 } },
});
