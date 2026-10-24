import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "gh.casual-worker-tax",
  mercado: "gh",
  concepto: "propio",
  slug: "casual-worker-tax",
  estado: "publicado",
  requiere: {
    "gh.casual-worker-rate": "numero",
  },
  campos: [
    { id: "pago", tipo: "moneda", etiqueta: "Payment to the casual worker", min: 0, porDefecto: 1000 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.pago <= 0) throw new ErrorEntrada("Enter the payment.", "pago");
    const impuesto = redondear(porcentaje(entrada.pago, v["gh.casual-worker-rate"]));
    return { impuesto, neto: redondear(entrada.pago - impuesto) };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Tax to deduct", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Amount paid to the worker", formato: "moneda" },
  ],
});
