import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { creditoMedicoMensual, deduccionRetiro, impuestoAntesDeRebates, OPCIONES_EDAD, rand, rebatePorEdad, tasaMarginal } from "../lib/impuestos";

export default definirCalculadora({
  id: "za.take-home-pay",
  mercado: "za",
  concepto: "sueldo-neto",
  slug: "take-home-pay",
  estado: "publicado",
  requiere: {
    "za.income-tax-bands": "escala",
    "za.tax-rebates": "mapa",
    "za.medical-tax-credits": "mapa",
    "za.retirement-deduction-rate": "numero",
    "za.retirement-deduction-cap": "numero",
    "za.uif-employee-rate": "numero",
    "za.uif-ceiling-monthly": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Gross salary a month", min: 0, porDefecto: 30000 },
    { id: "edad", tipo: "opcion", etiqueta: "Your age", opciones: OPCIONES_EDAD, porDefecto: "under-65" },
    { id: "medicos", tipo: "entero", etiqueta: "People on your medical aid (you included)", min: 0, max: 20, porDefecto: 0, ayuda: "Leave 0 if you are not on a medical aid or your employer does not pay it through payroll." },
    { id: "retiro", tipo: "moneda", etiqueta: "Your pension, provident or RA contribution a month", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("Enter a salary above zero.", "salario");
    if (entrada.retiro >= entrada.salario) throw new ErrorEntrada("Your retirement contribution has to be less than your salary.", "retiro");
    const anual = entrada.salario * 12;
    const deduccion = deduccionRetiro(entrada.retiro * 12, anual, v["za.retirement-deduction-rate"], v["za.retirement-deduction-cap"]);
    const gravable = anual - deduccion;
    const antes = impuestoAntesDeRebates(v["za.income-tax-bands"], gravable);
    const rebate = rebatePorEdad(v["za.tax-rebates"], entrada.edad);
    const tras = Math.max(0, antes - rebate);
    const credito = Math.min(tras, creditoMedicoMensual(v["za.medical-tax-credits"], entrada.medicos) * 12);
    const paye = redondear((tras - credito) / 12);
    const uif = redondear((Math.min(entrada.salario, v["za.uif-ceiling-monthly"]) * v["za.uif-employee-rate"]) / 100);
    const neto = redondear(entrada.salario - paye - uif - entrada.retiro);
    const observaciones: string[] = [];
    if (deduccion < entrada.retiro * 12) {
      observaciones.push(`Only ${rand(redondear(deduccion))} of your yearly retirement contribution is deductible. The rest carries forward to next tax year.`);
    }
    if (entrada.salario > v["za.uif-ceiling-monthly"]) {
      observaciones.push(`UIF is capped: you pay on ${rand(v["za.uif-ceiling-monthly"])} a month, not on your full salary.`);
    }
    return {
      neto,
      paye,
      uif,
      retiro: entrada.retiro,
      credito: redondear(credito / 12),
      anualNeto: redondear(neto * 12),
      payeAnual: redondear(tras - credito),
      marginal: tasaMarginal(v["za.income-tax-bands"], gravable),
      observaciones,
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "Take-home pay a month", formato: "moneda", destacada: true },
    { clave: "paye", etiqueta: "PAYE a month", formato: "moneda" },
    { clave: "uif", etiqueta: "UIF a month", formato: "moneda" },
    { clave: "retiro", etiqueta: "Retirement contribution", formato: "moneda", ocultarSiCero: true },
    { clave: "credito", etiqueta: "Medical tax credit in your PAYE", formato: "moneda", ocultarSiCero: true },
    { clave: "anualNeto", etiqueta: "Take-home pay a year", formato: "moneda" },
    { clave: "payeAnual", etiqueta: "PAYE a year", formato: "moneda" },
    { clave: "marginal", etiqueta: "Your marginal tax rate", formato: "porcentaje", decimales: 0 },
  ],
});
