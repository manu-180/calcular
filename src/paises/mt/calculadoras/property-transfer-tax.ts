import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "mt.property-transfer-tax",
  mercado: "mt",
  concepto: "propio",
  slug: "property-transfer-tax",
  estado: "publicado",
  requiere: { "mt.property-transfer-tax": "mapa" },
  campos: [
    { id: "precio", tipo: "moneda", etiqueta: "Selling price or market value, whichever is higher", min: 0, porDefecto: 350000 },
    {
      id: "caso",
      tipo: "opcion",
      etiqueta: "The property",
      opciones: [
        { valor: "residence", etiqueta: "Was your home for the last three years or more" },
        { valor: "standard", etiqueta: "Was bought in 2004 or later, more than five years ago" },
        { valor: "within-5-years", etiqueta: "Was bought five years ago or less" },
        { valor: "before-2004", etiqueta: "Was bought before 1 January 2004" },
        { valor: "inherited-gain", etiqueta: "Was inherited after 24 November 1992" },
        { valor: "inherited-before-1992", etiqueta: "Was inherited before 25 November 1992" },
      ],
      porDefecto: "standard",
    },
    { id: "valorHerencia", tipo: "moneda", etiqueta: "Value declared when you inherited it", min: 0, porDefecto: 150000, visibleSi: { caso: ["inherited-gain"] } },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.precio <= 0) throw new ErrorEntrada("Enter the selling price.", "precio");
    const tasas = v["mt.property-transfer-tax"];
    const observaciones: string[] = [];
    if (entrada.caso === "residence") {
      observaciones.push("No tax is due if it was your own home for at least three years in a row before the sale and you sell within twelve months of moving out.");
      return { impuesto: 0, tasa: 0, base: entrada.precio, neto: entrada.precio, observaciones };
    }
    let base = entrada.precio;
    if (entrada.caso === "inherited-gain") {
      base = Math.max(0, entrada.precio - (entrada.valorHerencia ?? 0));
      observaciones.push("You can choose to pay the normal rate on the price instead of the rate on the gain, if that works out lower.");
    }
    if (entrada.caso === "within-5-years") observaciones.push("The 5% rate does not apply to property forming part of a project, or where works needing a permit were carried out in the five years before the sale.");
    const tasa = enMapa(tasas, entrada.caso);
    const impuesto = redondear(porcentaje(base, tasa));
    return { impuesto, tasa, base: redondear(base), neto: redondear(entrada.precio - impuesto), observaciones };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Final tax on the transfer", formato: "moneda", destacada: true },
    { clave: "tasa", etiqueta: "Rate", formato: "porcentaje", decimales: 0 },
    { clave: "base", etiqueta: "Amount taxed", formato: "moneda" },
    { clave: "neto", etiqueta: "You keep from the price", formato: "moneda" },
  ],
});
