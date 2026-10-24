import { definirCalculadora } from "@/motor/calculo";
import { ALTER_HILFE, ANZAHL, alvHaelfte, bpvMindestHaelfte, parameter, REQ_LOHN, satzAg, verifiziereAlter, verifiziereLohn } from "../lib/lohn";

export default definirCalculadora({
  id: "li.lohnkosten-rechner",
  mercado: "li",
  concepto: "costo-empleador",
  slug: "lohnkosten-rechner",
  estado: "publicado",
  requiere: REQ_LOHN,
  campos: [
    { id: "monatslohn", tipo: "moneda", etiqueta: "Bruttolohn pro Monat", min: 0, porDefecto: 6500 },
    { id: "anzahl", tipo: "opcion", etiqueta: "Anzahl Monatslöhne pro Jahr", opciones: ANZAHL, porDefecto: "12" },
    { id: "alter", tipo: "entero", etiqueta: "Alter der angestellten Person", min: 15, max: 70, porDefecto: 35, ayuda: ALTER_HILFE },
    { id: "bu", tipo: "porcentaje", etiqueta: "Prämie Berufsunfallversicherung (BU)", min: 0, max: 10, porDefecto: 0, ayuda: "Laut Police Ihres Unfallversicherers." },
    { id: "bpvAg", tipo: "moneda", etiqueta: "Arbeitgeberbeitrag Pensionskasse pro Monat laut Reglement", min: 0, requerido: false, ayuda: "Leer lassen: Der Rechner nimmt den gesetzlichen Mindestanteil." },
  ],
  calcular(entrada, valores, { redondear }) {
    verifiziereLohn(entrada.monatslohn, "monatslohn");
    verifiziereAlter(entrada.alter);
    const p = parameter(valores);
    const anzahl = Number(entrada.anzahl);
    const jahreslohn = entrada.monatslohn * anzahl;
    const ahv = redondear((entrada.monatslohn * satzAg(p)) / 100);
    const alv = redondear(alvHaelfte(jahreslohn, p) / anzahl);
    const bpv = entrada.bpvAg ?? redondear(bpvMindestHaelfte(jahreslohn, entrada.alter, p) / anzahl);
    const bu = redondear((entrada.monatslohn * entrada.bu) / 100);
    const beitraege = redondear(ahv + alv + bpv + bu);
    const kosten = redondear(entrada.monatslohn + beitraege);
    return {
      kosten,
      beitraege,
      ahv,
      alv,
      bpv,
      bu,
      jahr: redondear(kosten * anzahl),
      observaciones: ["Nicht enthalten sind die Krankentaggeldversicherung und Beiträge aus einem Gesamtarbeitsvertrag. Die Pensionskasse ist ohne Risikoprämie gerechnet."],
    };
  },
  resultado: [
    { clave: "kosten", etiqueta: "Kosten des Arbeitgebers pro Monat", formato: "moneda", destacada: true },
    { clave: "beitraege", etiqueta: "Arbeitgeberbeiträge pro Monat", formato: "moneda" },
    { clave: "ahv", etiqueta: "AHV/IV/FAK und Verwaltungskosten", formato: "moneda" },
    { clave: "alv", etiqueta: "Arbeitslosenversicherung (ALV)", formato: "moneda" },
    { clave: "bpv", etiqueta: "Pensionskasse (Arbeitgeberanteil)", formato: "moneda" },
    { clave: "bu", etiqueta: "Berufsunfallversicherung (BU)", formato: "moneda" },
    { clave: "jahr", etiqueta: "Kosten pro Jahr", formato: "moneda" },
  ],
});
