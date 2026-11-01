import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pl.okres-wypowiedzenia",
  h1: "Kalkulator okresu wypowiedzenia umowy o pracę",
  title: "Okres wypowiedzenia: kiedy kończy się umowa o pracę",
  description:
    "Sprawdź okres wypowiedzenia umowy o pracę: {{pl.okres-wypowiedzenia[krocej-niz-6-mies]}} tygodnie, {{pl.okres-wypowiedzenia[od-6-mies]}} miesiąc albo {{pl.okres-wypowiedzenia[od-3-lat]}} miesiące według stażu, i datę ostatniego dnia pracy, czyli sobotę albo koniec miesiąca.",
  intro: [
    "Okres wypowiedzenia umowy o pracę na czas nieokreślony i określony zależy od tego, jak długo pracujesz u danego pracodawcy. Kalkulator podaje okres i dzień, w którym umowa się rozwiąże.",
  ],
  comoSeCalcula: [
    "Staż krótszy niż 6 miesięcy: {{pl.okres-wypowiedzenia[krocej-niz-6-mies]}} tygodnie. Co najmniej 6 miesięcy: {{pl.okres-wypowiedzenia[od-6-mies]}} miesiąc. Co najmniej 3 lata: {{pl.okres-wypowiedzenia[od-3-lat]}} miesiące.",
    "Okres liczony w tygodniach kończy się w sobotę. Kalkulator liczy go od niedzieli po dniu wypowiedzenia.",
    "Okres liczony w miesiącach kończy się w ostatnim dniu miesiąca. Biegnie od pierwszego dnia miesiąca po złożeniu wypowiedzenia.",
  ],
  ejemplo: [
    "Jeśli pracujesz od 4 lat i złożysz wypowiedzenie 21 października, umowa rozwiąże się 31 stycznia następnego roku.",
  ],
  faq: [
    {
      pregunta: "Czy okres wypowiedzenia jest taki sam dla pracownika i pracodawcy?",
      respuesta: "Tak. Ustawowy okres wypowiedzenia umowy o pracę obowiązuje obie strony.",
    },
    {
      pregunta: "Czy można skrócić okres wypowiedzenia?",
      respuesta: "Tak, jeśli obie strony się zgodzą, mogą rozwiązać umowę wcześniej na mocy porozumienia stron.",
    },
    {
      pregunta: "Czy liczy się praca u poprzedniego pracodawcy?",
      respuesta: "Tylko wtedy, gdy nowy pracodawca przejął zakład pracy albo jest następcą prawnym poprzedniego. W innych przypadkach liczy się staż u obecnego pracodawcy.",
    },
  ],
  glosario: [
    { termino: "Wypowiedzenie", definicion: "Oświadczenie jednej ze stron, że rozwiązuje umowę o pracę po upływie okresu wypowiedzenia." },
    { termino: "Porozumienie stron", definicion: "Rozwiązanie umowy w terminie, na który zgodzą się pracownik i pracodawca." },
  ],
});
