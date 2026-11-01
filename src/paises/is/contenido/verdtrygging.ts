import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "is.verdtrygging",
  h1: "Verðtrygging: reiknaðu upphæð með vísitölu {{anio}}",
  title: "Verðtrygging {{anio}}: uppreiknaðu með vísitölu Hagstofu",
  description: "Reiknaðu verðbætur með vísitölu til verðtryggingar. Núgildandi gildi er {{is.verdtrygging}}. Veldu grunnmánuð og sjáðu uppreiknaða upphæð.",
  intro: [
    "Vísitala til verðtryggingar er {{is.verdtrygging}} frá {{is.verdtrygging#desde}}. Hún kemur beint úr töflu Hagstofunnar og er sú vísitala sem verðtryggð lán eru reiknuð eftir.",
    "Veldu mánuð grunnvísitölu, til dæmis mánuðinn sem lánið var tekið, og mánuðinn sem þú vilt uppreikna til. Taflan nær til janúar 2016.",
  ],
  comoSeCalcula: [
    "Upphæðin er margfölduð með nýju vísitölunni og deilt með grunnvísitölunni.",
    "Verðbæturnar eru mismunurinn á uppreiknaðri upphæð og upphæðinni sem þú byrjaðir með.",
    "Greiðslur, vextir og lánskjör koma ekki inn í þetta: útreikningurinn sýnir aðeins hækkun vegna vísitölu.",
  ],
  ejemplo: [
    "Eftirstöðvar upp á 30.000.000 kr. með grunnvísitölu 658,2 í janúar 2026 verða 31.782.133 kr. við vísitöluna 697,3 í nóvember 2026. Verðbæturnar eru 1.782.133 kr.",
  ],
  faq: [
    { pregunta: "Af hverju er vísitala til verðtryggingar önnur en vísitala neysluverðs mánaðarins?", respuesta: "Í töflum Hagstofunnar birtist sama vísitölugildi tveimur mánuðum síðar sem vísitala til verðtryggingar. Til dæmis er gildi október 2026, 700,4, skráð fyrir desember 2026." },
    { pregunta: "Hverjir eru vextir verðtryggðra útlána núna?", respuesta: "{{is.vextir-peningakrofur[verdtryggd]}} samkvæmt tilkynningu Seðlabankans nr. 10/2026. Lánið þitt getur borið aðra vexti." },
    { pregunta: "Er þetta nákvæm staða á láninu mínu?", respuesta: "Nei. Lánveitandi reiknar stöðuna með greiðslum og vöxtum. Hér sérðu aðeins áhrif vísitölunnar." },
  ],
  glosario: [
    { termino: "Grunnvísitala", definicion: "Vísitalan í upphafi, oftast þegar lán var veitt." },
    { termino: "Verðbætur", definicion: "Hækkun á höfuðstól vegna breytingar á vísitölu." },
  ],
});
