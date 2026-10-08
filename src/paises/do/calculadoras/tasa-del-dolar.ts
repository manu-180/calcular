import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "do.tasa-del-dolar",
  mercado: "do",
  concepto: "tipo-de-cambio",
  slug: "tasa-del-dolar",
  estado: "publicado",
  requiere: {
    "do.dolar-compra": "serie",
    "do.dolar-venta": "serie",
  },
  campos: [
    {
      id: "direccion",
      tipo: "opcion",
      etiqueta: "Qué quieres convertir",
      opciones: [
        { valor: "usd-a-dop", etiqueta: "Dólares a pesos (vendes dólares)" },
        { valor: "dop-a-usd", etiqueta: "Pesos a dólares (compras dólares)" },
      ],
      porDefecto: "usd-a-dop",
    },
    { id: "monto", tipo: "numero", etiqueta: "Monto", min: 0, porDefecto: 100 },
  ],
  calcular(entrada, valores, { redondear }) {
    const compra = valores["do.dolar-compra"];
    const venta = valores["do.dolar-venta"];
    const fecha = compra.fecha < venta.fecha ? compra.fecha : venta.fecha;
    if (entrada.direccion === "usd-a-dop") return { compra: compra.valor, venta: venta.valor, fecha, pesos: redondear(entrada.monto * compra.valor), dolares: null };
    return { compra: compra.valor, venta: venta.valor, fecha, pesos: null, dolares: redondear(entrada.monto / venta.valor) };
  },
  resultado: [
    { clave: "compra", etiqueta: "Tasa de compra", formato: "moneda", decimales: 4 },
    { clave: "venta", etiqueta: "Tasa de venta", formato: "moneda", decimales: 4 },
    { clave: "fecha", etiqueta: "Tasa del día", formato: "fecha" },
    { clave: "pesos", etiqueta: "Recibes en pesos", formato: "moneda", destacada: true },
    { clave: "dolares", etiqueta: "Recibes en dólares", formato: "numero", decimales: 2, destacada: true },
  ],
});
