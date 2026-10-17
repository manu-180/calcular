import { definirCalculadora } from "@/motor/calculo";
import { einkommensteuer } from "../lib/steuer";

export default definirCalculadora({
  id: "de.abfindungsrechner",
  mercado: "de",
  concepto: "indemnizacion-despido",
  slug: "abfindungsrechner",
  estado: "publicado",
  requiere: { "de.abfindung-faktor": "numero", "de.est-tarif": "mapa" },
  campos: [
    { id: "monatsverdienst", tipo: "moneda", etiqueta: "Bruttomonatsverdienst", min: 0, porDefecto: 4000 },
    { id: "jahre", tipo: "entero", etiqueta: "Volle Jahre im Betrieb", min: 0, max: 60, porDefecto: 10 },
    { id: "monate", tipo: "entero", etiqueta: "Zusätzliche Monate", min: 0, max: 11, porDefecto: 0, ayuda: "Mehr als sechs Monate werden auf ein volles Jahr aufgerundet." },
    { id: "zvE", tipo: "moneda", etiqueta: "Zu versteuerndes Einkommen im Jahr der Auszahlung, ohne Abfindung (optional)", min: 0, requerido: false, ayuda: "Für die Steuer mit der Fünftelregelung." },
    {
      id: "veranlagung",
      tipo: "opcion",
      etiqueta: "Veranlagung",
      opciones: [
        { valor: "einzeln", etiqueta: "Einzelveranlagung" },
        { valor: "zusammen", etiqueta: "Zusammenveranlagung" },
      ],
      porDefecto: "einzeln",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const jahre = entrada.jahre + (entrada.monate > 6 ? 1 : 0);
    const abfindung = redondear(entrada.monatsverdienst * valores["de.abfindung-faktor"] * jahre);
    let steuerNormal: number | null = null;
    let steuerFuenftel: number | null = null;
    if (entrada.zvE !== null) {
      const t = valores["de.est-tarif"];
      const sp = entrada.veranlagung === "zusammen";
      const basis = einkommensteuer(entrada.zvE, t, sp);
      steuerNormal = einkommensteuer(entrada.zvE + abfindung, t, sp) - basis;
      steuerFuenftel = (einkommensteuer(entrada.zvE + abfindung / 5, t, sp) - basis) * 5;
    }
    return {
      jahre,
      abfindung,
      steuerNormal,
      steuerFuenftel,
      ersparnis: steuerNormal === null || steuerFuenftel === null ? null : redondear(steuerNormal - steuerFuenftel),
      netto: steuerFuenftel === null ? null : redondear(abfindung - steuerFuenftel),
      observaciones: [
        "Einen gesetzlichen Anspruch auf diese Abfindung gibt es nur bei einer betriebsbedingten Kündigung mit dem Angebot nach § 1a KSchG, wenn Sie keine Klage erheben. Sonst ist die Höhe Verhandlungssache; ein halbes Monatsgehalt pro Jahr ist dabei eine übliche Größe.",
        "Die Steuer zeigt nur die Einkommensteuer auf die Abfindung, ohne Solidaritätszuschlag und Kirchensteuer.",
      ],
    };
  },
  resultado: [
    { clave: "abfindung", etiqueta: "Abfindung brutto", formato: "moneda", destacada: true },
    { clave: "jahre", etiqueta: "Angerechnete Jahre", formato: "anios" },
    { clave: "steuerFuenftel", etiqueta: "Einkommensteuer mit Fünftelregelung", formato: "moneda" },
    { clave: "steuerNormal", etiqueta: "Einkommensteuer ohne Fünftelregelung", formato: "moneda" },
    { clave: "ersparnis", etiqueta: "Ersparnis durch die Fünftelregelung", formato: "moneda" },
    { clave: "netto", etiqueta: "Abfindung nach Einkommensteuer", formato: "moneda" },
  ],
});
