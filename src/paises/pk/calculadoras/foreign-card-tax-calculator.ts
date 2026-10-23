import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "pk.foreign-card-tax-calculator",
  mercado: "pk",
  concepto: "propio",
  slug: "foreign-card-tax-calculator",
  estado: "publicado",
  requiere: {
    "pk.wht-foreign-card": "numero",
  },
  campos: [{ id: "monto", tipo: "moneda", etiqueta: "Amount paid abroad or in foreign currency (in rupees)", min: 0, porDefecto: 100000 }],
  calcular(entrada, v, { redondear }) {
    if (entrada.monto < 0) throw new ErrorEntrada("The amount cannot be negative.", "monto");
    const impuesto = redondear(porcentaje(entrada.monto, v["pk.wht-foreign-card"]));
    return { impuesto, total: redondear(entrada.monto + impuesto) };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Advance tax on the card payment", formato: "moneda", destacada: true },
    { clave: "total", etiqueta: "Total charged", formato: "moneda" },
  ],
});
