import { aplicarEscala, definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "cl.impuesto-unico",
  mercado: "cl",
  concepto: "impuesto-renta",
  slug: "impuesto-unico",
  estado: "publicado",
  requiere: {
    "cl.impuesto-unico": "escala",
    "cl.utm": "serie",
  },
  campos: [
    {
      id: "tributable",
      tipo: "moneda",
      etiqueta: "Sueldo tributable del mes",
      ayuda: "Sueldo imponible menos AFP, salud (hasta la cotización legal) y seguro de cesantía.",
      min: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const utm = valores["cl.utm"].valor;
    const escala = valores["cl.impuesto-unico"];
    const enUtm = entrada.tributable / utm;
    let fila = escala[0];
    for (const f of escala) if (enUtm >= f.desde) fila = f;
    const impuesto = redondear(aplicarEscala(escala, enUtm) * utm);
    return {
      enUtm,
      tasaMarginal: fila.tasa,
      impuesto,
      tasaEfectiva: entrada.tributable > 0 ? (impuesto / entrada.tributable) * 100 : 0,
      exentoHasta: (escala[0].hasta ?? 0) * utm,
      valorUtm: utm,
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Impuesto único del mes", formato: "moneda", destacada: true },
    { clave: "tasaMarginal", etiqueta: "Tasa de tu tramo", formato: "porcentaje" },
    { clave: "tasaEfectiva", etiqueta: "Tasa efectiva sobre tu sueldo", formato: "porcentaje" },
    { clave: "enUtm", etiqueta: "Tu sueldo tributable en UTM", formato: "numero", decimales: 2 },
    { clave: "exentoHasta", etiqueta: "Exento hasta", formato: "moneda", decimales: 2 },
    { clave: "valorUtm", etiqueta: "UTM del mes", formato: "moneda" },
  ],
});
