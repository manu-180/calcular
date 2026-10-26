import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { doGroszy, doGroszyWGore } from "../lib/podatki";

export default definirCalculadora({
  id: "pl.kalkulator-lokat",
  mercado: "pl",
  concepto: "plazo-fijo",
  slug: "kalkulator-lokat",
  estado: "publicado",
  requiere: {
    "pl.podatek-belki": "numero",
  },
  campos: [
    { id: "kwota", tipo: "moneda", etiqueta: "Kwota lokaty", min: 0, porDefecto: 10000 },
    { id: "oprocentowanie", tipo: "porcentaje", etiqueta: "Oprocentowanie w skali roku", min: 0, max: 30, porDefecto: 5 },
    { id: "miesiace", tipo: "entero", etiqueta: "Okres lokaty w miesiącach", min: 1, max: 120, porDefecto: 3 },
  ],
  calcular(e, v, { redondear }) {
    if (e.kwota <= 0) throw new ErrorEntrada("Wpisz kwotę lokaty większą od zera.", "kwota");
    const odsetki = doGroszyWGore((e.kwota * e.oprocentowanie * e.miesiace) / 100 / 12);
    const podatek = doGroszyWGore((odsetki * v["pl.podatek-belki"]) / 100);
    const netto = doGroszy(odsetki - podatek);
    return {
      netto,
      odsetki,
      podatek,
      naKoniec: redondear(e.kwota + netto),
      oprocentowanieNetto: (e.oprocentowanie * (100 - v["pl.podatek-belki"])) / 100,
      observaciones: ["Banki liczą odsetki zwykle za dni, więc wynik może się różnić o kilka groszy. Kalkulator zakłada oprocentowanie stałe i jedną kapitalizację na końcu okresu."],
    };
  },
  resultado: [
    { clave: "netto", etiqueta: "Zysk na rękę po podatku Belki", formato: "moneda", destacada: true },
    { clave: "odsetki", etiqueta: "Odsetki brutto", formato: "moneda" },
    { clave: "podatek", etiqueta: "Podatek Belki", formato: "moneda" },
    { clave: "naKoniec", etiqueta: "Kwota na koniec lokaty", formato: "moneda" },
    { clave: "oprocentowanieNetto", etiqueta: "Oprocentowanie po podatku", formato: "porcentaje", decimales: 2 },
  ],
});
