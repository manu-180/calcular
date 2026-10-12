import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ec.retencion-en-la-fuente",
  mercado: "ec",
  concepto: "retencion-honorarios",
  slug: "retencion-en-la-fuente",
  estado: "publicado",
  requiere: {
    "ec.retencion-renta": "mapa",
    "ec.iva": "numero",
  },
  campos: [
    {
      id: "subtotal",
      tipo: "moneda",
      etiqueta: "Valor de la factura sin IVA",
      ayuda: "El subtotal antes de impuestos.",
      min: 0,
    },
    { id: "concepto", tipo: "opcion-dato", etiqueta: "Qué se paga", dato: "ec.retencion-renta", porDefecto: "honorarios" },
    { id: "conIva", tipo: "si-no", etiqueta: "La factura lleva IVA", porDefecto: true },
  ],
  calcular(entrada, valores, { redondear }) {
    const tasa = enMapa(valores["ec.retencion-renta"], entrada.concepto);
    const retencion = redondear(porcentaje(entrada.subtotal, tasa));
    const iva = entrada.conIva ? redondear(porcentaje(entrada.subtotal, valores["ec.iva"])) : 0;
    const total = redondear(entrada.subtotal + iva);
    return {
      tasa,
      retencion,
      iva,
      total,
      neto: redondear(total - retencion),
      observaciones: [
        "Si quien paga también es agente de retención del IVA, te retiene además una parte del IVA. Eso no está en este cálculo.",
        "La retención no es un gasto: la descuentas del impuesto a la renta que declaras.",
      ],
    };
  },
  resultado: [
    { clave: "tasa", etiqueta: "Porcentaje de retención", formato: "porcentaje" },
    { clave: "retencion", etiqueta: "Retención del impuesto a la renta", formato: "moneda", destacada: true },
    { clave: "iva", etiqueta: "IVA de la factura", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Total de la factura", formato: "moneda" },
    { clave: "neto", etiqueta: "Lo que recibes después de la retención", formato: "moneda" },
  ],
});
