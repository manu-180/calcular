import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { impuestoAnual } from "../lib/comun";

export default definirCalculadora({
  id: "ls.pension-lump-sum-tax",
  mercado: "ls",
  concepto: "propio",
  slug: "pension-lump-sum-tax",
  estado: "publicado",
  requiere: {
    "ls.standard-rate": "numero",
    "ls.income-tax-bands": "escala",
    "ls.tax-credit": "numero",
  },
  campos: [
    { id: "pago", tipo: "moneda", etiqueta: "Lump sum from the pension or provident fund", min: 0, porDefecto: 300000 },
    {
      id: "transferido",
      tipo: "moneda",
      etiqueta: "Part rolled over or used to buy an annuity within 90 days",
      min: 0,
      porDefecto: 0,
      ayuda: "Into another approved fund, or an annuity from a resident provider.",
    },
    { id: "otros", tipo: "moneda", etiqueta: "Your other taxable income this tax year", min: 0, porDefecto: 60000 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.pago <= 0) throw new ErrorEntrada("Enter the lump sum.", "pago");
    if (entrada.transferido > entrada.pago) throw new ErrorEntrada("The amount rolled over cannot be more than the lump sum.", "transferido");
    const gravable = entrada.pago - entrada.transferido;
    const fija = redondear(porcentaje(gravable, v["ls.standard-rate"]));
    const bandas = v["ls.income-tax-bands"];
    const credito = v["ls.tax-credit"];
    const conPago = impuestoAnual(bandas, credito, entrada.otros + gravable).aPagar;
    const sinPago = impuestoAnual(bandas, credito, entrada.otros).aPagar;
    const incluida = redondear(conPago - sinPago);
    const conviene = incluida < fija ? "Including it in your income costs less." : "The standard rate costs less or the same.";
    return {
      impuesto: Math.min(fija, incluida),
      gravable,
      exento: entrada.transferido,
      fija,
      incluida,
      conviene,
      neto: redondear(gravable - Math.min(fija, incluida)),
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Lowest tax on the lump sum", formato: "moneda", destacada: true },
    { clave: "conviene", etiqueta: "Better option", formato: "texto" },
    { clave: "fija", etiqueta: "Tax at the standard rate", formato: "moneda" },
    { clave: "incluida", etiqueta: "Extra tax if included in your income", formato: "moneda" },
    { clave: "gravable", etiqueta: "Taxable part of the lump sum", formato: "moneda" },
    { clave: "exento", etiqueta: "Exempt part (rolled over)", formato: "moneda", ocultarSiCero: true },
    { clave: "neto", etiqueta: "Taxable part after tax", formato: "moneda" },
  ],
});
