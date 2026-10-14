import { definirCalculadora } from "@/motor/calculo";
import { geringfuegigkeitsgrenze, sozialversicherungMonat } from "../lib/steuer";
import { personAus, REQ_SV, svAus } from "../lib/werte";

export default definirCalculadora({
  id: "de.arbeitgeberkosten-rechner",
  mercado: "de",
  concepto: "costo-empleador",
  slug: "arbeitgeberkosten-rechner",
  estado: "publicado",
  requiere: { ...REQ_SV, "de.mindestlohn": "numero", "de.uebergangsbereich-obergrenze": "numero" },
  campos: [
    { id: "brutto", tipo: "moneda", etiqueta: "Bruttolohn im Monat", min: 0, porDefecto: 3500 },
    { id: "bundesland", tipo: "region", etiqueta: "Bundesland des Arbeitsorts", porDefecto: "nw" },
    { id: "zusatzbeitrag", tipo: "porcentaje", etiqueta: "Zusatzbeitrag der Krankenkasse", min: 0, max: 10, requerido: false, ayuda: "Leer lassen, dann gilt der Durchschnitt." },
  ],
  calcular(entrada, valores, { redondear }) {
    const sv = svAus(valores, entrada.zusatzbeitrag);
    const r = sozialversicherungMonat(
      entrada.brutto,
      sv,
      personAus("1", entrada.bundesland),
      { rv: true, av: true },
      geringfuegigkeitsgrenze(valores["de.mindestlohn"]),
      valores["de.uebergangsbereich-obergrenze"],
    );
    const kosten = redondear(entrada.brutto + r.arbeitgeber.summe);
    return {
      kv: r.arbeitgeber.kv,
      pv: r.arbeitgeber.pv,
      rv: r.arbeitgeber.rv,
      av: r.arbeitgeber.av,
      abgaben: r.arbeitgeber.summe,
      kosten,
      kostenJahr: redondear(kosten * 12),
      aufschlag: entrada.brutto > 0 ? (r.arbeitgeber.summe / entrada.brutto) * 100 : 0,
      observaciones: [
        "Nicht enthalten sind die Umlagen U1 und U2 für Krankheit und Mutterschaft, die Insolvenzgeldumlage und der Beitrag zur Berufsgenossenschaft. Sie hängen von Krankenkasse, Betriebsgröße und Branche ab.",
      ],
    };
  },
  resultado: [
    { clave: "kosten", etiqueta: "Kosten des Arbeitgebers im Monat", formato: "moneda", destacada: true },
    { clave: "abgaben", etiqueta: "Arbeitgeberanteil Sozialversicherung", formato: "moneda" },
    { clave: "kv", etiqueta: "Krankenversicherung", formato: "moneda" },
    { clave: "pv", etiqueta: "Pflegeversicherung", formato: "moneda" },
    { clave: "rv", etiqueta: "Rentenversicherung", formato: "moneda" },
    { clave: "av", etiqueta: "Arbeitslosenversicherung", formato: "moneda" },
    { clave: "aufschlag", etiqueta: "Aufschlag auf das Brutto", formato: "porcentaje", decimales: 1 },
    { clave: "kostenJahr", etiqueta: "Kosten im Jahr (zwölf Monatsgehälter)", formato: "moneda" },
  ],
});
