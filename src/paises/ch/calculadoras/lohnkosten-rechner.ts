import { definirCalculadora } from "@/motor/calculo";
import { bvgJahr, lohnWerteAus, pruefeAlter, REQ_LOHN } from "../lib/lohn";
import { ANZAHL_LOEHNE } from "./brutto-netto-rechner";

export default definirCalculadora({
  id: "ch.lohnkosten-rechner",
  mercado: "ch",
  concepto: "costo-empleador",
  slug: "lohnkosten-rechner",
  estado: "publicado",
  requiere: REQ_LOHN,
  campos: [
    { id: "monatslohn", tipo: "moneda", etiqueta: "Bruttolohn pro Monat", min: 0, porDefecto: 6500 },
    { id: "anzahl", tipo: "opcion", etiqueta: "Anzahl Monatslöhne im Jahr", opciones: ANZAHL_LOEHNE, porDefecto: "13" },
    { id: "alter", tipo: "entero", etiqueta: "Alter der angestellten Person", min: 15, max: 70, porDefecto: 35 },
    { id: "fak", tipo: "porcentaje", etiqueta: "Beitragssatz Familienausgleichskasse (FAK)", min: 0, max: 5, requerido: false, ayuda: "Der Satz hängt von Kanton und Ausgleichskasse ab." },
    { id: "bu", tipo: "porcentaje", etiqueta: "Prämie Berufsunfall (BU)", min: 0, max: 10, requerido: false, ayuda: "Laut Police Ihres Unfallversicherers." },
    { id: "ktg", tipo: "porcentaje", etiqueta: "Arbeitgeberanteil Krankentaggeld", min: 0, max: 5, requerido: false },
    { id: "bvgMonat", tipo: "moneda", etiqueta: "BVG-Arbeitgeberbeitrag pro Monat", min: 0, requerido: false, ayuda: "Leer lassen, dann rechnet der Rechner mit der Hälfte der gesetzlichen Altersgutschrift." },
  ],
  calcular(entrada, valores, { redondear }) {
    pruefeAlter(entrada.alter, "alter");
    const w = lohnWerteAus(valores);
    const anzahl = Number(entrada.anzahl);
    const jahreslohn = entrada.monatslohn * anzahl;
    const grenzeMonat = w.hoechstlohn / 12;
    const ahv = redondear((entrada.monatslohn * w.ahvSatz) / 2 / 100);
    const alv = redondear((Math.min(entrada.monatslohn, grenzeMonat) * w.alvSatz) / 2 / 100);
    const fak = redondear((entrada.monatslohn * (entrada.fak ?? 0)) / 100);
    const bu = redondear((Math.min(entrada.monatslohn, grenzeMonat) * (entrada.bu ?? 0)) / 100);
    const ktg = redondear((entrada.monatslohn * (entrada.ktg ?? 0)) / 100);
    const bvgDaten = bvgJahr(jahreslohn, entrada.alter, w);
    const bvg = entrada.bvgMonat === null ? redondear(bvgDaten.altersgutschrift / 2 / 12) : redondear(entrada.bvgMonat);
    const beitraege = redondear(ahv + alv + fak + bu + ktg + bvg);
    const ahvJahr = (jahreslohn * w.ahvSatz) / 2 / 100;
    const alvJahr = (Math.min(jahreslohn, w.hoechstlohn) * w.alvSatz) / 2 / 100;
    const fakJahr = (jahreslohn * (entrada.fak ?? 0)) / 100;
    const buJahr = (Math.min(jahreslohn, w.hoechstlohn) * (entrada.bu ?? 0)) / 100;
    const ktgJahr = (jahreslohn * (entrada.ktg ?? 0)) / 100;
    const kostenJahr = redondear(jahreslohn + ahvJahr + alvJahr + fakJahr + buJahr + ktgJahr + bvg * 12);
    const hinweise: string[] = [];
    if (entrada.fak === null) hinweise.push("Der Beitrag an die Familienausgleichskasse ist nicht eingerechnet. Geben Sie den Satz Ihrer Kasse ein.");
    if (entrada.bu === null) hinweise.push("Die Berufsunfallprämie ist nicht eingerechnet. Sie trägt immer der Arbeitgeber.");
    hinweise.push("Verwaltungskosten der AHV-Ausgleichskasse sind nicht enthalten.");
    return {
      kostenMonat: redondear(entrada.monatslohn + beitraege),
      ahv,
      alv,
      fak,
      bu,
      ktg,
      bvg,
      beitraege,
      kostenJahr,
      zuschlag: entrada.monatslohn > 0 ? (beitraege / entrada.monatslohn) * 100 : 0,
      observaciones: hinweise,
    };
  },
  resultado: [
    { clave: "kostenMonat", etiqueta: "Lohnkosten pro Monat", formato: "moneda", destacada: true },
    { clave: "ahv", etiqueta: "AHV/IV/EO Arbeitgeber", formato: "moneda" },
    { clave: "alv", etiqueta: "ALV Arbeitgeber", formato: "moneda" },
    { clave: "bvg", etiqueta: "Pensionskasse Arbeitgeber", formato: "moneda" },
    { clave: "fak", etiqueta: "Familienausgleichskasse", formato: "moneda", ocultarSiCero: true },
    { clave: "bu", etiqueta: "Berufsunfall", formato: "moneda", ocultarSiCero: true },
    { clave: "ktg", etiqueta: "Krankentaggeld", formato: "moneda", ocultarSiCero: true },
    { clave: "beitraege", etiqueta: "Arbeitgeberbeiträge pro Monat", formato: "moneda" },
    { clave: "zuschlag", etiqueta: "Zuschlag auf den Bruttolohn", formato: "porcentaje", decimales: 1 },
    { clave: "kostenJahr", etiqueta: "Lohnkosten pro Jahr", formato: "moneda" },
  ],
});
