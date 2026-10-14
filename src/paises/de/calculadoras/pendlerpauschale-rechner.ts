import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "de.pendlerpauschale-rechner",
  mercado: "de",
  concepto: "propio",
  slug: "pendlerpauschale-rechner",
  estado: "publicado",
  requiere: {
    "de.entfernungspauschale": "numero",
    "de.entfernungspauschale-hoechstbetrag": "numero",
    "de.arbeitnehmer-pauschbetrag": "numero",
  },
  campos: [
    { id: "km", tipo: "entero", etiqueta: "Einfache Entfernung zur Arbeit in vollen Kilometern", min: 0, max: 500, porDefecto: 25 },
    { id: "tage", tipo: "entero", etiqueta: "Arbeitstage im Jahr an der ersten Tätigkeitsstätte", min: 0, max: 366, porDefecto: 220 },
    { id: "auto", tipo: "si-no", etiqueta: "Mit dem eigenen oder überlassenen Auto", porDefecto: true, ayuda: "Ohne Auto gilt ein Höchstbetrag pro Jahr." },
    { id: "steuersatz", tipo: "porcentaje", etiqueta: "Ihr Grenzsteuersatz (optional)", min: 0, max: 45, requerido: false, ayuda: "Steht im Einkommensteuerrechner." },
  ],
  calcular(entrada, valores, { redondear }) {
    const roh = redondear(entrada.km * entrada.tage * valores["de.entfernungspauschale"]);
    const hoechst = valores["de.entfernungspauschale-hoechstbetrag"];
    const pauschale = entrada.auto ? roh : Math.min(roh, hoechst);
    const ueberPauschbetrag = Math.max(redondear(pauschale - valores["de.arbeitnehmer-pauschbetrag"]), 0);
    const observaciones: string[] = [];
    if (!entrada.auto && roh > hoechst) observaciones.push("Ohne Auto ist die Pauschale auf den Höchstbetrag begrenzt.");
    observaciones.push("Haben Sie weitere Werbungskosten (Arbeitsmittel, Fortbildung, Homeoffice), wirkt mehr davon über den Pauschbetrag hinaus.");
    return {
      pauschale,
      ueberPauschbetrag,
      ersparnis: entrada.steuersatz === null ? null : redondear((ueberPauschbetrag * entrada.steuersatz) / 100),
      observaciones,
    };
  },
  resultado: [
    { clave: "pauschale", etiqueta: "Entfernungspauschale im Jahr", formato: "moneda", destacada: true },
    { clave: "ueberPauschbetrag", etiqueta: "Über dem Arbeitnehmer-Pauschbetrag", formato: "moneda" },
    { clave: "ersparnis", etiqueta: "Geschätzte Steuerersparnis", formato: "moneda" },
  ],
});
