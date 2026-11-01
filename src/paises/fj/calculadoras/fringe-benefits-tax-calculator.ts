import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "fj.fringe-benefits-tax-calculator",
  mercado: "fj",
  concepto: "propio",
  slug: "fringe-benefits-tax-calculator",
  estado: "publicado",
  requiere: { "fj.fbt-rate": "numero", "fj.paye-late-payment-penalty": "numero" },
  campos: [{ id: "valor", tipo: "moneda", etiqueta: "Total value of fringe benefits in the quarter", min: 0, porDefecto: 80000 }],
  calcular(e, v, { redondear }) {
    if (e.valor <= 0) throw new ErrorEntrada("Enter the total value of fringe benefits for the quarter.", "valor");
    const r = v["fj.fbt-rate"] / 100;
    const gravable = redondear(e.valor / (1 - r));
    const fbt = redondear(gravable * r);
    return { gravable, fbt, costoTotal: redondear(e.valor + fbt), recargoTardio: redondear(fbt * (v["fj.paye-late-payment-penalty"] / 100)) };
  },
  resultado: [
    { clave: "fbt", etiqueta: "Fringe benefits tax for the quarter", formato: "moneda", destacada: true },
    { clave: "gravable", etiqueta: "Fringe benefits taxable amount", formato: "moneda" },
    { clave: "costoTotal", etiqueta: "Benefits plus tax", formato: "moneda" },
    { clave: "recargoTardio", etiqueta: "Penalty if the tax is paid late", formato: "moneda" },
  ],
});
