import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pl.ekwiwalent-za-urlop",
  h1: "Kalkulator ekwiwalentu za niewykorzystany urlop",
  title: "Ekwiwalent za urlop: kalkulator ze współczynnikiem",
  description:
    "Policz ekwiwalent za niewykorzystany urlop przy końcu umowy o pracę. Współczynnik urlopowy na dany rok, kwota za dzień i za godzinę, także na część etatu.",
  intro: [
    "Gdy umowa o pracę się kończy, a część urlopu zostaje niewykorzystana, pracodawca wypłaca ekwiwalent pieniężny. Kalkulator liczy go według rozporządzenia w sprawie urlopów.",
    "Współczynnik urlopowy zależy od roku: kalkulator wylicza go z liczby dni pracy w roku zakończenia umowy.",
  ],
  comoSeCalcula: [
    "Współczynnik urlopowy: liczba dni w roku minus niedziele, święta i soboty wolne z pięciodniowego tygodnia pracy, podzielona przez 12. Na części etatu mnoży się go przez wymiar etatu.",
    "Ekwiwalent za 1 dzień: pensja miesięczna podzielona przez współczynnik.",
    "Ekwiwalent za 1 godzinę: kwota za dzień podzielona przez 8.",
    "Ekwiwalent: kwota za godzinę razy liczba godzin niewykorzystanego urlopu (8 godzin za dzień).",
  ],
  ejemplo: [
    "W 2026 r. współczynnik wynosi 20,92. Przy pensji 6000 zł za dzień urlopu wychodzi 286,85 zł, za godzinę 35,86 zł, a za 5 dni 1434,40 zł brutto.",
  ],
  faq: [
    {
      pregunta: "Kiedy przysługuje ekwiwalent za urlop?",
      respuesta: "Gdy nie wykorzystasz urlopu w całości lub w części z powodu rozwiązania albo wygaśnięcia umowy o pracę.",
    },
    {
      pregunta: "Czy od ekwiwalentu płaci się składki i podatek?",
      respuesta: "Tak, ekwiwalent to przychód ze stosunku pracy. Kalkulator pokazuje kwotę brutto. Ile zostanie na rękę, sprawdzisz w kalkulatorze wynagrodzeń.",
    },
    {
      pregunta: "Skąd się bierze współczynnik urlopowy?",
      respuesta: "Z § 19 rozporządzenia o urlopach wypoczynkowych. Liczy się go osobno dla każdego roku, więc różni się w zależności od tego, ile świąt wypada w dni powszednie.",
    },
  ],
  glosario: [
    { termino: "Współczynnik urlopowy", definicion: "Przeciętna liczba dni pracy w miesiącu, używana do liczenia ekwiwalentu." },
    { termino: "Ekwiwalent", definicion: "Pieniądze w zamian za urlop, który nie został wykorzystany." },
  ],
});
