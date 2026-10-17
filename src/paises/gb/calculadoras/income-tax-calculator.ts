import { definirCalculadora, ErrorEntrada, porRegion } from "@/motor/calculo";
import { impuestoRenta, libras, tasaMarginal } from "../lib/impuestos";

export default definirCalculadora({
  id: "gb.income-tax-calculator",
  mercado: "gb",
  concepto: "impuesto-renta",
  slug: "income-tax-calculator",
  estado: "publicado",
  requiere: {
    "gb.personal-allowance": "numero",
    "gb.personal-allowance-taper": "numero",
    "gb.additional-rate-threshold": "numero",
    "gb.income-tax-bands": "escala-por-region",
  },
  campos: [
    { id: "ingreso", tipo: "moneda", etiqueta: "Total taxable income for the year", min: 0, porDefecto: 40000, ayuda: "Salary, self-employed profit, pension and rental income, before tax." },
    { id: "region", tipo: "region", etiqueta: "Where you live", porDefecto: "england-wales-ni" },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.ingreso < 0) throw new ErrorEntrada("Income cannot be negative.", "ingreso");
    const escala = porRegion(v["gb.income-tax-bands"], entrada.region);
    const r = impuestoRenta(entrada.ingreso, escala, v["gb.personal-allowance"], v["gb.personal-allowance-taper"]);
    const impuesto = redondear(r.impuesto);
    const observaciones: string[] = [];
    for (const f of escala) {
      const tope = f.hasta === null ? r.gravable : Math.min(r.gravable, f.hasta);
      const parte = tope - f.desde;
      if (parte <= 0) break;
      observaciones.push(`${libras(redondear(parte))} taxed at ${f.tasa}%: ${libras(redondear((parte * f.tasa) / 100))}.`);
    }
    if (r.allowance < v["gb.personal-allowance"]) {
      observaciones.push(`Your Personal Allowance is reduced because your income is over ${libras(v["gb.personal-allowance-taper"])}.`);
    }
    return {
      impuesto,
      mensual: redondear(impuesto / 12),
      allowance: r.allowance,
      gravable: redondear(r.gravable),
      efectiva: entrada.ingreso > 0 ? (impuesto / entrada.ingreso) * 100 : 0,
      marginal: tasaMarginal(escala, r.gravable),
      neto: redondear(entrada.ingreso - impuesto),
      observaciones,
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Income Tax for the year", formato: "moneda", destacada: true },
    { clave: "mensual", etiqueta: "Income Tax a month", formato: "moneda" },
    { clave: "allowance", etiqueta: "Personal Allowance", formato: "moneda" },
    { clave: "gravable", etiqueta: "Taxable income", formato: "moneda" },
    { clave: "efectiva", etiqueta: "Effective tax rate", formato: "porcentaje", decimales: 2 },
    { clave: "marginal", etiqueta: "Top rate you pay", formato: "porcentaje", decimales: 0 },
    { clave: "neto", etiqueta: "Income after Income Tax", formato: "moneda" },
  ],
});
