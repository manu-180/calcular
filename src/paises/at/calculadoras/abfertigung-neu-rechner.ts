import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "at.abfertigung-neu-rechner",
  mercado: "at",
  concepto: "fondo-cesantia",
  slug: "abfertigung-neu-rechner",
  estado: "publicado",
  requiere: {
    "at.sv-dienstgeber": "mapa",
    "at.abfertigung-steuer": "numero",
  },
  campos: [
    { id: "brutto", tipo: "moneda", etiqueta: "Bruttogehalt im Monat", min: 0, porDefecto: 3000 },
    { id: "sonderzahlungen", tipo: "si-no", etiqueta: "Mit Urlaubsgeld und Weihnachtsgeld (14 Gehälter)", porDefecto: true },
    { id: "jahre", tipo: "numero", etiqueta: "Beschäftigungsdauer in Jahren", min: 0, max: 50, porDefecto: 10 },
  ],
  calcular(entrada, valores, { redondear }) {
    const satz = valores["at.sv-dienstgeber"].bv;
    const monatlich = redondear(porcentaje(entrada.brutto, satz));
    const jaehrlich = redondear(monatlich * (entrada.sonderzahlungen ? 14 : 12));
    const summe = redondear(jaehrlich * entrada.jahre);
    const steuer = redondear(porcentaje(summe, valores["at.abfertigung-steuer"]));
    const observaciones = ["Dazu kommen die Veranlagungserträge der Vorsorgekasse, die hier nicht eingerechnet sind."];
    if (entrada.jahre < 3) observaciones.push("Ausgezahlt wird erst nach drei Einzahlungsjahren. Bis dahin bleibt das Kapital in der Vorsorgekasse.");
    return {
      summe,
      monatlich,
      jaehrlich,
      steuer,
      netto: redondear(summe - steuer),
      observaciones,
    };
  },
  resultado: [
    { clave: "summe", etiqueta: "Eingezahlte Beiträge insgesamt", formato: "moneda", destacada: true },
    { clave: "monatlich", etiqueta: "Beitrag des Arbeitgebers pro Monat", formato: "moneda" },
    { clave: "jaehrlich", etiqueta: "Beitrag pro Jahr", formato: "moneda" },
    { clave: "steuer", etiqueta: "Lohnsteuer bei Auszahlung", formato: "moneda" },
    { clave: "netto", etiqueta: "Auszahlung nach Steuer (ohne Erträge)", formato: "moneda" },
  ],
});
