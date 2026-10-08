import { aplicarEscala, definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "pa.impuesto-sobre-la-renta",
  mercado: "pa",
  concepto: "impuesto-renta",
  slug: "impuesto-sobre-la-renta",
  estado: "publicado",
  requiere: {
    "pa.isr-personas-naturales": "escala",
  },
  campos: [
    {
      id: "rentaGravable",
      tipo: "moneda",
      etiqueta: "Renta neta gravable del año",
      ayuda: "Tus ingresos gravables del año menos las deducciones que permite la ley.",
      min: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const { rentaGravable } = entrada;
    const impuesto = redondear(aplicarEscala(valores["pa.isr-personas-naturales"], rentaGravable));
    return {
      impuesto,
      tasaEfectiva: rentaGravable > 0 ? redondear((impuesto / rentaGravable) * 100) : 0,
      mensual: redondear(impuesto / 12),
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Impuesto sobre la renta del año", formato: "moneda", destacada: true },
    { clave: "tasaEfectiva", etiqueta: "Tasa efectiva sobre tu renta", formato: "porcentaje" },
    { clave: "mensual", etiqueta: "Equivale por mes a", formato: "moneda" },
  ],
});
