import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pl.podatek-belki",
  h1: "Kalkulator podatku Belki od zysków kapitałowych",
  title: "Podatek Belki: kalkulator {{pl.podatek-od-zbycia}} od zysku z akcji i ETF",
  description:
    "Policz podatek {{pl.podatek-od-zbycia}} od zysku ze sprzedaży akcji, ETF, funduszy i kryptowalut oraz podatek Belki od odsetek. Dochód, podatek i zysk po podatku.",
  intro: [
    "Zyski z inwestycji opodatkowane są stawką {{pl.podatek-od-zbycia}}. Dotyczy to sprzedaży akcji, obligacji, jednostek funduszy i kryptowalut, a także odsetek z lokat.",
    "Od zysku ze sprzedaży podatek płacisz sam po zakończeniu roku. Od odsetek z lokaty podatek pobiera bank.",
  ],
  comoSeCalcula: [
    "Sprzedaż: dochód to przychód ze sprzedaży minus koszty zakupu i prowizje. Podatek to {{pl.podatek-od-zbycia}} dochodu zaokrąglonego do pełnych złotych.",
    "Odsetki: podatek to {{pl.podatek-belki}} kwoty odsetek, zaokrąglony do pełnych groszy w górę.",
    "Strata ze sprzedaży nie daje podatku i może obniżyć zyski z tego samego źródła w kolejnych latach.",
  ],
  ejemplo: [
    "Akcje kupione za 10 000 zł z prowizjami sprzedajesz za 15 000 zł. Zysk to 5000 zł, a podatek 950 zł.",
  ],
  faq: [
    {
      pregunta: "Kiedy zapłacić podatek od zysku z akcji?",
      respuesta: "Po zakończeniu roku, w zeznaniu rocznym. Wykazujesz w nim wszystkie przychody i koszty ze sprzedaży z całego roku.",
    },
    {
      pregunta: "Czy stratę z akcji można odliczyć?",
      respuesta: "Tak. Stratę możesz rozliczyć z zyskami z tego samego źródła w kolejnych pięciu latach.",
    },
    {
      pregunta: "Jaki podatek od kryptowalut?",
      respuesta: "Taki sam: {{pl.podatek-od-zbycia}} od dochodu ze sprzedaży walut wirtualnych, czyli przychodu minus koszty ich nabycia.",
    },
  ],
  glosario: [
    { termino: "Podatek Belki", definicion: "Potoczna nazwa zryczałtowanego podatku od odsetek i zysków kapitałowych." },
    { termino: "Dochód", definicion: "Przychód ze sprzedaży minus koszty zakupu." },
  ],
});
