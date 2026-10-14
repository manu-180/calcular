import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "nl.werkgeverslasten-berekenen",
  mercado: "nl",
  concepto: "costo-empleador",
  slug: "werkgeverslasten-berekenen",
  estado: "publicado",
  requiere: {
    "nl.premies-werkgever": "mapa",
    "nl.maximumpremieloon": "numero",
    "nl.zvw-werkgeversheffing": "numero",
    "nl.vakantiebijslag": "numero",
  },
  campos: [
    { id: "maandloon", tipo: "moneda", etiqueta: "Bruto maandloon van de werknemer", min: 0, porDefecto: 3500 },
    { id: "vakantiegeld", tipo: "si-no", etiqueta: "Met vakantiegeld", porDefecto: true },
    {
      id: "contract",
      tipo: "opcion",
      etiqueta: "Soort contract",
      opciones: [
        { valor: "vast", etiqueta: "Schriftelijk contract voor onbepaalde tijd (geen oproepcontract): lage WW-premie" },
        { valor: "flex", etiqueta: "Tijdelijk contract of oproepcontract: hoge WW-premie" },
      ],
      porDefecto: "vast",
    },
    {
      id: "grootte",
      tipo: "opcion",
      etiqueta: "Grootte van je bedrijf voor de Aof-premie",
      opciones: [
        { valor: "klein", etiqueta: "Kleine werkgever (premieloonsom tot en met 25 keer het gemiddelde premieloon)" },
        { valor: "groot", etiqueta: "Middelgrote of grote werkgever" },
      ],
      porDefecto: "klein",
    },
    { id: "whk", tipo: "porcentaje", etiqueta: "Je Whk-premie uit de beschikking van de Belastingdienst (optioneel)", min: 0, max: 15, requerido: false },
    { id: "pensioen", tipo: "porcentaje", etiqueta: "Pensioenpremie die jij als werkgever betaalt (% van het loon)", min: 0, max: 40, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.maandloon <= 0) throw new ErrorEntrada("Vul het bruto maandloon in.", "maandloon");
    const p = v["nl.premies-werkgever"];
    const salaris = entrada.maandloon * 12;
    const vakantiegeld = entrada.vakantiegeld ? porcentaje(salaris, v["nl.vakantiebijslag"]) : 0;
    const loon = salaris + vakantiegeld;
    const premieloon = Math.min(loon, v["nl.maximumpremieloon"]);
    const awf = porcentaje(premieloon, enMapa(p, entrada.contract === "vast" ? "awf-laag" : "awf-hoog"));
    const aof = porcentaje(premieloon, enMapa(p, entrada.grootte === "klein" ? "aof-laag" : "aof-hoog"));
    const wko = porcentaje(premieloon, enMapa(p, "wko"));
    const whk = porcentaje(premieloon, entrada.whk ?? 0);
    const zvw = porcentaje(premieloon, v["nl.zvw-werkgeversheffing"]);
    const pensioen = porcentaje(loon, entrada.pensioen);
    const lasten = awf + aof + wko + whk + zvw + pensioen;
    const totaal = loon + lasten;
    const observaciones: string[] = [];
    if (entrada.whk === null) observaciones.push("Zonder Whk-premie is de berekening te laag. Die premie verschilt per werkgever en sector en staat in je beschikking of mededeling.");
    if (loon > v["nl.maximumpremieloon"]) observaciones.push("Het loon ligt boven het maximumpremieloon. Over het deel daarboven betaal je geen werknemersverzekeringen en geen Zvw-werkgeversheffing.");
    return {
      totaal: redondear(totaal),
      perMaand: redondear(totaal / 12),
      loon: redondear(loon),
      awf: redondear(awf),
      aof: redondear(aof),
      wko: redondear(wko),
      whk: redondear(whk),
      zvw: redondear(zvw),
      pensioen: redondear(pensioen),
      opslag: (lasten / loon) * 100,
      observaciones,
    };
  },
  resultado: [
    { clave: "totaal", etiqueta: "Loonkosten per jaar", formato: "moneda", destacada: true },
    { clave: "perMaand", etiqueta: "Loonkosten per maand (gemiddeld)", formato: "moneda" },
    { clave: "loon", etiqueta: "Brutoloon inclusief vakantiegeld", formato: "moneda" },
    { clave: "awf", etiqueta: "WW-premie (AWf)", formato: "moneda" },
    { clave: "aof", etiqueta: "Arbeidsongeschiktheidspremie (Aof)", formato: "moneda" },
    { clave: "wko", etiqueta: "Opslag kinderopvang (Wko)", formato: "moneda" },
    { clave: "whk", etiqueta: "Premie Werkhervattingskas (Whk)", formato: "moneda", ocultarSiCero: true },
    { clave: "zvw", etiqueta: "Werkgeversheffing Zvw", formato: "moneda" },
    { clave: "pensioen", etiqueta: "Pensioenpremie werkgever", formato: "moneda", ocultarSiCero: true },
    { clave: "opslag", etiqueta: "Werkgeverslasten bovenop het loon", formato: "porcentaje", decimales: 1 },
  ],
});
