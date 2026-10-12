import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "hn.retencion-uno-por-ciento",
  mercado: "hn",
  concepto: "propio",
  slug: "retencion-uno-por-ciento",
  estado: "publicado",
  requiere: {
    "hn.retencion-proveedores": "numero",
    "hn.retencion-proveedores-ventas-minimas": "numero",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Valor de la compra o del servicio, sin ISV", min: 0 },
    { id: "pagosACuenta", tipo: "si-no", etiqueta: "El proveedor está en el régimen de pagos a cuenta", porDefecto: false },
  ],
  calcular(entrada, valores, { redondear }) {
    const tasa = valores["hn.retencion-proveedores"];
    const retencion = entrada.pagosACuenta ? 0 : redondear(porcentaje(entrada.monto, tasa));
    const observaciones = entrada.pagosACuenta
      ? ["A los proveedores que están en pagos a cuenta autorizados por el SAR no se les retiene."]
      : ["Para el proveedor, la retención es un anticipo de su ISR: la resta en su declaración anual con el comprobante de retención."];
    return { tasa: entrada.pagosACuenta ? 0 : tasa, retencion, pago: redondear(entrada.monto - retencion), observaciones };
  },
  resultado: [
    { clave: "tasa", etiqueta: "Retención", formato: "porcentaje" },
    { clave: "retencion", etiqueta: "Monto retenido", formato: "moneda", destacada: true },
    { clave: "pago", etiqueta: "Lo que se paga al proveedor (sin ISV)", formato: "moneda" },
  ],
});
