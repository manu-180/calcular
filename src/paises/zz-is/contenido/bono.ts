import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "zz-is.bono",
  h1: "Reiknivél fyrir hálfsárskaupauka í Zetalandi",
  title: "Hálfsárskaupauki í Zetalandi: hvað þú færð",
  description: "Reiknaðu hálfsárskaupaukann með lágmarkslaunum á þínu svæði og viðbótinni {{zz.bonificacion}}, með opinberum gildum, dagsetningu og heimild.",
  intro: [
    "Hálfsárskaupauki er aukagreiðsla sem vinnuveitandi greiðir tvisvar á ári.",
    "Ef þú vannst allt hálfa árið færðu ein mánaðarlaun og viðbótina {{zz.bonificacion}}.",
  ],
  comoSeCalcula: [
    "Útreikningurinn byggist á heildarlaunum á mánuði. Ef þau eru lægri en lágmarkslaun á þínu svæði er miðað við lágmarkslaunin.",
    "Launin eru margfölduð með fjölda mánaða sem þú vannst og deilt í með sex.",
    "Hjá litlum fyrirtækjum er kaupaukinn helmingi lægri.",
    "Við kaupaukann bætist viðbótin {{zz.bonificacion}}.",
  ],
  faq: [
    { pregunta: "Hver eru lágmarkslaunin á Norðursvæði?", respuesta: "{{zz.minimo@norte}}. Gildistaka: {{zz.minimo@norte#desde}}." },
    { pregunta: "Hvað ef þú vannst ekki alla sex mánuði hálfa ársins?", respuesta: "Þú færð hlutfallslegan hluta, eftir fjölda mánaða sem þú vannst." },
    { pregunta: "Er viðbótin alltaf greidd?", respuesta: "Já. Hún nemur {{zz.bonificacion}} af kaupaukanum og fyrirtækið greiðir hana með honum." },
  ],
  glosario: [
    { termino: "Hálfsárskaupauki", definicion: "Aukagreiðsla sem lög kveða á um í júlí og desember." },
    { termino: "Lágmarkslaun", definicion: "Lægsta greiðsla fyrir fullt starf á hverju svæði." },
  ],
});
