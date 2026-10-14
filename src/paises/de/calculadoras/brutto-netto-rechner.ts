import { definirCalculadora, porRegion } from "@/motor/calculo";
import { nettoMonat } from "../lib/netto";
import { geringfuegigkeitsgrenze, STEUERKLASSEN, type Steuerklasse } from "../lib/steuer";
import { KINDER_PV, KINDERFREIBETRAEGE, lohnWerteAus, personAus, REQ_LOHN } from "../lib/werte";

export default definirCalculadora({
  id: "de.brutto-netto-rechner",
  mercado: "de",
  concepto: "sueldo-neto",
  slug: "brutto-netto-rechner",
  estado: "publicado",
  requiere: {
    ...REQ_LOHN,
    "de.kirchensteuer": "numero-por-region",
    "de.mindestlohn": "numero",
    "de.uebergangsbereich-obergrenze": "numero",
  },
  campos: [
    { id: "brutto", tipo: "moneda", etiqueta: "Bruttogehalt im Monat", min: 0, porDefecto: 3500 },
    { id: "steuerklasse", tipo: "opcion", etiqueta: "Steuerklasse", opciones: STEUERKLASSEN, porDefecto: "1" },
    { id: "bundesland", tipo: "region", etiqueta: "Bundesland", porDefecto: "nw" },
    { id: "kirche", tipo: "si-no", etiqueta: "Kirchensteuerpflichtig", porDefecto: false },
    { id: "kinderfreibetraege", tipo: "opcion", etiqueta: "Kinderfreibeträge laut Lohnsteuerabzugsmerkmalen", opciones: KINDERFREIBETRAEGE, porDefecto: "0" },
    { id: "kinder", tipo: "opcion", etiqueta: "Kinder für die Pflegeversicherung", opciones: KINDER_PV, porDefecto: "kinderlos", ayuda: "Ab dem zweiten Kind sinkt der Beitrag für jedes Kind unter 25 Jahren." },
    { id: "zusatzbeitrag", tipo: "porcentaje", etiqueta: "Zusatzbeitrag Ihrer Krankenkasse", min: 0, max: 10, requerido: false, ayuda: "Leer lassen, dann gilt der durchschnittliche Zusatzbeitrag." },
  ],
  calcular(entrada, valores, { redondear }) {
    const werte = lohnWerteAus(valores, entrada.zusatzbeitrag);
    const r = nettoMonat(
      {
        brutto: entrada.brutto,
        steuerklasse: entrada.steuerklasse as Steuerklasse,
        kinderfreibetraege: Number(entrada.kinderfreibetraege),
        kirchensteuersatz: entrada.kirche ? porRegion(valores["de.kirchensteuer"], entrada.bundesland) : 0,
        person: personAus(entrada.kinder, entrada.bundesland),
      },
      werte,
      geringfuegigkeitsgrenze(valores["de.mindestlohn"]),
      valores["de.uebergangsbereich-obergrenze"],
    );
    const observaciones: string[] = [];
    if (r.sv.uebergangsbereich) observaciones.push("Ihr Lohn liegt im Übergangsbereich (Midijob): Die Sozialabgaben sind geringer als der volle Satz.");
    if (entrada.brutto > werte.sv.bbgRvMonat) observaciones.push("Über der Beitragsbemessungsgrenze steigen die Sozialabgaben nicht weiter.");
    return {
      lohnsteuer: r.lohnsteuer,
      soli: r.soli,
      kirchensteuer: r.kirchensteuer,
      steuern: r.steuern,
      kv: r.sv.arbeitnehmer.kv,
      rv: r.sv.arbeitnehmer.rv,
      av: r.sv.arbeitnehmer.av,
      pv: r.sv.arbeitnehmer.pv,
      sozialabgaben: r.sv.arbeitnehmer.summe,
      netto: r.netto,
      nettoJahr: redondear(r.netto * 12),
      observaciones,
    };
  },
  resultado: [
    { clave: "netto", etiqueta: "Nettogehalt im Monat", formato: "moneda", destacada: true },
    { clave: "lohnsteuer", etiqueta: "Lohnsteuer", formato: "moneda" },
    { clave: "soli", etiqueta: "Solidaritätszuschlag", formato: "moneda", ocultarSiCero: true },
    { clave: "kirchensteuer", etiqueta: "Kirchensteuer", formato: "moneda", ocultarSiCero: true },
    { clave: "kv", etiqueta: "Krankenversicherung", formato: "moneda" },
    { clave: "pv", etiqueta: "Pflegeversicherung", formato: "moneda" },
    { clave: "rv", etiqueta: "Rentenversicherung", formato: "moneda" },
    { clave: "av", etiqueta: "Arbeitslosenversicherung", formato: "moneda" },
    { clave: "steuern", etiqueta: "Steuern zusammen", formato: "moneda" },
    { clave: "sozialabgaben", etiqueta: "Sozialabgaben zusammen", formato: "moneda" },
    { clave: "nettoJahr", etiqueta: "Netto im Jahr (zwölf Monatsgehälter)", formato: "moneda" },
  ],
});
