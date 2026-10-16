import { definirCalculadora } from "@/motor/calculo";
import { bundessteuer, dbstWerteAus, grenzsteuersatz, pruefeKinder, REQ_DBST, ZIVILSTAND, type Zivilstand } from "../lib/bundessteuer";

export default definirCalculadora({
  id: "ch.bundessteuer-rechner",
  mercado: "ch",
  concepto: "impuesto-renta",
  slug: "bundessteuer-rechner",
  estado: "publicado",
  requiere: REQ_DBST,
  campos: [
    { id: "einkommen", tipo: "moneda", etiqueta: "Steuerbares Einkommen (direkte Bundessteuer)", min: 0, porDefecto: 80000, ayuda: "Einkommen nach allen Abzügen, wie es in der Veranlagung der Bundessteuer steht." },
    { id: "zivilstand", tipo: "opcion", etiqueta: "Zivilstand", opciones: ZIVILSTAND, porDefecto: "alleinstehend" },
    { id: "kinder", tipo: "entero", etiqueta: "Kinder im gleichen Haushalt, für deren Unterhalt Sie hauptsächlich aufkommen", min: 0, max: 15, porDefecto: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    pruefeKinder(entrada.kinder, "kinder");
    const w = dbstWerteAus(valores);
    const zivilstand = entrada.zivilstand as Zivilstand;
    const r = bundessteuer(entrada.einkommen, zivilstand, entrada.kinder, w, redondear);
    const tarif = zivilstand === "verheiratet" ? "Tarif für Verheiratete" : entrada.kinder > 0 ? "Elterntarif (Tarif für Verheiratete)" : "Tarif für Alleinstehende";
    const hinweise: string[] = [];
    if (r.tarifsteuer > 0 && r.steuer === 0) hinweise.push(`Steuerbeträge unter ${w.mindestbetrag} Franken werden nicht erhoben.`);
    if (entrada.einkommen !== r.basis) hinweise.push("Der Tarif rechnet mit vollen 100 Franken. Der Rest darunter bleibt unberücksichtigt.");
    return {
      steuer: r.steuer,
      tarifsteuer: r.tarifsteuer,
      ermaessigung: r.ermaessigung,
      durchschnitt: entrada.einkommen > 0 ? (r.steuer / entrada.einkommen) * 100 : 0,
      grenzsatz: grenzsteuersatz(entrada.einkommen, zivilstand, entrada.kinder, w),
      tarif,
      observaciones: hinweise,
    };
  },
  resultado: [
    { clave: "steuer", etiqueta: "Direkte Bundessteuer pro Jahr", formato: "moneda", destacada: true },
    { clave: "tarifsteuer", etiqueta: "Steuer laut Tarif", formato: "moneda" },
    { clave: "ermaessigung", etiqueta: "Ermässigung für Kinder", formato: "moneda", ocultarSiCero: true },
    { clave: "durchschnitt", etiqueta: "Durchschnittlicher Steuersatz", formato: "porcentaje", decimales: 2 },
    { clave: "grenzsatz", etiqueta: "Grenzsteuersatz (auf die nächsten 100 Franken)", formato: "porcentaje", decimales: 2 },
    { clave: "tarif", etiqueta: "Angewendeter Tarif", formato: "texto" },
  ],
});
