import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "de.rentenrechner",
  mercado: "de",
  concepto: "jubilacion",
  slug: "rentenrechner",
  estado: "publicado",
  requiere: {
    "de.rentenwert": "numero",
    "de.durchschnittsentgelt": "numero",
    "de.bbg-rv": "numero",
  },
  campos: [
    { id: "jahresbrutto", tipo: "moneda", etiqueta: "Durchschnittliches Bruttojahresgehalt", min: 0, porDefecto: 45000 },
    { id: "jahre", tipo: "numero", etiqueta: "Beitragsjahre (noch kommende oder insgesamt)", min: 0, max: 50, porDefecto: 40 },
    { id: "bisherigePunkte", tipo: "numero", etiqueta: "Bereits gesammelte Entgeltpunkte (optional)", min: 0, requerido: false, ayuda: "Stehen in Ihrer Renteninformation. Dann tragen Sie bei den Jahren nur die noch kommenden ein." },
  ],
  calcular(entrada, valores, { redondear }) {
    const grenze = valores["de.bbg-rv"] * 12;
    const punkteJahr = Math.min(entrada.jahresbrutto, grenze) / valores["de.durchschnittsentgelt"];
    const punkte = (entrada.bisherigePunkte ?? 0) + punkteJahr * entrada.jahre;
    const rente = redondear(punkte * valores["de.rentenwert"]);
    const observaciones: string[] = [];
    if (entrada.jahresbrutto > grenze) observaciones.push("Ihr Gehalt liegt über der Beitragsbemessungsgrenze. Mehr als die Punkte für die Grenze sammeln Sie pro Jahr nicht.");
    observaciones.push("Von der Bruttorente gehen noch Kranken- und Pflegeversicherung und gegebenenfalls Einkommensteuer ab.");
    return {
      punkteJahr,
      punkte,
      rentenwert: valores["de.rentenwert"],
      rente,
      renteJahr: redondear(rente * 12),
      observaciones,
    };
  },
  resultado: [
    { clave: "rente", etiqueta: "Bruttorente im Monat nach heutigem Rentenwert", formato: "moneda", destacada: true },
    { clave: "punkte", etiqueta: "Entgeltpunkte insgesamt", formato: "numero", decimales: 2 },
    { clave: "punkteJahr", etiqueta: "Entgeltpunkte pro Jahr", formato: "numero", decimales: 4 },
    { clave: "rentenwert", etiqueta: "Aktueller Rentenwert", formato: "moneda" },
    { clave: "renteJahr", etiqueta: "Bruttorente im Jahr", formato: "moneda" },
  ],
});
