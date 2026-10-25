import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cz.nahrada-mzdy-za-dovolenou",
  h1: "Náhrada mzdy za dovolenou",
  title: "Náhrada mzdy za dovolenou: výpočet z průměrného výdělku",
  description:
    "Spočítejte, kolik dostanete za čerpanou dovolenou nebo za proplacenou nevyčerpanou dovolenou při odchodu. Výpočet z průměrného hodinového výdělku.",
  intro: [
    "Za dny dovolené nedostáváte mzdu, ale náhradu mzdy ve výši průměrného výdělku. Stejně se počítá i proplacení nevyčerpané dovolené při skončení pracovního poměru.",
    "Kalkulačka spočítá průměrný hodinový výdělek z mzdy a hodin za předchozí čtvrtletí a vynásobí ho hodinami dovolené.",
  ],
  comoSeCalcula: [
    "Průměrný hodinový výdělek je hrubá mzda za předchozí kalendářní čtvrtletí vydělená odpracovanými hodinami v tomto čtvrtletí.",
    "Náhrada mzdy je průměrný hodinový výdělek krát počet hodin dovolené.",
    "Průměrný výdělek nesmí být nižší než hodinová minimální mzda {{cz.minimalni-mzda-hodinova}}.",
  ],
  ejemplo: ["Při mzdě 135 000 Kč za čtvrtletí a 504 odpracovaných hodinách je průměrný výdělek 267,86 Kč za hodinu. Týden dovolené (40 hodin) vám zaměstnavatel zaplatí 10 714,40 Kč hrubého."],
  faq: [
    {
      pregunta: "Proč je náhrada za dovolenou jiná než moje mzda?",
      respuesta: "Průměrný výdělek zahrnuje i příplatky, prémie a přesčasy zúčtované v předchozím čtvrtletí. Proto může být vyšší nebo nižší než běžná měsíční mzda.",
    },
    {
      pregunta: "Kdy se proplácí nevyčerpaná dovolená?",
      respuesta: "Jen při skončení pracovního poměru. Během trvání pracovního poměru se dovolená proplatit nesmí, musí se vyčerpat.",
    },
    {
      pregunta: "Platí se z náhrady za dovolenou daň?",
      respuesta: "Ano. Náhrada mzdy za dovolenou je příjem ze zaměstnání, platí se z ní pojištění a záloha na daň stejně jako ze mzdy.",
    },
  ],
  glosario: [
    { termino: "Průměrný výdělek", definicion: "Hrubý výdělek za hodinu spočítaný z předchozího kalendářního čtvrtletí." },
    { termino: "Náhrada mzdy", definicion: "Peníze, které zaměstnavatel platí místo mzdy za dobu, kdy nepracujete, například za dovolenou." },
  ],
});
