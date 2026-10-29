import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

// Borrador: el monto exento y la tasa vienen de prensa y de la edición 2020 de la ley, antes de la
// Income and Business Tax (Amendment) Act 2024. Falta leer el texto vigente, incluido el alivio
// entre 29.001 y 32.000 que mencionan guías de terceros. No se publica hasta verificarlo.
export default definirCalculadora({
  id: "bz.income-tax-calculator",
  mercado: "bz",
  concepto: "impuesto-renta",
  slug: "income-tax-calculator",
  estado: "borrador",
  requiere: {
    "bz.income-tax-exemption": "numero",
    "bz.income-tax-rate": "numero",
  },
  campos: [{ id: "anual", tipo: "moneda", etiqueta: "Taxable employment income for the year", min: 0, porDefecto: 48000 }],
  calcular(e, v, { redondear }) {
    if (e.anual < 0) throw new ErrorEntrada("The amount cannot be negative.", "anual");
    const gravable = Math.max(0, e.anual - v["bz.income-tax-exemption"]);
    const impuesto = redondear(porcentaje(gravable, v["bz.income-tax-rate"]));
    return { impuesto, gravable: redondear(gravable), mensual: redondear(impuesto / 12) };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Income tax for the year", formato: "moneda", destacada: true },
    { clave: "mensual", etiqueta: "Income tax each month", formato: "moneda" },
    { clave: "gravable", etiqueta: "Income above the exempt amount", formato: "moneda" },
  ],
});
