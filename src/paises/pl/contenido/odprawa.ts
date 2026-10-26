import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pl.odprawa",
  h1: "Kalkulator odprawy przy zwolnieniu",
  title: "Odprawa przy zwolnieniu: ile pensji i jaki limit",
  description:
    "Policz odprawę przy zwolnieniu z przyczyn niedotyczących pracownika: jedna, dwie albo trzy pensje według stażu, do limitu {{pl.limit-odprawy}}-krotności płacy minimalnej.",
  intro: [
    "Przy zwolnieniu z przyczyn niedotyczących pracownika, na przykład z powodu likwidacji stanowiska, pracodawca zatrudniający co najmniej 20 osób wypłaca odprawę pieniężną.",
    "Jej wysokość zależy od stażu pracy u tego pracodawcy i nie może przekroczyć {{pl.limit-odprawy}}-krotności minimalnego wynagrodzenia.",
  ],
  comoSeCalcula: [
    "Staż krótszy niż 2 lata: {{pl.odprawa[krocej-niz-2]}} pensja. Od 2 do 8 lat: {{pl.odprawa[od-2-do-8]}} pensje. Ponad 8 lat: {{pl.odprawa[ponad-8]}} pensje.",
    "Pensję liczy się tak jak ekwiwalent za urlop: stałe składniki i średnia ze zmiennych.",
    "Górny limit to {{pl.limit-odprawy}} razy minimalne wynagrodzenie ({{pl.placa-minimalna}}).",
  ],
  ejemplo: [
    "Przy pensji 7000 zł i 5 latach pracy u tego pracodawcy odprawa wynosi dwie pensje, czyli 14 000 zł brutto.",
  ],
  faq: [
    {
      pregunta: "Kiedy należy się odprawa?",
      respuesta: "Gdy pracodawca zatrudniający co najmniej 20 osób rozwiązuje umowę z przyczyn niedotyczących pracownika, w ramach zwolnienia grupowego albo indywidualnego, jeśli te przyczyny są jedynym powodem wypowiedzenia lub porozumienia.",
    },
    {
      pregunta: "Czy do stażu wlicza się pracę u innych pracodawców?",
      respuesta: "Zasadniczo nie. Liczy się staż u danego pracodawcy, wraz z okresem u poprzedniego, jeśli zakład przeszedł na nowego pracodawcę.",
    },
    {
      pregunta: "Czy od odprawy płaci się podatek?",
      respuesta: "Tak, odprawa to przychód ze stosunku pracy i pracodawca pobiera od niej zaliczkę na PIT. Kalkulator pokazuje kwotę brutto.",
    },
  ],
  glosario: [
    { termino: "Zwolnienie grupowe", definicion: "Zwolnienie w ciągu 30 dni określonej liczby pracowników z przyczyn ich niedotyczących." },
    { termino: "Przyczyny niedotyczące pracownika", definicion: "Powody po stronie firmy, na przykład likwidacja stanowiska lub restrukturyzacja." },
  ],
});
