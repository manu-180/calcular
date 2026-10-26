import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pl.kalkulator-vat",
  h1: "Kalkulator VAT: {{pl.stawki-vat[podstawowa]}}, {{pl.stawki-vat[obnizona]}} i {{pl.stawki-vat[obnizona-5]}}",
  title: "Kalkulator VAT {{pl.stawki-vat[podstawowa]}}: netto brutto i brutto netto",
  description:
    "Dolicz albo odlicz VAT {{pl.stawki-vat[podstawowa]}}, {{pl.stawki-vat[obnizona]}} lub {{pl.stawki-vat[obnizona-5]}}. Kwota netto, brutto i podatek co do grosza, według polskich stawek.",
  intro: [
    "Podstawowa stawka VAT w Polsce wynosi {{pl.stawki-vat[podstawowa]}}. Stawki obniżone to {{pl.stawki-vat[obnizona]}} i {{pl.stawki-vat[obnizona-5]}}, na przykład dla części żywności, usług gastronomicznych czy książek.",
    "Kalkulator przelicza kwotę netto na brutto albo wyciąga VAT z ceny brutto.",
  ],
  comoSeCalcula: [
    "Z netto na brutto: VAT to kwota netto razy stawka. Brutto to netto plus VAT.",
    "Z brutto na netto: netto to brutto podzielone przez 1,23 (albo 1,08 lub 1,05). VAT to różnica.",
    "Nie odejmuj {{pl.stawki-vat[podstawowa]}} od kwoty brutto, bo wyjdzie za mało netto.",
  ],
  ejemplo: [
    "Faktura na 1000 zł netto ze stawką {{pl.stawki-vat[podstawowa]}} to 1230 zł brutto. Z 1230 zł brutto wychodzi 230 zł VAT.",
  ],
  faq: [
    {
      pregunta: "Jak obliczyć netto z brutto?",
      respuesta: "Podziel kwotę brutto przez 1,23. Ze 123 zł brutto zostaje 100 zł netto i 23 zł VAT.",
    },
    {
      pregunta: "Jak doliczyć 23 % VAT?",
      respuesta: "Pomnóż kwotę netto przez 1,23. Do 100 zł netto dochodzi 23 zł VAT, razem 123 zł.",
    },
    {
      pregunta: "Kiedy stosuje się stawkę 8 % lub 5 %?",
      respuesta: "Stawki obniżone obejmują towary i usługi wymienione w załącznikach do ustawy o VAT, na przykład część żywności i usługi gastronomiczne. Konkretną stawkę dla towaru znajdziesz w wiążącej informacji stawkowej albo zapytasz o nią urząd skarbowy.",
    },
  ],
  glosario: [
    { termino: "Netto", definicion: "Cena bez podatku VAT." },
    { termino: "Brutto", definicion: "Cena z podatkiem VAT, którą płaci klient." },
  ],
});
