import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "hn.impuesto-sobre-dividendos",
  mercado: "hn",
  concepto: "propio",
  slug: "impuesto-sobre-dividendos",
  estado: "publicado",
  requiere: {
    "hn.dividendos": "numero",
  },
  campos: [{ id: "monto", tipo: "moneda", etiqueta: "Dividendos o utilidades a distribuir", min: 0 }],
  calcular(entrada, valores, { redondear }) {
    const tasa = valores["hn.dividendos"];
    const retencion = redondear(porcentaje(entrada.monto, tasa));
    return {
      tasa,
      retencion,
      neto: redondear(entrada.monto - retencion),
      observaciones: [
        "La sociedad que paga retiene el impuesto y lo entera al SAR.",
        "Si una sociedad recibe dividendos ya gravados y los vuelve a distribuir, no se retiene otra vez.",
      ],
    };
  },
  resultado: [
    { clave: "tasa", etiqueta: "Tasa", formato: "porcentaje" },
    { clave: "retencion", etiqueta: "Impuesto retenido", formato: "moneda" },
    { clave: "neto", etiqueta: "Lo que recibe el socio", formato: "moneda", destacada: true },
  ],
});
