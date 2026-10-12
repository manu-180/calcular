import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "hn.retencion-honorarios",
  mercado: "hn",
  concepto: "retencion-honorarios",
  slug: "retencion-honorarios",
  estado: "publicado",
  requiere: {
    "hn.retencion-honorarios": "numero",
    "hn.isv": "mapa",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Monto", min: 0 },
    {
      id: "modo",
      tipo: "opcion",
      etiqueta: "El monto que escribió es",
      opciones: [
        { valor: "bruto", etiqueta: "Lo que voy a facturar (honorarios antes de la retención)" },
        { valor: "neto", etiqueta: "Lo que quiero recibir libre de la retención" },
      ],
      porDefecto: "bruto",
    },
    { id: "conIsv", tipo: "si-no", etiqueta: "Mi factura lleva ISV", porDefecto: false },
  ],
  calcular(entrada, valores, { redondear }) {
    const tasa = valores["hn.retencion-honorarios"];
    const honorarios = redondear(entrada.modo === "bruto" ? entrada.monto : entrada.monto / (1 - tasa / 100));
    const retencion = redondear(porcentaje(honorarios, tasa));
    const isv = entrada.conIsv ? redondear(porcentaje(honorarios, enMapa(valores["hn.isv"], "general"))) : 0;
    const factura = redondear(honorarios + isv);
    return {
      tasa,
      honorarios,
      isv,
      factura,
      retencion,
      recibe: redondear(factura - retencion),
      observaciones: [
        "La retención es un anticipo de su ISR del año: la descuenta en su declaración anual.",
        "No le retienen si está en el régimen de pagos a cuenta.",
      ],
    };
  },
  resultado: [
    { clave: "tasa", etiqueta: "Retención", formato: "porcentaje" },
    { clave: "honorarios", etiqueta: "Honorarios", formato: "moneda" },
    { clave: "isv", etiqueta: "ISV de la factura", formato: "moneda", ocultarSiCero: true },
    { clave: "factura", etiqueta: "Total de la factura", formato: "moneda" },
    { clave: "retencion", etiqueta: "Retención del ISR", formato: "moneda" },
    { clave: "recibe", etiqueta: "Lo que recibe", formato: "moneda", destacada: true },
  ],
});
