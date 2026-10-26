import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cz.duchodova-kalkulacka",
  h1: "Důchodová kalkulačka 2026",
  title: "Důchodová kalkulačka 2026: odhad starobního důchodu",
  description:
    "Odhadněte výši starobního důchodu přiznaného v roce 2026: základní výměra {{cz.duchod-zakladni-vymera}}, procentní výměra z výdělků a let pojištění a výchovné.",
  intro: [
    "Starobní důchod se skládá ze základní výměry, která je pro všechny stejná, a z procentní výměry, která závisí na výdělcích a délce pojištění.",
    "Kalkulačka odhadne důchod podle pravidel pro důchody přiznané v roce 2026, včetně prvního kroku důchodové reformy.",
  ],
  comoSeCalcula: [
    "Základní výměra je v roce 2026 {{cz.duchod-zakladni-vymera}} měsíčně.",
    "Z průměrného výdělku (osobního vyměřovacího základu) se spočítá výpočtový základ: do {{cz.duchod-redukcni-hranice[prvni]}} se počítá {{cz.duchod-zapocet[do-prvni]}}, z části do {{cz.duchod-redukcni-hranice[druha]}} jen {{cz.duchod-zapocet[do-druhe]}} a výš už nic.",
    "Procentní výměra je {{cz.duchod-sazba-za-rok}} výpočtového základu za každý celý rok pojištění, nejméně ale ve výši základní výměry.",
    "Kdo vychoval děti, dostane výchovné {{cz.vychovne}} měsíčně za každé dítě.",
  ],
  ejemplo: ["S průměrným výdělkem 40 000 Kč a 40 lety pojištění vychází výpočtový základ 26 129 Kč, procentní výměra 15 626 Kč a celý důchod 20 526 Kč měsíčně."],
  faq: [
    {
      pregunta: "Kolik je minimální starobní důchod v roce 2026?",
      respuesta: "Základní výměra {{cz.duchod-zakladni-vymera}} a procentní výměra nejméně ve stejné výši, dohromady 9 800 Kč měsíčně.",
    },
    {
      pregunta: "Kolik let pojištění potřebuji?",
      respuesta: "Na řádný starobní důchod potřebujete aspoň 35 let pojištění, na předčasný 40 let. Předčasný důchod se trvale krátí.",
    },
    {
      pregunta: "Co mění důchodová reforma?",
      respuesta: "Od roku 2026 se postupně snižuje sazba za rok pojištění z 1,5 % až na 1,45 % a zápočet výdělků do první redukční hranice ze 100 % na 90 %. V roce 2026 je to {{cz.duchod-sazba-za-rok}} a {{cz.duchod-zapocet[do-prvni]}}.",
    },
    {
      pregunta: "Kde zjistím přesný průměrný výdělek?",
      respuesta: "V Informativní důchodové aplikaci (IDA) na ePortálu ČSSZ. Doby pojištění najdete i v informativním výpisu konta.",
    },
  ],
  glosario: [
    { termino: "Osobní vyměřovací základ", definicion: "Průměrný měsíční výdělek za celou kariéru přepočtený na dnešní mzdovou úroveň." },
    { termino: "Výpočtový základ", definicion: "Osobní vyměřovací základ po redukci, ze kterého se počítá procentní výměra." },
    { termino: "Výchovné", definicion: "Příplatek k důchodu za každé vychované dítě." },
  ],
});
