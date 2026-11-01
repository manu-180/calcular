import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sk.inflacna-kalkulacka",
  h1: "Inflačná kalkulačka {{anio}}",
  title: "Inflačná kalkulačka {{anio}}: kúpna sila eura",
  description: "Prepočítajte sumu podľa inflácie a porovnajte kúpnu silu eura. Údaje zo Štatistického úradu SR.",
  intro: ["Kalkulačka prepočíta sumu podľa medziročnej inflácie, ktorú zverejňuje Štatistický úrad SR."],
  comoSeCalcula: ["Suma sa za každý rok vynásobí výrazom 1 + inflácia / 100."],
  ejemplo: ["Pri inflácii 3 % zodpovedá 1 000 eurám po roku 1 030 eur."],
  faq: [],
  glosario: [],
});
