import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "qa.corporate-tax-calculator",
  mercado: "qa",
  concepto: "propio",
  slug: "corporate-tax-calculator",
  estado: "publicado",
  requiere: {
    "qa.corporate-tax": "numero",
  },
  campos: [
    { id: "renta", tipo: "moneda", etiqueta: "Taxable income for the year", ayuda: "Gross income less allowed deductions and losses carried forward.", min: 0, porDefecto: 2000000 },
    { id: "qatari", tipo: "porcentaje", etiqueta: "Share of profits owned by Qataris", ayuda: "Qatari individuals resident in Qatar and companies wholly owned by Qataris. Their share is exempt.", min: 0, max: 100, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.renta <= 0) throw new ErrorEntrada("Enter the taxable income.", "renta");
    const gravable = entrada.renta - porcentaje(entrada.renta, entrada.qatari);
    const impuesto = redondear(porcentaje(gravable, v["qa.corporate-tax"]));
    const observaciones = [
      "Petroleum operations and petrochemical industries pay at least 35% under their agreements. Large multinational groups may also owe a 15% minimum tax.",
      "Even an exempt taxpayer has to file a tax return.",
    ];
    return { impuesto, gravable: redondear(gravable), efectiva: redondear((impuesto / entrada.renta) * 100), observaciones };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Income tax due", formato: "moneda", destacada: true },
    { clave: "gravable", etiqueta: "Taxable share of the income", formato: "moneda" },
    { clave: "efectiva", etiqueta: "Effective rate on the whole income", formato: "porcentaje" },
  ],
});
