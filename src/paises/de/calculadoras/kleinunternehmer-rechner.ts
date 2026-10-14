import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "de.kleinunternehmer-rechner",
  mercado: "de",
  concepto: "regimen-simplificado",
  slug: "kleinunternehmer-rechner",
  estado: "publicado",
  requiere: { "de.kleinunternehmer-grenzen": "mapa", "de.mwst-regelsatz": "numero" },
  campos: [
    { id: "vorjahr", tipo: "moneda", etiqueta: "Gesamtumsatz im Vorjahr", min: 0, porDefecto: 20000 },
    { id: "laufend", tipo: "moneda", etiqueta: "Voraussichtlicher Gesamtumsatz im laufenden Jahr", min: 0, porDefecto: 30000 },
  ],
  calcular(entrada, valores, { redondear }) {
    const g = valores["de.kleinunternehmer-grenzen"];
    const vorjahrOk = entrada.vorjahr <= g.vorjahr;
    const laufendOk = entrada.laufend <= g["laufendes-jahr"];
    const ergebnis = vorjahrOk && laufendOk ? "Ja, Kleinunternehmerregelung möglich" : "Nein, Umsatzsteuer fällt an";
    const observaciones: string[] = [];
    if (!vorjahrOk) observaciones.push("Ihr Umsatz im Vorjahr liegt über der Grenze. Im laufenden Jahr müssen Sie Umsatzsteuer ausweisen.");
    if (vorjahrOk && !laufendOk) observaciones.push("Ihr Umsatz im laufenden Jahr wird die Grenze überschreiten. Ab diesem Zeitpunkt gilt die Regelbesteuerung.");
    if (vorjahrOk && laufendOk) observaciones.push("Sie stellen Rechnungen ohne Umsatzsteuer, mit einem Hinweis auf die Steuerbefreiung für Kleinunternehmer. Vorsteuer aus Einkäufen können Sie dann nicht abziehen.");
    return {
      ergebnis,
      spielraumVorjahr: redondear(g.vorjahr - entrada.vorjahr),
      spielraumLaufend: redondear(g["laufendes-jahr"] - entrada.laufend),
      ustBeiRegel: redondear((entrada.laufend * valores["de.mwst-regelsatz"]) / 100),
      observaciones,
    };
  },
  resultado: [
    { clave: "ergebnis", etiqueta: "Kleinunternehmer?", formato: "texto", destacada: true },
    { clave: "spielraumVorjahr", etiqueta: "Abstand zur Grenze im Vorjahr", formato: "moneda" },
    { clave: "spielraumLaufend", etiqueta: "Abstand zur Grenze im laufenden Jahr", formato: "moneda" },
    { clave: "ustBeiRegel", etiqueta: "Umsatzsteuer auf Ihren Umsatz bei Regelbesteuerung (zum Vergleich)", formato: "moneda" },
  ],
});
