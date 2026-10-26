import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { doGroszy, doGroszyWGore, doZlotych } from "../lib/podatki";

export default definirCalculadora({
  id: "pl.podatek-belki",
  mercado: "pl",
  concepto: "propio",
  slug: "podatek-belki",
  estado: "publicado",
  requiere: {
    "pl.podatek-belki": "numero",
    "pl.podatek-od-zbycia": "numero",
  },
  campos: [
    {
      id: "rodzaj",
      tipo: "opcion",
      etiqueta: "Skąd jest zysk?",
      opciones: [
        { valor: "sprzedaz", etiqueta: "Sprzedaż akcji, ETF, jednostek funduszy lub kryptowalut" },
        { valor: "odsetki", etiqueta: "Odsetki z lokaty, konta oszczędnościowego lub obligacji" },
      ],
      porDefecto: "sprzedaz",
    },
    { id: "przychod", tipo: "moneda", etiqueta: "Przychód ze sprzedaży albo kwota odsetek", min: 0, porDefecto: 15000 },
    { id: "koszty", tipo: "moneda", etiqueta: "Koszt zakupu z prowizjami", min: 0, porDefecto: 10000, visibleSi: { rodzaj: ["sprzedaz"] } },
  ],
  calcular(e, v) {
    if (e.przychod <= 0) throw new ErrorEntrada("Wpisz kwotę większą od zera.", "przychod");
    if (e.rodzaj === "odsetki") {
      const podstawa = doGroszyWGore(e.przychod);
      const podatek = doGroszyWGore((podstawa * v["pl.podatek-belki"]) / 100);
      return { podatek, dochod: podstawa, netto: doGroszy(podstawa - podatek), strata: 0, observaciones: [] };
    }
    const dochod = doGroszy(e.przychod - (e.koszty ?? 0));
    if (dochod <= 0) {
      return {
        podatek: 0,
        dochod,
        netto: dochod,
        strata: -dochod,
        observaciones: ["Strata z tego roku nie daje podatku. Stratę ze sprzedaży papierów wartościowych można odliczyć od zysków z tego samego źródła w kolejnych pięciu latach."],
      };
    }
    const podatek = doZlotych((doZlotych(dochod) * v["pl.podatek-od-zbycia"]) / 100);
    return {
      podatek,
      dochod,
      netto: doGroszy(dochod - podatek),
      strata: 0,
      observaciones: ["Zysk ze sprzedaży rozliczasz sam w zeznaniu rocznym, łącznie ze wszystkimi transakcjami z roku."],
    };
  },
  resultado: [
    { clave: "podatek", etiqueta: "Podatek do zapłaty", formato: "moneda", destacada: true },
    { clave: "dochod", etiqueta: "Dochód (zysk)", formato: "moneda" },
    { clave: "netto", etiqueta: "Zysk po podatku", formato: "moneda" },
    { clave: "strata", etiqueta: "Strata do rozliczenia w kolejnych latach", formato: "moneda", ocultarSiCero: true },
  ],
});
