import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "se.sjuklon",
  mercado: "se",
  concepto: "propio",
  slug: "sjuklon",
  estado: "publicado",
  requiere: {
    "se.sjuklon": "numero",
    "se.karensavdrag": "numero",
  },
  campos: [
    { id: "manadslon", tipo: "moneda", etiqueta: "Månadslön före skatt", min: 0, porDefecto: 32000 },
    { id: "veckotimmar", tipo: "numero", etiqueta: "Arbetstid per vecka i timmar", min: 1, max: 80, porDefecto: 40 },
    { id: "dagarPerVecka", tipo: "entero", etiqueta: "Arbetsdagar per vecka", min: 1, max: 7, porDefecto: 5 },
    {
      id: "sjukdagar",
      tipo: "entero",
      etiqueta: "Arbetsdagar du är sjuk",
      min: 1,
      max: 14,
      porDefecto: 3,
      ayuda: "Arbetsgivaren betalar sjuklön för de första 14 kalenderdagarna. Räkna bara dagar då du skulle ha arbetat.",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.manadslon <= 0) throw new ErrorEntrada("Skriv en månadslön som är större än noll.", "manadslon");
    const timlon = (e.manadslon * 12) / 52 / e.veckotimmar;
    const timmarPerDag = e.veckotimmar / e.dagarPerVecka;
    const forlorad = redondear(timlon * timmarPerDag * e.sjukdagar);
    const fore = redondear(porcentaje(forlorad, v["se.sjuklon"]));
    const veckosjuklon = porcentaje(timlon * e.veckotimmar, v["se.sjuklon"]);
    const karens = Math.min(fore, redondear(porcentaje(veckosjuklon, v["se.karensavdrag"])));
    const sjuklon = redondear(fore - karens);
    return {
      sjuklon,
      karens,
      fore,
      forlorad,
      minskning: redondear(forlorad - sjuklon),
      timlon: redondear(timlon),
      observaciones: [
        "Timlönen är uppskattad från månadslönen (lön × 12 / 52 veckor / timmar per vecka). Ditt kollektivavtal kan räkna på ett annat sätt.",
        "Från dag 15 söker du sjukpenning från Försäkringskassan.",
      ],
    };
  },
  resultado: [
    { clave: "sjuklon", etiqueta: "Sjuklön efter karensavdrag", formato: "moneda", destacada: true },
    { clave: "karens", etiqueta: "Karensavdrag", formato: "moneda" },
    { clave: "fore", etiqueta: "Sjuklön före karensavdrag", formato: "moneda" },
    { clave: "forlorad", etiqueta: "Lön för de sjukdagarna", formato: "moneda" },
    { clave: "minskning", etiqueta: "Så mycket lägre blir lönen", formato: "moneda" },
    { clave: "timlon", etiqueta: "Beräknad timlön", formato: "moneda" },
  ],
});
