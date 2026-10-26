import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "sa.sar-usd-converter",
  mercado: "sa",
  concepto: "tipo-de-cambio",
  slug: "sar-usd-converter",
  estado: "publicado",
  requiere: {
    "sa.usd-peg": "numero",
  },
  campos: [
    { id: "importe", tipo: "numero", etiqueta: "المبلغ", min: 0, porDefecto: 1000 },
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "التحويل",
      opciones: [
        { valor: "sar-usd", etiqueta: "من الريال السعودي إلى الدولار الأمريكي" },
        { valor: "usd-sar", etiqueta: "من الدولار الأمريكي إلى الريال السعودي" },
      ],
      porDefecto: "sar-usd",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.importe <= 0) throw new ErrorEntrada("أدخل المبلغ.", "importe");
    const tasa = v["sa.usd-peg"];
    const aDolar = entrada.sentido === "sar-usd";
    return {
      resultado: redondear(aDolar ? entrada.importe / tasa : entrada.importe * tasa),
      moneda: aDolar ? "دولار أمريكي" : "ريال سعودي",
      tasa,
      inversa: 1 / tasa,
      observaciones: ["هذا هو السعر الرسمي. البنوك ومحلات الصرافة تضيف هامشًا أو عمولة، فقد يختلف ما تحصل عليه قليلًا."],
    };
  },
  resultado: [
    { clave: "resultado", etiqueta: "المبلغ بعد التحويل", formato: "numero", decimales: 2, destacada: true },
    { clave: "moneda", etiqueta: "العملة", formato: "texto" },
    { clave: "tasa", etiqueta: "ريال لكل دولار (السعر الرسمي)", formato: "numero", decimales: 2 },
    { clave: "inversa", etiqueta: "دولار لكل ريال", formato: "numero", decimales: 4 },
  ],
});
