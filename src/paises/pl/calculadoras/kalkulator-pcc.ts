import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { doZlotych } from "../lib/podatki";

export default definirCalculadora({
  id: "pl.kalkulator-pcc",
  mercado: "pl",
  concepto: "propio",
  slug: "kalkulator-pcc",
  estado: "publicado",
  requiere: {
    "pl.stawki-pcc": "mapa",
    "pl.pcc-prog-zwolnienia": "numero",
  },
  campos: [
    {
      id: "czynnosc",
      tipo: "opcion",
      etiqueta: "Co kupujesz?",
      opciones: [
        { valor: "ruchoma", etiqueta: "Samochód lub inną rzecz używaną od osoby prywatnej" },
        { valor: "nieruchomosc", etiqueta: "Mieszkanie, dom lub działkę na rynku wtórnym" },
        { valor: "prawa", etiqueta: "Inne prawa majątkowe (np. udziały w spółce)" },
        { valor: "pozyczka", etiqueta: "Pożyczka (podatek płaci biorący)" },
      ],
      porDefecto: "ruchoma",
    },
    { id: "wartosc", tipo: "moneda", etiqueta: "Wartość rynkowa albo kwota pożyczki", min: 0, porDefecto: 30000 },
  ],
  calcular(e, v) {
    if (e.wartosc <= 0) throw new ErrorEntrada("Wpisz wartość większą od zera.", "wartosc");
    const s = v["pl.stawki-pcc"];
    const stawka = e.czynnosc === "prawa" ? enMapa(s, "prawa") : e.czynnosc === "pozyczka" ? enMapa(s, "pozyczka") : enMapa(s, "sprzedaz");
    const observaciones: string[] = [];
    if (e.czynnosc === "ruchoma" && e.wartosc <= v["pl.pcc-prog-zwolnienia"]) {
      observaciones.push("Sprzedaż rzeczy ruchomej o wartości do 1000 zł jest zwolniona z PCC.");
      return { podatek: 0, stawka, podstawa: doZlotych(e.wartosc), observaciones };
    }
    if (e.czynnosc === "nieruchomosc") observaciones.push("PCC dotyczy zakupu od osoby prywatnej. Przy zakupie od dewelopera zwykle płacisz VAT w cenie, a nie PCC.");
    const podstawa = doZlotych(e.wartosc);
    return { podatek: doZlotych((podstawa * stawka) / 100), stawka, podstawa, observaciones };
  },
  resultado: [
    { clave: "podatek", etiqueta: "Podatek PCC do zapłaty", formato: "moneda", destacada: true },
    { clave: "stawka", etiqueta: "Stawka", formato: "porcentaje", decimales: 1 },
    { clave: "podstawa", etiqueta: "Podstawa opodatkowania", formato: "moneda" },
  ],
});
