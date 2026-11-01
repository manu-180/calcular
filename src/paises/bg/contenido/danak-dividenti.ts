import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bg.danak-dividenti",
  h1: "Данък върху дивидентите {{anio}}",
  title: "Данък дивидент {{anio}}: нетна сума за физически лица",
  description: "Изчислете окончателния данък и нетната сума от дивидент.",
  intro: ["Данъкът върху дивидентите на физически лица е окончателен и се удържа при изплащане."],
  comoSeCalcula: ["Данъкът е брутният дивидент по ставката. Нетната сума е разликата."],
  faq: [],
  glosario: [],
});
