import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "qa.qar-usd-converter",
  mercado: "qa",
  concepto: "tipo-de-cambio",
  slug: "qar-usd-converter",
  estado: "publicado",
  requiere: {
    "qa.usd-peg": "numero",
  },
  campos: [
    { id: "monto", tipo: "numero", etiqueta: "Amount", min: 0, porDefecto: 1000 },
    {
      id: "direccion",
      tipo: "opcion",
      etiqueta: "Convert",
      opciones: [
        { valor: "usd-qar", etiqueta: "US dollars to Qatari riyals" },
        { valor: "qar-usd", etiqueta: "Qatari riyals to US dollars" },
      ],
      porDefecto: "usd-qar",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.monto <= 0) throw new ErrorEntrada("Enter an amount.", "monto");
    const tasa = v["qa.usd-peg"];
    const qar = entrada.direccion === "usd-qar" ? entrada.monto * tasa : entrada.monto;
    const usd = entrada.direccion === "usd-qar" ? entrada.monto : entrada.monto / tasa;
    return {
      resultado: redondear(entrada.direccion === "usd-qar" ? qar : usd),
      qar: redondear(qar),
      usd: redondear(usd),
      tasa,
      observaciones: ["Banks and exchange houses add their own margin, so the rate you get can differ slightly."],
    };
  },
  resultado: [
    { clave: "resultado", etiqueta: "Converted amount", formato: "numero", decimales: 2, destacada: true },
    { clave: "qar", etiqueta: "Qatari riyals", formato: "moneda" },
    { clave: "usd", etiqueta: "US dollars", formato: "numero", decimales: 2 },
    { clave: "tasa", etiqueta: "Official rate (riyals per dollar)", formato: "numero", decimales: 2 },
  ],
});
