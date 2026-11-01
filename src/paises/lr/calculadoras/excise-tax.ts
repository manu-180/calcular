import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "lr.excise-tax",
  mercado: "lr",
  concepto: "propio",
  slug: "excise-tax",
  estado: "publicado",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  requiere: {
    "lr.excise-specific": "mapa",
  },
  campos: [
    { id: "producto", tipo: "opcion-dato", etiqueta: "Product", dato: "lr.excise-specific", porDefecto: "beer" },
    {
      id: "cantidad",
      tipo: "numero",
      etiqueta: "Quantity in the unit shown (litres, packs, kg or mL)",
      min: 0,
      porDefecto: 100,
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.cantidad <= 0) throw new ErrorEntrada("Enter a quantity above zero.", "cantidad");
    const tasa = enMapa(v["lr.excise-specific"], entrada.producto);
    return { impuesto: redondear(tasa * entrada.cantidad), tasa };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Excise tax", formato: "moneda", moneda: "USD", destacada: true },
    { clave: "tasa", etiqueta: "Rate per unit", formato: "moneda", moneda: "USD" },
  ],
});
