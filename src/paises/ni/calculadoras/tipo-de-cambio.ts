import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "ni.tipo-de-cambio",
  mercado: "ni",
  concepto: "tipo-de-cambio",
  slug: "tipo-de-cambio",
  estado: "publicado",
  requiere: {
    "ni.tipo-cambio": "serie",
  },
  campos: [
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "Qué querés convertir",
      opciones: [
        { valor: "a-cordobas", etiqueta: "De dólares a córdobas" },
        { valor: "a-dolares", etiqueta: "De córdobas a dólares" },
      ],
      porDefecto: "a-cordobas",
    },
    { id: "monto", tipo: "numero", etiqueta: "Monto", min: 0, porDefecto: 100 },
  ],
  calcular(entrada, valores, { redondear }) {
    const tc = valores["ni.tipo-cambio"];
    const aCordobas = entrada.sentido === "a-cordobas";
    return {
      tipoCambio: tc.valor,
      fecha: tc.fecha,
      cordobas: aCordobas ? redondear(entrada.monto * tc.valor) : null,
      dolares: aCordobas ? null : redondear(entrada.monto / tc.valor),
      observaciones: [
        "Es el tipo de cambio oficial que publica el Banco Central de Nicaragua para cada día. Bancos y casas de cambio compran y venden con su propio margen.",
      ],
    };
  },
  resultado: [
    { clave: "cordobas", etiqueta: "Equivale a", formato: "moneda", destacada: true },
    { clave: "dolares", etiqueta: "Equivale a", formato: "moneda", moneda: "USD", destacada: true },
    { clave: "tipoCambio", etiqueta: "Tipo de cambio oficial (córdobas por dólar)", formato: "numero", decimales: 4 },
    { clave: "fecha", etiqueta: "Fecha", formato: "fecha" },
  ],
});
