import { aplicarEscalaMarginal, definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "uy.iass",
  mercado: "uy",
  concepto: "propio",
  slug: "iass",
  estado: "publicado",
  requiere: {
    "uy.bpc": "numero",
    "uy.iass-escala": "escala",
  },
  campos: [
    {
      id: "pasividad",
      tipo: "moneda",
      etiqueta: "Jubilación o pensión nominal por mes",
      ayuda: "Si cobrás más de una, sumalas. Sin el aguinaldo.",
      min: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const bpc = valores["uy.bpc"];
    // El IASS es anual; el anticipo mensual aplica la escala anual dividida entre 12 (BPS).
    const escalaMes = valores["uy.iass-escala"].map((f) => ({ desde: (f.desde * bpc) / 12, hasta: f.hasta === null ? null : (f.hasta * bpc) / 12, tasa: f.tasa }));
    const mensual = redondear(aplicarEscalaMarginal(escalaMes, entrada.pasividad));
    let tasaMarginal = 0;
    for (const f of escalaMes) if (entrada.pasividad > f.desde) tasaMarginal = f.tasa;
    return {
      minimoMensual: redondear(escalaMes[1]?.desde ?? 0),
      mensual,
      anual: redondear(mensual * 12),
      tasaMarginal,
      liquido: redondear(entrada.pasividad - mensual),
      observaciones: [
        mensual === 0 ? "Tu pasividad no pasa el mínimo no imponible: no pagás IASS." : "Es el anticipo que te retienen cada mes. El impuesto se cierra en el año y puede haber ajuste.",
        "Si cobrás pasividades de varios organismos, cada uno retiene por separado y puede tocarte pagar la diferencia en la declaración jurada.",
      ],
    };
  },
  resultado: [
    { clave: "minimoMensual", etiqueta: "Mínimo no imponible por mes", formato: "moneda" },
    { clave: "mensual", etiqueta: "IASS por mes", formato: "moneda", destacada: true },
    { clave: "anual", etiqueta: "IASS en el año", formato: "moneda" },
    { clave: "tasaMarginal", etiqueta: "Tasa de tu última franja", formato: "porcentaje" },
    { clave: "liquido", etiqueta: "Pasividad después del IASS", formato: "moneda" },
  ],
});
