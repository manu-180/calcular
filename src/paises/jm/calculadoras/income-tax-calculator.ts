import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "jm.income-tax-calculator",
  mercado: "jm",
  concepto: "impuesto-renta",
  slug: "income-tax-calculator",
  estado: "publicado",
  requiere: {
    "jm.income-tax-threshold": "numero",
    "jm.income-tax-rate": "numero",
    "jm.income-tax-higher-rate": "numero",
    "jm.income-tax-higher-band": "numero",
    "jm.age-exemption": "numero",
    "jm.pension-exemption": "numero",
    "jm.nis-employee-rate": "numero",
    "jm.nis-ceiling": "numero",
    "jm.nht-employee-rate": "numero",
    "jm.education-tax-employee-rate": "numero",
  },
  campos: [
    { id: "empleo", tipo: "moneda", etiqueta: "Salary and taxable allowances for the year", min: 0, porDefecto: 3000000 },
    { id: "aporte", tipo: "moneda", etiqueta: "Your contributions to an approved pension scheme in the year", min: 0, porDefecto: 0 },
    { id: "pensionIngreso", tipo: "moneda", etiqueta: "Pension you receive from an approved scheme in the year", min: 0, porDefecto: 0 },
    {
      id: "edad",
      tipo: "opcion",
      etiqueta: "Your age during the year",
      opciones: [
        { valor: "under-55", etiqueta: "Under 55" },
        { valor: "55-64", etiqueta: "55 to 64" },
        { valor: "65-plus", etiqueta: "65 or over" },
      ],
      porDefecto: "under-55",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.empleo + e.pensionIngreso <= 0) throw new ErrorEntrada("Enter your salary or your pension for the year.", "empleo");
    if (e.aporte > e.empleo) throw new ErrorEntrada("Your pension contributions cannot be more than your salary.", "aporte");
    const nis = redondear(Math.min(porcentaje(e.empleo, v["jm.nis-employee-rate"]), porcentaje(v["jm.nis-ceiling"], v["jm.nis-employee-rate"])));
    const ingresoEmpleo = Math.max(0, e.empleo - nis - e.aporte);
    const ingresoEstatutario = redondear(ingresoEmpleo + e.pensionIngreso);
    const exPension = e.pensionIngreso > 0 ? (e.edad === "under-55" ? Math.min(v["jm.pension-exemption"], e.pensionIngreso) : v["jm.pension-exemption"]) : 0;
    const exEdad = e.edad === "65-plus" ? v["jm.age-exemption"] : 0;
    const base = Math.max(0, ingresoEstatutario - exPension - exEdad);
    const umbral = v["jm.income-tax-threshold"];
    const tramo = v["jm.income-tax-higher-band"];
    const impuesto25 = redondear(porcentaje(Math.max(0, Math.min(base, tramo) - umbral), v["jm.income-tax-rate"]));
    const impuesto30 = redondear(porcentaje(Math.max(0, base - Math.max(tramo, umbral)), v["jm.income-tax-higher-rate"]));
    const impuesto = redondear(impuesto25 + impuesto30);
    const nht = redondear(porcentaje(e.empleo, v["jm.nht-employee-rate"]));
    const educationTax = redondear(porcentaje(ingresoEmpleo, v["jm.education-tax-employee-rate"]));
    const neto = redondear(e.empleo + e.pensionIngreso - nis - e.aporte - nht - educationTax - impuesto);
    return {
      impuesto,
      impuesto25,
      impuesto30,
      ingresoEstatutario,
      exenciones: redondear(exPension + exEdad),
      umbral,
      nis,
      nht,
      educationTax,
      neto,
      tasaEfectiva: ingresoEstatutario > 0 ? (impuesto / ingresoEstatutario) * 100 : 0,
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Income tax for the year", formato: "moneda", destacada: true },
    { clave: "impuesto25", etiqueta: "Tax at the basic rate", formato: "moneda" },
    { clave: "impuesto30", etiqueta: "Tax at the higher rate", formato: "moneda", ocultarSiCero: true },
    { clave: "ingresoEstatutario", etiqueta: "Statutory income", formato: "moneda" },
    { clave: "exenciones", etiqueta: "Pension and age exemptions", formato: "moneda", ocultarSiCero: true },
    { clave: "umbral", etiqueta: "Income tax threshold for the year", formato: "moneda" },
    { clave: "nis", etiqueta: "NIS for the year", formato: "moneda" },
    { clave: "nht", etiqueta: "NHT for the year", formato: "moneda" },
    { clave: "educationTax", etiqueta: "Education Tax for the year", formato: "moneda" },
    { clave: "neto", etiqueta: "Income left after tax and deductions", formato: "moneda" },
    { clave: "tasaEfectiva", etiqueta: "Income tax as a share of statutory income", formato: "porcentaje", decimales: 1 },
  ],
});
