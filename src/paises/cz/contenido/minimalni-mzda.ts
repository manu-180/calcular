import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cz.minimalni-mzda",
  h1: "Minimální mzda {{anio}}",
  title: "Minimální mzda {{anio}}: {{cz.minimalni-mzda}} hrubého a čistá",
  description:
    "Minimální mzda v roce {{anio}} je {{cz.minimalni-mzda}} měsíčně a {{cz.minimalni-mzda-hodinova}} za hodinu. Spočítejte minimum pro zkrácený úvazek i čistou částku.",
  intro: [
    "Minimální mzda je nejnižší odměna, kterou smí zaměstnavatel zaplatit za práci v pracovním poměru i na dohodu. V roce 2026 činí {{cz.minimalni-mzda}} za měsíc při 40 hodinách týdně.",
    "Kalkulačka spočítá minimum pro váš úvazek, hodinovou sazbu podle délky stanovené pracovní doby a čistou minimální mzdu.",
  ],
  comoSeCalcula: [
    "Měsíční minimální mzda platí pro plný úvazek. Při zkráceném úvazku se snižuje v poměru odpracovaných hodin.",
    "Hodinová minimální mzda je {{cz.minimalni-mzda-hodinova}} pro 40 hodin týdně. Při kratší stanovené době (38,75 nebo 37,5 hodiny) se zvyšuje úměrně a zaokrouhluje na desetihaléře nahoru.",
    "Do minimální mzdy se nezapočítává mzda za přesčas ani příplatky za svátek, noc, víkend a ztížené prostředí.",
  ],
  ejemplo: ["Při plném úvazku dostanete hrubých 22 400 Kč. Po odečtení pojištění a zálohy na daň se slevou na poplatníka zůstane čistých 19 011 Kč."],
  faq: [
    {
      pregunta: "Kolik je minimální mzda v roce 2026?",
      respuesta: "{{cz.minimalni-mzda}} měsíčně nebo {{cz.minimalni-mzda-hodinova}} za hodinu při stanovené týdenní pracovní době 40 hodin. Platí od 1. ledna do 31. prosince 2026.",
    },
    {
      pregunta: "Kolik je čistá minimální mzda?",
      respuesta: "S podepsaným prohlášením a bez dětí 19 011 Kč. S dětmi může být čistá mzda vyšší díky daňovému bonusu.",
    },
    {
      pregunta: "Jaká bude minimální mzda v roce 2027?",
      respuesta: "Ministerstvo práce a sociálních věcí vyhlásilo pro rok 2027 částku 24 900 Kč měsíčně a 148,30 Kč za hodinu.",
    },
    {
      pregunta: "Platí minimální mzda i pro dohodu o provedení práce?",
      respuesta: "Ano. Odměna z dohody přepočtená na hodinu nesmí být nižší než hodinová minimální mzda, jinak musí zaměstnavatel doplatit rozdíl.",
    },
  ],
  glosario: [
    { termino: "Stanovená týdenní pracovní doba", definicion: "Délka plného úvazku podle zákoníku práce: 40 hodin, ve vícesměnných provozech 38,75 nebo 37,5 hodiny." },
    { termino: "Doplatek do minimální mzdy", definicion: "Rozdíl, který zaměstnavatel doplatí, když mzda za měsíc nedosáhne minimální mzdy." },
  ],
});
