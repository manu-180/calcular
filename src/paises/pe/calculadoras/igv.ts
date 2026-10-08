import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "pe.igv",
  mercado: "pe",
  concepto: "iva",
  slug: "igv",
  estado: "publicado",
  requiere: {
    "pe.tasa-igv": "numero",
    "pe.tasa-ipm": "numero",
    "pe.tasa-igv-restaurantes": "numero",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Monto", min: 0 },
    {
      id: "operacion",
      tipo: "opcion",
      etiqueta: "Qué quieres hacer",
      opciones: [
        { valor: "agregar", etiqueta: "Agregar el IGV a un precio sin impuesto" },
        { valor: "quitar", etiqueta: "Quitar el IGV de un precio que ya lo incluye" },
      ],
      porDefecto: "agregar",
    },
    {
      id: "tasa",
      tipo: "opcion",
      etiqueta: "Tasa",
      opciones: [
        { valor: "general", etiqueta: "General" },
        { valor: "restaurantes", etiqueta: "Restaurantes, hoteles y alojamientos MYPE (tasa especial)" },
      ],
      porDefecto: "general",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const tasaIgv = entrada.tasa === "restaurantes" ? valores["pe.tasa-igv-restaurantes"] : valores["pe.tasa-igv"];
    const tasaIpm = valores["pe.tasa-ipm"];
    const tasaTotal = tasaIgv + tasaIpm;
    let base: number;
    let igv: number;
    let ipm: number;
    if (entrada.operacion === "agregar") {
      base = redondear(entrada.monto);
      igv = redondear(porcentaje(base, tasaIgv));
      ipm = redondear(porcentaje(base, tasaIpm));
    } else {
      base = redondear(entrada.monto / (1 + tasaTotal / 100));
      const impuestos = redondear(entrada.monto - base);
      igv = redondear((impuestos * tasaIgv) / tasaTotal);
      ipm = redondear(impuestos - igv);
    }
    return { base, igv, ipm, impuestoTotal: redondear(igv + ipm), precioFinal: redondear(base + igv + ipm), tasaTotal };
  },
  resultado: [
    { clave: "base", etiqueta: "Valor de venta (sin impuesto)", formato: "moneda" },
    { clave: "igv", etiqueta: "IGV", formato: "moneda" },
    { clave: "ipm", etiqueta: "Impuesto de promoción municipal", formato: "moneda" },
    { clave: "impuestoTotal", etiqueta: "Impuesto total", formato: "moneda" },
    { clave: "precioFinal", etiqueta: "Precio de venta (con impuesto)", formato: "moneda", destacada: true },
    { clave: "tasaTotal", etiqueta: "Tasa total aplicada", formato: "porcentaje" },
  ],
});
