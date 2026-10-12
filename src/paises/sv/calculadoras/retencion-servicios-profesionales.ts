import { definirCalculadora, porcentaje } from "@/motor/calculo";

// La retención del 10 % (art. 156 del Código Tributario) se calcula sobre el valor del servicio, sin el
// IVA: el IVA es un impuesto distinto que el profesional cobra y declara aparte.
export default definirCalculadora({
  id: "sv.retencion-servicios-profesionales",
  mercado: "sv",
  concepto: "retencion-honorarios",
  slug: "retencion-servicios-profesionales",
  estado: "publicado",
  requiere: {
    "sv.retencion-servicios": "numero",
    "sv.iva": "numero",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Monto", min: 0 },
    {
      id: "operacion",
      tipo: "opcion",
      etiqueta: "Qué monto tiene",
      opciones: [
        { valor: "servicio", etiqueta: "El valor del servicio (honorarios)" },
        { valor: "liquido", etiqueta: "Lo que quiere recibir en mano" },
      ],
      porDefecto: "servicio",
    },
    { id: "cobraIva", tipo: "si-no", etiqueta: "Está inscrito en el IVA y lo cobra", porDefecto: false },
  ],
  calcular(entrada, valores, { redondear }) {
    const tasaIva = entrada.cobraIva ? valores["sv.iva"] : 0;
    const tasaRetencion = valores["sv.retencion-servicios"];
    const servicio = entrada.operacion === "servicio" ? entrada.monto : redondear(entrada.monto / (1 + (tasaIva - tasaRetencion) / 100));
    const iva = redondear(porcentaje(servicio, tasaIva));
    const retencion = redondear(porcentaje(servicio, tasaRetencion));
    return {
      servicio,
      iva,
      retencion,
      liquido: redondear(servicio + iva - retencion),
      observaciones: ["La retención es un anticipo de su renta: la descuenta en su declaración anual."],
    };
  },
  resultado: [
    { clave: "servicio", etiqueta: "Valor del servicio", formato: "moneda" },
    { clave: "iva", etiqueta: "IVA", formato: "moneda", ocultarSiCero: true },
    { clave: "retencion", etiqueta: "Retención de renta", formato: "moneda" },
    { clave: "liquido", etiqueta: "Lo que recibe", formato: "moneda", destacada: true },
  ],
});
