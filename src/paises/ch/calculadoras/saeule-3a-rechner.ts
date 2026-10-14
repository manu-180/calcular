import { definirCalculadora } from "@/motor/calculo";
import { bundessteuer, dbstWerteAus, pruefeKinder, REQ_DBST, ZIVILSTAND, type Zivilstand } from "../lib/bundessteuer";

export default definirCalculadora({
  id: "ch.saeule-3a-rechner",
  mercado: "ch",
  concepto: "propio",
  slug: "saeule-3a-rechner",
  estado: "publicado",
  requiere: {
    ...REQ_DBST,
    "ch.saeule-3a-mit-pk": "numero",
    "ch.saeule-3a-ohne-pk": "numero",
    "ch.saeule-3a-ohne-pk-satz": "numero",
    "ch.bvg-obere-grenze": "numero",
  },
  campos: [
    { id: "mitPk", tipo: "si-no", etiqueta: "Ich bin in einer Pensionskasse versichert", porDefecto: true },
    { id: "erwerbseinkommen", tipo: "moneda", etiqueta: "Erwerbseinkommen pro Jahr (nur ohne Pensionskasse nötig)", min: 0, requerido: false },
    { id: "beitrag", tipo: "moneda", etiqueta: "Geplante Einzahlung in die Säule 3a", min: 0, requerido: false, ayuda: "Leer lassen, dann rechnet der Rechner mit dem Maximum." },
    { id: "steuerbar", tipo: "moneda", etiqueta: "Steuerbares Einkommen vor der Einzahlung (Bundessteuer)", min: 0, porDefecto: 80000 },
    { id: "zivilstand", tipo: "opcion", etiqueta: "Zivilstand", opciones: ZIVILSTAND, porDefecto: "alleinstehend" },
    { id: "kinder", tipo: "entero", etiqueta: "Kinder im gleichen Haushalt", min: 0, max: 15, porDefecto: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    pruefeKinder(entrada.kinder, "kinder");
    const hinweise: string[] = [];
    let maximum = valores["ch.saeule-3a-mit-pk"];
    if (!entrada.mitPk) {
      const anteil = entrada.erwerbseinkommen === null ? valores["ch.saeule-3a-ohne-pk"] : redondear((entrada.erwerbseinkommen * valores["ch.saeule-3a-ohne-pk-satz"]) / 100);
      maximum = Math.min(anteil, valores["ch.saeule-3a-ohne-pk"]);
      if (entrada.erwerbseinkommen === null) hinweise.push(`Ohne Angabe des Erwerbseinkommens zeigt der Rechner den Höchstbetrag. Abziehbar sind höchstens ${valores["ch.saeule-3a-ohne-pk-satz"]} % des Erwerbseinkommens.`);
    }
    const geplant = entrada.beitrag ?? maximum;
    const abziehbar = Math.min(geplant, maximum);
    if (geplant > maximum) hinweise.push("Die geplante Einzahlung liegt über dem Maximum. Abziehen können Sie nur den Höchstbetrag.");
    const w = dbstWerteAus(valores);
    const zivilstand = entrada.zivilstand as Zivilstand;
    const vorher = bundessteuer(entrada.steuerbar, zivilstand, entrada.kinder, w, redondear).steuer;
    const nachher = bundessteuer(Math.max(entrada.steuerbar - abziehbar, 0), zivilstand, entrada.kinder, w, redondear).steuer;
    hinweise.push("Kanton und Gemeinde lassen den Abzug ebenfalls zu. Diese Ersparnis kommt dazu und ist hier nicht berechnet.");
    return {
      maximum,
      abziehbar,
      ersparnis: redondear(vorher - nachher),
      vorher,
      nachher,
      observaciones: hinweise,
    };
  },
  resultado: [
    { clave: "maximum", etiqueta: "Maximaler Beitrag in diesem Jahr", formato: "moneda", destacada: true },
    { clave: "abziehbar", etiqueta: "Abziehbare Einzahlung", formato: "moneda" },
    { clave: "ersparnis", etiqueta: "Ersparnis bei der direkten Bundessteuer", formato: "moneda" },
    { clave: "vorher", etiqueta: "Bundessteuer ohne Einzahlung", formato: "moneda" },
    { clave: "nachher", etiqueta: "Bundessteuer mit Einzahlung", formato: "moneda" },
  ],
});
