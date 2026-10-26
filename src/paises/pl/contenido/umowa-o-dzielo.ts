import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pl.umowa-o-dzielo",
  h1: "Kalkulator umowy o dzieło brutto netto",
  title: "Umowa o dzieło kalkulator: netto z kosztami 20 i 50 %",
  description:
    "Policz, ile dostaniesz na rękę z umowy o dzieło. Koszty {{pl.koszty-procentowe[standard]}} albo autorskie {{pl.koszty-procentowe[autorskie]}}, zaliczka {{pl.skala-pit[0].tasa}} i wynik co do złotówki.",
  intro: [
    "Od umowy o dzieło nie płaci się składek ZUS ani składki zdrowotnej, jeśli nie zawierasz jej z własnym pracodawcą. Zamawiający pobiera tylko zaliczkę na podatek.",
    "Kalkulator liczy kwotę na rękę dla zwykłych kosztów {{pl.koszty-procentowe[standard]}} i dla kosztów autorskich {{pl.koszty-procentowe[autorskie]}}.",
  ],
  comoSeCalcula: [
    "Koszty uzyskania przychodu: {{pl.koszty-procentowe[standard]}} kwoty brutto, a przy przeniesieniu praw autorskich {{pl.koszty-procentowe[autorskie]}}.",
    "Podstawa opodatkowania: brutto minus koszty, zaokrąglona do pełnych złotych.",
    "Zaliczka na PIT: {{pl.skala-pit[0].tasa}} podstawy, zaokrąglona do pełnych złotych.",
    "Umowa do {{pl.limit-malej-umowy}} z osobą spoza firmy: podatek zryczałtowany {{pl.ryczalt-malej-umowy}} całej kwoty, bez kosztów.",
  ],
  ejemplo: [
    "Z umowy o dzieło na 3000 zł brutto z kosztami 20 % dostaniesz 2712 zł. Z kosztami autorskimi 50 % dostaniesz 2820 zł.",
  ],
  faq: [
    {
      pregunta: "Czy od umowy o dzieło płaci się ZUS?",
      respuesta: "Nie, jeśli umowę zawierasz z firmą, w której nie pracujesz na etacie. Gdy zamawiającym jest Twój pracodawca, przychód traktuje się jak ze stosunku pracy i składki są należne.",
    },
    {
      pregunta: "Kiedy można zastosować koszty autorskie 50 %?",
      respuesta: "Gdy dzieło jest utworem i przenosisz na zamawiającego prawa autorskie, na przykład do tekstu, grafiki czy programu. Łączny limit tych kosztów w roku to {{pl.skala-pit[0].hasta}}.",
    },
    {
      pregunta: "Czy studentowi przysługuje ulga dla młodych przy umowie o dzieło?",
      respuesta: "Nie. Ulga dla młodych obejmuje umowę o pracę i zlecenie, a przychód z umowy o dzieło jest opodatkowany niezależnie od wieku.",
    },
  ],
  glosario: [
    { termino: "Zamawiający", definicion: "Firma lub osoba, która zamawia dzieło i płaci wynagrodzenie." },
    { termino: "Koszty autorskie", definicion: "Koszty {{pl.koszty-procentowe[autorskie]}} przysługujące twórcom przy przeniesieniu praw autorskich." },
  ],
});
