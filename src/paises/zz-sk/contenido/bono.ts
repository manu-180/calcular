import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "zz-sk.bono",
  h1: "Kalkulačka polročnej prémie v Zetalandii",
  title: "Polročná prémia v Zetalandii: koľko dostanete",
  description: "Vypočítajte si polročnú prémiu s minimálnou mzdou vášho kraja a príplatkom {{zz.bonificacion}}, s oficiálnymi hodnotami, dátumom a zdrojom.",
  intro: [
    "Polročná prémia je mzda navyše, ktorú zamestnávateľ vypláca dvakrát do roka.",
    "Ak ste odpracovali celý polrok, dostanete jednu mesačnú mzdu a príplatok {{zz.bonificacion}}.",
  ],
  comoSeCalcula: [
    "Výpočet vychádza z hrubej mesačnej mzdy. Ak je nižšia ako minimálna mzda vo vašom kraji, použije sa minimálna mzda.",
    "Táto mzda sa vynásobí počtom odpracovaných mesiacov a vydelí šiestimi.",
    "V malých firmách je prémia polovičná.",
    "K prémii sa pripočíta príplatok {{zz.bonificacion}}.",
  ],
  faq: [
    { pregunta: "Aká je minimálna mzda v Severnom kraji?", respuesta: "{{zz.minimo@norte}}, platí od {{zz.minimo@norte#desde}}." },
    { pregunta: "Čo ak nemám odpracovaný celý polrok?", respuesta: "Dostanete pomernú časť podľa odpracovaných mesiacov." },
    { pregunta: "Vypláca sa príplatok vždy?", respuesta: "Áno. Je to {{zz.bonificacion}} z prémie a firma ho vypláca spolu s prémiou." },
  ],
  glosario: [
    { termino: "Polročná prémia", definicion: "Mzda navyše, ktorú zákon ukladá vyplatiť v júli a v decembri." },
    { termino: "Minimálna mzda", definicion: "Najnižšia odmena za prácu na plný úväzok v každom kraji." },
  ],
});
