import { definirCalculadora, porcentaje } from "@/motor/calculo";

const WOCHEN_PRO_MONAT = 52 / 12;

export default definirCalculadora({
  id: "at.ueberstunden-rechner",
  mercado: "at",
  concepto: "horas-extra",
  slug: "ueberstunden-rechner",
  estado: "publicado",
  requiere: {
    "at.ueberstundenzuschlag": "numero",
    "at.ueberstunden-steuerfrei": "mapa",
  },
  campos: [
    { id: "brutto", tipo: "moneda", etiqueta: "Bruttogehalt im Monat", min: 0, porDefecto: 3000 },
    { id: "wochenstunden", tipo: "numero", etiqueta: "Normalarbeitszeit pro Woche in Stunden", min: 1, max: 60, porDefecto: 40 },
    { id: "ueberstunden", tipo: "numero", etiqueta: "Überstunden im Monat", min: 0, max: 200, porDefecto: 10 },
    { id: "teiler", tipo: "numero", etiqueta: "Stundenteiler laut Kollektivvertrag", min: 1, requerido: false, ayuda: "Leer lassen: Monatsgehalt geteilt durch Wochenstunden mal 52 durch 12." },
  ],
  calcular(entrada, valores, { redondear }) {
    const teiler = entrada.teiler ?? entrada.wochenstunden * WOCHEN_PRO_MONAT;
    const grundlohn = entrada.brutto / teiler;
    const zuschlag = porcentaje(grundlohn, valores["at.ueberstundenzuschlag"]);
    const frei = valores["at.ueberstunden-steuerfrei"];
    const zuschlagGesamt = redondear(entrada.ueberstunden * zuschlag);
    const steuerfrei = redondear(Math.min(Math.min(entrada.ueberstunden, frei.stunden) * zuschlag, frei.hoechstbetrag));
    return {
      entgelt: redondear(entrada.ueberstunden * (grundlohn + zuschlag)),
      grundlohn: redondear(grundlohn),
      stundensatz: redondear(grundlohn + zuschlag),
      zuschlagGesamt,
      steuerfrei,
      zeitausgleich: entrada.ueberstunden * (1 + valores["at.ueberstundenzuschlag"] / 100),
    };
  },
  resultado: [
    { clave: "entgelt", etiqueta: "Bezahlung für die Überstunden", formato: "moneda", destacada: true },
    { clave: "grundlohn", etiqueta: "Grundlohn je Stunde", formato: "moneda" },
    { clave: "stundensatz", etiqueta: "Bezahlung je Überstunde mit Zuschlag", formato: "moneda" },
    { clave: "zuschlagGesamt", etiqueta: "Überstundenzuschläge zusammen", formato: "moneda" },
    { clave: "steuerfrei", etiqueta: "Davon steuerfrei", formato: "moneda" },
    { clave: "zeitausgleich", etiqueta: "Stattdessen Zeitausgleich", formato: "horas", decimales: 1 },
  ],
});
