import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pl.wymiar-czasu-pracy",
  h1: "Wymiar czasu pracy: kalkulator na miesiąc i rok",
  title: "Wymiar czasu pracy: ile godzin w miesiącu i w roku",
  description:
    "Sprawdź wymiar czasu pracy w każdym miesiącu i w całym roku: dni robocze, godziny na pełny etat i część etatu, z polskimi świętami i Wigilią.",
  intro: [
    "Wymiar czasu pracy mówi, ile godzin pracownik ma przepracować w danym okresie. Zależy od liczby dni od poniedziałku do piątku i od świąt, które w nim wypadają.",
    "Kalkulator liczy wymiar dla wybranego miesiąca albo całego roku, także na część etatu, i pokazuje tabelę wszystkich miesięcy.",
  ],
  comoSeCalcula: [
    "Według art. 130 Kodeksu pracy: 40 godzin razy liczba pełnych tygodni plus 8 godzin za każdy pozostały dzień od poniedziałku do piątku.",
    "Każde święto, które wypada w inny dzień niż niedziela, obniża wymiar o 8 godzin. Dotyczy to także świąt w sobotę.",
    "Dni wolne to Nowy Rok, Trzech Króli, Wielkanoc i Poniedziałek Wielkanocny, 1 i 3 maja, Zielone Świątki, Boże Ciało, 15 sierpnia, 1 i 11 listopada, Wigilia oraz dwa dni Bożego Narodzenia.",
    "Na części etatu wymiar mnoży się przez wymiar etatu.",
  ],
  ejemplo: [
    "W styczniu 2026 r. jest 22 dni od poniedziałku do piątku. Nowy Rok i Trzech Króli wypadają w dni powszednie, więc wymiar to 20 dni, czyli 160 godzin.",
  ],
  faq: [
    {
      pregunta: "Czy Wigilia jest dniem wolnym od pracy?",
      respuesta: "Tak, od 2025 r. 24 grudnia jest ustawowo wolny od pracy, tak jak inne święta.",
    },
    {
      pregunta: "Co, jeśli święto wypada w sobotę?",
      respuesta: "Obniża wymiar czasu pracy o 8 godzin. Pracownikowi w systemie od poniedziałku do piątku pracodawca wyznacza wtedy inny dzień wolny w okresie rozliczeniowym.",
    },
    {
      pregunta: "Ile godzin pracy jest w roku?",
      respuesta: "Zależy od roku. Wybierz w kalkulatorze opcję „Cały rok”, a zobaczysz liczbę dni i godzin dla pełnego etatu.",
    },
  ],
  glosario: [
    { termino: "Okres rozliczeniowy", definicion: "Okres, w którym rozlicza się czas pracy, na przykład miesiąc." },
    { termino: "Dzień roboczy", definicion: "Dzień, w którym zgodnie z wymiarem czasu pracy pracuje się 8 godzin." },
  ],
});
