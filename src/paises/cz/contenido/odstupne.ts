import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cz.odstupne",
  h1: "Výpočet odstupného",
  title: "Odstupné 2026: kolik vám náleží podle zákoníku práce",
  description:
    "Spočítejte odstupné při výpovědi z organizačních důvodů nebo po pracovním úrazu: {{cz.odstupne[mene-nez-rok]}} až {{cz.odstupne[dva-a-vice]}} průměrné výdělky podle délky pracovního poměru, při úrazu {{cz.odstupne[uraz]}}.",
  intro: [
    "Odstupné dostanete, když s vámi zaměstnavatel ukončí pracovní poměr výpovědí nebo dohodou z organizačních důvodů. Výše závisí na tom, jak dlouho jste u něj pracovali.",
    "Kalkulačka spočítá zákonné minimum podle § 67 zákoníku práce z vašeho průměrného měsíčního výdělku.",
  ],
  comoSeCalcula: [
    "Při zrušení nebo přemístění zaměstnavatele a při nadbytečnosti náleží {{cz.odstupne[mene-nez-rok]}} průměrný výdělek, když pracovní poměr trval méně než rok, {{cz.odstupne[rok-az-dva]}} výdělky při trvání od roku do dvou let a {{cz.odstupne[dva-a-vice]}} výdělky od dvou let.",
    "Když nesmíte dál pracovat kvůli pracovnímu úrazu nebo nemoci z povolání, náleží {{cz.odstupne[uraz]}} průměrných výdělků.",
    "Do délky trvání se započítává i předchozí pracovní poměr u stejného zaměstnavatele, pokud mezi nimi neuplynulo víc než 6 měsíců.",
  ],
  ejemplo: ["S průměrným měsíčním výdělkem 45 000 Kč a pracovním poměrem delším než dva roky máte nárok na odstupné 135 000 Kč."],
  faq: [
    {
      pregunta: "Kdy mám nárok na odstupné?",
      respuesta: "Při výpovědi nebo dohodě z organizačních důvodů (zrušení, přemístění zaměstnavatele, nadbytečnost) a při skončení kvůli pracovnímu úrazu nebo nemoci z povolání. Při výpovědi, kterou dáte sami, nárok nemáte.",
    },
    {
      pregunta: "Kdy se odstupné vyplácí?",
      respuesta: "Po skončení pracovního poměru v nejbližším výplatním termínu, pokud se se zaměstnavatelem písemně nedohodnete na jiném dni.",
    },
    {
      pregunta: "Daní se odstupné?",
      respuesta: "Ano, odstupné je příjem ze závislé činnosti a platí se z něj daň. Sociální pojištění se z něj neplatí.",
    },
  ],
  glosario: [
    { termino: "Průměrný měsíční výdělek", definicion: "Průměrný hodinový výdělek z předchozího čtvrtletí přepočtený na měsíc." },
    { termino: "Organizační důvody", definicion: "Výpovědní důvody podle § 52 písm. a) až c) zákoníku práce." },
  ],
});
