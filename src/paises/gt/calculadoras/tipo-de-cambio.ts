import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "gt.tipo-de-cambio",
  mercado: "gt",
  concepto: "tipo-de-cambio",
  slug: "tipo-de-cambio",
  estado: "publicado",
  requiere: {
    "gt.tipo-cambio": "serie",
  },
  campos: [
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "Qué quiere convertir",
      opciones: [
        { valor: "dolares-a-quetzales", etiqueta: "Dólares a quetzales" },
        { valor: "quetzales-a-dolares", etiqueta: "Quetzales a dólares" },
      ],
      porDefecto: "dolares-a-quetzales",
    },
    { id: "cantidad", tipo: "numero", etiqueta: "Cantidad", min: 0, porDefecto: 1 },
  ],
  calcular(entrada, valores, { redondear }) {
    const tipo = valores["gt.tipo-cambio"].valor;
    return {
      tipo,
      fecha: valores["gt.tipo-cambio"].fecha,
      quetzales: entrada.sentido === "dolares-a-quetzales" ? redondear(entrada.cantidad * tipo) : null,
      dolares: entrada.sentido === "quetzales-a-dolares" ? redondear(entrada.cantidad / tipo) : null,
      observaciones: ["Es el tipo de cambio de referencia del Banco de Guatemala. En bancos y casas de cambio el precio de compra y de venta es otro."],
    };
  },
  resultado: [
    { clave: "tipo", etiqueta: "Quetzales por dólar", formato: "numero", decimales: 5 },
    { clave: "fecha", etiqueta: "Vigente para el", formato: "fecha" },
    { clave: "quetzales", etiqueta: "Equivale a", formato: "moneda", destacada: true },
    { clave: "dolares", etiqueta: "Equivale a (dólares)", formato: "numero", decimales: 2, destacada: true },
  ],
});
