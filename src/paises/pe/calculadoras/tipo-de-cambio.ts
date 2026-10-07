import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "pe.tipo-de-cambio",
  mercado: "pe",
  concepto: "tipo-de-cambio",
  slug: "tipo-de-cambio",
  estado: "publicado",
  requiere: {
    "pe.tc-sunat-compra": "serie",
    "pe.tc-sunat-venta": "serie",
  },
  campos: [
    {
      id: "direccion",
      tipo: "opcion",
      etiqueta: "Qué quieres convertir",
      opciones: [
        { valor: "dolares-a-soles", etiqueta: "Dólares a soles" },
        { valor: "soles-a-dolares", etiqueta: "Soles a dólares" },
      ],
      porDefecto: "dolares-a-soles",
    },
    { id: "monto", tipo: "numero", etiqueta: "Monto", min: 0, porDefecto: 100 },
  ],
  calcular(entrada, valores, { redondear }) {
    const compra = valores["pe.tc-sunat-compra"].valor;
    const venta = valores["pe.tc-sunat-venta"].valor;
    const aSoles = entrada.direccion === "dolares-a-soles";
    return {
      compra,
      venta,
      fecha: valores["pe.tc-sunat-venta"].fecha,
      moneda: aSoles ? "Soles" : "Dólares",
      conVenta: redondear(aSoles ? entrada.monto * venta : entrada.monto / venta),
      conCompra: redondear(aSoles ? entrada.monto * compra : entrada.monto / compra),
    };
  },
  resultado: [
    { clave: "venta", etiqueta: "Tipo de cambio venta", formato: "numero", decimales: 3 },
    { clave: "compra", etiqueta: "Tipo de cambio compra", formato: "numero", decimales: 3 },
    { clave: "fecha", etiqueta: "Publicado por SUNAT el", formato: "fecha" },
    { clave: "moneda", etiqueta: "Moneda del resultado", formato: "texto" },
    { clave: "conVenta", etiqueta: "Con el tipo de cambio venta", formato: "numero", decimales: 2, destacada: true },
    { clave: "conCompra", etiqueta: "Con el tipo de cambio compra", formato: "numero", decimales: 2 },
  ],
});
