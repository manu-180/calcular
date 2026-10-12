import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "pe.venta-inmueble",
  mercado: "pe",
  concepto: "propio",
  slug: "impuesto-venta-de-inmueble",
  estado: "publicado",
  requiere: {
    "pe.tasa-renta-capital": "numero",
    "pe.deduccion-renta-capital": "numero",
  },
  campos: [
    { id: "precioVenta", tipo: "moneda", etiqueta: "Precio de venta", min: 0 },
    {
      id: "costo",
      tipo: "moneda",
      etiqueta: "Lo que te costó el inmueble",
      ayuda: "Precio de compra más las mejoras que puedas sustentar con documentos.",
      min: 0,
    },
    { id: "casaHabitacion", tipo: "si-no", etiqueta: "Es la casa donde vives", porDefecto: false },
  ],
  calcular(entrada, valores, { redondear }) {
    const ganancia = redondear(Math.max(0, entrada.precioVenta - entrada.costo));
    const observaciones: string[] = [];
    if (entrada.casaHabitacion) {
      observaciones.push("La venta de la casa que ocupas como vivienda no es ganancia de capital gravada, si no tienes un negocio de compraventa de inmuebles. Revisa con SUNAT que cumplas las condiciones.");
      return { ganancia, deduccion: 0, rentaNeta: 0, impuesto: 0, observaciones };
    }
    if (ganancia === 0) observaciones.push("Si no hay ganancia, no se paga impuesto a la renta por la venta.");
    const deduccion = redondear(porcentaje(ganancia, valores["pe.deduccion-renta-capital"]));
    const rentaNeta = redondear(ganancia - deduccion);
    const impuesto = redondear(porcentaje(rentaNeta, valores["pe.tasa-renta-capital"]));
    observaciones.push("Es un pago definitivo que haces antes de firmar la escritura: el notario te pide el comprobante. Aplica a personas naturales que no venden inmuebles como negocio.");
    return { ganancia, deduccion, rentaNeta, impuesto, observaciones };
  },
  resultado: [
    { clave: "ganancia", etiqueta: "Ganancia por la venta", formato: "moneda" },
    { clave: "deduccion", etiqueta: "Deducción", formato: "moneda", ocultarSiCero: true },
    { clave: "rentaNeta", etiqueta: "Renta neta", formato: "moneda", ocultarSiCero: true },
    { clave: "impuesto", etiqueta: "Impuesto a la renta a pagar", formato: "moneda", destacada: true },
  ],
});
