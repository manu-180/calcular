import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lt.ispejimo-terminas",
  h1: "Įspėjimo terminas {{anio}}: atleidimas iš darbo",
  title: "Įspėjimo terminas {{anio}}: kada įspėti apie atleidimą",
  description: "Sužinokite įspėjimo terminą atleidžiant iš darbo pagal stažą toje įmonėje ir ar jums taikomas ilgesnis terminas.",
  intro: [
    "Skaičiuoklė parodo įspėjimo apie atleidimą terminą pagal darbo stažą.",
  ],
  comoSeCalcula: [
    "Terminas parenkamas pagal stažą.",
    "Saugomiems darbuotojams jis pailginamas.",
  ],
  faq: [],
  glosario: [],
});
