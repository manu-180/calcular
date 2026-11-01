import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "lk.capital-gains-tax-calculator",
  mercado: "lk",
  concepto: "propio",
  slug: "capital-gains-tax-calculator",
  estado: "publicado",
  requiere: {
    "lk.cgt-rate": "numero",
  },
  campos: [
    { id: "precio", tipo: "moneda", etiqueta: "Sale price (consideration received)", min: 0, porDefecto: 20000000 },
    { id: "mercado", tipo: "moneda", etiqueta: "Market value when you sold", min: 0, requerido: false, ayuda: "If it is higher than the price, the gain is worked out on the market value." },
    { id: "costo", tipo: "moneda", etiqueta: "Cost of the asset", min: 0, porDefecto: 12000000, ayuda: "What you paid for it plus the costs of buying and improving it." },
  ],
  calcular(e, v, { redondear }) {
    if (e.precio <= 0) throw new ErrorEntrada("Enter the sale price.", "precio");
    const valor = Math.max(e.precio, e.mercado ?? 0);
    const ganancia = valor - e.costo;
    const tasa = v["lk.cgt-rate"];
    const impuesto = ganancia > 0 ? redondear(porcentaje(ganancia, tasa)) : 0;
    const observaciones: string[] = [];
    if (ganancia <= 0) observaciones.push("There is no gain, so there is no capital gains tax.");
    return {
      impuesto,
      valor,
      ganancia: Math.max(0, ganancia),
      perdida: ganancia < 0 ? -ganancia : 0,
      tasa,
      neto: redondear(e.precio - impuesto),
      observaciones,
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Capital gains tax", formato: "moneda", destacada: true },
    { clave: "valor", etiqueta: "Value used for the gain", formato: "moneda" },
    { clave: "ganancia", etiqueta: "Gain", formato: "moneda" },
    { clave: "perdida", etiqueta: "Loss", formato: "moneda", ocultarSiCero: true },
    { clave: "tasa", etiqueta: "Rate", formato: "porcentaje", decimales: 0 },
    { clave: "neto", etiqueta: "Sale price after the tax", formato: "moneda" },
  ],
});
