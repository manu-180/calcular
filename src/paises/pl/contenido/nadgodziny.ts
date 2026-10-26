import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pl.nadgodziny",
  h1: "Kalkulator nadgodzin: dodatek {{pl.dodatek-za-nadgodziny[zwykly]}} i {{pl.dodatek-za-nadgodziny[noc-swieto]}}",
  title: "Kalkulator nadgodzin: ile zapłacą za godziny nadliczbowe",
  description:
    "Policz wynagrodzenie za nadgodziny z dodatkiem {{pl.dodatek-za-nadgodziny[zwykly]}} lub {{pl.dodatek-za-nadgodziny[noc-swieto]}}. Stawka godzinowa z wymiaru czasu pracy w wybranym miesiącu.",
  intro: [
    "Za pracę w godzinach nadliczbowych przysługuje normalne wynagrodzenie i dodatek. W zwykły dzień pracy dodatek wynosi {{pl.dodatek-za-nadgodziny[zwykly]}}, a w nocy, w niedziele i święta {{pl.dodatek-za-nadgodziny[noc-swieto]}}.",
    "Kalkulator liczy stawkę za godzinę z Twojej pensji i wymiaru czasu pracy w danym miesiącu.",
  ],
  comoSeCalcula: [
    "Stawka za godzinę: pensja miesięczna podzielona przez liczbę godzin do przepracowania w miesiącu.",
    "Normalne wynagrodzenie za nadgodziny: stawka razy liczba nadgodzin.",
    "Dodatek: {{pl.dodatek-za-nadgodziny[zwykly]}} stawki za każdą nadgodzinę w zwykły dzień i {{pl.dodatek-za-nadgodziny[noc-swieto]}} w nocy, w niedziele i święta, które nie są dla Ciebie dniami pracy, oraz w dniu wolnym za pracę w niedzielę lub święto.",
  ],
  ejemplo: [
    "Przy pensji 6000 zł w październiku 2026 r. (176 godzin) stawka wynosi 34,09 zł. Za 10 nadgodzin w zwykłe dni dostaniesz 340,91 zł i 170,45 zł dodatku, razem 511,36 zł brutto.",
  ],
  faq: [
    {
      pregunta: "Kiedy przysługuje dodatek 100 %?",
      respuesta: "Za nadgodziny w nocy, w niedziele i święta, które nie są dla Ciebie dniami pracy, oraz w dniu wolnym udzielonym za pracę w niedzielę lub święto.",
    },
    {
      pregunta: "Czy zamiast pieniędzy można dostać czas wolny?",
      respuesta: "Tak. Na Twój wniosek pracodawca może dać Ci czas wolny w tym samym wymiarze, a w niektórych przypadkach także bez wniosku. Kalkulator liczy wariant pieniężny.",
    },
    {
      pregunta: "Od jakiej kwoty liczy się dodatek?",
      respuesta: "Od wynagrodzenia z Twojego osobistego zaszeregowania, czyli zwykle od pensji zasadniczej. Jeśli takiego składnika nie wyodrębniono, od 60 % wynagrodzenia.",
    },
  ],
  glosario: [
    { termino: "Godziny nadliczbowe", definicion: "Praca ponad normę czasu pracy albo ponad przedłużony dobowy wymiar." },
    { termino: "Wymiar czasu pracy", definicion: "Liczba godzin do przepracowania w danym okresie." },
  ],
});
