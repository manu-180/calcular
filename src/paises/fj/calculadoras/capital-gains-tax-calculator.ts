import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "fj.capital-gains-tax-calculator",
  mercado: "fj",
  concepto: "propio",
  slug: "capital-gains-tax-calculator",
  estado: "publicado",
  requiere: { "fj.cgt-rate": "numero" },
  campos: [
    { id: "venta", tipo: "moneda", etiqueta: "Sale price", min: 0, porDefecto: 300000 },
    { id: "costo", tipo: "moneda", etiqueta: "What the asset cost you", min: 0, porDefecto: 200000 },
    { id: "gastos", tipo: "moneda", etiqueta: "Costs of buying and selling", min: 0, porDefecto: 5000, ayuda: "Legal fees, agent fees and similar costs you can show." },
  ],
  calcular(e, v, { redondear }) {
    if (e.venta <= 0) throw new ErrorEntrada("Enter the sale price.", "venta");
    const ganancia = redondear(e.venta - e.costo - e.gastos);
    const gravable = ganancia > 0 ? ganancia : 0;
    const impuesto = redondear(porcentaje(gravable, v["fj.cgt-rate"]));
    const observaciones: string[] = [];
    if (ganancia <= 0) observaciones.push("There is no gain, so no capital gains tax is due on these figures.");
    observaciones.push("Some disposals are exempt or have special rules. Check your case with FRCS before you sell.");
    return { ganancia, impuesto, neto: redondear(e.venta - e.gastos - impuesto), observaciones };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Capital gains tax", formato: "moneda", destacada: true },
    { clave: "ganancia", etiqueta: "Capital gain", formato: "moneda" },
    { clave: "neto", etiqueta: "Cash left after costs and tax", formato: "moneda" },
  ],
});
