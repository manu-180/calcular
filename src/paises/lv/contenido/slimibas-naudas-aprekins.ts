import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lv.slimibas-naudas-aprekins",
  h1: "Slimības naudas aprēķins {{anio}}",
  title: "Slimības naudas aprēķins {{anio}}: kalkulators",
  description: "Aprēķiniet slimības naudu no darba devēja un slimības pabalstu no VSAA pēc vidējās izpeļņas un slimības dienām.",
  intro: ["Slimības lapas pirmajās dienās maksā darba devējs, vēlāk VSAA. Kalkulators sadala summu pa šiem periodiem."],
  comoSeCalcula: ["Ievadiet vidējo izpeļņu dienā un slimības dienu skaitu. Kalkulators piemēro likmes katram periodam atsevišķi."],
  faq: [],
  glosario: [],
});
