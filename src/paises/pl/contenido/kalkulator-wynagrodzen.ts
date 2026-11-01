import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pl.kalkulator-wynagrodzen",
  h1: "Kalkulator wynagrodzeń brutto netto (umowa o pracę)",
  title: "Kalkulator wynagrodzeń brutto netto: ile na rękę",
  description:
    "Przelicz pensję brutto na netto na umowie o pracę: składki ZUS, składka zdrowotna {{pl.skladka-zdrowotna}} i zaliczka na PIT miesiąc po miesiącu, z progiem podatkowym.",
  intro: [
    "Kalkulator pokazuje, ile dostaniesz na rękę z umowy o pracę. Liczy składki ZUS, składkę zdrowotną i zaliczkę na podatek dla każdego miesiąca roku.",
    "Wynik w kolejnych miesiącach może się różnić. Po przekroczeniu {{pl.skala-pit[0].hasta}} dochodu wchodzi stawka {{pl.skala-pit[1].tasa}}, a po przekroczeniu rocznego limitu {{pl.limit-30-krotnosci}} przestajesz płacić składkę emerytalną i rentową.",
  ],
  comoSeCalcula: [
    "Składki społeczne płacone przez pracownika: emerytalna {{pl.skladki-pracownika[emerytalne]}}, rentowa {{pl.skladki-pracownika[rentowe]}} i chorobowa {{pl.skladki-pracownika[chorobowe]}} od pensji brutto.",
    "Składka zdrowotna to {{pl.skladka-zdrowotna}} od pensji brutto pomniejszonej o składki społeczne. Od 2022 r. nie zmniejsza podatku.",
    "Podstawa opodatkowania to brutto minus składki społeczne i koszty uzyskania przychodu ({{pl.koszty-pracownicze[standard]}} miesięcznie albo {{pl.koszty-pracownicze[dojazd]}}, jeśli dojeżdżasz z innej miejscowości), zaokrąglona do pełnych złotych.",
    "Zaliczka na PIT to {{pl.skala-pit[0].tasa}} podstawy minus 1/12 kwoty zmniejszającej podatek ({{pl.kwota-zmniejszajaca}} rocznie), jeśli złożysz PIT-2. Od nadwyżki ponad {{pl.skala-pit[0].hasta}} w roku płacisz {{pl.skala-pit[1].tasa}}.",
    "Na rękę zostaje brutto minus składki społeczne, składka zdrowotna i zaliczka na podatek.",
  ],
  ejemplo: [
    "Przy pensji 8000 zł brutto składki społeczne wynoszą 1096,80 zł, zdrowotna 621,29 zł, a zaliczka na PIT 498 zł. Na rękę zostaje 5783,91 zł.",
  ],
  faq: [
    {
      pregunta: "Ile to jest 8000 zł brutto na rękę?",
      respuesta: "Na umowie o pracę, z PIT-2 i podstawowymi kosztami, około 5784 zł netto miesięcznie. Dokładną kwotę dla swojej pensji sprawdzisz w kalkulatorze.",
    },
    {
      pregunta: "Dlaczego w grudniu dostaję mniej niż w styczniu?",
      respuesta: "Jeśli Twój dochód od początku roku przekroczy {{pl.skala-pit[0].hasta}}, od nadwyżki płacisz {{pl.skala-pit[1].tasa}} podatku zamiast {{pl.skala-pit[0].tasa}}. Pensja netto spada od miesiąca, w którym to się stanie.",
    },
    {
      pregunta: "Co daje PIT-2?",
      respuesta: "Pracodawca co miesiąc zmniejsza zaliczkę o 1/12 kwoty zmniejszającej podatek. Bez PIT-2 tę kwotę odzyskasz dopiero w zeznaniu rocznym.",
    },
    {
      pregunta: "Jak działa ulga dla młodych?",
      respuesta: "Osoby przed 26. urodzinami nie płacą PIT od przychodu z umowy o pracę i zlecenia do {{pl.limit-ulgi-dla-mlodych}} w roku. Składki ZUS i składkę zdrowotną płaci się normalnie.",
    },
    {
      pregunta: "Czy kalkulator uwzględnia PPK?",
      respuesta: "Nie. Kalkulator nie odejmuje wpłat do PPK ani innych potrąceń z pensji. Jeśli oszczędzasz w PPK, kwota na rękę będzie niższa.",
    },
  ],
  glosario: [
    { termino: "Brutto", definicion: "Pensja z umowy, przed potrąceniem składek i podatku." },
    { termino: "Netto (na rękę)", definicion: "Kwota, która trafia na Twoje konto." },
    { termino: "Koszty uzyskania przychodu", definicion: "Stała kwota odejmowana od przychodu przed policzeniem podatku." },
    { termino: "Kwota zmniejszająca podatek", definicion: "Kwota, o którą zmniejsza się podatek na skali: {{pl.kwota-zmniejszajaca}} rocznie." },
  ],
});
