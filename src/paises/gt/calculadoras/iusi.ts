import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "gt.iusi",
  mercado: "gt",
  concepto: "propio",
  slug: "iusi",
  estado: "publicado",
  requiere: {
    "gt.iusi-escala": "escala",
  },
  campos: [{ id: "valor", tipo: "moneda", etiqueta: "Valor del inmueble en la matrícula fiscal", min: 0, ayuda: "El que figura en su boleta de IUSI o en su avalúo." }],
  calcular(entrada, valores, { redondear }) {
    // El IUSI no es progresivo por tramos: todo el valor paga la tasa del tramo en que cae.
    let fila = valores["gt.iusi-escala"][0];
    for (const f of valores["gt.iusi-escala"]) if (entrada.valor >= f.desde) fila = f;
    const anual = redondear((entrada.valor * fila.tasa) / 100);
    return {
      porMillar: redondear(fila.tasa * 10),
      anual,
      observaciones: [
        anual === 0 ? "Por el valor del inmueble está exento." : "La tasa se aplica a todo el valor del inmueble.",
        "Lo cobra la municipalidad o el Ministerio de Finanzas. Algunas municipalidades cobran recargos o tienen descuentos por pago anticipado.",
      ],
    };
  },
  resultado: [
    { clave: "porMillar", etiqueta: "Tasa (por millar)", formato: "numero", decimales: 0 },
    { clave: "anual", etiqueta: "IUSI del año", formato: "moneda", destacada: true },
  ],
});
