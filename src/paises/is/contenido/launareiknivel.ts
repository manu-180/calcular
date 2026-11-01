import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "is.launareiknivel",
  h1: "Launareiknivél {{anio}}: reiknaðu út launin þín",
  title: "Launareiknivél {{anio}}: útborguð laun og staðgreiðsla",
  description: "Reiknaðu útborguð laun: staðgreiðsla frá {{is.skattthrep-man[0].tasa}} og persónuafsláttur {{is.personuafslattur-man}}. Sláðu inn heildarlaunin.",
  intro: [
    "Af fyrstu {{is.skattthrep-man[0].hasta}} á mánuði eftir iðgjald greiðir þú {{is.skattthrep-man[0].tasa}} í staðgreiðslu og persónuafslátturinn, {{is.personuafslattur-man}}, dregst frá reiknuðum skatti. Sláðu inn heildarlaun og reiknivélin sýnir hvað stendur eftir á launaseðlinum.",
    "Tölurnar gilda frá {{is.skattthrep-man#desde}} og koma úr orðsendingu Skattsins til launagreiðenda. Útsvarið er innifalið: staðgreiðslan miðar við meðalútsvar, {{is.utsvar-stadgreidsla}}, hvar sem þú býrð.",
  ],
  comoSeCalcula: [
    "Fyrst dregst {{is.lifeyrir-launamadur}} iðgjald í lífeyrissjóð frá heildarlaunum, og séreignarsparnaður ef þú greiðir hann (frádráttarbær upp að {{is.sereign-hamark}}). Það sem eftir stendur er skattstofninn.",
    "Skattstofninn fer í þrep: {{is.skattthrep-man[0].tasa}} upp að {{is.skattthrep-man[0].hasta}}, {{is.skattthrep-man[1].tasa}} upp að {{is.skattthrep-man[1].hasta}} og {{is.skattthrep-man[2].tasa}} af því sem er umfram.",
    "Persónuafsláttur dregst frá reiknuðum skatti. Útkoman er staðgreiðslan, og verði afslátturinn hærri en skatturinn er hún núll.",
    "Félagsgjald í stéttarfélag er ekki hluti af skatti. Það fer eftir félagi, svo að þú slærð það inn sjálf(ur) ef þú vilt fá rétta tölu.",
  ],
  ejemplo: [
    "Dæmið úr orðsendingu Skattsins: 600.000 kr. í laun. Iðgjaldið er 24.000 kr. og stofninn 576.000 kr. Skatturinn í þrepum er 186.445 kr., persónuafsláttur 72.492 kr. og staðgreiðslan 113.953 kr. Útborguð laun eru því 462.047 kr., áður en félagsgjald dregst frá.",
  ],
  faq: [
    { pregunta: "Hvað er persónuafslátturinn hár?", respuesta: "Hann er {{is.personuafslattur-man}} á mánuði og {{is.personuafslattur-ars}} á ári, samkvæmt Skattinum. Hann dregst frá reiknuðum skatti, ekki frá laununum." },
    { pregunta: "Hver eru skattþrepin í staðgreiðslu?", respuesta: "Þau eru þrjú: {{is.skattthrep-man[0].tasa}}, {{is.skattthrep-man[1].tasa}} og {{is.skattthrep-man[2].tasa}}. Mörkin eru {{is.skattthrep-man[0].hasta}} og {{is.skattthrep-man[1].hasta}} á mánuði, eftir að iðgjald í lífeyrissjóð hefur verið dregið frá." },
    { pregunta: "Af hverju er sama útsvar í reiknivélinni, hvar sem ég bý?", respuesta: "Staðgreiðslan miðar við meðalútsvar allra sveitarfélaga, {{is.utsvar-stadgreidsla}}. Hún er fyrirframgreiðsla, og munurinn á útsvari þíns sveitarfélags kemur fram við álagningu." },
    { pregunta: "Hvað ef ég er með tvo launagreiðendur?", respuesta: "Skatturinn segir að rétt hlutfall þurfi að nota hjá báðum. Fari laun hjá öðrum yfir {{is.skattthrep-man[0].hasta}} reiknast {{is.skattthrep-man[1].tasa}} af launum hjá hinum. Skrifaðu 0 í nýtingu afsláttar fyrir það starf þar sem þú notar hann ekki." },
  ],
  glosario: [
    { termino: "Staðgreiðsla", definicion: "Skattur og útsvar sem launagreiðandi heldur eftir við hverja útborgun." },
    { termino: "Persónuafsláttur", definicion: "Föst fjárhæð sem dregst frá reiknuðum skatti allra launþega." },
    { termino: "Séreignarsparnaður", definicion: "Viðbótariðgjald sem er þín eign og lækkar skattstofninn." },
  ],
});
