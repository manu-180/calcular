import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "py.irp-venta-inmueble",
  mercado: "py",
  concepto: "propio",
  slug: "irp-venta-inmueble",
  estado: "publicado",
  requiere: {
    "py.irp-capital-tasa": "numero",
    "py.irp-venta-presunta": "numero",
  },
  campos: [
    { id: "precio", tipo: "moneda", etiqueta: "Precio de venta", min: 0 },
    {
      id: "costo",
      tipo: "moneda",
      etiqueta: "Precio de compra",
      ayuda: "Solo si lo podés probar con la escritura inscripta o comprobantes. Si no, dejalo vacío.",
      min: 0,
      requerido: false,
    },
    { id: "gastos", tipo: "moneda", etiqueta: "Gastos de la venta con comprobante", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    const presunta = redondear(porcentaje(entrada.precio, valores["py.irp-venta-presunta"]));
    // Ley 6380, art. 59, num. 1: la ganancia real solo vale si el costo está respaldado.
    const real = entrada.costo === null ? null : Math.max(0, entrada.precio - entrada.costo - entrada.gastos);
    const rentaNeta = real === null ? presunta : Math.min(presunta, real);
    return {
      presunta,
      real,
      rentaNeta,
      impuesto: redondear(porcentaje(rentaNeta, valores["py.irp-capital-tasa"])),
      observaciones: [
        `La ley toma la menor entre el ${valores["py.irp-venta-presunta"]} % del precio y la ganancia real.`,
        "El impuesto se suele cobrar al firmar la escritura, como pago único y definitivo.",
        "La venta por expropiación no paga IRP.",
      ],
    };
  },
  resultado: [
    { clave: "presunta", etiqueta: "Renta presunta (sobre el precio)", formato: "moneda" },
    { clave: "real", etiqueta: "Ganancia real", formato: "moneda" },
    { clave: "rentaNeta", etiqueta: "Renta neta que paga", formato: "moneda" },
    { clave: "impuesto", etiqueta: "IRP a pagar", formato: "moneda", destacada: true },
  ],
});
