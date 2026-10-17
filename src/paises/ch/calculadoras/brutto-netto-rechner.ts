import { definirCalculadora } from "@/motor/calculo";
import { abzuegeArbeitnehmer, bvgHinweis, lohnWerteAus, pruefeAlter, REQ_LOHN } from "../lib/lohn";

export const ANZAHL_LOEHNE = [
  { valor: "12", etiqueta: "12 Monatslöhne" },
  { valor: "13", etiqueta: "13 Monatslöhne" },
] as const;

export default definirCalculadora({
  id: "ch.brutto-netto-rechner",
  mercado: "ch",
  concepto: "sueldo-neto",
  slug: "brutto-netto-rechner",
  estado: "publicado",
  requiere: REQ_LOHN,
  campos: [
    { id: "monatslohn", tipo: "moneda", etiqueta: "Bruttolohn pro Monat", min: 0, porDefecto: 6500 },
    { id: "anzahl", tipo: "opcion", etiqueta: "Anzahl Monatslöhne im Jahr", opciones: ANZAHL_LOEHNE, porDefecto: "13" },
    { id: "alter", tipo: "entero", etiqueta: "Alter (Kalenderjahr minus Geburtsjahr)", min: 15, max: 70, porDefecto: 35 },
    { id: "nbu", tipo: "porcentaje", etiqueta: "Prämie Nichtberufsunfall (NBU)", min: 0, max: 5, porDefecto: 1, ayuda: "Steht auf Ihrer Lohnabrechnung. Die Prämie hängt vom Versicherer und der Branche ab." },
    { id: "ktg", tipo: "porcentaje", etiqueta: "Krankentaggeld-Beitrag (falls abgezogen)", min: 0, max: 5, porDefecto: 0 },
    { id: "bvgMonat", tipo: "moneda", etiqueta: "BVG-Abzug pro Monat laut Lohnabrechnung", min: 0, requerido: false, ayuda: "Leer lassen, dann schätzt der Rechner den gesetzlichen Mindestbeitrag." },
  ],
  calcular(entrada, valores, { redondear }) {
    pruefeAlter(entrada.alter, "alter");
    const a = abzuegeArbeitnehmer(
      { monatslohn: entrada.monatslohn, anzahlLoehne: Number(entrada.anzahl), alter: entrada.alter, nbuSatz: entrada.nbu, ktgSatz: entrada.ktg, bvgMonat: entrada.bvgMonat },
      lohnWerteAus(valores),
      redondear,
    );
    return {
      netto: a.netto,
      ahv: a.ahv,
      alv: a.alv,
      bvg: a.bvg,
      nbu: a.nbu,
      ktg: a.ktg,
      total: a.total,
      jahreslohn: a.jahreslohn,
      nettoJahr: a.nettoJahr,
      koordinierterLohn: a.bvgDaten.koordinierterLohn,
      observaciones: [
        ...bvgHinweis(a, entrada.alter),
        "Quellensteuer sowie Kantons-, Gemeinde- und Bundessteuern sind nicht abgezogen. Wer Quellensteuer zahlt, hat netto entsprechend weniger.",
      ],
    };
  },
  resultado: [
    { clave: "netto", etiqueta: "Nettolohn pro Monat", formato: "moneda", destacada: true },
    { clave: "ahv", etiqueta: "AHV/IV/EO", formato: "moneda" },
    { clave: "alv", etiqueta: "Arbeitslosenversicherung (ALV)", formato: "moneda" },
    { clave: "bvg", etiqueta: "Pensionskasse (BVG)", formato: "moneda" },
    { clave: "nbu", etiqueta: "Nichtberufsunfall (NBU)", formato: "moneda", ocultarSiCero: true },
    { clave: "ktg", etiqueta: "Krankentaggeld", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Abzüge total pro Monat", formato: "moneda" },
    { clave: "jahreslohn", etiqueta: "Bruttolohn pro Jahr", formato: "moneda" },
    { clave: "nettoJahr", etiqueta: "Nettolohn pro Jahr", formato: "moneda" },
    { clave: "koordinierterLohn", etiqueta: "Koordinierter Lohn (BVG)", formato: "moneda", ocultarSiCero: true },
  ],
});
