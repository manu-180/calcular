import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "mr.cours-dollar-ouguiya",
  mercado: "mr",
  concepto: "tipo-de-cambio",
  slug: "cours-dollar-ouguiya",
  estado: "publicado",
  requiere: { "mr.usd": "serie", "mr.eur": "serie" },
  campos: [
    {
      id: "devise",
      tipo: "opcion",
      etiqueta: "العملة الأجنبية",
      opciones: [
        { valor: "usd", etiqueta: "الدولار الأمريكي (USD)" },
        { valor: "eur", etiqueta: "اليورو (EUR)" },
      ],
      porDefecto: "usd",
    },
    {
      id: "sens",
      tipo: "opcion",
      etiqueta: "التحويل",
      opciones: [
        { valor: "vers-mru", etiqueta: "من العملة الأجنبية إلى الأوقية" },
        { valor: "depuis-mru", etiqueta: "من الأوقية إلى العملة الأجنبية" },
      ],
      porDefecto: "vers-mru",
    },
    { id: "montant", tipo: "numero", etiqueta: "المبلغ", min: 0, porDefecto: 100 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.montant <= 0) throw new ErrorEntrada("أدخل المبلغ.", "montant");
    const serie = entrada.devise === "eur" ? v["mr.eur"] : v["mr.usd"];
    const cours = serie.valor;
    const versMru = entrada.sens === "vers-mru";
    return {
      ouguiyas: versMru ? redondear(entrada.montant * cours) : null,
      devise: versMru ? null : redondear(entrada.montant / cours),
      cours,
      inverse: 1 / cours,
      date: serie.fecha,
      observaciones: ["هذا سعر الصرف المرجعي للبنك المركزي الموريتاني. البنوك ومكاتب الصرف تطبق سعرها الخاص وعمولتها."],
    };
  },
  resultado: [
    { clave: "ouguiyas", etiqueta: "المبلغ بالأوقية", formato: "moneda", destacada: true },
    { clave: "devise", etiqueta: "المبلغ بالعملة الأجنبية", formato: "numero", decimales: 2, destacada: true },
    { clave: "cours", etiqueta: "السعر المرجعي (أوقية للوحدة)", formato: "numero", decimales: 2 },
    { clave: "inverse", etiqueta: "قيمة الأوقية بالعملة الأجنبية", formato: "numero", decimales: 4 },
    { clave: "date", etiqueta: "تاريخ السعر", formato: "fecha" },
  ],
});
