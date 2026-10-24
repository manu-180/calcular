import { definirCalculadora } from "@/motor/calculo";
import { ALTER_HILFE, ANZAHL, alvHaelfte, bpvMindestHaelfte, parameter, REQ_LOHN, satzAn, verifiziereAlter, verifiziereLohn } from "../lib/lohn";

export default definirCalculadora({
  id: "li.brutto-netto-rechner",
  mercado: "li",
  concepto: "sueldo-neto",
  slug: "brutto-netto-rechner",
  estado: "publicado",
  requiere: REQ_LOHN,
  campos: [
    { id: "monatslohn", tipo: "moneda", etiqueta: "Bruttolohn pro Monat", min: 0, porDefecto: 6500 },
    { id: "anzahl", tipo: "opcion", etiqueta: "Anzahl Monatslöhne pro Jahr", opciones: ANZAHL, porDefecto: "12" },
    { id: "alter", tipo: "entero", etiqueta: "Alter", min: 15, max: 70, porDefecto: 35, ayuda: ALTER_HILFE },
    { id: "nbu", tipo: "porcentaje", etiqueta: "Prämie Nichtberufsunfallversicherung (NBU)", min: 0, max: 5, porDefecto: 0, ayuda: "Steht auf Ihrer Lohnabrechnung. Sie hängt vom Versicherer ab." },
    { id: "bpvMonat", tipo: "moneda", etiqueta: "Abzug Pensionskasse pro Monat laut Lohnabrechnung", min: 0, requerido: false, ayuda: "Leer lassen: Der Rechner schätzt den gesetzlichen Mindestbeitrag." },
  ],
  calcular(entrada, valores, { redondear }) {
    verifiziereLohn(entrada.monatslohn, "monatslohn");
    verifiziereAlter(entrada.alter);
    const p = parameter(valores);
    const anzahl = Number(entrada.anzahl);
    const jahreslohn = entrada.monatslohn * anzahl;
    const ahv = redondear((entrada.monatslohn * satzAn(p)) / 100);
    const alv = redondear(alvHaelfte(jahreslohn, p) / anzahl);
    const bpv = entrada.bpvMonat ?? redondear(bpvMindestHaelfte(jahreslohn, entrada.alter, p) / anzahl);
    const nbu = redondear((entrada.monatslohn * entrada.nbu) / 100);
    const total = redondear(ahv + alv + bpv + nbu);
    const netto = redondear(entrada.monatslohn - total);
    const hinweise = ["Die Steuer, die der Arbeitgeber vom Lohn abzieht, ist nicht enthalten. Den Abzug legt die Steuerverwaltung fest. Eine Schätzung der Jahressteuer gibt der Lohnsteuer-Rechner."];
    if (entrada.bpvMonat === null && bpv > 0) hinweise.push("Pensionskasse geschätzt: die Hälfte des gesetzlichen Mindestbeitrags von 8 % für das Alter, ohne Risikoprämie. Ihr Reglement kann mehr vorsehen.");
    return {
      netto,
      ahv,
      alv,
      bpv,
      nbu,
      total,
      jahreslohn: redondear(jahreslohn),
      nettoJahr: redondear(netto * anzahl),
      observaciones: hinweise,
    };
  },
  resultado: [
    { clave: "netto", etiqueta: "Nettolohn pro Monat (vor Steuern)", formato: "moneda", destacada: true },
    { clave: "ahv", etiqueta: "AHV/IV/FAK", formato: "moneda" },
    { clave: "alv", etiqueta: "Arbeitslosenversicherung (ALV)", formato: "moneda" },
    { clave: "bpv", etiqueta: "Pensionskasse (betriebliche Personalvorsorge)", formato: "moneda" },
    { clave: "nbu", etiqueta: "Nichtberufsunfallversicherung (NBU)", formato: "moneda" },
    { clave: "total", etiqueta: "Abzüge pro Monat", formato: "moneda" },
    { clave: "jahreslohn", etiqueta: "Bruttojahreslohn", formato: "moneda" },
    { clave: "nettoJahr", etiqueta: "Nettojahreslohn (vor Steuern)", formato: "moneda" },
  ],
});
