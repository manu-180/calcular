import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "us.sales-tax",
  mercado: "us",
  concepto: "iva",
  slug: "sales-tax",
  estado: "publicado",
  requiere: {},
  campos: [
    {
      id: "modo",
      tipo: "opcion",
      etiqueta: "What do you want to do?",
      opciones: [
        { valor: "sumar", etiqueta: "Add sales tax to a price" },
        { valor: "quitar", etiqueta: "Remove sales tax from a total" },
      ],
      porDefecto: "sumar",
    },
    { id: "monto", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 100 },
    {
      id: "tasa",
      tipo: "porcentaje",
      etiqueta: "Combined sales tax rate",
      min: 0,
      max: 30,
      porDefecto: 8,
      ayuda: "State rate plus county, city and district rates where you buy. It's printed on your receipt.",
    },
  ],
  calcular(entrada, _valores, { redondear }) {
    if (entrada.modo === "sumar") {
      const impuesto = redondear(porcentaje(entrada.monto, entrada.tasa));
      return { antes: redondear(entrada.monto), impuesto, total: redondear(entrada.monto + impuesto) };
    }
    if (entrada.modo === "quitar") {
      const antes = redondear(entrada.monto / (1 + entrada.tasa / 100));
      return { antes, impuesto: redondear(entrada.monto - antes), total: redondear(entrada.monto) };
    }
    throw new ErrorEntrada({ codigo: "opcion-invalida" });
  },
  resultado: [
    { clave: "antes", etiqueta: "Price before tax", formato: "moneda" },
    { clave: "impuesto", etiqueta: "Sales tax", formato: "moneda" },
    { clave: "total", etiqueta: "Total with tax", formato: "moneda", destacada: true },
  ],
});
