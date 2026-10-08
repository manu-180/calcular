import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "bo.iva",
  mercado: "bo",
  concepto: "iva",
  slug: "iva",
  estado: "publicado",
  requiere: {
    "bo.iva": "numero",
    "bo.it": "numero",
  },
  campos: [
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "Qué tiene",
      opciones: [
        { valor: "precio", etiqueta: "El precio con factura y quiero ver los impuestos" },
        { valor: "neto", etiqueta: "Lo que quiero recibir limpio y quiero saber cuánto facturar" },
      ],
      porDefecto: "precio",
    },
    { id: "monto", tipo: "moneda", etiqueta: "Monto", min: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    const iva = valores["bo.iva"];
    const it = valores["bo.it"];
    // El IVA boliviano va dentro del precio (Ley 843, art. 5): se calcula sobre el total facturado, igual que el IT.
    const precio = entrada.sentido === "precio" ? entrada.monto : redondear(entrada.monto / (1 - (iva + it) / 100));
    const montoIva = redondear(porcentaje(precio, iva));
    const montoIt = redondear(porcentaje(precio, it));
    return {
      precio,
      iva: montoIva,
      it: montoIt,
      neto: redondear(precio - montoIva - montoIt),
      observaciones: [
        "El IVA va incluido en el precio y no se muestra por separado en la factura.",
        "No restamos el crédito fiscal de sus compras, que baja el IVA a pagar.",
      ],
    };
  },
  resultado: [
    { clave: "precio", etiqueta: "Precio con factura", formato: "moneda", destacada: true },
    { clave: "iva", etiqueta: "IVA incluido", formato: "moneda" },
    { clave: "it", etiqueta: "Impuesto a las Transacciones (IT)", formato: "moneda" },
    { clave: "neto", etiqueta: "Le queda sin IVA ni IT", formato: "moneda" },
  ],
});
