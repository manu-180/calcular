import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "cl.boleta-honorarios",
  mercado: "cl",
  concepto: "retencion-honorarios",
  slug: "boleta-honorarios",
  estado: "publicado",
  requiere: {
    "cl.retencion-honorarios": "numero",
  },
  campos: [
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "Qué monto tienes",
      opciones: [
        { valor: "bruto", etiqueta: "El bruto (lo que dice la boleta)" },
        { valor: "liquido", etiqueta: "El líquido (lo que quieres recibir)" },
      ],
      porDefecto: "bruto",
    },
    { id: "monto", tipo: "moneda", etiqueta: "Monto", min: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    const tasa = valores["cl.retencion-honorarios"];
    const bruto = entrada.sentido === "bruto" ? entrada.monto : redondear(entrada.monto / (1 - tasa / 100));
    const retencion = redondear(porcentaje(bruto, tasa));
    return { tasa, bruto, retencion, liquido: bruto - retencion };
  },
  resultado: [
    { clave: "bruto", etiqueta: "Monto bruto de la boleta", formato: "moneda" },
    { clave: "tasa", etiqueta: "Retención del año", formato: "porcentaje" },
    { clave: "retencion", etiqueta: "Retención", formato: "moneda" },
    { clave: "liquido", etiqueta: "Monto líquido", formato: "moneda", destacada: true },
  ],
});
