import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

const SAKHELEBI = { usd: "აშშ დოლარი (USD)", eur: "ევრო (EUR)", gbp: "გირვანქა სტერლინგი (GBP)", try: "თურქული ლირა (TRY)", rub: "რუსული რუბლი (RUB)" } as const;

export default definirCalculadora({
  id: "ge.valutis-kursi",
  mercado: "ge",
  concepto: "tipo-de-cambio",
  slug: "valutis-kursi",
  estado: "publicado",
  requiere: { "ge.usd": "serie", "ge.eur": "serie", "ge.gbp": "serie", "ge.try": "serie", "ge.rub": "serie" },
  campos: [
    {
      id: "valuta",
      tipo: "opcion",
      etiqueta: "ვალუტა",
      opciones: [
        { valor: "usd", etiqueta: "აშშ დოლარი (USD)" },
        { valor: "eur", etiqueta: "ევრო (EUR)" },
        { valor: "gbp", etiqueta: "გირვანქა სტერლინგი (GBP)" },
        { valor: "try", etiqueta: "თურქული ლირა (TRY)" },
        { valor: "rub", etiqueta: "რუსული რუბლი (RUB)" },
      ],
      porDefecto: "usd",
    },
    {
      id: "mimartuleba",
      tipo: "opcion",
      etiqueta: "გადაყვანა",
      opciones: [
        { valor: "larshi", etiqueta: "ვალუტიდან ლარში" },
        { valor: "valutashi", etiqueta: "ლარიდან ვალუტაში" },
      ],
      porDefecto: "larshi",
    },
    { id: "tanxa", tipo: "numero", etiqueta: "თანხა", min: 0, porDefecto: 100 },
  ],
  calcular(e, v, { redondear }) {
    if (e.tanxa <= 0) throw new ErrorEntrada("შეიყვანეთ ნულზე მეტი თანხა.", "tanxa");
    const { valor, fecha } = v[`ge.${e.valuta}`];
    const larshi = e.mimartuleba === "larshi";
    return {
      shedegi: redondear(larshi ? e.tanxa * valor : e.tanxa / valor),
      erteuli: larshi ? "ლარი (GEL)" : SAKHELEBI[e.valuta],
      kursi: valor,
      fecha,
      observaciones: ["ეს ეროვნული ბანკის ოფიციალური კურსია. ბანკები და გადაცვლის პუნქტები საკუთარი კურსით მუშაობენ."],
    };
  },
  resultado: [
    { clave: "shedegi", etiqueta: "შედეგი", formato: "numero", decimales: 2, destacada: true },
    { clave: "erteuli", etiqueta: "შედეგის ვალუტა", formato: "texto" },
    { clave: "kursi", etiqueta: "ოფიციალური კურსი (ლარი ერთ ერთეულზე)", formato: "numero", decimales: 4 },
    { clave: "fecha", etiqueta: "კურსის თარიღი", formato: "fecha" },
  ],
});
