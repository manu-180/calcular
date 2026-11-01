import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lv.bezdarbnieka-pabalsts",
  h1: "Bezdarbnieka pabalsts {{anio}}: aprēķins",
  title: "Bezdarbnieka pabalsts {{anio}}: kalkulators pa mēnešiem",
  description: "Aprēķiniet bezdarbnieka pabalstu pēc apdrošināšanas stāža un vidējās iemaksu algas, katram periodam atsevišķi.",
  intro: ["Bezdarbnieka pabalsts ir atkarīgs no apdrošināšanas stāža un vidējās iemaksu algas, un laika gaitā tas samazinās. Kalkulators parāda summu pa periodiem."],
  comoSeCalcula: ["Ievadiet vidējo iemaksu algu un izvēlieties stāžu. Kalkulators parādīs pabalstu katrā izmaksas posmā."],
  faq: [],
  glosario: [],
});
