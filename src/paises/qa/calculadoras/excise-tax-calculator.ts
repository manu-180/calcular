import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "qa.excise-tax-calculator",
  mercado: "qa",
  concepto: "propio",
  slug: "excise-tax-calculator",
  estado: "publicado",
  requiere: {
    "qa.excise": "mapa",
  },
  campos: [
    { id: "producto", tipo: "opcion-dato", etiqueta: "Product", dato: "qa.excise", porDefecto: "tobacco" },
    { id: "precio", tipo: "moneda", etiqueta: "Price", ayuda: "The higher of the standard price and the retail price.", min: 0, porDefecto: 25 },
    {
      id: "modo",
      tipo: "opcion",
      etiqueta: "The price you entered",
      opciones: [
        { valor: "sin", etiqueta: "Doesn't include excise tax" },
        { valor: "con", etiqueta: "Already includes excise tax" },
      ],
      porDefecto: "sin",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.precio <= 0) throw new ErrorEntrada("Enter the price.", "precio");
    const tasa = enMapa(v["qa.excise"], entrada.producto);
    const base = entrada.modo === "con" ? entrada.precio / (1 + tasa / 100) : entrada.precio;
    const impuesto = redondear(porcentaje(base, tasa));
    return { impuesto, base: redondear(base), final: redondear(base + impuesto), tasa };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Excise tax", formato: "moneda", destacada: true },
    { clave: "base", etiqueta: "Price before tax", formato: "moneda" },
    { clave: "final", etiqueta: "Price with tax", formato: "moneda" },
    { clave: "tasa", etiqueta: "Excise rate", formato: "porcentaje" },
  ],
});
