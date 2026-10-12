import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ni.retencion-servicios-profesionales",
  mercado: "ni",
  concepto: "retencion-honorarios",
  slug: "retencion-servicios-profesionales",
  estado: "publicado",
  requiere: {
    "ni.retenciones-ir": "mapa",
    "ni.iva": "numero",
    "ni.retencion-minimo-factura": "numero",
  },
  campos: [
    { id: "honorarios", tipo: "moneda", etiqueta: "Honorarios sin IVA", min: 0 },
    { id: "conIva", tipo: "si-no", etiqueta: "Cobrás IVA en tu factura", porDefecto: true },
  ],
  calcular(entrada, valores, { redondear }) {
    const tasa = enMapa(valores["ni.retenciones-ir"], "profesionales");
    const iva = entrada.conIva ? redondear(porcentaje(entrada.honorarios, valores["ni.iva"])) : 0;
    const retencion = redondear(porcentaje(entrada.honorarios, tasa));
    return {
      tasa,
      iva,
      factura: redondear(entrada.honorarios + iva),
      retencion,
      recibis: redondear(entrada.honorarios + iva - retencion),
      observaciones: [
        "La retención se calcula sobre los honorarios, sin el IVA, y se aplica aunque la factura sea chica.",
        "Es a cuenta de tu IR anual: te la descontás al declarar. Pedí siempre la constancia de retención.",
      ],
    };
  },
  resultado: [
    { clave: "iva", etiqueta: "IVA", formato: "moneda", ocultarSiCero: true },
    { clave: "factura", etiqueta: "Total de la factura", formato: "moneda" },
    { clave: "tasa", etiqueta: "Retención del IR", formato: "porcentaje" },
    { clave: "retencion", etiqueta: "Monto retenido", formato: "moneda" },
    { clave: "recibis", etiqueta: "Lo que recibís", formato: "moneda", destacada: true },
  ],
});
