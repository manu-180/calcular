import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

// Borrador: el tipo de cambio oficial está en cbj.gov.jo, que rechaza las conexiones desde fuera de
// Jordania. Se publica cuando alguien lo lea en el banco central y pase jo.usd-peg a verificado.
export default definirCalculadora({
  id: "jo.jod-usd-converter",
  mercado: "jo",
  concepto: "tipo-de-cambio",
  slug: "jod-usd-converter",
  estado: "borrador",
  requiere: {
    "jo.usd-peg": "numero",
  },
  campos: [
    { id: "importe", tipo: "numero", etiqueta: "المبلغ", min: 0, porDefecto: 100 },
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "التحويل",
      opciones: [
        { valor: "jod-usd", etiqueta: "من الدينار الأردني إلى الدولار الأمريكي" },
        { valor: "usd-jod", etiqueta: "من الدولار الأمريكي إلى الدينار الأردني" },
      ],
      porDefecto: "jod-usd",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.importe <= 0) throw new ErrorEntrada("أدخل المبلغ.", "importe");
    const tasa = v["jo.usd-peg"];
    const aDolar = entrada.sentido === "jod-usd";
    return {
      resultado: aDolar ? Math.round((entrada.importe / tasa) * 100) / 100 : redondear(entrada.importe * tasa),
      moneda: aDolar ? "دولار أمريكي" : "دينار أردني",
      tasa,
      inversa: 1 / tasa,
      observaciones: ["هذا هو السعر الوسطي الرسمي. البنوك ومحلات الصرافة تشتري وتبيع بسعر قريب منه مع هامش."],
    };
  },
  resultado: [
    { clave: "resultado", etiqueta: "المبلغ بعد التحويل", formato: "numero", decimales: 3, destacada: true },
    { clave: "moneda", etiqueta: "العملة", formato: "texto" },
    { clave: "tasa", etiqueta: "دينار لكل دولار", formato: "numero", decimales: 3 },
    { clave: "inversa", etiqueta: "دولار لكل دينار", formato: "numero", decimales: 4 },
  ],
});
