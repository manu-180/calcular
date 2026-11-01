import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pl.kalkulator-walut",
  h1: "Kalkulator walut po kursie NBP",
  title: "Kalkulator walut: kurs euro, dolara i franka NBP",
  description:
    "Przelicz euro, dolary, franki i funty na złote po średnim kursie NBP z tabeli A. Kurs euro {{pl.eur}} z {{pl.eur#desde}}, dolara {{pl.usd}}.",
  intro: [
    "Kalkulator przelicza waluty po średnim kursie Narodowego Banku Polskiego z tabeli A. Tego kursu używa się na przykład w rozliczeniach podatkowych i na fakturach w walucie.",
    "Średni kurs euro wynosi {{pl.eur}}, dolara amerykańskiego {{pl.usd}}, franka szwajcarskiego {{pl.chf}}, a funta {{pl.gbp}} (tabela z {{pl.eur#desde}}).",
  ],
  comoSeCalcula: [
    "Z waluty na złote: kwota razy średni kurs NBP.",
    "Ze złotych na walutę: kwota podzielona przez średni kurs NBP.",
    "NBP publikuje tabelę A w każdy dzień roboczy. Kalkulator bierze ostatnią dostępną.",
  ],
  faq: [
    {
      pregunta: "Ile wynosi dziś kurs euro?",
      respuesta: "Średni kurs NBP to {{pl.eur}} za 1 euro (tabela z {{pl.eur#desde}}). Kantory i banki stosują własne kursy kupna i sprzedaży.",
    },
    {
      pregunta: "Jaki kurs przyjąć do rozliczenia faktury w walucie?",
      respuesta: "Do celów podatkowych zwykle średni kurs NBP z ostatniego dnia roboczego przed dniem uzyskania przychodu albo poniesienia kosztu.",
    },
    {
      pregunta: "Czym różni się kurs średni od kursu w kantorze?",
      respuesta: "Kurs średni to kurs odniesienia ogłaszany przez NBP. W kantorze kupujesz walutę drożej, a sprzedajesz taniej, bo kantor dolicza marżę.",
    },
  ],
  glosario: [
    { termino: "Tabela A", definicion: "Tabela średnich kursów walut obcych ogłaszana przez NBP w dni robocze." },
    { termino: "Kurs średni", definicion: "Kurs odniesienia NBP, bez marży banku czy kantoru." },
  ],
});
