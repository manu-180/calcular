import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "do.impuesto-transferencias",
  mercado: "do",
  concepto: "propio",
  slug: "impuesto-transferencias",
  estado: "publicado",
  requiere: {
    "do.impuesto-transferencias": "numero",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Monto del cheque o la transferencia", min: 0 },
    { id: "cantidad", tipo: "entero", etiqueta: "Cuántas veces al mes", min: 1, porDefecto: 1 },
  ],
  calcular(entrada, valores, { redondear }) {
    const tasa = valores["do.impuesto-transferencias"];
    const impuesto = redondear(porcentaje(entrada.monto, tasa));
    return {
      tasa,
      impuesto,
      mensual: redondear(impuesto * entrada.cantidad),
      anual: redondear(impuesto * entrada.cantidad * 12),
      observaciones: [
        "No pagan este impuesto los retiros de efectivo, las transferencias entre tus propias cuentas, el consumo con tarjeta de crédito, los pagos a la Seguridad Social ni los pagos de impuestos al Estado.",
        "Lo descuenta el banco al hacer la operación.",
      ],
    };
  },
  resultado: [
    { clave: "tasa", etiqueta: "Tasa del impuesto", formato: "porcentaje", decimales: 2 },
    { clave: "impuesto", etiqueta: "Impuesto por operación", formato: "moneda", destacada: true },
    { clave: "mensual", etiqueta: "Impuesto del mes", formato: "moneda" },
    { clave: "anual", etiqueta: "Impuesto en un año", formato: "moneda" },
  ],
});
