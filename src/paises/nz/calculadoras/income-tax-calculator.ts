import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { accEarnersLevy, impuestoRenta, tasaMarginal } from "../lib/impuestos";

export default definirCalculadora({
  id: "nz.income-tax-calculator",
  mercado: "nz",
  concepto: "impuesto-renta",
  slug: "income-tax-calculator",
  estado: "publicado",
  requiere: {
    "nz.income-tax-rates": "escala",
    "nz.acc-earners-levy-rate": "numero",
    "nz.acc-max-liable-earnings": "numero",
  },
  campos: [
    { id: "ingreso", tipo: "moneda", etiqueta: "Taxable income for the year", min: 0, porDefecto: 65000 },
    {
      id: "conAcc",
      tipo: "si-no",
      etiqueta: "Include the ACC earners' levy",
      porDefecto: true,
      ayuda: "Employees pay it on their wages as part of PAYE.",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.ingreso < 0) throw new ErrorEntrada("Income can't be negative.", "ingreso");
    const escala = v["nz.income-tax-rates"];
    const impuesto = redondear(impuestoRenta(entrada.ingreso, escala));
    const acc = entrada.conAcc ? redondear(accEarnersLevy(entrada.ingreso, v["nz.acc-earners-levy-rate"], v["nz.acc-max-liable-earnings"])) : 0;
    const total = redondear(impuesto + acc);
    return {
      impuesto,
      acc,
      total,
      neto: redondear(entrada.ingreso - total),
      promedio: entrada.ingreso > 0 ? (impuesto / entrada.ingreso) * 100 : 0,
      marginal: tasaMarginal(escala, entrada.ingreso),
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Income tax", formato: "moneda", destacada: true },
    { clave: "acc", etiqueta: "ACC earners' levy", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Total tax and levy", formato: "moneda" },
    { clave: "neto", etiqueta: "Income after tax", formato: "moneda" },
    { clave: "promedio", etiqueta: "Average income tax rate", formato: "porcentaje", decimales: 2 },
    { clave: "marginal", etiqueta: "Top rate on your last dollar", formato: "porcentaje", decimales: 1 },
  ],
});
