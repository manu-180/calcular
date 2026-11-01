import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "is.barnabaetur",
  h1: "Barnabætur {{anio}}: hvað færð þú?",
  title: "Barnabætur {{anio}}: reiknaðu bæturnar eftir tekjum",
  description: "Barnabætur eru {{is.barnabaetur[hjon]}} með barni hjá hjónum og {{is.barnabaetur[einstaett]}} hjá einstæðu foreldri. Reiknaðu skerðingu eftir tekjum.",
  intro: [
    "Barnabætur eru {{is.barnabaetur[einstaett]}} með hverju barni hjá einstæðu foreldri og {{is.barnabaetur[hjon]}} hjá hjónum og sambýlisfólki. Með barni yngra en 7 ára bætast {{is.barnabaetur-vidbot}} við. Fjárhæðirnar gilda frá {{is.barnabaetur#desde}}.",
    "Bæturnar skerðast um {{is.barnabaetur-skerding}} af tekjum umfram {{is.barnabaetur-skerdingarmork[einstaett]}} hjá einstæðu foreldri og {{is.barnabaetur-skerdingarmork[hjon]}} hjá hjónum. Miðað er við tekjur síðasta árs.",
  ],
  comoSeCalcula: [
    "Grunnbætur eru fjöldi barna margfaldaður með fjárhæð á barn. Þær skerðast um {{is.barnabaetur-skerding}} af tekjum umfram mörkin, óháð fjölda barna.",
    "Viðbótin vegna barna yngri en 7 ára er reiknuð sér. Skerðingin þar er {{is.barnabaetur-skerding}} á hvert slíkt barn, það er 8% með tvö og 12% með þrjú.",
    "Hjá hjónum og sambýlisfólki eru tekjur lagðar saman og bótunum skipt jafnt.",
  ],
  ejemplo: [
    "Einstætt foreldri með 6.000.000 kr. í tekjur og tvö börn, annað yngra en 7 ára: 156.000 kr. eru yfir mörkum. Grunnbætur 1.029.000 kr. skerðast um 6.240 kr. og viðbótin 130.000 kr. um 6.240 kr. Samtals 1.146.520 kr. á ári.",
  ],
  faq: [
    { pregunta: "Hvenær eru barnabætur greiddar?", respuesta: "Fyrirframgreiðsla er 1. febrúar og 1. maí, og ákvarðaðar bætur 1. júní og 1. október, samkvæmt Skattinum." },
    { pregunta: "Af hvaða tekjum er miðað?", respuesta: "Af tekjum síðasta árs. Bæturnar eru reiknaðar út frá skattframtali og leiðréttar við álagningu." },
    { pregunta: "Hvernig skiptast bæturnar hjá hjónum?", respuesta: "Tekjur beggja eru lagðar saman við útreikninginn og bótunum er skipt jafnt á milli þeirra." },
  ],
  glosario: [
    { termino: "Skerðingarmörk", definicion: "Tekjur sem bætur skerðast ekki af." },
    { termino: "Viðbót", definicion: "Aukagreiðsla með barni yngra en 7 ára." },
  ],
});
