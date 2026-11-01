import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pl.kalkulator-lokat",
  h1: "Kalkulator lokat z podatkiem Belki",
  title: "Kalkulator lokat: zysk po podatku Belki {{pl.podatek-belki}}",
  description:
    "Policz zysk z lokaty bankowej: odsetki brutto, podatek Belki {{pl.podatek-belki}} i kwotę na rękę po zakończeniu lokaty, dla dowolnej kwoty, oprocentowania i okresu.",
  intro: [
    "Od odsetek z lokaty bank pobiera {{pl.podatek-belki}} podatku, nazywanego podatkiem Belki. Kalkulator pokazuje, ile zostanie Ci po podatku.",
    "Wpisz kwotę, oprocentowanie w skali roku i liczbę miesięcy, na które zakładasz lokatę.",
  ],
  comoSeCalcula: [
    "Odsetki brutto: kwota razy oprocentowanie roczne razy liczba miesięcy podzielona przez 12.",
    "Podatek Belki: {{pl.podatek-belki}} odsetek. Podstawę i podatek od odsetek zaokrągla się do pełnych groszy w górę.",
    "Zysk na rękę to odsetki minus podatek.",
  ],
  ejemplo: [
    "Lokata 10 000 zł na 3 miesiące po 5 % daje 125 zł odsetek. Bank pobiera 23,75 zł podatku, a na rękę zostaje 101,25 zł.",
  ],
  faq: [
    {
      pregunta: "Ile wynosi podatek Belki?",
      respuesta: "{{pl.podatek-belki}} od odsetek z lokat i rachunków oszczędnościowych. Kalkulator odejmuje go od odsetek.",
    },
    {
      pregunta: "Jak obliczyć oprocentowanie lokaty po podatku?",
      respuesta: "Pomnóż oprocentowanie przez 0,81. Lokata na 5 % daje po podatku 4,05 % w skali roku.",
    },
    {
      pregunta: "Od czego płaci się podatek Belki?",
      respuesta: "Od odsetek od lokat i rachunków oszczędnościowych, od odsetek od pożyczek i papierów wartościowych. Zysk ze sprzedaży akcji czy jednostek funduszy ma tę samą stawkę, a policzysz go w kalkulatorze podatku od zysków kapitałowych.",
    },
  ],
  glosario: [
    { termino: "Podatek Belki", definicion: "Potoczna nazwa zryczałtowanego podatku od odsetek i zysków kapitałowych." },
    { termino: "Kapitalizacja", definicion: "Dopisanie odsetek do kwoty lokaty." },
  ],
});
