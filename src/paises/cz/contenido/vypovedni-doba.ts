import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cz.vypovedni-doba",
  h1: "Výpočet výpovědní doby",
  title: "Výpovědní doba 2026: kdy skončí pracovní poměr",
  description:
    "Zjistěte, kdy skončí výpovědní doba a pracovní poměr. Od 1. 6. 2025 běží výpovědní doba ode dne doručení výpovědi, kalkulačka zná i dřívější pravidla.",
  intro: [
    "Po doručení výpovědi pracovní poměr nekončí hned, ale až uplynutím výpovědní doby. Zákonná výpovědní doba je nejméně {{cz.vypovedni-doba}}, smlouva ji může prodloužit.",
    "Kalkulačka spočítá poslední den pracovního poměru podle dne, kdy vám výpověď přišla, nebo kdy jste ji doručili zaměstnavateli.",
  ],
  comoSeCalcula: [
    "U výpovědí doručených od 1. června 2025 začíná výpovědní doba dnem doručení a končí dnem se stejným číslem v posledním měsíci. Výpověď doručená 5. července tak při dvou měsících skončí 5. září.",
    "Pokud den se stejným číslem v posledním měsíci není (například 31. února), výpovědní doba skončí posledním dnem měsíce.",
    "U výpovědí doručených do 31. května 2025 začínala výpovědní doba prvním dnem následujícího měsíce a končila posledním dnem posledního měsíce.",
  ],
  ejemplo: ["Výpověď doručená 31. prosince 2025 s dvouměsíční výpovědní dobou skončí 28. února 2026."],
  faq: [
    {
      pregunta: "Jak dlouhá je výpovědní doba?",
      respuesta: "Nejméně {{cz.vypovedni-doba}}, a to pro zaměstnance i zaměstnavatele. Delší výpovědní dobu lze sjednat písemně, ale musí být stejná pro obě strany.",
    },
    {
      pregunta: "Odkdy běží výpovědní doba?",
      respuesta: "Ode dne, kdy byla výpověď doručena druhé straně. Tak to platí pro výpovědi doručené od 1. června 2025.",
    },
    {
      pregunta: "Může být výpovědní doba kratší než dva měsíce?",
      respuesta: "Jen u výpovědi od zaměstnavatele z důvodů podle § 52 písm. f) až h) zákoníku práce, například pro neuspokojivé pracovní výsledky. Tam je výpovědní doba nejméně 1 měsíc.",
    },
    {
      pregunta: "Prodlužuje se výpovědní doba při nemoci?",
      respuesta: "Pokud vám dal výpověď zaměstnavatel a výpovědní doba by skončila během pracovní neschopnosti, tato ochranná doba se do ní nezapočítává. Pracovní poměr skončí až po uplynutí zbývající části výpovědní doby. Kalkulačka s tím nepočítá.",
    },
  ],
  glosario: [
    { termino: "Výpovědní doba", definicion: "Doba mezi doručením výpovědi a skončením pracovního poměru." },
    { termino: "Doručení", definicion: "Den, kdy výpověď převezme druhá strana, nebo kdy se za doručenou považuje." },
  ],
});
