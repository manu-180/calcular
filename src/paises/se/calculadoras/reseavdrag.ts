import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "se.reseavdrag",
  mercado: "se",
  concepto: "propio",
  slug: "reseavdrag",
  estado: "publicado",
  requiere: { "se.reseavdrag": "mapa" },
  campos: [
    {
      id: "fardmedel",
      tipo: "opcion",
      etiqueta: "Hur reser du till jobbet?",
      opciones: [
        { valor: "egen-bil", etiqueta: "Egen bil (även el- och hybridbil)" },
        { valor: "formansbil", etiqueta: "Förmånsbil som inte drivs helt med el" },
        { valor: "formansbil-el", etiqueta: "Förmånsbil som drivs helt med el" },
        { valor: "motorcykel", etiqueta: "Motorcykel" },
        { valor: "kollektivt", etiqueta: "Kollektivtrafik" },
      ],
      porDefecto: "egen-bil",
    },
    { id: "km", tipo: "numero", etiqueta: "Avstånd enkel väg i kilometer", min: 0, max: 500, porDefecto: 40, visibleSi: { fardmedel: ["egen-bil", "formansbil", "formansbil-el", "motorcykel"] } },
    { id: "dagar", tipo: "entero", etiqueta: "Arbetsdagar du reser under året", min: 0, max: 366, porDefecto: 200, visibleSi: { fardmedel: ["egen-bil", "formansbil", "formansbil-el", "motorcykel"] } },
    { id: "kostnad", tipo: "moneda", etiqueta: "Vad kollektivtrafiken kostar per år", min: 0, porDefecto: 12000, visibleSi: { fardmedel: ["kollektivt"] } },
  ],
  calcular(e, v, { redondear }) {
    const r = v["se.reseavdrag"];
    let kostnad: number;
    let mil = 0;
    if (e.fardmedel === "kollektivt") {
      kostnad = e.kostnad ?? 0;
      if (kostnad <= 0) throw new ErrorEntrada("Skriv vad resorna kostar per år.", "kostnad");
    } else {
      mil = ((e.km ?? 0) * 2 * (e.dagar ?? 0)) / 10;
      if (mil <= 0) throw new ErrorEntrada("Skriv avstånd och antal resdagar.", "km");
      kostnad = redondear(mil * enMapa(r, e.fardmedel));
    }
    const grans = enMapa(r, "grans");
    const avdrag = Math.max(0, Math.floor(kostnad - grans));
    const observaciones: string[] = [];
    if (e.fardmedel !== "kollektivt") {
      observaciones.push("För avdrag med bil eller motorcykel krävs normalt att du sparar minst två timmar per dag jämfört med kollektivtrafik och har minst fem kilometer till jobbet.");
    }
    if (avdrag === 0) observaciones.push("Kostnaden är inte högre än beloppsgränsen, så du får inget avdrag.");
    return { avdrag, kostnad, mil: mil || null, grans, observaciones };
  },
  resultado: [
    { clave: "avdrag", etiqueta: "Reseavdrag i deklarationen", formato: "moneda", decimales: 0, destacada: true },
    { clave: "kostnad", etiqueta: "Resekostnad enligt schablon eller biljetter", formato: "moneda" },
    { clave: "mil", etiqueta: "Mil per år", formato: "numero", decimales: 1 },
    { clave: "grans", etiqueta: "Avdrag bara över", formato: "moneda", decimales: 0 },
  ],
});
