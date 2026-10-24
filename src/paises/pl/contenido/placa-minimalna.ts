import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pl.placa-minimalna",
  h1: "Płaca minimalna: {{pl.placa-minimalna}} brutto",
  title: "Płaca minimalna {{pl.placa-minimalna}} brutto: ile to netto",
  description:
    "Minimalne wynagrodzenie wynosi {{pl.placa-minimalna}} brutto, a minimalna stawka godzinowa {{pl.stawka-godzinowa}}. Sprawdź, ile to na rękę i ile wynosi na część etatu.",
  intro: [
    "Minimalne wynagrodzenie za pracę na pełnym etacie wynosi {{pl.placa-minimalna}} brutto miesięcznie od {{pl.placa-minimalna#desde}}. Na umowie zlecenia obowiązuje minimalna stawka godzinowa {{pl.stawka-godzinowa}}.",
    "Kalkulator pokazuje kwotę na rękę, minimum dla części etatu i minimum za godziny na zleceniu.",
  ],
  comoSeCalcula: [
    "Przy niepełnym etacie płaca minimalna jest proporcjonalna: pensja minimalna razy wymiar etatu.",
    "Na zleceniu minimum to liczba przepracowanych godzin razy minimalna stawka godzinowa.",
    "Kwota na rękę to pensja brutto minus składki ZUS pracownika, składka zdrowotna {{pl.skladka-zdrowotna}} i zaliczka na PIT.",
  ],
  faq: [
    {
      pregunta: "Ile wynosi najniższa krajowa na rękę?",
      respuesta: "Na pełnym etacie, z PIT-2 i podstawowymi kosztami uzyskania przychodu, wynik pokazuje kalkulator. Kwota brutto to {{pl.placa-minimalna}}.",
    },
    {
      pregunta: "Kto ustala płacę minimalną?",
      respuesta: "Rada Ministrów, w rozporządzeniu ogłaszanym w Dzienniku Ustaw do 15 września na kolejny rok.",
    },
    {
      pregunta: "Ile wynosi minimalna stawka godzinowa?",
      respuesta: "{{pl.stawka-godzinowa}} brutto za godzinę. Dotyczy umów zlecenia i umów o świadczenie usług.",
    },
    {
      pregunta: "Czy na pół etatu też obowiązuje płaca minimalna?",
      respuesta: "Tak, proporcjonalnie do wymiaru czasu pracy. Na pół etatu to połowa minimalnego wynagrodzenia.",
    },
  ],
  glosario: [
    { termino: "Najniższa krajowa", definicion: "Potoczna nazwa minimalnego wynagrodzenia za pracę." },
    { termino: "Wymiar etatu", definicion: "Część pełnego czasu pracy, na którą zatrudnia umowa, na przykład 1/2 albo 3/4." },
  ],
});
