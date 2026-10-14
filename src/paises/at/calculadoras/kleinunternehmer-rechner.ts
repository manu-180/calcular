import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "at.kleinunternehmer-rechner",
  mercado: "at",
  concepto: "regimen-simplificado",
  slug: "kleinunternehmer-rechner",
  estado: "publicado",
  requiere: { "at.kleinunternehmer": "mapa" },
  campos: [
    { id: "vorjahr", tipo: "moneda", etiqueta: "Umsatz im Vorjahr", min: 0, porDefecto: 40000 },
    { id: "laufend", tipo: "moneda", etiqueta: "Umsatz im laufenden Jahr (bisher oder erwartet)", min: 0, porDefecto: 45000 },
  ],
  calcular(entrada, valores, { redondear }) {
    const grenze = valores["at.kleinunternehmer"].grenze;
    const toleranzGrenze = redondear(grenze * (1 + valores["at.kleinunternehmer"].toleranz / 100));
    let status: string;
    const observaciones: string[] = [];
    if (entrada.vorjahr > grenze) {
      status = "Keine Kleinunternehmerregelung: Der Umsatz im Vorjahr liegt über der Grenze.";
    } else if (entrada.laufend <= grenze) {
      status = "Kleinunternehmer: Ihre Umsätze sind von der Umsatzsteuer befreit.";
    } else if (entrada.laufend <= toleranzGrenze) {
      status = `Für dieses Jahr noch Kleinunternehmer: Die Grenze ist um höchstens ${valores["at.kleinunternehmer"].toleranz} % überschritten.`;
      observaciones.push("Im nächsten Jahr gilt die Befreiung nicht mehr, weil der Umsatz dann im Vorjahr über der Grenze liegt.");
    } else {
      status = `Befreiung entfällt: Ab dem Umsatz, mit dem Sie die Grenze um mehr als ${valores["at.kleinunternehmer"].toleranz} % überschreiten, wird Umsatzsteuer fällig.`;
    }
    observaciones.push("Als Kleinunternehmer stellen Sie keine Umsatzsteuer in Rechnung, dürfen aber auch keine Vorsteuer abziehen.");
    return {
      status,
      spielraum: redondear(Math.max(0, grenze - entrada.laufend)),
      grenze,
      toleranzGrenze,
      observaciones,
    };
  },
  resultado: [
    { clave: "status", etiqueta: "Ergebnis", formato: "texto", destacada: true },
    { clave: "spielraum", etiqueta: "Spielraum bis zur Grenze im laufenden Jahr", formato: "moneda" },
    { clave: "grenze", etiqueta: "Kleinunternehmergrenze", formato: "moneda" },
    { clave: "toleranzGrenze", etiqueta: "Höchster Umsatz mit Toleranz im laufenden Jahr", formato: "moneda" },
  ],
});
