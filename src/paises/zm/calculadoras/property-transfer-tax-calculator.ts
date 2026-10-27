import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "zm.property-transfer-tax-calculator",
  mercado: "zm",
  concepto: "propio",
  slug: "property-transfer-tax-calculator",
  estado: "publicado",
  requiere: {
    "zm.ptt-rates": "mapa",
  },
  campos: [
    { id: "tipo", tipo: "opcion-dato", dato: "zm.ptt-rates", etiqueta: "What is being transferred", porDefecto: "land" },
    {
      id: "valor",
      tipo: "moneda",
      etiqueta: "Realised value",
      min: 0,
      porDefecto: 1000000,
      ayuda: "For land, the higher of the market value and the price agreed by the parties.",
    },
    { id: "regalo", tipo: "si-no", etiqueta: "It is a gift to a spouse, child, adopted child or stepchild", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.valor <= 0) throw new ErrorEntrada("Enter the realised value.", "valor");
    const tasa = enMapa(v["zm.ptt-rates"], e.tipo);
    if (e.regalo) {
      return {
        impuesto: 0,
        tasa,
        observaciones: ["A gift to immediate family has no realised value, so no tax is due. The seller still files a PTT return marked as exempt."],
      };
    }
    return { impuesto: redondear(porcentaje(e.valor, tasa)), tasa, observaciones: [] };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Property transfer tax", formato: "moneda", destacada: true },
    { clave: "tasa", etiqueta: "Rate", formato: "porcentaje", decimales: 0 },
  ],
});
