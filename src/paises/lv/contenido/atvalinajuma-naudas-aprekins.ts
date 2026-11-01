import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lv.atvalinajuma-naudas-aprekins",
  h1: "Atvaļinājuma naudas aprēķins {{anio}}",
  title: "Atvaļinājuma naudas aprēķins {{anio}}: kalkulators",
  description: "Aprēķiniet atvaļinājuma naudu no pēdējo mēnešu vidējās izpeļņas un kalendāra dienām. Rezultāts bruto, pirms nodokļiem.",
  intro: ["Atvaļinājuma naudu rēķina no vidējās izpeļņas pēdējos mēnešos. Kalkulators dala samaksu ar dienām periodā un reizina ar atvaļinājuma dienām."],
  comoSeCalcula: ["Saskaitiet darba samaksu par periodu, daliet ar kalendāra dienām periodā un reiziniet ar atvaļinājuma dienām."],
  faq: [],
  glosario: [],
});
