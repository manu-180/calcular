import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "do.retencion-honorarios",
  mercado: "do",
  concepto: "retencion-honorarios",
  slug: "retencion-honorarios",
  estado: "publicado",
  requiere: {
    "do.retencion-honorarios": "numero",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Monto de los honorarios", ayuda: "Lo facturado por el servicio, sin el ITBIS.", min: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    const tasa = valores["do.retencion-honorarios"];
    const retencion = redondear(porcentaje(entrada.monto, tasa));
    return {
      tasa,
      retencion,
      neto: redondear(entrada.monto - retencion),
      observaciones: [
        "La retienen las empresas y los negocios de único dueño cuando le pagan a una persona física. Una persona física que no tiene negocio no retiene.",
        "Es un pago a cuenta: lo restas del ISR de tu declaración anual (IR-1).",
      ],
    };
  },
  resultado: [
    { clave: "tasa", etiqueta: "Porcentaje de retención", formato: "porcentaje" },
    { clave: "retencion", etiqueta: "Retención de ISR", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Lo que recibes", formato: "moneda" },
  ],
});
