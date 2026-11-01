import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "si.sp-normiranec",
  h1: "Normiranec {{anio}}: izračun dohodnine za normirani s.p.",
  title: "Normirani s.p. {{anio}}: izračun dohodnine in prispevkov",
  description: "Normirani odhodki {{si.normirani-odhodki-polni[0].tasa}} in dohodnina {{si.dohodnina-normiranci-polni[0].tasa}}. Izračunajte, koliko vam po davku in prispevkih ostane kot normirancu.",
  intro: [
    "Normiranec ne dokazuje dejanskih stroškov: del prihodkov se prizna kot normirani odhodki, od ostanka pa se plača dokončna dohodnina. Pri polni samozaposlitvi je to {{si.normirani-odhodki-polni[0].tasa}} prihodkov do {{si.normirani-odhodki-polni[0].hasta}}.",
    "Od leta 2026 velja stopnja {{si.dohodnina-normiranci-polni[0].tasa}} do davčne osnove {{si.dohodnina-normiranci-polni[0].hasta}} in {{si.dohodnina-normiranci-polni[1].tasa}} nad njo. Pri popoldanskem s.p. je meja {{si.dohodnina-normiranci-popoldan[0].hasta}}.",
  ],
  comoSeCalcula: [
    "Polna samozaposlitev (vsaj devet mesecev neprekinjeno): do {{si.normirani-odhodki-polni[0].hasta}} prihodkov se prizna {{si.normirani-odhodki-polni[0].tasa}}, nad tem zneskom nič več (59. člen ZDoh-2).",
    "Popoldanski s.p.: do {{si.normirani-odhodki-popoldan[0].hasta}} se prizna {{si.normirani-odhodki-popoldan[0].tasa}}, do {{si.normirani-odhodki-popoldan[1].hasta}} {{si.normirani-odhodki-popoldan[1].tasa}}, nad tem zneskom nič.",
    "Prispevki pri polni samozaposlitvi izhajajo iz dobička, znižanega za {{si.znizanje-osnove-sp}}, vendar ne od manj kot {{si.najnizja-osnova}} na mesec. Pri popoldanskem s.p. so upoštevani pavšali za zdravstvo in dolgotrajno oskrbo.",
    "V sistem lahko vstopi, kdor v povprečju dveh prejšnjih let ni presegel {{si.normiranci-limiti[polni]}}, {{si.normiranci-limiti[mesani]}} ali {{si.normiranci-limiti[popoldan]}}, odvisno od zavarovanja (6. člen ZPZR).",
  ],
  ejemplo: [
    "Polna samozaposlitev, prihodki 40.000,00 €: odhodki 32.000,00 €, osnova 8.000,00 €, dohodnina 1.600,00 €. Prispevki od najnižje osnove so 651,04 € na mesec ali 7.812,48 € na leto, ostane 30.587,52 €.",
    "Popoldanski s.p. s prihodki 20.000,00 €: odhodki 10.000,00 € in 3.000,00 €, osnova 7.000,00 €, dohodnina 1.400,00 €.",
  ],
  faq: [
    {
      pregunta: "Kaj prinaša referendum o ZIURS?",
      respuesta: "FURS je 16. oktobra 2026 pojasnil, da zdaj velja ZPZR. ZIURS bi posegel tudi v normirane odhodke, in če začne veljati, bi veljal že od 1. januarja 2026. Glasovanje bo 6. decembra 2026.",
    },
    {
      pregunta: "Ali lahko normiranec uveljavlja olajšave?",
      respuesta: "Ne. Po 60. in 67. členu ZDoh-2 normirani s.p. ne more uveljavljati davčnih olajšav in izgube iz preteklih let. Dohodnina je dokončna.",
    },
    {
      pregunta: "Kaj če prihodki presežejo mejo?",
      respuesta: "Meja za vstop je povprečje dveh let. Če pogojev ne izpolnjujete, morate davčno osnovo ugotavljati po dejanskih prihodkih in odhodkih ter voditi poslovne knjige.",
    },
  ],
  glosario: [
    { termino: "Normirani odhodki", definicion: "Odstotek prihodkov, ki se prizna namesto dejanskih stroškov." },
    { termino: "Popoldanski s.p.", definicion: "Samostojni podjetnik, ki je obvezno zavarovan na drugi podlagi, na primer v službi." },
  ],
});
