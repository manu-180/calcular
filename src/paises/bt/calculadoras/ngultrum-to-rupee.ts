import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

// Borrador: la paridad 1:1 con la rupia india no se pudo leer en una página del RMA (ver datos.json).
export default definirCalculadora({
  id: "bt.ngultrum-to-rupee",
  mercado: "bt",
  concepto: "tipo-de-cambio",
  slug: "ngultrum-to-rupee",
  estado: "borrador",
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
