import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { OPCIONES_CATEGORIA, pcbMensual, rm } from "../lib/impuestos";

const MESES = [
  { valor: "1", etiqueta: "January" },
  { valor: "2", etiqueta: "February" },
  { valor: "3", etiqueta: "March" },
  { valor: "4", etiqueta: "April" },
  { valor: "5", etiqueta: "May" },
  { valor: "6", etiqueta: "June" },
  { valor: "7", etiqueta: "July" },
  { valor: "8", etiqueta: "August" },
  { valor: "9", etiqueta: "September" },
  { valor: "10", etiqueta: "October" },
  { valor: "11", etiqueta: "November" },
  { valor: "12", etiqueta: "December" },
] as const;

export default definirCalculadora({
  id: "my.pcb-calculator",
  mercado: "my",
  concepto: "propio",
  slug: "pcb-calculator",
  estado: "publicado",
  requiere: {
    "my.income-tax-rates": "escala",
    "my.tax-reliefs": "mapa",
    "my.tax-rebate-individual": "numero",
    "my.tax-rebate-spouse": "numero",
    "my.tax-rebate-threshold": "numero",
    "my.mtd-minimum": "numero",
  },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Gross monthly salary", min: 0, porDefecto: 5500 },
    { id: "epf", tipo: "moneda", etiqueta: "Your EPF contribution a month", min: 0, porDefecto: 605, ayuda: "The employee share shown on your payslip." },
    { id: "categoria", tipo: "opcion", etiqueta: "Your situation", opciones: OPCIONES_CATEGORIA, porDefecto: "single" },
    { id: "hijos", tipo: "entero", etiqueta: "Children under 18", min: 0, max: 20, porDefecto: 0 },
    { id: "hijosEstudios", tipo: "entero", etiqueta: "Children 18 or older studying at diploma level or higher", min: 0, max: 20, porDefecto: 0 },
    { id: "discapacidad", tipo: "si-no", etiqueta: "You are a registered disabled person", porDefecto: false },
    { id: "otrosAlivios", tipo: "moneda", etiqueta: "Other reliefs you declared on Form TP1 this year", min: 0, porDefecto: 0, ayuda: "For example lifestyle purchases or medical insurance you told your employer about." },
    { id: "zakat", tipo: "moneda", etiqueta: "Zakat deducted through payroll a month", min: 0, porDefecto: 0 },
    { id: "mes", tipo: "opcion", etiqueta: "Month", opciones: MESES, porDefecto: "1" },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.bruto <= 0) throw new ErrorEntrada("Enter your gross monthly salary.", "bruto");
    if (entrada.epf >= entrada.bruto) throw new ErrorEntrada("Your EPF contribution has to be less than your salary.", "epf");
    const r = pcbMensual(
      { ...entrada, mes: Number(entrada.mes) },
      {
        escala: v["my.income-tax-rates"],
        reliefs: v["my.tax-reliefs"],
        rebateIndividual: v["my.tax-rebate-individual"],
        rebateConyuge: v["my.tax-rebate-spouse"],
        umbralRebate: v["my.tax-rebate-threshold"],
        minimo: v["my.mtd-minimum"],
      },
    );
    const observaciones: string[] = [];
    if (r.minimoNoAlcanzado) observaciones.push(`The PCB works out below ${rm(v["my.mtd-minimum"])}, so your employer does not have to deduct it.`);
    if (Number(entrada.mes) > 1) observaciones.push("Assumes the same salary and EPF every month since January, with no bonus and no previous employer this year.");
    return {
      pcb: r.pcb,
      gravable: redondear(r.gravableAnual),
      pagado: redondear(r.pagadoAntes),
      observaciones,
    };
  },
  resultado: [
    { clave: "pcb", etiqueta: "PCB (MTD) for the month", formato: "moneda", destacada: true },
    { clave: "gravable", etiqueta: "Estimated chargeable income for the year", formato: "moneda" },
    { clave: "pagado", etiqueta: "PCB already deducted this year", formato: "moneda", ocultarSiCero: true },
  ],
});
