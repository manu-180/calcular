import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { OPCIONES_CATEGORIA, pcbMensual } from "../lib/impuestos";
import { aportesPerkeso, OPCIONES_CATEGORIA_SOCSO, REQUIERE_PERKESO, tablas } from "../lib/perkeso";

export default definirCalculadora({
  id: "my.take-home-pay",
  mercado: "my",
  concepto: "sueldo-neto",
  slug: "take-home-pay",
  estado: "publicado",
  requiere: {
    ...REQUIERE_PERKESO,
    "my.income-tax-rates": "escala",
    "my.tax-reliefs": "mapa",
    "my.tax-rebate-individual": "numero",
    "my.tax-rebate-spouse": "numero",
    "my.tax-rebate-threshold": "numero",
    "my.mtd-minimum": "numero",
    "my.socso-wage-ceiling": "numero",
  },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Gross monthly salary", min: 0, porDefecto: 5000 },
    { id: "epf", tipo: "moneda", etiqueta: "Your EPF contribution a month", min: 0, porDefecto: 550, ayuda: "The employee share shown on your payslip. Enter 0 if you do not contribute." },
    { id: "categoria", tipo: "opcion", etiqueta: "Your situation", opciones: OPCIONES_CATEGORIA, porDefecto: "single" },
    { id: "hijos", tipo: "entero", etiqueta: "Children under 18", min: 0, max: 20, porDefecto: 0 },
    { id: "hijosEstudios", tipo: "entero", etiqueta: "Children 18 or older studying at diploma level or higher", min: 0, max: 20, porDefecto: 0 },
    { id: "categoriaSocso", tipo: "opcion", etiqueta: "SOCSO category", opciones: OPCIONES_CATEGORIA_SOCSO, porDefecto: "first" },
    { id: "skbbk", tipo: "si-no", etiqueta: "Covered by LINDUNG 24 Jam (SKBBK)", porDefecto: true },
    { id: "eis", tipo: "si-no", etiqueta: "Covered by EIS", porDefecto: true },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.bruto <= 0) throw new ErrorEntrada("Enter your gross monthly salary.", "bruto");
    if (entrada.epf >= entrada.bruto) throw new ErrorEntrada("Your EPF contribution has to be less than your salary.", "epf");
    const pcb = pcbMensual(
      { bruto: entrada.bruto, epf: entrada.epf, mes: 1, categoria: entrada.categoria, hijos: entrada.hijos, hijosEstudios: entrada.hijosEstudios, discapacidad: false, otrosAlivios: 0, zakat: 0 },
      {
        escala: v["my.income-tax-rates"],
        reliefs: v["my.tax-reliefs"],
        rebateIndividual: v["my.tax-rebate-individual"],
        rebateConyuge: v["my.tax-rebate-spouse"],
        umbralRebate: v["my.tax-rebate-threshold"],
        minimo: v["my.mtd-minimum"],
      },
    ).pcb;
    const a = aportesPerkeso(tablas(v), entrada.bruto, entrada.categoriaSocso, entrada.skbbk, entrada.eis);
    const socso = redondear(a.socsoEmpleado + a.skbbk);
    const neto = redondear(entrada.bruto - entrada.epf - socso - a.eisEmpleado - pcb);
    return {
      neto,
      epf: entrada.epf,
      socso,
      eis: a.eisEmpleado,
      pcb,
      deducciones: redondear(entrada.bruto - neto),
      anual: redondear(neto * 12),
      observaciones: ["PCB is worked out the way payroll does it for January, assuming the same salary all year and no bonus."],
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "Take-home pay a month", formato: "moneda", destacada: true },
    { clave: "epf", etiqueta: "EPF", formato: "moneda", ocultarSiCero: true },
    { clave: "socso", etiqueta: "SOCSO (including LINDUNG 24 Jam)", formato: "moneda", ocultarSiCero: true },
    { clave: "eis", etiqueta: "EIS", formato: "moneda", ocultarSiCero: true },
    { clave: "pcb", etiqueta: "PCB (monthly tax deduction)", formato: "moneda" },
    { clave: "deducciones", etiqueta: "Total deductions", formato: "moneda" },
    { clave: "anual", etiqueta: "Take-home pay a year", formato: "moneda" },
  ],
});
