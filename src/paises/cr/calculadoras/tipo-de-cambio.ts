import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "cr.tipo-de-cambio",
  mercado: "cr",
  concepto: "tipo-de-cambio",
  slug: "tipo-de-cambio",
  estado: "publicado",
  requiere: {
    "cr.tipo-cambio-compra": "serie",
    "cr.tipo-cambio-venta": "serie",
  },
  campos: [
    {
      id: "direccion",
      tipo: "opcion",
      etiqueta: "Qué desea convertir",
      opciones: [
        { valor: "usd-a-crc", etiqueta: "Dólares a colones (vender dólares)" },
        { valor: "crc-a-usd", etiqueta: "Colones a dólares (comprar dólares)" },
      ],
      porDefecto: "usd-a-crc",
    },
    { id: "monto", tipo: "numero", etiqueta: "Monto", min: 0, porDefecto: 100 },
  ],
  calcular(entrada, valores, { redondear }) {
    const compra = valores["cr.tipo-cambio-compra"];
    const venta = valores["cr.tipo-cambio-venta"];
    if (entrada.direccion === "usd-a-crc") {
      return { compra: compra.valor, venta: venta.valor, fecha: compra.fecha, colones: redondear(entrada.monto * compra.valor), dolares: null };
    }
    return { compra: compra.valor, venta: venta.valor, fecha: venta.fecha, colones: null, dolares: redondear(entrada.monto / venta.valor) };
  },
  resultado: [
    { clave: "compra", etiqueta: "Tipo de cambio de referencia de compra", formato: "moneda" },
    { clave: "venta", etiqueta: "Tipo de cambio de referencia de venta", formato: "moneda" },
    { clave: "fecha", etiqueta: "Fecha del tipo de cambio", formato: "fecha" },
    { clave: "colones", etiqueta: "Valor en colones", formato: "moneda", destacada: true },
    { clave: "dolares", etiqueta: "Valor en dólares", formato: "numero", decimales: 2, destacada: true },
  ],
});
