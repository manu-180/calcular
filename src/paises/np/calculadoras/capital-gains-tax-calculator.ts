import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "np.capital-gains-tax-calculator",
  mercado: "np",
  concepto: "propio",
  slug: "capital-gains-tax-calculator",
  estado: "publicado",
  requiere: { "np.capital-gains-rate": "mapa" },
  campos: [
    { id: "activo", tipo: "opcion-dato", etiqueta: "What you sold and how long you held it", dato: "np.capital-gains-rate", porDefecto: "land-long" },
    { id: "venta", tipo: "moneda", etiqueta: "Sale price", min: 0, porDefecto: 5000000 },
    { id: "costo", tipo: "moneda", etiqueta: "Cost of acquiring it", min: 0, porDefecto: 3000000, ayuda: "What you paid, plus the costs the law lets you add." },
  ],
  calcular(e, v, { redondear }) {
    if (e.venta <= 0) throw new ErrorEntrada("Enter the sale price.", "venta");
    const tasa = enMapa(v["np.capital-gains-rate"], e.activo);
    const ganancia = redondear(e.venta - e.costo);
    const impuesto = ganancia > 0 ? redondear(porcentaje(ganancia, tasa)) : 0;
    return {
      impuesto,
      ganancia,
      tasa,
      neto: redondear(e.venta - impuesto),
      observaciones: ganancia <= 0 ? ["There is no gain, so no capital gains tax is due."] : [],
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Capital gains tax", formato: "moneda", destacada: true },
    { clave: "ganancia", etiqueta: "Gain on the sale", formato: "moneda" },
    { clave: "tasa", etiqueta: "Rate applied", formato: "porcentaje", decimales: 1 },
    { clave: "neto", etiqueta: "Sale price after the tax", formato: "moneda" },
  ],
});
