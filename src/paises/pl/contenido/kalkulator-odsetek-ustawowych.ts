import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pl.kalkulator-odsetek-ustawowych",
  h1: "Kalkulator odsetek ustawowych za opóźnienie",
  title: "Kalkulator odsetek ustawowych za opóźnienie i handlowych",
  description:
    "Policz odsetki ustawowe za opóźnienie (stopa referencyjna NBP plus {{pl.marza-odsetek-za-opoznienie}}) i odsetki w transakcjach handlowych, z podziałem na okresy zmian stóp.",
  intro: [
    "Gdy dłużnik spóźnia się z zapłatą, wierzyciel może żądać odsetek. Jeśli umowa nie określa ich wysokości, należą się odsetki ustawowe za opóźnienie: stopa referencyjna NBP plus {{pl.marza-odsetek-za-opoznienie}}.",
    "W transakcjach handlowych między przedsiębiorcami odsetki to stopa referencyjna NBP plus {{pl.marza-odsetek-handlowych}}. Obecna stopa referencyjna to {{pl.stopa-referencyjna}} od {{pl.stopa-referencyjna#desde}}.",
  ],
  comoSeCalcula: [
    "Odsetki liczy się za każdy dzień opóźnienia, od dnia po terminie zapłaty do dnia zapłaty.",
    "Odsetki za dzień to kwota razy stopa roczna podzielona przez 365.",
    "Gdy w tym czasie zmieni się stopa referencyjna NBP, każdy okres liczy się z jego stopą. Kalkulator pokazuje je w tabeli.",
  ],
  ejemplo: [
    "Za 10 000 zł zapłacone 30 kwietnia 2026 r. zamiast 31 stycznia 2026 r. odsetki ustawowe za opóźnienie wynoszą 227,74 zł.",
  ],
  faq: [
    {
      pregunta: "Ile wynoszą odsetki ustawowe za opóźnienie?",
      respuesta: "Stopa referencyjna NBP ({{pl.stopa-referencyjna}}) plus {{pl.marza-odsetek-za-opoznienie}}, w skali roku. Zmieniają się razem ze stopą NBP.",
    },
    {
      pregunta: "Czym różnią się odsetki handlowe od ustawowych?",
      respuesta: "Odsetki handlowe dotyczą transakcji między przedsiębiorcami i są wyższe: stopa referencyjna NBP plus {{pl.marza-odsetek-handlowych}}. Gdy dłużnikiem jest podmiot publiczny będący podmiotem leczniczym, dodatek wynosi 8 punktów.",
    },
    {
      pregunta: "Czy można żądać wyższych odsetek, niż przewiduje ustawa?",
      respuesta: "Tak, jeśli wierzytelność była oprocentowana według wyższej stopy. Wtedy wierzyciel może żądać odsetek za opóźnienie według tej wyższej stopy.",
    },
  ],
  glosario: [
    { termino: "Stopa referencyjna NBP", definicion: "Podstawowa stopa procentowa ustalana przez Radę Polityki Pieniężnej." },
    { termino: "Opóźnienie", definicion: "Brak zapłaty w terminie, bez względu na to, czy dłużnik jest temu winien." },
  ],
});
