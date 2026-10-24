import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pl.urlop-wypoczynkowy",
  h1: "Kalkulator urlopu wypoczynkowego",
  title: "Ile dni urlopu mi przysługuje: {{pl.wymiar-urlopu[ponizej-10]}} czy {{pl.wymiar-urlopu[od-10]}}",
  description:
    "Policz wymiar urlopu wypoczynkowego: {{pl.wymiar-urlopu[ponizej-10]}} albo {{pl.wymiar-urlopu[od-10]}}, ze stażem za szkołę, na część etatu i proporcjonalnie za część roku.",
  intro: [
    "Pracownik na umowie o pracę ma prawo do {{pl.wymiar-urlopu[ponizej-10]}} urlopu w roku, jeśli jest zatrudniony krócej niż 10 lat, i {{pl.wymiar-urlopu[od-10]}} po 10 latach.",
    "Do stażu urlopowego wlicza się lata nauki w szkole, na przykład 8 lat za studia wyższe. Kalkulator doda je za Ciebie.",
  ],
  comoSeCalcula: [
    "Staż urlopowy to lata pracy u wszystkich pracodawców plus lata za ukończoną szkołę: zasadnicza zawodowa {{pl.staz-za-szkole[zasadnicza]}}, średnia zawodowa {{pl.staz-za-szkole[srednia-zawodowa]}}, liceum {{pl.staz-za-szkole[srednia-ogolna]}}, szkoła policealna {{pl.staz-za-szkole[policealna]}}, studia {{pl.staz-za-szkole[wyzsza]}}.",
    "Poniżej 10 lat stażu przysługuje {{pl.wymiar-urlopu[ponizej-10]}}, od 10 lat {{pl.wymiar-urlopu[od-10]}}.",
    "Na części etatu urlop jest proporcjonalny do wymiaru czasu pracy. Niepełny dzień zaokrągla się w górę.",
    "Jeśli pracujesz u pracodawcy tylko przez część roku, dostajesz 1/12 wymiaru za każdy miesiąc, z zaokrągleniem w górę.",
  ],
  ejemplo: [
    "Absolwent studiów po 2 latach pracy ma 10 lat stażu urlopowego (8 lat za studia i 2 lata pracy), więc przysługuje mu {{pl.wymiar-urlopu[od-10]}} urlopu.",
  ],
  faq: [
    {
      pregunta: "Czy studia wliczają się do stażu urlopowego?",
      respuesta: "Tak. Ukończenie szkoły wyższej to {{pl.staz-za-szkole[wyzsza]}} stażu urlopowego. Jeśli praca i nauka trwały w tym samym czasie, liczy się tylko jeden z tych okresów, ten korzystniejszy.",
    },
    {
      pregunta: "Ile urlopu na pół etatu?",
      respuesta: "Połowę pełnego wymiaru, zaokrągloną w górę do pełnego dnia: 10 albo 13 dni.",
    },
    {
      pregunta: "Ile godzin to jeden dzień urlopu?",
      respuesta: "Przy liczeniu urlopu jeden dzień odpowiada 8 godzinom pracy.",
    },
  ],
  glosario: [
    { termino: "Staż urlopowy", definicion: "Okres pracy i nauki, od którego zależy liczba dni urlopu." },
    { termino: "Urlop proporcjonalny", definicion: "Urlop za część roku: 1/12 rocznego wymiaru za każdy miesiąc pracy." },
  ],
});
