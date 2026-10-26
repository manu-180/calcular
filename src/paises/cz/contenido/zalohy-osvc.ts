import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cz.zalohy-osvc",
  h1: "Zálohy OSVČ na sociální a zdravotní pojištění",
  title: "Zálohy OSVČ 2026: sociální a zdravotní pojištění",
  description:
    "Spočítejte měsíční zálohy OSVČ na sociální a zdravotní pojištění z příjmů a výdajů za minulý rok. Minimální záloha {{cz.osvc-min-zaloha-socialni[hlavni]}} a {{cz.osvc-min-zaloha-zdravotni}}.",
  intro: [
    "Podnikatel v běžném režimu platí každý měsíc zálohy na sociální pojištění správě sociálního zabezpečení a na zdravotní pojištění své pojišťovně. Jejich výši určí přehledy za minulý rok.",
    "Kalkulačka spočítá nové zálohy ze základu daně za minulý rok a pohlídá minimální i maximální částky.",
  ],
  comoSeCalcula: [
    "Základ daně jsou příjmy minus výdaje. Vydělí se počtem měsíců podnikání.",
    "Sociální pojištění: měsíční vyměřovací základ je {{cz.osvc-podil-zakladu[socialni]}} průměrného měsíčního základu daně, záloha {{cz.osvc-socialni-sazba}} z něj. Při hlavní činnosti je minimální záloha {{cz.osvc-min-zaloha-socialni[hlavni]}}, při vedlejší {{cz.osvc-min-zaloha-socialni[vedlejsi]}}.",
    "Zdravotní pojištění: vyměřovací základ je {{cz.osvc-podil-zakladu[zdravotni]}} průměrného měsíčního základu daně, záloha {{cz.zdravotni-pojisteni}} z něj, při hlavní činnosti nejméně {{cz.osvc-min-zaloha-zdravotni}}.",
    "Vyměřovací základy i zálohy se zaokrouhlují na koruny nahoru.",
  ],
  ejemplo: [
    "Při příjmech 1 000 000 Kč a výdajích 600 000 Kč je základ daně 400 000 Kč. Záloha na sociální pojištění vyjde 5 354 Kč a na zdravotní 3 306 Kč (minimum).",
  ],
  faq: [
    {
      pregunta: "Jaká je minimální záloha na sociální pojištění v roce 2026?",
      respuesta: "Od července 2026 {{cz.osvc-min-zaloha-socialni[hlavni]}} při hlavní činnosti a {{cz.osvc-min-zaloha-socialni[vedlejsi]}} při vedlejší. Od ledna do června 2026 byla minimální záloha při hlavní činnosti 5 720 Kč, přeplatek se vrací nebo započte.",
    },
    {
      pregunta: "Jaká je minimální záloha na zdravotní pojištění v roce 2026?",
      respuesta: "{{cz.osvc-min-zaloha-zdravotni}} měsíčně při hlavní činnosti. Při vedlejší činnosti měsíční zálohy platit nemusíte.",
    },
    {
      pregunta: "Musím platit sociální pojištění při vedlejší činnosti?",
      respuesta: "Jen pokud základ daně za rok dosáhne rozhodné částky {{cz.osvc-rozhodna-castka}}. Pod ní se sociální pojištění neplatí.",
    },
    {
      pregunta: "Kdy se zálohy platí?",
      respuesta: "Záloha na sociální pojištění je splatná do konce kalendářního měsíce, za který se platí. Záloha na zdravotní pojištění do 8. dne následujícího měsíce.",
    },
  ],
  glosario: [
    { termino: "Přehled o příjmech a výdajích", definicion: "Roční hlášení OSVČ pro ČSSZ a zdravotní pojišťovnu, ze kterého se počítá pojistné a nové zálohy." },
    { termino: "Hlavní a vedlejší činnost", definicion: "Vedlejší je podnikání vedle zaměstnání, studia, rodičovské nebo důchodu. Jinak jde o hlavní činnost." },
  ],
});
