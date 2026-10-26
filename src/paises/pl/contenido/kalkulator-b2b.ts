import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pl.kalkulator-b2b",
  h1: "Kalkulator B2B: skala, liniowy czy ryczałt",
  title: "Kalkulator B2B: ile na rękę na skali, liniowym i ryczałcie",
  description:
    "Porównaj, ile zostanie Ci na rękę na B2B w każdej formie opodatkowania. Składki ZUS, zdrowotna, podatek {{pl.podatek-liniowy}}, skala i ryczałt dla Twojej branży.",
  intro: [
    "Na kontrakcie B2B prowadzisz jednoosobową działalność i sam płacisz składki oraz podatek. Kalkulator porównuje trzy formy opodatkowania: skalę podatkową, podatek liniowy i ryczałt.",
    "Wpisz miesięczny przychód z faktur i koszty, a zobaczysz, która forma daje najwięcej na rękę.",
  ],
  comoSeCalcula: [
    "Składki społeczne zależą od wybranego wariantu ZUS. Pełny ZUS liczy się od {{pl.podstawa-zus-pelna}}, preferencyjny od {{pl.podstawa-zus-preferencyjna}}.",
    "Skala: podatek {{pl.skala-pit[0].tasa}} i {{pl.skala-pit[1].tasa}} od dochodu po odjęciu składek społecznych, z kwotą zmniejszającą {{pl.kwota-zmniejszajaca}}. Składka zdrowotna {{pl.skladka-zdrowotna}} dochodu.",
    "Liniowy: podatek {{pl.podatek-liniowy}} od dochodu bez kwoty wolnej. Składka zdrowotna {{pl.skladka-zdrowotna-liniowa}} dochodu, z której do {{pl.limit-zdrowotnej-liniowy}} rocznie zmniejsza podstawę podatku.",
    "Ryczałt: podatek od przychodu według stawki dla branży, bez odliczania kosztów. Od przychodu odejmujesz składki społeczne i {{pl.odliczenie-zdrowotnej-ryczalt}} zapłaconej składki zdrowotnej, która zależy od rocznego przychodu.",
    "Na rękę to przychód minus koszty, wszystkie składki i podatek, liczone za rok i podzielone przez 12.",
  ],
  ejemplo: [
    "Przy 15 000 zł faktury miesięcznie, 1000 zł kosztów i pełnym ZUS na rękę zostaje około 9366 zł na skali, 9268 zł na liniowym i 9707 zł na ryczałcie 12 %.",
  ],
  faq: [
    {
      pregunta: "Co się bardziej opłaca na B2B: liniowy czy ryczałt?",
      respuesta: "Przy niskich kosztach i stawce ryczałtu 12 % zwykle ryczałt. Przy dużych kosztach lub stawce 15 % i 17 % często wygrywa liniowy albo skala. Kalkulator porówna to dla Twoich kwot.",
    },
    {
      pregunta: "Jaka stawka ryczałtu dla programisty?",
      respuesta: "Dla usług związanych z oprogramowaniem i doradztwem w zakresie sprzętu komputerowego ustawa przewiduje {{pl.stawki-ryczaltu[12]}}. Stawkę dla swojej działalności sprawdź po kodzie PKWiU w ustawie o zryczałtowanym podatku dochodowym.",
    },
    {
      pregunta: "Czy na ryczałcie można odliczyć koszty?",
      respuesta: "Nie. Ryczałt płaci się od przychodu. Odliczasz tylko składki społeczne i {{pl.odliczenie-zdrowotnej-ryczalt}} zapłaconej składki zdrowotnej.",
    },
    {
      pregunta: "Czy kalkulator uwzględnia VAT?",
      respuesta: "Nie. Wpisz kwoty netto, bez VAT. VAT z faktur oddajesz do urzędu skarbowego i nie jest Twoim przychodem.",
    },
  ],
  glosario: [
    { termino: "B2B", definicion: "Współpraca między firmami: zamiast umowy o pracę wystawiasz faktury jako przedsiębiorca." },
    { termino: "Ryczałt od przychodów ewidencjonowanych", definicion: "Podatek liczony od przychodu, bez kosztów, według stawki dla danej branży." },
  ],
});
