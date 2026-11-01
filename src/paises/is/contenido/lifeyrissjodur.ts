import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "is.lifeyrissjodur",
  h1: "Lífeyrissjóður {{anio}}: iðgjald og mótframlag",
  title: "Lífeyrissjóður {{anio}}: iðgjald og séreign reiknuð",
  description: "Reiknaðu iðgjald í lífeyrissjóð: {{is.lifeyrir-launamadur}} frá þér, {{is.lifeyrir-motframlag}} mótframlag og séreign upp að {{is.sereign-hamark}}.",
  intro: [
    "Af heildarlaunum greiðir þú {{is.lifeyrir-launamadur}} í lífeyrissjóð og launagreiðandi {{is.lifeyrir-motframlag}} á móti. Samanlagt fara því 15,5% af laununum í lögbundið iðgjald, samkvæmt tölum Skattsins fyrir launagreiðendur.",
    "Ofan á það getur þú greitt allt að {{is.sereign-hamark}} í séreignarsparnað, og sá hluti er líka frádráttarbær frá skattstofni. Tölurnar gilda frá {{is.lifeyrir-launamadur#desde}}.",
  ],
  comoSeCalcula: [
    "Iðgjald launamanns og mótframlag launagreiðanda reiknast bæði af heildarlaunum.",
    "Séreign og mótframlag í séreign eru valfrjálsar tölur: mótframlagið kemur úr kjarasamningi eða ráðningarsamningi, og þú slærð það inn sjálf(ur).",
    "Árleg upphæð er mánaðarupphæðin margfölduð með tólf, miðað við jöfn laun allt árið.",
  ],
  ejemplo: [
    "Af 600.000 kr. launum eru 24.000 kr. iðgjald launamanns og 69.000 kr. mótframlag, samtals 93.000 kr. Með 2% séreign á hvorn veg bætast 24.000 kr. við, eða 117.000 kr. á mánuði og 1.404.000 kr. á ári.",
  ],
  faq: [
    { pregunta: "Greiða allir í lífeyrissjóð?", respuesta: "Samkvæmt leiðbeiningum Skattsins greiðir launþegi sem er 70 ára eða eldri hvorki iðgjald né mótframlag, og börn 15 ára og yngri greiða ekki í lífeyrissjóð." },
    { pregunta: "Lækkar séreignarsparnaður skattinn?", respuesta: "Já. Allt að {{is.sereign-hamark}} af iðgjaldsstofni er frádráttarbært, ofan á {{is.lifeyrir-launamadur}} lögbundið iðgjald, ef greitt er reglulega til viðurkennds aðila." },
    { pregunta: "Er mótframlagið alltaf það sama?", respuesta: "Skilagrein Skattsins reiknar {{is.lifeyrir-motframlag}} á móti {{is.lifeyrir-launamadur}} iðgjaldi, en breyta má því ef greiðslur eru aðrar." },
  ],
  glosario: [
    { termino: "Iðgjald", definicion: "Greiðsla launamanns í lífeyrissjóð." },
    { termino: "Séreignarsparnaður", definicion: "Viðbótarsparnaður sem er þín eign." },
  ],
});
