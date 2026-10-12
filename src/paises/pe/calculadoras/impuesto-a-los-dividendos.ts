import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "pe.dividendos",
  mercado: "pe",
  concepto: "propio",
  slug: "impuesto-a-los-dividendos",
  estado: "publicado",
  requiere: {
    "pe.tasa-dividendos": "numero",
  },
  campos: [
    { id: "dividendo", tipo: "moneda", etiqueta: "Dividendo bruto que te reparten", min: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    const retencion = redondear(porcentaje(entrada.dividendo, valores["pe.tasa-dividendos"]));
    return {
      retencion,
      neto: redondear(entrada.dividendo - retencion),
      observaciones: ["La empresa que reparte el dividendo retiene el impuesto y lo paga a SUNAT (artículo 73-A de la Ley del Impuesto a la Renta)."],
    };
  },
  resultado: [
    { clave: "retencion", etiqueta: "Impuesto retenido", formato: "moneda" },
    { clave: "neto", etiqueta: "Dividendo que recibes", formato: "moneda", destacada: true },
  ],
});
