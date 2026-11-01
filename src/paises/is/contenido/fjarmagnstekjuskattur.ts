import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "is.fjarmagnstekjuskattur",
  h1: "Fjármagnstekjuskattur {{anio}}: skattur af vöxtum og arði",
  title: "Fjármagnstekjuskattur {{anio}}: {{is.fjarmagnstekjuskattur}} af tekjum",
  description: "Skatturinn er {{is.fjarmagnstekjuskattur}} og frítekjumarkið {{is.fjarmagn-fritekjumark[einstaklingur]}}. Reiknaðu skatt af vöxtum, arði og söluhagnaði.",
  intro: [
    "Fjármagnstekjuskattur er {{is.fjarmagnstekjuskattur}}, og frítekjumark einstaklings er {{is.fjarmagn-fritekjumark[einstaklingur]}} ({{is.fjarmagn-fritekjumark[hjon]}} hjá hjónum). Það á við um vaxtatekjur, arð og söluhagnað af skráðum hlutabréfum.",
    "Skiptu tekjunum í tvennt: þær sem frítekjumarkið nær til og aðrar. Tölurnar gilda frá {{is.fjarmagnstekjuskattur#desde}}, samkvæmt helstu tölum Skattsins.",
  ],
  comoSeCalcula: [
    "Frítekjumarkið dregst frá vaxtatekjum, arði og söluhagnaði af skráðum hlutabréfum, aldrei niður fyrir núll.",
    "Aðrar fjármagnstekjur leggjast við án frádráttar.",
    "Stofninn er margfaldaður með {{is.fjarmagnstekjuskattur}}. Af leigu gilda aðrar reglur: sjáðu reiknivélina fyrir leigutekjur.",
  ],
  ejemplo: [
    "Einstaklingur með 500.000 kr. í vaxtatekjur greiðir af 200.000 kr. eftir frítekjumark, sem gerir 44.000 kr. í skatt. Eftir standa 456.000 kr.",
  ],
  faq: [
    { pregunta: "Gildir frítekjumarkið um börn?", respuesta: "Samkvæmt forsendum álagningar gildir sama frítekjumark um vexti og skráð hlutabréf við sérsköttun barna. Leigutekjur af íbúðarhúsnæði hafa hins vegar eigin reglu, og þær reiknar þú í sérstakri reiknivél." },
    { pregunta: "Hvaða tekjur falla undir frítekjumarkið?", respuesta: "Samkvæmt Skattinum vaxtatekjur, arður og söluhagnaður af skráðum hlutabréfum, upp að {{is.fjarmagn-fritekjumark[einstaklingur]}} á mann." },
    { pregunta: "Hvað er frítekjumark hjóna?", respuesta: "{{is.fjarmagn-fritekjumark[hjon]}} hjá samsköttuðum, samanlagt tvöfalt frítekjumark einstaklings." },
    { pregunta: "Er skatturinn dreginn af við útborgun?", respuesta: "Af arði og vöxtum er staðgreiðsla {{is.fjarmagnstekjuskattur}} samkvæmt forsendum álagningar. Munurinn gerist upp við álagningu, þar á meðal frítekjumarkið." },
  ],
  glosario: [
    { termino: "Fjármagnstekjur", definicion: "Tekjur af eignum, til dæmis vextir, arður, leiga og söluhagnaður." },
    { termino: "Frítekjumark", definicion: "Fjárhæð sem ekki er greiddur skattur af." },
  ],
});
