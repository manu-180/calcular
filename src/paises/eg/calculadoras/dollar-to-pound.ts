import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

// Borrador: el tipo de cambio del Banco Central de Egipto no se pudo leer (cbe.org.eg responde 403
// fuera de Egipto). Cuando se verifique, conviene pasarlo a una serie diaria con su detector.
export default definirCalculadora({
  id: "eg.dollar-to-pound",
  mercado: "eg",
  concepto: "tipo-de-cambio",
  slug: "dollar-to-pound",
  estado: "borrador",
  requiere: { "eg.usd-rate": "numero" },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "المبلغ", min: 0, porDefecto: 100 },
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "التحويل",
      opciones: [
        { valor: "usd-egp", etiqueta: "من الدولار إلى الجنيه" },
        { valor: "egp-usd", etiqueta: "من الجنيه إلى الدولار" },
      ],
      porDefecto: "usd-egp",
    },
  ],
  calcular(e, v, { redondear }) {
    const tasa = v["eg.usd-rate"];
    if (tasa <= 0) throw new ErrorEntrada("سعر الصرف غير متاح الآن.", "monto");
    const resultado = e.sentido === "usd-egp" ? e.monto * tasa : e.monto / tasa;
    return { resultado: redondear(resultado), tasa };
  },
  resultado: [
    { clave: "resultado", etiqueta: "المبلغ بعد التحويل", formato: "numero", decimales: 2, destacada: true },
    { clave: "tasa", etiqueta: "سعر الدولار بالجنيه", formato: "numero", decimales: 4 },
  ],
});
