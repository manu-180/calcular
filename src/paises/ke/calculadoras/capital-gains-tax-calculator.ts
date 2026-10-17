import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ke.capital-gains-tax-calculator",
  mercado: "ke",
  concepto: "propio",
  slug: "capital-gains-tax-calculator",
  estado: "publicado",
  requiere: {
    "ke.cgt-rate": "numero",
  },
  campos: [
    { id: "venta", tipo: "moneda", etiqueta: "Transfer value (sale price)", min: 0, porDefecto: 10000000 },
    { id: "costo", tipo: "moneda", etiqueta: "What you paid for it, with purchase costs", min: 0, porDefecto: 6000000, ayuda: "Include stamp duty, legal fees and valuation fees you paid when you bought." },
    { id: "mejoras", tipo: "moneda", etiqueta: "Cost of improvements", min: 0, porDefecto: 500000 },
    { id: "gastosVenta", tipo: "moneda", etiqueta: "Costs of selling", min: 0, porDefecto: 300000, ayuda: "Agent commission, legal fees and similar costs of the sale." },
  ],
  calcular(e, v, { redondear }) {
    if (e.venta <= 0) throw new ErrorEntrada("Enter the transfer value.", "venta");
    const ganancia = redondear(e.venta - e.gastosVenta - e.costo - e.mejoras);
    const impuesto = ganancia > 0 ? redondear(porcentaje(ganancia, v["ke.cgt-rate"])) : 0;
    const observaciones: string[] = [];
    if (ganancia <= 0) observaciones.push("There is no gain, so no capital gains tax is due.");
    return {
      impuesto,
      ganancia,
      neto: redondear(e.venta - e.gastosVenta - impuesto),
      tasa: v["ke.cgt-rate"],
      observaciones,
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Capital gains tax", formato: "moneda", destacada: true },
    { clave: "ganancia", etiqueta: "Net gain", formato: "moneda" },
    { clave: "neto", etiqueta: "What you keep after costs and tax", formato: "moneda" },
    { clave: "tasa", etiqueta: "Rate on the net gain", formato: "porcentaje", decimales: 0 },
  ],
});
