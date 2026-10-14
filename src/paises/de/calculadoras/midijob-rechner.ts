import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { geringfuegigkeitsgrenze, kaufmaennisch, pvSatzArbeitnehmer, sozialversicherungMonat, uebergangsbereich } from "../lib/steuer";
import { KINDER_PV, personAus, REQ_SV, svAus } from "../lib/werte";

export default definirCalculadora({
  id: "de.midijob-rechner",
  mercado: "de",
  concepto: "propio",
  slug: "midijob-rechner",
  estado: "publicado",
  requiere: { ...REQ_SV, "de.mindestlohn": "numero", "de.uebergangsbereich-obergrenze": "numero" },
  campos: [
    { id: "brutto", tipo: "moneda", etiqueta: "Bruttolohn im Monat", min: 0, porDefecto: 1200 },
    { id: "kinder", tipo: "opcion", etiqueta: "Kinder für die Pflegeversicherung", opciones: KINDER_PV, porDefecto: "kinderlos" },
    { id: "bundesland", tipo: "region", etiqueta: "Bundesland", porDefecto: "nw" },
    { id: "zusatzbeitrag", tipo: "porcentaje", etiqueta: "Zusatzbeitrag Ihrer Krankenkasse", min: 0, max: 10, requerido: false, ayuda: "Leer lassen, dann gilt der Durchschnitt." },
  ],
  calcular(entrada, valores, { redondear }) {
    const sv = svAus(valores, entrada.zusatzbeitrag);
    const person = personAus(entrada.kinder, entrada.bundesland);
    const g = geringfuegigkeitsgrenze(valores["de.mindestlohn"]);
    const obergrenze = valores["de.uebergangsbereich-obergrenze"];
    if (entrada.brutto > obergrenze) throw new ErrorEntrada(`Der Übergangsbereich endet bei ${obergrenze} Euro. Darüber gelten die vollen Beiträge; nutzen Sie den Brutto-Netto-Rechner.`, "brutto");
    const r = sozialversicherungMonat(entrada.brutto, sv, person, { rv: true, av: true }, g, obergrenze);
    const { f, beGesamt, beAn } = uebergangsbereich(entrada.brutto, sv, g, obergrenze);
    const vollerSatz = (sv.kvAllgemein + sv.kvZusatz + sv.rv + sv.av) / 2 + pvSatzArbeitnehmer(sv, person);
    const anVoll = kaufmaennisch((entrada.brutto * vollerSatz) / 100);
    return {
      anBeitrag: r.arbeitnehmer.summe,
      anVoll,
      ersparnis: redondear(anVoll - r.arbeitnehmer.summe),
      agBeitrag: r.arbeitgeber.summe,
      nettoOhneSteuer: redondear(entrada.brutto - r.arbeitnehmer.summe),
      beAn: redondear(beAn),
      beGesamt: redondear(beGesamt),
      faktor: f,
      untergrenze: g,
      observaciones: ["Lohnsteuer fällt je nach Steuerklasse zusätzlich an. In Steuerklasse I bleibt ein Midijob oft steuerfrei; der Brutto-Netto-Rechner zeigt das genau."],
    };
  },
  resultado: [
    { clave: "anBeitrag", etiqueta: "Ihre Sozialabgaben im Monat", formato: "moneda", destacada: true },
    { clave: "anVoll", etiqueta: "So viel wären es mit vollem Beitragssatz", formato: "moneda" },
    { clave: "ersparnis", etiqueta: "Ersparnis durch den Übergangsbereich", formato: "moneda" },
    { clave: "nettoOhneSteuer", etiqueta: "Brutto minus Sozialabgaben", formato: "moneda" },
    { clave: "agBeitrag", etiqueta: "Sozialabgaben des Arbeitgebers", formato: "moneda" },
    { clave: "beAn", etiqueta: "Beitragspflichtige Einnahme für Ihren Anteil", formato: "moneda" },
    { clave: "beGesamt", etiqueta: "Beitragspflichtige Einnahme gesamt", formato: "moneda" },
    { clave: "faktor", etiqueta: "Faktor F", formato: "numero", decimales: 4 },
    { clave: "untergrenze", etiqueta: "Untergrenze (Minijob-Grenze)", formato: "moneda" },
  ],
});
