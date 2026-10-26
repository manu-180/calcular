import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "zz-pl.bono",
  h1: "Kalkulator premii półrocznej w Zetalandii",
  title: "Premia półroczna w Zetalandii: oblicz, ile dostaniesz",
  description: "Oblicz premię półroczną z aktualną płacą minimalną w swojej strefie i dodatkiem {{zz.bonificacion}}. Oficjalne dane z datą i źródłem.",
  intro: [
    "Premia półroczna to dodatkowa miesięczna pensja wypłacana dwa razy w roku.",
    "Jeśli przepracujesz całe półrocze, dostajesz pełną miesięczną pensję i dodatek w wysokości {{zz.bonificacion}}.",
  ],
  comoSeCalcula: [
    "Punktem wyjścia jest miesięczne wynagrodzenie brutto. Jeśli jest niższe niż minimum w twojej strefie, liczy się minimum.",
    "To wynagrodzenie mnoży się przez liczbę przepracowanych miesięcy i dzieli przez 6.",
    "W małej firmie premia wynosi połowę.",
    "Do premii dolicza się dodatek w wysokości {{zz.bonificacion}}.",
  ],
  faq: [
    { pregunta: "Ile wynosi płaca minimalna w strefie północnej?", respuesta: "{{zz.minimo@norte}}. Obowiązuje od {{zz.minimo@norte#desde}}." },
    { pregunta: "A jeśli praca nie trwała całego półrocza?", respuesta: "Dostajesz część odpowiadającą przepracowanym miesiącom." },
    { pregunta: "Czy dodatek jest wypłacany zawsze?", respuesta: "Tak. Wynosi {{zz.bonificacion}} premii i firma wypłaca go razem z premią." },
  ],
  glosario: [
    { termino: "Premia półroczna", definicion: "Dodatkowe wynagrodzenie, które prawo nakazuje wypłacić w lipcu i grudniu." },
    { termino: "Płaca minimalna", definicion: "Najniższe wynagrodzenie dozwolone za pełny dzień pracy w każdej strefie." },
  ],
});
