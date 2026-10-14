import { definirCalculadora } from "@/motor/calculo";
import { BRUTTO_MAX, nettoLohn, PENDLER_OPCIONES, REQ_LOHN } from "../lib/lohn";

export default definirCalculadora({
  id: "at.brutto-netto-rechner",
  mercado: "at",
  concepto: "sueldo-neto",
  slug: "brutto-netto-rechner",
  estado: "publicado",
  requiere: { ...REQ_LOHN, "at.vab-zuschlag": "mapa" },
  campos: [
    { id: "brutto", tipo: "moneda", etiqueta: "Bruttogehalt im Monat", min: 0, max: BRUTTO_MAX, porDefecto: 3500, ayuda: "Gerechnet wird mit 14 Gehältern: zwölf Monatsgehälter plus Urlaubsgeld und Weihnachtsgeld in gleicher Höhe." },
    { id: "wien", tipo: "si-no", etiqueta: "Arbeitsort in Wien", porDefecto: false, ayuda: "In Wien ist der Wohnbauförderungsbeitrag höher." },
    { id: "kinderUnter18", tipo: "entero", etiqueta: "Kinder unter 18 mit Familienbonus Plus", min: 0, max: 10, porDefecto: 0 },
    { id: "kinderAb18", tipo: "entero", etiqueta: "Kinder ab 18 mit Familienbeihilfe und Familienbonus Plus", min: 0, max: 10, porDefecto: 0 },
    { id: "faboHalb", tipo: "si-no", etiqueta: "Familienbonus Plus wird mit dem anderen Elternteil geteilt", porDefecto: false },
    { id: "avabKinder", tipo: "entero", etiqueta: "Alleinverdiener oder Alleinerzieher: Anzahl der Kinder", min: 0, max: 10, porDefecto: 0, ayuda: "0, wenn Ihnen der Absetzbetrag nicht zusteht." },
    { id: "pendler", tipo: "opcion", etiqueta: "Pendlerpauschale", opciones: PENDLER_OPCIONES, porDefecto: "keine" },
    { id: "pendlerKm", tipo: "entero", etiqueta: "Einfache Strecke zur Arbeit in Kilometern", min: 0, max: 500, requerido: false, ayuda: "Nur mit Pendlerpauschale nötig, für den Pendlereuro." },
  ],
  calcular(entrada, valores, { redondear }) {
    const r = nettoLohn(
      {
        brutto: entrada.brutto,
        wien: entrada.wien,
        avabKinder: entrada.avabKinder,
        kinderUnter18: entrada.kinderUnter18,
        kinderAb18: entrada.kinderAb18,
        faboHalb: entrada.faboHalb,
        pendler: entrada.pendler,
        pendlerKm: entrada.pendlerKm ?? 0,
      },
      valores,
      redondear,
    );
    const observaciones: string[] = [];
    if (r.sv.geringfuegig) observaciones.push("Ihr Gehalt liegt unter der Geringfügigkeitsgrenze: Als Dienstnehmer zahlen Sie keine Sozialversicherung.");
    if (entrada.brutto > valores["at.beitragsgrundlage"]["hoechst-monat"]) observaciones.push("Über der Höchstbeitragsgrundlage steigt die Sozialversicherung nicht weiter.");
    if (r.familienbonusWirksam < r.familienbonusMonat) observaciones.push("Der Familienbonus Plus ist höher als Ihre Lohnsteuer und wirkt nur bis zu deren Höhe.");
    if (r.bmg * 12 - valores["at.werbungskostenpauschale"] < valores["at.vab-zuschlag"]["null-ab"]) observaciones.push("Bei niedrigem Einkommen kann in der Arbeitnehmerveranlagung ein Zuschlag zum Verkehrsabsetzbetrag und eine SV-Rückerstattung dazukommen. Das ist hier nicht eingerechnet.");
    return {
      netto: r.netto,
      lohnsteuer: r.lohnsteuer,
      sv: r.sv.summe,
      kv: r.sv.kv,
      pv: r.sv.pv,
      av: r.sv.av,
      umlagen: r.sv.umlagen,
      familienbonus: r.familienbonusWirksam,
      urlaubsgeld: r.sz[0].netto,
      weihnachtsgeld: r.sz[1].netto,
      nettoJahr: r.nettoJahr,
      lohnsteuerJahr: r.lohnsteuerJahr,
      svJahr: r.svJahr,
      grenzsteuersatz: r.grenzsteuersatz,
      observaciones,
    };
  },
  resultado: [
    { clave: "netto", etiqueta: "Nettogehalt im Monat", formato: "moneda", destacada: true },
    { clave: "lohnsteuer", etiqueta: "Lohnsteuer im Monat", formato: "moneda" },
    { clave: "sv", etiqueta: "Sozialversicherung im Monat", formato: "moneda" },
    { clave: "kv", etiqueta: "davon Krankenversicherung", formato: "moneda" },
    { clave: "pv", etiqueta: "davon Pensionsversicherung", formato: "moneda" },
    { clave: "av", etiqueta: "davon Arbeitslosenversicherung", formato: "moneda" },
    { clave: "umlagen", etiqueta: "davon Arbeiterkammerumlage und Wohnbauförderung", formato: "moneda" },
    { clave: "familienbonus", etiqueta: "Familienbonus Plus im Monat", formato: "moneda", ocultarSiCero: true },
    { clave: "urlaubsgeld", etiqueta: "Urlaubsgeld netto", formato: "moneda" },
    { clave: "weihnachtsgeld", etiqueta: "Weihnachtsgeld netto", formato: "moneda" },
    { clave: "nettoJahr", etiqueta: "Netto im Jahr (14 Gehälter)", formato: "moneda" },
    { clave: "lohnsteuerJahr", etiqueta: "Lohnsteuer im Jahr", formato: "moneda" },
    { clave: "svJahr", etiqueta: "Sozialversicherung im Jahr", formato: "moneda" },
    { clave: "grenzsteuersatz", etiqueta: "Grenzsteuersatz", formato: "porcentaje" },
  ],
});
