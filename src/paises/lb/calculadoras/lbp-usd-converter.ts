import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

// Borrador: bdl.gov.lb responde 403 y no se elude. El 89.500 del Citizen Budget 2026 es una estimación
// del presupuesto, no el cambio oficial: no alcanza para verificar.
export default definirCalculadora({
  id: "lb.lbp-usd-converter",
  mercado: "lb",
  concepto: "tipo-de-cambio",
  slug: "lbp-usd-converter",
  estado: "borrador",
  requiere: { "lb.usd-rate": "numero" },
  campos: [
    { id: "importe", tipo: "numero", etiqueta: "المبلغ", min: 0, porDefecto: 100 },
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "التحويل",
      opciones: [
        { valor: "usd-lbp", etiqueta: "من الدولار إلى الليرة" },
        { valor: "lbp-usd", etiqueta: "من الليرة إلى الدولار" },
      ],
      porDefecto: "usd-lbp",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.importe <= 0) throw new ErrorEntrada("أدخل المبلغ.", "importe");
    const tasa = v["lb.usd-rate"];
    return { resultado: e.sentido === "usd-lbp" ? redondear(e.importe * tasa) : Math.round((e.importe / tasa) * 100) / 100, tasa };
  },
  resultado: [
    { clave: "resultado", etiqueta: "المبلغ بعد التحويل", formato: "numero", decimales: 2, destacada: true },
    { clave: "tasa", etiqueta: "ليرة لكل دولار", formato: "numero", decimales: 0 },
  ],
});
