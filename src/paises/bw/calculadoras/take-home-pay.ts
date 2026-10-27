import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { impuesto, pula, tasaMarginal } from "../lib/impuestos";

export default definirCalculadora({
  id: "bw.take-home-pay",
  mercado: "bw",
  concepto: "sueldo-neto",
  slug: "take-home-pay",
  estado: "publicado",
  requiere: {
    "bw.paye-resident": "escala",
    "bw.paye-non-resident": "escala",
    "bw.pension-deduction-cap": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Gross salary a month", min: 0, porDefecto: 15000 },
    {
      id: "residencia",
      tipo: "opcion",
      etiqueta: "Tax residence",
      opciones: [
        { valor: "resident", etiqueta: "Resident of Botswana" },
        { valor: "non-resident", etiqueta: "Non-resident" },
      ],
      porDefecto: "resident",
    },
    {
      id: "pension",
      tipo: "moneda",
      etiqueta: "Your pension fund contribution a month",
      min: 0,
      porDefecto: 0,
      ayuda: "What comes off your payslip for an approved pension, provident or retirement annuity fund.",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("Enter a salary above zero.", "salario");
    if (entrada.pension >= entrada.salario) throw new ErrorEntrada("Your pension contribution has to be less than your salary.", "pension");
    const residente = entrada.residencia === "resident";
    const anual = entrada.salario * 12;
    const aporte = entrada.pension * 12;
    // El tope es el 15 % del ingreso gravable, que ya descuenta el aporte: d ≤ 15 % × (bruto − d).
    const tope = (anual * v["bw.pension-deduction-cap"]) / (100 + v["bw.pension-deduction-cap"]);
    const deducible = residente ? Math.min(aporte, tope) : 0;
    const gravable = anual - deducible;
    const escala = residente ? v["bw.paye-resident"] : v["bw.paye-non-resident"];
    const payeAnual = impuesto(escala, gravable);
    const paye = redondear(payeAnual / 12);
    const neto = redondear(entrada.salario - paye - entrada.pension);
    const observaciones: string[] = [];
    if (!residente && entrada.pension > 0) observaciones.push("Only residents can deduct pension contributions, so your PAYE is worked out on your full salary.");
    if (residente && aporte > tope) {
      observaciones.push(`Only ${pula(redondear(tope))} a year of your pension contribution is deductible: the cap is 15% of your taxable income.`);
    }
    return {
      neto,
      paye,
      pension: entrada.pension,
      anualNeto: redondear(neto * 12),
      payeAnual: redondear(payeAnual),
      efectiva: (payeAnual / anual) * 100,
      marginal: tasaMarginal(escala, gravable),
      observaciones,
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "Take-home pay a month", formato: "moneda", destacada: true },
    { clave: "paye", etiqueta: "PAYE a month", formato: "moneda" },
    { clave: "pension", etiqueta: "Pension contribution", formato: "moneda", ocultarSiCero: true },
    { clave: "anualNeto", etiqueta: "Take-home pay a year", formato: "moneda" },
    { clave: "payeAnual", etiqueta: "PAYE a year", formato: "moneda" },
    { clave: "efectiva", etiqueta: "Share of your salary that goes to PAYE", formato: "porcentaje", decimales: 1 },
    { clave: "marginal", etiqueta: "Your marginal tax rate", formato: "porcentaje", decimales: 2 },
  ],
  mundo: { bruto: "salario", periodoBruto: "mes", neto: "neto", periodoNeto: "mes", entrada: { residencia: "resident", pension: 0 } },
});
