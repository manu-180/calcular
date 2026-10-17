import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { creditoMedicoMensual, impuestoAntesDeRebates, OPCIONES_EDAD, rand, rebatePorEdad, tasaMarginal } from "../lib/impuestos";

export default definirCalculadora({
  id: "za.income-tax-calculator",
  mercado: "za",
  concepto: "impuesto-renta",
  slug: "income-tax-calculator",
  estado: "publicado",
  requiere: {
    "za.income-tax-bands": "escala",
    "za.tax-rebates": "mapa",
    "za.tax-thresholds": "mapa",
    "za.medical-tax-credits": "mapa",
  },
  campos: [
    { id: "ingreso", tipo: "moneda", etiqueta: "Taxable income for the tax year", min: 0, porDefecto: 400000, ayuda: "Salary, bonuses, business profit, rental and taxable interest, after deductions such as retirement contributions." },
    { id: "edad", tipo: "opcion", etiqueta: "Your age", opciones: OPCIONES_EDAD, porDefecto: "under-65" },
    { id: "medicos", tipo: "entero", etiqueta: "People on your medical aid (you included)", min: 0, max: 20, porDefecto: 0 },
    { id: "meses", tipo: "entero", etiqueta: "Months you paid medical aid in the tax year", min: 0, max: 12, porDefecto: 12 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.ingreso < 0) throw new ErrorEntrada("Income cannot be negative.", "ingreso");
    const escala = v["za.income-tax-bands"];
    const antes = redondear(impuestoAntesDeRebates(escala, entrada.ingreso));
    const rebates = Math.min(antes, rebatePorEdad(v["za.tax-rebates"], entrada.edad));
    const tras = antes - rebates;
    const credito = redondear(Math.min(tras, creditoMedicoMensual(v["za.medical-tax-credits"], entrada.medicos) * entrada.meses));
    const impuesto = redondear(tras - credito);
    const umbral = v["za.tax-thresholds"][entrada.edad];
    const observaciones: string[] = [];
    if (entrada.ingreso <= umbral) observaciones.push(`Your income is at or below the tax threshold of ${rand(umbral)} for your age, so you pay no income tax.`);
    return {
      impuesto,
      mensual: redondear(impuesto / 12),
      antes,
      rebates,
      credito,
      efectiva: entrada.ingreso > 0 ? (impuesto / entrada.ingreso) * 100 : 0,
      marginal: tasaMarginal(escala, entrada.ingreso),
      neto: redondear(entrada.ingreso - impuesto),
      observaciones,
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Income tax for the year", formato: "moneda", destacada: true },
    { clave: "mensual", etiqueta: "Income tax a month", formato: "moneda" },
    { clave: "antes", etiqueta: "Tax on the brackets", formato: "moneda" },
    { clave: "rebates", etiqueta: "Rebates", formato: "moneda" },
    { clave: "credito", etiqueta: "Medical scheme fees tax credit", formato: "moneda", ocultarSiCero: true },
    { clave: "efectiva", etiqueta: "Effective tax rate", formato: "porcentaje", decimales: 2 },
    { clave: "marginal", etiqueta: "Marginal tax rate", formato: "porcentaje", decimales: 0 },
    { clave: "neto", etiqueta: "Income after tax", formato: "moneda" },
  ],
});
