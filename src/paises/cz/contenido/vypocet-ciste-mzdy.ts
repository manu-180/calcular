import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cz.vypocet-ciste-mzdy",
  h1: "Výpočet čisté mzdy 2026",
  title: "Výpočet čisté mzdy 2026: kalkulačka z hrubé mzdy",
  description:
    "Spočítejte si čistou mzdu z hrubé: sociální a zdravotní pojištění, záloha na daň 15 % a 23 %, sleva na poplatníka a zvýhodnění na děti pro rok 2026.",
  intro: [
    "Kalkulačka spočítá, kolik vám z hrubé mzdy zůstane na účtu. Odečte sociální a zdravotní pojištění a zálohu na daň a připočte slevy, na které máte nárok.",
    "Počítá s pravidly pro rok 2026, s minimální mzdou {{cz.minimalni-mzda}} a průměrnou mzdou {{cz.prumerna-mzda}}. Superhrubá mzda už se nepoužívá, daň se počítá přímo z hrubé mzdy.",
  ],
  comoSeCalcula: [
    "Sociální pojištění zaměstnance je {{cz.socialni-zamestnanec}} z hrubé mzdy, zaokrouhleno na koruny nahoru.",
    "Zdravotní pojištění je {{cz.zdravotni-pojisteni}} z hrubé mzdy. Zaměstnanec z něj platí třetinu, tedy 4,5 % hrubé mzdy, zbytek doplácí zaměstnavatel.",
    "Záloha na daň se počítá z hrubé mzdy zaokrouhlené na stokoruny nahoru: {{cz.dan-z-prijmu[0].tasa}} do trojnásobku průměrné mzdy a {{cz.dan-z-prijmu[-1].tasa}} z části nad ním.",
    "S podepsaným prohlášením se záloha sníží o slevu na poplatníka (dvanáctina z {{cz.sleva-na-poplatnika}} ročně) a o zvýhodnění na děti.",
    "Když je zvýhodnění na děti vyšší než záloha, rozdíl dostanete jako daňový bonus, pokud je aspoň {{cz.danovy-bonus-minimum}} a mzda dosahuje poloviny minimální mzdy.",
  ],
  ejemplo: [
    "Při hrubé mzdě 45 000 Kč zaplatíte 3 195 Kč na sociálním a 2 025 Kč na zdravotním pojištění. Záloha na daň je 6 750 Kč, po slevě na poplatníka 4 180 Kč. Čistá mzda vychází 35 600 Kč.",
  ],
  faq: [
    {
      pregunta: "Kolik je čistá mzda z 45 000 Kč hrubého?",
      respuesta: "S podepsaným prohlášením a bez dětí 35 600 Kč. Pro jinou mzdu a počet dětí zadejte vlastní údaje do kalkulačky.",
    },
    {
      pregunta: "Jaká je sleva na poplatníka v roce 2026?",
      respuesta: "Základní sleva na poplatníka činí {{cz.sleva-na-poplatnika}} ročně. Zaměstnavatel ji odečítá každý měsíc po dvanáctinách, pokud u něj máte podepsané prohlášení.",
    },
    {
      pregunta: "Kolik je zvýhodnění na děti?",
      respuesta: "Na první dítě {{cz.zvyhodneni-na-deti[prvni]}} ročně, na druhé {{cz.zvyhodneni-na-deti[druhe]}} a na třetí a každé další {{cz.zvyhodneni-na-deti[treti]}}. Uplatní ho vždy jen jeden z rodičů.",
    },
    {
      pregunta: "Kdy se platí daň 23 %?",
      respuesta: "Z části příjmu nad 36násobkem průměrné mzdy za rok, tedy nad {{cz.dan-z-prijmu[1].desde}}. U měsíčních záloh platí hranice trojnásobku průměrné mzdy.",
    },
    {
      pregunta: "Existuje ještě superhrubá mzda?",
      respuesta: "Ne. Superhrubá mzda byla zrušena v roce 2021 a daň se od té doby počítá z hrubé mzdy.",
    },
  ],
  glosario: [
    { termino: "Hrubá mzda", definicion: "Mzda podle smlouvy před odečtením pojištění a daně." },
    { termino: "Čistá mzda", definicion: "Částka, kterou vám zaměstnavatel pošle na účet." },
    { termino: "Prohlášení poplatníka", definicion: "Tiskopis, kterým u jednoho zaměstnavatele uplatňujete měsíční slevy na dani." },
    { termino: "Daňový bonus", definicion: "Část zvýhodnění na děti, která se nevejde do daně a vyplácí se navíc ke mzdě." },
  ],
});
