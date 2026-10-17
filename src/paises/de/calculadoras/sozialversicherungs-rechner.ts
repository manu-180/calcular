import { definirCalculadora } from "@/motor/calculo";
import { geringfuegigkeitsgrenze, sozialversicherungMonat } from "../lib/steuer";
import { KINDER_PV, personAus, REQ_SV, svAus } from "../lib/werte";

export default definirCalculadora({
  id: "de.sozialversicherungs-rechner",
  mercado: "de",
  concepto: "aportes-seguridad-social",
  slug: "sozialversicherungs-rechner",
  estado: "publicado",
  requiere: { ...REQ_SV, "de.mindestlohn": "numero", "de.uebergangsbereich-obergrenze": "numero" },
  campos: [
    { id: "brutto", tipo: "moneda", etiqueta: "Bruttolohn im Monat", min: 0, porDefecto: 3500 },
    { id: "kinder", tipo: "opcion", etiqueta: "Kinder für die Pflegeversicherung", opciones: KINDER_PV, porDefecto: "kinderlos" },
    { id: "bundesland", tipo: "region", etiqueta: "Bundesland des Arbeitsorts", porDefecto: "nw" },
    { id: "zusatzbeitrag", tipo: "porcentaje", etiqueta: "Zusatzbeitrag Ihrer Krankenkasse", min: 0, max: 10, requerido: false, ayuda: "Leer lassen, dann gilt der Durchschnitt." },
  ],
  calcular(entrada, valores, { redondear }) {
    const sv = svAus(valores, entrada.zusatzbeitrag);
    const r = sozialversicherungMonat(
      entrada.brutto,
      sv,
      personAus(entrada.kinder, entrada.bundesland),
      { rv: true, av: true },
      geringfuegigkeitsgrenze(valores["de.mindestlohn"]),
      valores["de.uebergangsbereich-obergrenze"],
    );
    const observaciones: string[] = [];
    if (r.uebergangsbereich) observaciones.push("Ihr Lohn liegt im Übergangsbereich: Ihr Anteil ist gemindert, der Arbeitgeber trägt mehr als die Hälfte.");
    return {
      anKv: r.arbeitnehmer.kv,
      anPv: r.arbeitnehmer.pv,
      anRv: r.arbeitnehmer.rv,
      anAv: r.arbeitnehmer.av,
      anSumme: r.arbeitnehmer.summe,
      agKv: r.arbeitgeber.kv,
      agPv: r.arbeitgeber.pv,
      agRv: r.arbeitgeber.rv,
      agAv: r.arbeitgeber.av,
      agSumme: r.arbeitgeber.summe,
      gesamt: redondear(r.arbeitnehmer.summe + r.arbeitgeber.summe),
      observaciones,
    };
  },
  resultado: [
    { clave: "anSumme", etiqueta: "Ihr Anteil zusammen", formato: "moneda", destacada: true },
    { clave: "anKv", etiqueta: "Krankenversicherung (Ihr Anteil)", formato: "moneda" },
    { clave: "anPv", etiqueta: "Pflegeversicherung (Ihr Anteil)", formato: "moneda" },
    { clave: "anRv", etiqueta: "Rentenversicherung (Ihr Anteil)", formato: "moneda" },
    { clave: "anAv", etiqueta: "Arbeitslosenversicherung (Ihr Anteil)", formato: "moneda" },
    { clave: "agSumme", etiqueta: "Anteil des Arbeitgebers zusammen", formato: "moneda" },
    { clave: "agKv", etiqueta: "Krankenversicherung (Arbeitgeber)", formato: "moneda" },
    { clave: "agPv", etiqueta: "Pflegeversicherung (Arbeitgeber)", formato: "moneda" },
    { clave: "agRv", etiqueta: "Rentenversicherung (Arbeitgeber)", formato: "moneda" },
    { clave: "agAv", etiqueta: "Arbeitslosenversicherung (Arbeitgeber)", formato: "moneda" },
    { clave: "gesamt", etiqueta: "Gesamtsozialversicherungsbeitrag", formato: "moneda" },
  ],
});
