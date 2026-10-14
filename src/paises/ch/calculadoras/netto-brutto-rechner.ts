import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { abzuegeArbeitnehmer, bvgHinweis, lohnWerteAus, pruefeAlter, REQ_LOHN, type LohnEingabe } from "../lib/lohn";
import { ANZAHL_LOEHNE } from "./brutto-netto-rechner";

export default definirCalculadora({
  id: "ch.netto-brutto-rechner",
  mercado: "ch",
  concepto: "propio",
  slug: "netto-brutto-rechner",
  estado: "publicado",
  requiere: REQ_LOHN,
  campos: [
    { id: "netto", tipo: "moneda", etiqueta: "Gewünschter Nettolohn pro Monat", min: 0, porDefecto: 5000 },
    { id: "anzahl", tipo: "opcion", etiqueta: "Anzahl Monatslöhne im Jahr", opciones: ANZAHL_LOEHNE, porDefecto: "13" },
    { id: "alter", tipo: "entero", etiqueta: "Alter (Kalenderjahr minus Geburtsjahr)", min: 15, max: 70, porDefecto: 35 },
    { id: "nbu", tipo: "porcentaje", etiqueta: "Prämie Nichtberufsunfall (NBU)", min: 0, max: 5, porDefecto: 1 },
    { id: "ktg", tipo: "porcentaje", etiqueta: "Krankentaggeld-Beitrag (falls abgezogen)", min: 0, max: 5, porDefecto: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    pruefeAlter(entrada.alter, "alter");
    if (entrada.netto <= 0) throw new ErrorEntrada("Bitte einen Nettolohn über null eingeben.", "netto");
    const werte = lohnWerteAus(valores);
    const basis: Omit<LohnEingabe, "monatslohn"> = { anzahlLoehne: Number(entrada.anzahl), alter: entrada.alter, nbuSatz: entrada.nbu, ktgSatz: entrada.ktg, bvgMonat: null };
    const nettoFuer = (brutto: number) => abzuegeArbeitnehmer({ ...basis, monatslohn: brutto }, werte, (n) => n).netto;
    let tief = entrada.netto;
    let hoch = entrada.netto * 2 + 1000;
    for (let i = 0; i < 80; i++) {
      const mitte = (tief + hoch) / 2;
      if (nettoFuer(mitte) < entrada.netto) tief = mitte;
      else hoch = mitte;
    }
    const brutto = Math.ceil(hoch * 100 - 1e-6) / 100;
    const a = abzuegeArbeitnehmer({ ...basis, monatslohn: brutto }, werte, redondear);
    return {
      brutto,
      netto: a.netto,
      abzuege: a.total,
      jahreslohn: a.jahreslohn,
      observaciones: [...bvgHinweis(a, entrada.alter), "Ohne Steuern und ohne Quellensteuer gerechnet."],
    };
  },
  resultado: [
    { clave: "brutto", etiqueta: "Nötiger Bruttolohn pro Monat", formato: "moneda", destacada: true },
    { clave: "netto", etiqueta: "Nettolohn bei diesem Brutto", formato: "moneda" },
    { clave: "abzuege", etiqueta: "Abzüge pro Monat", formato: "moneda" },
    { clave: "jahreslohn", etiqueta: "Bruttolohn pro Jahr", formato: "moneda" },
  ],
});
