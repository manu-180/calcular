import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "bb.property-transfer-tax-calculator",
  mercado: "bb",
  concepto: "propio",
  // Borrador: la parte exenta de la vivienda no se pudo verificar en el texto de la ley.
  estado: "borrador",
  slug: "property-transfer-tax-calculator",
  requiere: {
    "bb.property-transfer-tax-rate": "numero",
    "bb.property-transfer-tax-exemption": "numero",
  },
  campos: [
    { id: "precio", tipo: "moneda", etiqueta: "Sale price", min: 0, porDefecto: 600000 },
    {
      id: "vivienda",
      tipo: "opcion",
      etiqueta: "Is there a dwelling house on the land?",
      opciones: [
        { valor: "si", etiqueta: "Yes" },
        { valor: "no", etiqueta: "No, vacant land or other property" },
      ],
      porDefecto: "si",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.precio <= 0) throw new ErrorEntrada("Enter the sale price.", "precio");
    const exento = e.vivienda === "si" ? Math.min(e.precio, v["bb.property-transfer-tax-exemption"]) : 0;
    const base = e.precio - exento;
    return {
      exento,
      base,
      impuesto: redondear(porcentaje(base, v["bb.property-transfer-tax-rate"])),
      observaciones: ["Check the Property Transfer Tax Act and the BRA for reliefs that depend on who sells and how long they owned the property."],
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Property transfer tax", formato: "moneda", destacada: true },
    { clave: "base", etiqueta: "Taxable part of the price", formato: "moneda" },
    { clave: "exento", etiqueta: "Exempt part of the price", formato: "moneda" },
  ],
});
