import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "fi.kotitalousvahennys-laskuri",
  h1: "Kotitalousvähennyslaskuri: paljonko saat vähennystä",
  title: "Kotitalousvähennys {{anio}}: laske remontin vähennys",
  description:
    "Laske kotitalousvähennys: {{fi.kotitalousvahennys-prosentit[yritys]}} yritykseltä ostetun työn osuudesta, omavastuu {{fi.kotitalousvahennys[omavastuu]}} ja enintään {{fi.kotitalousvahennys[enimmais]}} henkilöä kohden.",
  intro: [
    "Kotitalousvähennyksen saat esimerkiksi kodin kunnossapito- ja perusparannustöistä sekä kotitalous-, hoiva- ja hoitotyöstä. Vähennys tehdään suoraan veroistasi.",
    "Vähennys nousi vuoden 2026 alusta, ja korotus on voimassa vuosina 2026 ja 2027.",
  ],
  comoSeCalcula: [
    "Kun ostat työn yritykseltä, vähennys on {{fi.kotitalousvahennys-prosentit[yritys]}} laskun työn osuudesta arvonlisäveroineen.",
    "Kun palkkaat työntekijän itse, vähennys on {{fi.kotitalousvahennys-prosentit[palkka]}} palkasta. Lisäksi saat vähentää maksamasi työnantajan sivukulut.",
    "Summasta vähennetään omavastuu {{fi.kotitalousvahennys[omavastuu]}}. Vähennys on enintään {{fi.kotitalousvahennys[enimmais]}} henkilöä kohden vuodessa.",
    "Jos vähennys ylittää enimmäismäärän, ylittävä osa siirtyy puolisolle. Myös puoliso maksaa silloin oman omavastuunsa.",
  ],
  ejemplo: [
    "Kylpyhuoneremontin työn osuus on 8 000 euroa. Vähennys olisi 3 050 euroa, mutta enimmäismäärä on 2 100 euroa.",
    "Puoliso saa ylittävästä osasta vähennyksen 3 050 − 2 100 − 150 eli 800 euroa.",
  ],
  faq: [
    {
      pregunta: "Paljonko kotitalousvähennys on vuonna 2026?",
      respuesta: "Yritykseltä ostetusta työstä {{fi.kotitalousvahennys-prosentit[yritys]}} ja palkatun työntekijän palkasta {{fi.kotitalousvahennys-prosentit[palkka]}}. Enimmäismäärä on {{fi.kotitalousvahennys[enimmais]}} ja omavastuu {{fi.kotitalousvahennys[omavastuu]}} henkilöä kohden.",
    },
    {
      pregunta: "Lasketaanko vähennys alvillisesta summasta?",
      respuesta: "Lasketaan. Vähennys lasketaan laskun työn osuudesta arvonlisäveroineen.",
    },
    {
      pregunta: "Miten saan vähennyksen heti käyttöön?",
      respuesta: "Tee OmaVerossa uusi verokortti, niin vähennys pienentää veroprosenttiasi jo tänä vuonna. Muuten saat sen verotuksessa, kun täydennät esitäytetyn veroilmoituksen.",
    },
    {
      pregunta: "Pitääkö omavastuu maksaa jokaisesta laskusta?",
      respuesta: "Ei. Omavastuu vähennetään vain kerran vuodessa, vaikka teettäisit useita töitä.",
    },
  ],
  glosario: [
    { termino: "Omavastuu", definicion: "Summa, jonka verran vähennystä ei saa. Se vähennetään kerran vuodessa henkilöä kohden." },
    { termino: "Työn osuus", definicion: "Laskun osa, joka on maksua tehdystä työstä." },
  ],
});
