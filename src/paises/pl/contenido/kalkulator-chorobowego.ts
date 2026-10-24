import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pl.kalkulator-chorobowego",
  h1: "Kalkulator chorobowego (L4)",
  title: "Kalkulator L4: ile dostanę za zwolnienie lekarskie",
  description:
    "Policz wynagrodzenie chorobowe i zasiłek za dni na L4: {{pl.zasilek-chorobowy[podstawowy]}} podstawy albo {{pl.zasilek-chorobowy[ciaza]}} w ciąży, od pensji po odjęciu składek ZUS.",
  intro: [
    "Za czas choroby pracownik dostaje zwykle {{pl.zasilek-chorobowy[podstawowy]}} podstawy wynagrodzenia. W ciąży, po wypadku w drodze do pracy lub z pracy i przy badaniach dawców narządów to {{pl.zasilek-chorobowy[ciaza]}}.",
    "Kalkulator liczy kwotę za dzień i za cały okres zwolnienia.",
  ],
  comoSeCalcula: [
    "Podstawa: przeciętne wynagrodzenie brutto z 12 miesięcy przed chorobą minus składki emerytalna, rentowa i chorobowa pracownika.",
    "Kwota za dzień: podstawa podzielona przez 30 i pomnożona przez {{pl.zasilek-chorobowy[podstawowy]}} albo {{pl.zasilek-chorobowy[ciaza]}}.",
    "Za każdy dzień zwolnienia, także weekendy i święta, przysługuje ta sama kwota.",
  ],
  ejemplo: [
    "Przy pensji 6000 zł brutto podstawa wynosi 5177,40 zł. Za dzień L4 dostaniesz 138,06 zł, a za 10 dni 1380,60 zł brutto.",
  ],
  faq: [
    {
      pregunta: "Ile płatne jest L4?",
      respuesta: "Zwykle {{pl.zasilek-chorobowy[podstawowy]}} podstawy, czyli pensji po odjęciu składek ZUS pracownika. W ciąży {{pl.zasilek-chorobowy[ciaza]}}.",
    },
    {
      pregunta: "Kto płaci za zwolnienie: pracodawca czy ZUS?",
      respuesta: "Przez pierwsze 33 dni choroby w roku, a po 50. roku życia przez 14 dni, płaci pracodawca (wynagrodzenie chorobowe). Od kolejnego dnia płaci ZUS (zasiłek chorobowy).",
    },
    {
      pregunta: "Czy za weekend na L4 też dostaję pieniądze?",
      respuesta: "Tak. Zasiłek przysługuje za każdy dzień niezdolności do pracy, także za dni wolne.",
    },
  ],
  glosario: [
    { termino: "L4", definicion: "Potoczna nazwa zwolnienia lekarskiego (e-ZLA)." },
    { termino: "Wynagrodzenie chorobowe", definicion: "Świadczenie od pracodawcy za pierwsze dni choroby w roku." },
  ],
});
