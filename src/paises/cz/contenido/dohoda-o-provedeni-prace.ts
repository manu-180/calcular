import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cz.dohoda-o-provedeni-prace",
  h1: "Dohoda o provedení práce: výpočet čisté odměny",
  title: "DPP {{anio}}: kalkulačka čisté odměny a daně",
  description:
    "Spočítejte čistou odměnu z dohody o provedení práce v roce {{anio}}: srážková daň, záloha na daň, pojištění od {{cz.rozhodny-prijem-dpp}} měsíčně a náklady zaměstnavatele.",
  intro: [
    "Z dohody o provedení práce (DPP) se platí daň a od určité výše i sociální a zdravotní pojištění. Kalkulačka ukáže, kolik dostanete na ruku a kolik vás dohoda stojí jako zaměstnavatele.",
    "Výsledek záleží hlavně na tom, jestli máte u zaměstnavatele podepsané prohlášení poplatníka a jestli odměna za měsíc dosáhne rozhodného příjmu {{cz.rozhodny-prijem-dpp}}.",
  ],
  comoSeCalcula: [
    "Odměna nižší než {{cz.rozhodny-prijem-dpp}} za měsíc: pojištění se neplatí. Bez prohlášení se srazí daň {{cz.srazkova-dan}} a je konečná.",
    "Odměna {{cz.rozhodny-prijem-dpp}} a vyšší: platí se sociální pojištění {{cz.socialni-zamestnanec}} a zdravotní pojištění (třetina z {{cz.zdravotni-pojisteni}}) a z odměny se strhává záloha na daň.",
    "S podepsaným prohlášením se záloha sníží o měsíční slevu na poplatníka, tedy dvanáctinu z {{cz.sleva-na-poplatnika}}.",
  ],
  ejemplo: [
    "Za odměnu 10 000 Kč bez prohlášení dostanete 8 500 Kč, protože se srazí daň 1 500 Kč. S prohlášením dostanete celých 10 000 Kč.",
  ],
  faq: [
    {
      pregunta: "Jaký je limit DPP v roce 2026?",
      respuesta: "Pojištění se platí, když odměna z dohody u jednoho zaměstnavatele dosáhne za měsíc {{cz.rozhodny-prijem-dpp}}. Rozsah práce na DPP je nejvýše 300 hodin za kalendářní rok u jednoho zaměstnavatele.",
    },
    {
      pregunta: "Vyplatí se podepsat prohlášení k DPP?",
      respuesta: "Pokud nemáte prohlášení podepsané u jiného zaměstnavatele, obvykle ano. Do odměny {{cz.rozhodny-prijem-dpp}} pak díky slevě na poplatníka daň neplatíte vůbec.",
    },
    {
      pregunta: "Musím srážkovou daň uvádět v daňovém přiznání?",
      respuesta: "Nemusíte, srážková daň je konečná. Můžete ji ale do přiznání zahrnout a započíst, například když jste v roce neuplatnili slevu na poplatníka.",
    },
  ],
  glosario: [
    { termino: "DPP", definicion: "Dohoda o provedení práce, pracovní vztah na menší rozsah práce mimo pracovní poměr." },
    { termino: "Srážková daň", definicion: "Daň, kterou zaměstnavatel srazí z odměny a tím je daňová povinnost splněna." },
    { termino: "Rozhodný příjem", definicion: "Měsíční odměna, od které se z dohody platí pojištění." },
  ],
});
