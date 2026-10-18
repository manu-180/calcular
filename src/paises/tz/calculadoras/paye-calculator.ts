import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { APORTE_NSSF, paye } from "../lib/nomina";

export default definirCalculadora({
  id: "tz.paye-calculator",
  mercado: "tz",
  concepto: "impuesto-renta",
  slug: "paye-calculator",
  estado: "publicado",
  requiere: {
    "tz.paye-bands": "escala",
    "tz.non-resident-employee-rate": "numero",
  },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Gross monthly salary", min: 0, porDefecto: 1000000, ayuda: "Salary plus allowances and taxable benefits." },
    { id: "aporte", tipo: "opcion", etiqueta: "Your share of the NSSF contribution", opciones: APORTE_NSSF, porDefecto: "10" },
    {
      id: "empleo",
      tipo: "opcion",
      etiqueta: "This job is your",
      opciones: [
        { valor: "primary", etiqueta: "Primary employment" },
        { valor: "secondary", etiqueta: "Secondary employment" },
      ],
      porDefecto: "primary",
    },
    {
      id: "residencia",
      tipo: "opcion",
      etiqueta: "Residence",
      opciones: [
        { valor: "resident", etiqueta: "Resident in Tanzania" },
        { valor: "non-resident", etiqueta: "Non-resident" },
      ],
      porDefecto: "resident",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Enter your gross monthly salary.", "bruto");
    const r = paye(e.bruto, Number(e.aporte), e.residencia, e.empleo, v["tz.paye-bands"], v["tz.non-resident-employee-rate"]);
    const impuesto = redondear(r.paye);
    const observaciones: string[] = [];
    if (e.residencia === "non-resident") observaciones.push("Non-resident employees pay a flat rate on gross pay. It is a final tax.");
    else if (e.empleo === "secondary") observaciones.push("A secondary employer withholds at the highest rate. You can ask the Commissioner for a lower rate if it causes hardship.");
    if (impuesto === 0) observaciones.push("Your taxable pay is within the tax-free band, so no PAYE is due.");
    return {
      paye: impuesto,
      anual: redondear(impuesto * 12),
      gravable: redondear(r.gravable),
      nssf: redondear(r.nssf),
      efectiva: (impuesto / e.bruto) * 100,
      marginal: r.marginal,
      observaciones,
    };
  },
  resultado: [
    { clave: "paye", etiqueta: "PAYE for the month", formato: "moneda", destacada: true },
    { clave: "anual", etiqueta: "PAYE for 12 months", formato: "moneda" },
    { clave: "gravable", etiqueta: "Taxable pay", formato: "moneda" },
    { clave: "nssf", etiqueta: "Your NSSF contribution", formato: "moneda" },
    { clave: "efectiva", etiqueta: "PAYE as a share of gross pay", formato: "porcentaje", decimales: 2 },
    { clave: "marginal", etiqueta: "Top rate you reach", formato: "porcentaje", decimales: 0 },
  ],
});
