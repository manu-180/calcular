import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cz.naklady-zamestnavatele",
  h1: "Náklady zaměstnavatele na zaměstnance",
  title: "Kolik stojí zaměstnanec: náklady zaměstnavatele 2026",
  description:
    "Spočítejte, kolik zaměstnavatele stojí hrubá mzda: sociální pojištění {{cz.socialni-zamestnavatel}}, zdravotní pojištění a celková cena práce za měsíc i za rok.",
  intro: [
    "Zaměstnavatel platí kromě hrubé mzdy ještě sociální a zdravotní pojištění. Kalkulačka ukáže, kolik vás zaměstnanec stojí celkem za měsíc a za rok.",
    "Dříve se této částce říkalo superhrubá mzda. Pro daň se už nepoužívá, ale pořád dobře vyjadřuje skutečnou cenu práce.",
  ],
  comoSeCalcula: [
    "Sociální pojištění zaměstnavatele je {{cz.socialni-zamestnavatel}} z hrubé mzdy, zaokrouhleno na koruny nahoru.",
    "Zdravotní pojištění je {{cz.zdravotni-pojisteni}} z hrubé mzdy. Zaměstnavatel platí dvě třetiny, tedy 9 % hrubé mzdy.",
    "Celkové náklady jsou hrubá mzda plus obě pojištění zaměstnavatele.",
  ],
  ejemplo: ["Hrubá mzda 45 000 Kč stojí zaměstnavatele 60 210 Kč: ke mzdě přidá 11 160 Kč na sociálním a 4 050 Kč na zdravotním pojištění."],
  faq: [
    {
      pregunta: "Kolik stojí zaměstnavatele mzda 45 000 Kč?",
      respuesta: "60 210 Kč měsíčně a 722 520 Kč za rok. Zaměstnanec z toho dostane čistých 35 600 Kč, pokud má podepsané prohlášení a neuplatňuje děti.",
    },
    {
      pregunta: "Kolik procent platí zaměstnavatel za zaměstnance?",
      respuesta: "Na sociální pojištění {{cz.socialni-zamestnavatel}} a na zdravotní pojištění dvě třetiny z {{cz.zdravotni-pojisteni}}, tedy 9 % hrubé mzdy.",
    },
    {
      pregunta: "Existuje ještě superhrubá mzda?",
      respuesta: "Jako základ daně ne, zrušila se v roce 2021. Daň se počítá z hrubé mzdy. Pojem se ale dál používá pro celkové náklady zaměstnavatele.",
    },
  ],
  glosario: [
    { termino: "Cena práce", definicion: "Hrubá mzda a pojištění, které za zaměstnance platí zaměstnavatel." },
    { termino: "Vyměřovací základ", definicion: "Částka, ze které se počítá pojistné. U zaměstnance je to hrubá mzda." },
  ],
});
