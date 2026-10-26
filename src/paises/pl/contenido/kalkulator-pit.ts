import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pl.kalkulator-pit",
  h1: "Kalkulator PIT: podatek według skali {{pl.skala-pit[0].tasa}} i {{pl.skala-pit[1].tasa}}",
  title: "Kalkulator PIT: podatek roczny, zwrot i dopłata",
  description:
    "Policz podatek dochodowy za rok według skali {{pl.skala-pit[0].tasa}} i {{pl.skala-pit[1].tasa}}, z kwotą wolną i wspólnym rozliczeniem z małżonkiem. Sprawdź, czy dostaniesz zwrot.",
  intro: [
    "Kalkulator liczy PIT według skali podatkowej, tak jak w zeznaniu PIT-37 albo PIT-36. Wpisz kwoty z PIT-11 od pracodawcy, a zobaczysz podatek za rok i różnicę między nim a pobranymi zaliczkami.",
    "Do {{pl.skala-pit[0].hasta}} dochodu płacisz {{pl.skala-pit[0].tasa}} minus kwota zmniejszająca podatek {{pl.kwota-zmniejszajaca}}. Od nadwyżki płacisz {{pl.skala-pit[1].tasa}}.",
  ],
  comoSeCalcula: [
    "Dochód to przychód minus koszty uzyskania przychodu.",
    "Podstawa opodatkowania to dochód minus odliczone składki ZUS, zaokrąglony do pełnych złotych.",
    "Podatek: {{pl.skala-pit[0].tasa}} podstawy minus {{pl.kwota-zmniejszajaca}}. Powyżej {{pl.skala-pit[0].hasta}} dochodzi {{pl.skala-pit[1].tasa}} od nadwyżki. Wynik zaokrągla się do pełnych złotych.",
    "Przy wspólnym rozliczeniu liczy się podatek od połowy sumy dochodów małżonków i mnoży go przez dwa.",
    "Jeśli zaliczki pobrane w roku były wyższe niż podatek, dostaniesz zwrot. Jeśli niższe, dopłacasz różnicę.",
  ],
  ejemplo: [
    "Przy przychodzie 100 000 zł, kosztach 3000 zł i składkach 13 710 zł podstawa wynosi 83 290 zł, a podatek 6395 zł.",
  ],
  faq: [
    {
      pregunta: "Ile wynosi kwota wolna od podatku?",
      respuesta: "Skala działa tak, jakby pierwsze 30 000 zł dochodu było wolne od podatku: podatek zmniejsza się o {{pl.kwota-zmniejszajaca}}, czyli {{pl.skala-pit[0].tasa}} z 30 000 zł.",
    },
    {
      pregunta: "Kiedy opłaca się wspólne rozliczenie z małżonkiem?",
      respuesta: "Gdy jedno z małżonków zarabia ponad {{pl.skala-pit[0].hasta}}, a drugie mniej. Podatek liczy się wtedy od połowy łącznych dochodów, więc mniej trafia do stawki {{pl.skala-pit[1].tasa}}. Kalkulator pokazuje, ile na tym zyskujesz.",
    },
    {
      pregunta: "Skąd wziąć kwoty do kalkulatora?",
      respuesta: "Z informacji PIT-11 od pracodawcy: przychód, koszty uzyskania przychodu, składki na ubezpieczenia społeczne i pobrane zaliczki.",
    },
    {
      pregunta: "Czy kalkulator uwzględnia ulgi?",
      respuesta: "Nie. Ulga na dzieci, ulga termomodernizacyjna i inne odliczenia zmniejszą podatek dodatkowo.",
    },
  ],
  glosario: [
    { termino: "PIT-11", definicion: "Informacja od płatnika o przychodach i pobranych zaliczkach za rok." },
    { termino: "Skala podatkowa", definicion: "Dwie stawki podatku: niższa do progu i wyższa od nadwyżki ponad próg." },
  ],
});
