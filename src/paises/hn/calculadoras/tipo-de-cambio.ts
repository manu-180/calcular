import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "hn.tipo-de-cambio",
  mercado: "hn",
  concepto: "tipo-de-cambio",
  slug: "tipo-de-cambio",
  estado: "publicado",
  requiere: {
    "hn.tipo-cambio": "serie",
  },
  campos: [
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "Qué quiere convertir",
      opciones: [
        { valor: "dolares-a-lempiras", etiqueta: "Dólares a lempiras" },
        { valor: "lempiras-a-dolares", etiqueta: "Lempiras a dólares" },
      ],
      porDefecto: "dolares-a-lempiras",
    },
    { id: "cantidad", tipo: "numero", etiqueta: "Cantidad", min: 0, porDefecto: 1 },
  ],
  calcular(entrada, valores, { redondear }) {
    const tipo = valores["hn.tipo-cambio"].valor;
    return {
      tipo,
      fecha: valores["hn.tipo-cambio"].fecha,
      lempiras: entrada.sentido === "dolares-a-lempiras" ? redondear(entrada.cantidad * tipo) : null,
      dolares: entrada.sentido === "lempiras-a-dolares" ? redondear(entrada.cantidad / tipo) : null,
      observaciones: ["Es el tipo de cambio de referencia que publica el Banco Central de Honduras. En bancos y casas de cambio el precio de compra y el de venta son otros."],
    };
  },
  resultado: [
    { clave: "tipo", etiqueta: "Lempiras por dólar", formato: "numero", decimales: 4 },
    { clave: "fecha", etiqueta: "Publicado para el", formato: "fecha" },
    { clave: "lempiras", etiqueta: "Equivale a", formato: "moneda", destacada: true },
    { clave: "dolares", etiqueta: "Equivale a (dólares)", formato: "numero", decimales: 2, destacada: true },
  ],
});
