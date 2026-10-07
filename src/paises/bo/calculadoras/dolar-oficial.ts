import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "bo.dolar-oficial",
  mercado: "bo",
  concepto: "tipo-de-cambio",
  slug: "dolar-oficial",
  estado: "publicado",
  requiere: {
    "bo.dolar": "serie",
  },
  campos: [
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "Qué quiere convertir",
      opciones: [
        { valor: "a-bolivianos", etiqueta: "De dólares a bolivianos" },
        { valor: "a-dolares", etiqueta: "De bolivianos a dólares" },
      ],
      porDefecto: "a-bolivianos",
    },
    { id: "monto", tipo: "numero", etiqueta: "Monto", min: 0, porDefecto: 100 },
  ],
  calcular(entrada, valores, { redondear }) {
    const dolar = valores["bo.dolar"];
    const aBolivianos = entrada.sentido === "a-bolivianos";
    return {
      bolivianos: aBolivianos ? redondear(entrada.monto * dolar.valor) : null,
      dolares: aBolivianos ? null : redondear(entrada.monto / dolar.valor),
      cotizacion: dolar.valor,
      fecha: dolar.fecha,
      observaciones: [
        "Es el Tipo de Cambio Oficial (TCO) del Banco Central de Bolivia para ese día. Bancos y casas de cambio compran y venden con su propio precio, que puede ser distinto.",
      ],
    };
  },
  resultado: [
    { clave: "bolivianos", etiqueta: "Equivale a", formato: "moneda", destacada: true },
    { clave: "dolares", etiqueta: "Equivale a", formato: "moneda", moneda: "USD", destacada: true },
    { clave: "cotizacion", etiqueta: "Tipo de Cambio Oficial (Bs por dólar)", formato: "moneda" },
    { clave: "fecha", etiqueta: "Rige el", formato: "fecha" },
  ],
});
