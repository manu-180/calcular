import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { BRUTTO_MAX, nettoLohn, REQ_LOHN, type LohnEingabe } from "../lib/lohn";

function stufe(art: string, km: number): string | null {
  if (art === "klein") {
    if (km < 20) return null;
    if (km <= 40) return "klein-20";
    return km <= 60 ? "klein-40" : "klein-60";
  }
  if (km < 2) return null;
  if (km <= 20) return "gross-2";
  if (km <= 40) return "gross-20";
  return km <= 60 ? "gross-40" : "gross-60";
}

export default definirCalculadora({
  id: "at.pendlerpauschale-rechner",
  mercado: "at",
  concepto: "propio",
  slug: "pendlerpauschale-rechner",
  estado: "publicado",
  requiere: REQ_LOHN,
  campos: [
    {
      id: "art",
      tipo: "opcion",
      etiqueta: "Öffentliche Verkehrsmittel auf dem Arbeitsweg",
      opciones: [
        { valor: "klein", etiqueta: "Zumutbar (kleines Pendlerpauschale)" },
        { valor: "gross", etiqueta: "Nicht zumutbar (großes Pendlerpauschale)" },
      ],
      porDefecto: "gross",
      ayuda: "Ob die Benützung zumutbar ist, ermittelt der Pendlerrechner des BMF.",
    },
    { id: "km", tipo: "entero", etiqueta: "Einfache Strecke Wohnung zur Arbeitsstätte in Kilometern", min: 0, max: 500, porDefecto: 30 },
    {
      id: "tage",
      tipo: "opcion",
      etiqueta: "An wie vielen Tagen im Monat fahren Sie zur Arbeit?",
      opciones: [
        { valor: "11", etiqueta: "An mindestens 11 Tagen" },
        { valor: "8", etiqueta: "An 8 bis 10 Tagen" },
        { valor: "4", etiqueta: "An 4 bis 7 Tagen" },
        { valor: "0", etiqueta: "An weniger als 4 Tagen" },
      ],
      porDefecto: "11",
    },
    { id: "brutto", tipo: "moneda", etiqueta: "Bruttogehalt im Monat (für die Steuerersparnis)", min: 0, max: BRUTTO_MAX, requerido: false },
  ],
  calcular(entrada, valores, { redondear }) {
    const anteil = entrada.tage === "11" ? 1 : entrada.tage === "8" ? 2 / 3 : entrada.tage === "4" ? 1 / 3 : 0;
    const schluessel = stufe(entrada.art, entrada.km);
    if (schluessel === null || anteil === 0) {
      throw new ErrorEntrada(
        anteil === 0
          ? "Unter vier Fahrten im Monat steht kein Pendlerpauschale zu."
          : entrada.art === "klein"
            ? "Das kleine Pendlerpauschale gibt es erst ab 20 Kilometern."
            : "Das große Pendlerpauschale gibt es erst ab 2 Kilometern.",
        anteil === 0 ? "tage" : "km",
      );
    }
    const pauschaleJahr = redondear(valores["at.pendlerpauschale"][schluessel] * anteil);
    const euroJahr = redondear(entrada.km * valores["at.pendlereuro"] * anteil);
    let ersparnis: number | null = null;
    if (entrada.brutto !== null && entrada.brutto > 0) {
      const basis: LohnEingabe = { brutto: entrada.brutto, wien: false, avabKinder: 0, kinderUnter18: 0, kinderAb18: 0, faboHalb: false, pendler: "keine", pendlerKm: 0 };
      const ohne = nettoLohn(basis, valores, redondear);
      const mit = nettoLohn({ ...basis, pendler: schluessel, pendlerKm: entrada.km, pendlerAnteil: anteil }, valores, redondear);
      ersparnis = redondear(12 * (ohne.lohnsteuer - mit.lohnsteuer));
    }
    return {
      pauschaleJahr,
      pauschaleMonat: redondear((valores["at.pendlerpauschale"][schluessel] / 12) * anteil),
      euroJahr,
      euroMonat: redondear(((entrada.km * valores["at.pendlereuro"]) / 12) * anteil),
      ersparnis,
    };
  },
  resultado: [
    { clave: "pauschaleJahr", etiqueta: "Pendlerpauschale im Jahr (Freibetrag)", formato: "moneda", destacada: true },
    { clave: "pauschaleMonat", etiqueta: "Pendlerpauschale im Monat", formato: "moneda" },
    { clave: "euroJahr", etiqueta: "Pendlereuro im Jahr (Absetzbetrag)", formato: "moneda" },
    { clave: "euroMonat", etiqueta: "Pendlereuro im Monat", formato: "moneda" },
    { clave: "ersparnis", etiqueta: "Lohnsteuer gespart im Jahr (laufende Bezüge)", formato: "moneda" },
  ],
});
