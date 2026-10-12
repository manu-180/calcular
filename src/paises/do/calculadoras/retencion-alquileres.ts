import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "do.retencion-alquileres",
  mercado: "do",
  concepto: "propio",
  slug: "retencion-alquileres",
  estado: "publicado",
  requiere: {
    "do.retencion-alquileres": "numero",
  },
  campos: [
    { id: "alquiler", tipo: "moneda", etiqueta: "Alquiler mensual", ayuda: "Lo que cobra el dueño, sin el ITBIS.", min: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    const tasa = valores["do.retencion-alquileres"];
    const retencion = redondear(porcentaje(entrada.alquiler, tasa));
    return {
      tasa,
      retencion,
      neto: redondear(entrada.alquiler - retencion),
      anual: redondear(retencion * 12),
      observaciones: [
        "La retención la hace la empresa o el negocio de único dueño que alquila a una persona física. Entre personas físicas no hay retención.",
        "Desde el 1 de julio de 2026 es un pago único y definitivo: ese alquiler ya no paga más ISR.",
      ],
    };
  },
  resultado: [
    { clave: "tasa", etiqueta: "Porcentaje de retención", formato: "porcentaje" },
    { clave: "retencion", etiqueta: "Retención de cada mes", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Lo que recibe el dueño", formato: "moneda" },
    { clave: "anual", etiqueta: "Retención del año", formato: "moneda" },
  ],
});
