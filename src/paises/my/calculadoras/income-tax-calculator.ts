import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { alivioFijo, impuestoBruto, OPCIONES_CATEGORIA, rebate, tasaMarginal } from "../lib/impuestos";

export default definirCalculadora({
  id: "my.income-tax-calculator",
  mercado: "my",
  concepto: "impuesto-renta",
  slug: "income-tax-calculator",
  estado: "publicado",
  requiere: {
    "my.income-tax-rates": "escala",
    "my.tax-reliefs": "mapa",
    "my.tax-rebate-individual": "numero",
    "my.tax-rebate-spouse": "numero",
    "my.tax-rebate-threshold": "numero",
  },
  campos: [
    { id: "ingresos", tipo: "moneda", etiqueta: "Total income for the year", min: 0, porDefecto: 72000, ayuda: "Salary, bonus, allowances and other taxable income, before any deduction." },
    { id: "categoria", tipo: "opcion", etiqueta: "Your situation", opciones: OPCIONES_CATEGORIA, porDefecto: "single" },
    { id: "hijos", tipo: "entero", etiqueta: "Children under 18", min: 0, max: 20, porDefecto: 0 },
    { id: "hijosEstudios", tipo: "entero", etiqueta: "Children 18 or older studying at diploma level or higher", min: 0, max: 20, porDefecto: 0 },
    { id: "discapacidad", tipo: "si-no", etiqueta: "You are a registered disabled person", porDefecto: false },
    { id: "epf", tipo: "moneda", etiqueta: "EPF contributions in the year", min: 0, porDefecto: 7920 },
    { id: "seguroVida", tipo: "moneda", etiqueta: "Life insurance, takaful or voluntary EPF", min: 0, porDefecto: 0 },
    { id: "seguroMedico", tipo: "moneda", etiqueta: "Education and medical insurance", min: 0, porDefecto: 0 },
    { id: "estiloVida", tipo: "moneda", etiqueta: "Lifestyle: books, phone, computer, internet, courses", min: 0, porDefecto: 0 },
    { id: "deporte", tipo: "moneda", etiqueta: "Sports equipment, facilities and gym", min: 0, porDefecto: 0 },
    { id: "prs", tipo: "moneda", etiqueta: "Private Retirement Scheme (PRS)", min: 0, porDefecto: 0 },
    { id: "socso", tipo: "moneda", etiqueta: "SOCSO and EIS contributions", min: 0, porDefecto: 0 },
    { id: "otros", tipo: "moneda", etiqueta: "Other reliefs you qualify for", min: 0, porDefecto: 0, ayuda: "Already within their limits, for example parents' medical costs or SSPN savings." },
    { id: "zakat", tipo: "moneda", etiqueta: "Zakat paid in the year", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.ingresos <= 0) throw new ErrorEntrada("Enter your total income for the year.", "ingresos");
    const r = v["my.tax-reliefs"];
    const tope = (monto: number, clave: string) => Math.min(monto, r[clave]);
    const fijos = alivioFijo(r, entrada.categoria, entrada.hijos, entrada.hijosEstudios, entrada.discapacidad);
    const variables =
      tope(entrada.epf, "epf") +
      tope(entrada.seguroVida, "life-insurance") +
      tope(entrada.seguroMedico, "education-medical-insurance") +
      tope(entrada.estiloVida, "lifestyle") +
      tope(entrada.deporte, "sports") +
      tope(entrada.prs, "prs") +
      tope(entrada.socso, "socso") +
      entrada.otros;
    const alivios = fijos + variables;
    const gravable = Math.max(0, entrada.ingresos - alivios);
    const bruto = impuestoBruto(v["my.income-tax-rates"], gravable);
    const reb = Math.min(bruto, rebate(gravable, entrada.categoria === "spouse-not-working", { individual: v["my.tax-rebate-individual"], spouse: v["my.tax-rebate-spouse"], threshold: v["my.tax-rebate-threshold"] }));
    const zakat = Math.min(bruto - reb, entrada.zakat);
    const impuesto = redondear(bruto - reb - zakat);
    return {
      impuesto,
      mensual: redondear(impuesto / 12),
      gravable: redondear(gravable),
      alivios: redondear(alivios),
      bruto: redondear(bruto),
      rebate: redondear(reb),
      zakat: redondear(zakat),
      efectiva: (impuesto / entrada.ingresos) * 100,
      marginal: tasaMarginal(v["my.income-tax-rates"], gravable),
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Income tax for the year", formato: "moneda", destacada: true },
    { clave: "mensual", etiqueta: "Tax a month", formato: "moneda" },
    { clave: "gravable", etiqueta: "Chargeable income", formato: "moneda" },
    { clave: "alivios", etiqueta: "Total reliefs", formato: "moneda" },
    { clave: "bruto", etiqueta: "Tax before rebate and zakat", formato: "moneda" },
    { clave: "rebate", etiqueta: "Tax rebate", formato: "moneda", ocultarSiCero: true },
    { clave: "zakat", etiqueta: "Zakat rebate", formato: "moneda", ocultarSiCero: true },
    { clave: "efectiva", etiqueta: "Effective tax rate", formato: "porcentaje", decimales: 1 },
    { clave: "marginal", etiqueta: "Your top tax rate", formato: "porcentaje", decimales: 0 },
  ],
});
