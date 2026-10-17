import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { bvgJahr, bvgWerteAus, REQ_BVG } from "../lib/lohn";

const REFERENZALTER = 65;

export default definirCalculadora({
  id: "ch.bvg-rechner",
  mercado: "ch",
  concepto: "propio",
  slug: "bvg-rechner",
  estado: "publicado",
  requiere: {
    ...REQ_BVG,
    "ch.bvg-mindestzins": "numero",
    "ch.bvg-umwandlungssatz": "numero",
  },
  campos: [
    { id: "jahreslohn", tipo: "moneda", etiqueta: "AHV-Jahreslohn", min: 0, porDefecto: 80000 },
    { id: "alter", tipo: "entero", etiqueta: "Alter in diesem Jahr (Kalenderjahr minus Geburtsjahr)", min: 18, max: 64, porDefecto: 45 },
    { id: "guthaben", tipo: "moneda", etiqueta: "Heutiges BVG-Altersguthaben", min: 0, porDefecto: 0, ayuda: "Steht auf Ihrem Vorsorgeausweis (obligatorischer Teil)." },
    { id: "zins", tipo: "porcentaje", etiqueta: "Zins pro Jahr", min: 0, max: 10, requerido: false, ayuda: "Leer lassen, dann gilt der BVG-Mindestzinssatz." },
  ],
  tablas: [{ clave: "plan", titulo: "Altersguthaben Jahr für Jahr", filasVisibles: 12 }],
  calcular(entrada, valores, { redondear }) {
    if (!Number.isInteger(entrada.alter) || entrada.alter < 18 || entrada.alter >= REFERENZALTER) throw new ErrorEntrada("Bitte ein Alter zwischen 18 und 64 Jahren eingeben.", "alter");
    const w = bvgWerteAus(valores);
    const zins = entrada.zins ?? valores["ch.bvg-mindestzins"];
    let guthaben = entrada.guthaben;
    let summeGutschriften = 0;
    const filas: (number | string | null)[][] = [];
    for (let alter = entrada.alter; alter < REFERENZALTER; alter++) {
      const zinsBetrag = (guthaben * zins) / 100;
      const gutschrift = bvgJahr(entrada.jahreslohn, alter, w).altersgutschrift;
      guthaben += zinsBetrag + gutschrift;
      summeGutschriften += gutschrift;
      filas.push([alter, redondear(gutschrift), redondear(zinsBetrag), redondear(guthaben)]);
    }
    const heute = bvgJahr(entrada.jahreslohn, entrada.alter, w);
    const kapital = redondear(guthaben);
    const renteJahr = redondear((kapital * valores["ch.bvg-umwandlungssatz"]) / 100);
    const hinweise = ["Gerechnet mit gleichbleibendem Lohn und dem gesetzlichen Minimum. Ihre Pensionskasse kann mehr versichern und andere Sätze anwenden."];
    if (!heute.versichert) hinweise.unshift("Der Jahreslohn liegt nicht über der Eintrittsschwelle. Es gibt keine obligatorischen Altersgutschriften.");
    return {
      kapital,
      renteJahr,
      renteMonat: redondear(renteJahr / 12),
      koordinierterLohn: heute.koordinierterLohn,
      gutschriftHeute: redondear(heute.altersgutschrift),
      summeGutschriften: redondear(summeGutschriften),
      zins,
      plan: {
        tipo: "tabla" as const,
        columnas: [
          { clave: "alter", etiqueta: "Alter", formato: "numero" as const },
          { clave: "gutschrift", etiqueta: "Altersgutschrift", formato: "moneda" as const },
          { clave: "zins", etiqueta: "Zins", formato: "moneda" as const },
          { clave: "guthaben", etiqueta: "Guthaben Ende Jahr", formato: "moneda" as const },
        ],
        filas,
      },
      observaciones: hinweise,
    };
  },
  resultado: [
    { clave: "kapital", etiqueta: "Altersguthaben mit 65", formato: "moneda", destacada: true },
    { clave: "renteMonat", etiqueta: "BVG-Altersrente pro Monat", formato: "moneda" },
    { clave: "renteJahr", etiqueta: "BVG-Altersrente pro Jahr", formato: "moneda" },
    { clave: "koordinierterLohn", etiqueta: "Koordinierter Lohn", formato: "moneda" },
    { clave: "gutschriftHeute", etiqueta: "Altersgutschrift in diesem Jahr", formato: "moneda" },
    { clave: "summeGutschriften", etiqueta: "Summe der künftigen Altersgutschriften", formato: "moneda" },
    { clave: "zins", etiqueta: "Verwendeter Zins", formato: "porcentaje", decimales: 2 },
  ],
});
