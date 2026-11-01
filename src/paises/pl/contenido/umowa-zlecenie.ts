import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pl.umowa-zlecenie",
  h1: "Kalkulator umowy zlecenia brutto netto",
  title: "Umowa zlecenie kalkulator: ile na rękę netto",
  description:
    "Policz, ile dostaniesz na rękę z umowy zlecenia: składki ZUS, składka zdrowotna, koszty {{pl.koszty-procentowe[standard]}} i zaliczka na PIT. Wersja dla studenta do 26 lat.",
  intro: [
    "Umowa zlecenie to umowa cywilnoprawna, od której zwykle płaci się składki emerytalną, rentową i zdrowotną. Chorobowe jest dobrowolne.",
    "Uczniowie i studenci przed 26. urodzinami nie płacą od zlecenia składek ani podatku, więc dostają całą kwotę brutto.",
  ],
  comoSeCalcula: [
    "Składki: emerytalna {{pl.skladki-pracownika[emerytalne]}} i rentowa {{pl.skladki-pracownika[rentowe]}} od kwoty brutto. Chorobowa {{pl.skladki-pracownika[chorobowe]}}, jeśli się na nią zdecydujesz.",
    "Składka zdrowotna: {{pl.skladka-zdrowotna}} od kwoty brutto pomniejszonej o składki społeczne.",
    "Koszty uzyskania przychodu: {{pl.koszty-procentowe[standard]}} od kwoty brutto pomniejszonej o składki społeczne.",
    "Zaliczka na PIT: {{pl.skala-pit[0].tasa}} od podstawy zaokrąglonej do pełnych złotych. Jeśli złożysz PIT-2, zleceniodawca odejmie 1/12 kwoty zmniejszającej podatek.",
    "Przy umowie do {{pl.limit-malej-umowy}} z osobą, która nie jest pracownikiem zleceniodawcy, podatek to {{pl.ryczalt-malej-umowy}} całego przychodu, bez kosztów.",
  ],
  ejemplo: [
    "Z umowy na 3000 zł brutto, bez chorobowego i bez PIT-2, dostaniesz 2166,60 zł na rękę. Składki społeczne to 337,80 zł, zdrowotna 239,60 zł, a zaliczka na PIT 256 zł.",
  ],
  faq: [
    {
      pregunta: "Czy student płaci ZUS od umowy zlecenia?",
      respuesta: "Nie, jeśli jest uczniem szkoły ponadpodstawowej lub studentem i nie skończył 26 lat. Nie płaci wtedy składek emerytalnej i rentowej, a przychód jest zwolniony z PIT w ramach ulgi dla młodych.",
    },
    {
      pregunta: "Czy na zleceniu można złożyć PIT-2?",
      respuesta: "Tak. Wtedy zleceniodawca co miesiąc pomniejsza zaliczkę na podatek o 1/12 kwoty zmniejszającej podatek, czyli o 1/12 z {{pl.kwota-zmniejszajaca}}.",
    },
    {
      pregunta: "Czy warto płacić dobrowolne chorobowe?",
      respuesta: "Składka chorobowa to {{pl.skladki-pracownika[chorobowe]}} kwoty brutto. Kwota na rękę jest wtedy niższa, ale w razie choroby możesz dostać zasiłek chorobowy.",
    },
    {
      pregunta: "Czym różni się zlecenie od umowy o dzieło?",
      respuesta: "Od zlecenia zwykle płaci się składki ZUS i zdrowotną. Od umowy o dzieło tylko podatek, dlatego na rękę zostaje więcej. Porównasz to w kalkulatorze umowy o dzieło.",
    },
  ],
  glosario: [
    { termino: "Zleceniodawca", definicion: "Firma lub osoba, która zleca pracę i wypłaca wynagrodzenie." },
    { termino: "PIT-2", definicion: "Oświadczenie, dzięki któremu płatnik co miesiąc stosuje kwotę zmniejszającą podatek." },
  ],
});
