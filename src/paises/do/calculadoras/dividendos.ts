import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "do.dividendos",
  mercado: "do",
  concepto: "propio",
  slug: "dividendos",
  estado: "publicado",
  requiere: {
    "do.retencion-dividendos": "numero",
  },
  campos: [{ id: "monto", tipo: "moneda", etiqueta: "Dividendos a distribuir", min: 0 }],
  calcular(entrada, valores, { redondear }) {
    const tasa = valores["do.retencion-dividendos"];
    const retencion = redondear(porcentaje(entrada.monto, tasa));
    return {
      tasa,
      retencion,
      neto: redondear(entrada.monto - retencion),
      observaciones: [
        "La retiene la empresa que paga los dividendos y es pago único y definitivo: el socio no los vuelve a declarar.",
        "Vale para socios residentes y no residentes.",
      ],
    };
  },
  resultado: [
    { clave: "tasa", etiqueta: "Porcentaje de retención", formato: "porcentaje" },
    { clave: "retencion", etiqueta: "Retención de ISR", formato: "moneda" },
    { clave: "neto", etiqueta: "Lo que recibe el socio", formato: "moneda", destacada: true },
  ],
});
