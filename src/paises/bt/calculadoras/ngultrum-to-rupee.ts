import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "bt.ngultrum-to-rupee",
  mercado: "bt",
  concepto: "propio",
  slug: "ngultrum-to-rupee",
  estado: "publicado",
  requiere: {
    "bt.inr-per-btn": "numero",
  },
  campos: [
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "Convert",
      opciones: [
        { valor: "btn-inr", etiqueta: "Ngultrum to Indian rupees" },
        { valor: "inr-btn", etiqueta: "Indian rupees to ngultrum" },
      ],
      porDefecto: "btn-inr",
    },
    { id: "monto", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 1000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.monto < 0) throw new ErrorEntrada("The amount cannot be negative.", "monto");
    const tasa = v["bt.inr-per-btn"];
    return { resultado: redondear(e.sentido === "btn-inr" ? e.monto * tasa : e.monto / tasa), tasa };
  },
  resultado: [
    { clave: "resultado", etiqueta: "Converted amount", formato: "numero", decimales: 2, destacada: true },
    { clave: "tasa", etiqueta: "Indian rupees per ngultrum", formato: "numero", decimales: 2 },
  ],
});
