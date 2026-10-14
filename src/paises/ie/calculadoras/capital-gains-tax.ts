import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ie.capital-gains-tax",
  mercado: "ie",
  concepto: "propio",
  slug: "capital-gains-tax",
  estado: "publicado",
  requiere: {
    "ie.cgt-rate": "numero",
    "ie.cgt-annual-exemption": "numero",
  },
  campos: [
    { id: "venta", tipo: "moneda", etiqueta: "Sale price (or market value if you gave it away)", min: 0, porDefecto: 250000 },
    { id: "compra", tipo: "moneda", etiqueta: "What you paid for it", min: 0, porDefecto: 150000 },
    {
      id: "gastos",
      tipo: "moneda",
      etiqueta: "Allowable expenses",
      min: 0,
      porDefecto: 5000,
      ayuda: "Solicitor's and auctioneer's fees when buying and selling, and money spent that added value to the asset.",
    },
    { id: "perdidas", tipo: "moneda", etiqueta: "Losses to set against the gain (optional)", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.venta <= 0) throw new ErrorEntrada("Enter the sale price.", "venta");
    const ganancia = redondear(entrada.venta - entrada.compra - entrada.gastos);
    const exencion = v["ie.cgt-annual-exemption"];
    const tasa = v["ie.cgt-rate"];
    const gravable = redondear(Math.max(0, ganancia - entrada.perdidas - exencion));
    const observaciones: string[] = [];
    if (ganancia < 0) observaciones.push("This is a loss, so there is no CGT to pay on it.");
    observaciones.push("Some gains pay other rates, such as 33% on development land and 40% on foreign life policies and foreign investment products.");
    return { impuesto: redondear((gravable * tasa) / 100), ganancia, exencion, gravable, tasa, observaciones };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Capital Gains Tax", formato: "moneda", destacada: true },
    { clave: "ganancia", etiqueta: "Chargeable gain", formato: "moneda" },
    { clave: "exencion", etiqueta: "Personal exemption", formato: "moneda" },
    { clave: "gravable", etiqueta: "Taxable gain", formato: "moneda" },
    { clave: "tasa", etiqueta: "CGT rate", formato: "porcentaje", decimales: 0 },
  ],
});
