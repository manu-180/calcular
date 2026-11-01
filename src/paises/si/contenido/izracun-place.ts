import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "si.izracun-place",
  h1: "Izračun plače {{anio}}: bruto neto kalkulator",
  title: "Izračun plače {{anio}}: bruto neto kalkulator",
  description: "Iz bruto plače do neto zneska: prispevki, OZP {{si.ozp}}, splošna olajšava in akontacija po lestvici. Izračunajte plačo po veljavnih zneskih.",
  intro: [
    "Od bruto plače se najprej odštejejo prispevki delavca, skupaj dobrih 23 odstotkov, in obvezni zdravstveni prispevek {{si.ozp}}. Od ostanka se po odbitku olajšav izračuna akontacija dohodnine. Kar ostane, je neto plača na vašem računu.",
    "Kalkulator računa kot glavni delodajalec: lestvico in olajšave uporabi v eni dvanajstini letnega zneska. Dodate lahko vzdrževane otroke in posebno olajšavo za zaposlene do 29. leta.",
  ],
  comoSeCalcula: [
    "Prispevki: pokojninsko {{si.prispevki-delavec[piz]}}, zdravstveno {{si.prispevki-delavec[zz]}}, dolgotrajna oskrba {{si.prispevki-delavec[do]}}, starševsko varstvo {{si.prispevki-delavec[starsevsko]}} in zaposlovanje {{si.prispevki-delavec[zaposlovanje]}}. Temu se prišteje OZP.",
    "Olajšave: splošna olajšava letno znaša {{si.splosna-olajsava}}, pri letnem dohodku do {{si.dodatna-olajsava-prag}} pa se še poveča. Olajšava za prvega otroka znaša {{si.olajsava-otroci[prvi]}} na leto.",
    "Lestvica: prvi razred je {{si.dohodnina[0].tasa}}, sledijo {{si.dohodnina[1].tasa}}, {{si.dohodnina[2].tasa}}, {{si.dohodnina[3].tasa}} in {{si.dohodnina[4].tasa}}. Meje razredov se pri mesečnem izračunu delijo z 12.",
  ],
  ejemplo: [
    "Bruto plača 2.500,00 € brez otrok: prispevki 577,50 € in OZP 39,36 € dajo skupaj 616,86 €. Olajšava na mesec je 462,66 €, zato je davčna osnova 1.420,48 €. Akontacija znaša 288,31 €, neto plača pa 1.594,83 €.",
    "Z dvema vzdrževanima otrokoma se mesečna olajšava poveča na 983,71 €, akontacija pade na 152,84 €, neto plača pa zraste na 1.730,30 €.",
  ],
  faq: [
    {
      pregunta: "Kaj je OZP in zakaj se odšteje od vsake plače?",
      respuesta: "OZP je obvezni zdravstveni prispevek po 48. členu ZZVZZ. Je pavšalen znesek in trenutno znaša {{si.ozp}} na mesec, ne glede na višino plače. FURS ga šteje med prispevke, ki zmanjšujejo davčno osnovo.",
    },
    {
      pregunta: "Ali je neto plača na koncu leta enaka?",
      respuesta: "Ne nujno. Akontacija je mesečno predplačilo. Dokončno dohodnino FURS odmeri po letu, ko upošteva vse dohodke in olajšave, zato sledi doplačilo ali vračilo.",
    },
    {
      pregunta: "Kaj se zgodi pri plači pod najnižjo osnovo za prispevke?",
      respuesta: "Najnižja osnova je {{si.najnizja-osnova}} (60 odstotkov povprečne plače, 144. člen ZPIZ-2). Delavec plača pokojninski, zdravstveni in prispevek za dolgotrajno oskrbo samo od dejanske plače, od razlike pa jih plača delodajalec.",
    },
    {
      pregunta: "Kako se upošteva olajšava za otroke?",
      respuesta: "Med letom jo uveljavljate z vlogo pri delodajalcu ali na FURS. Vpišite samo otroke, ki jih v akontaciji dejansko uveljavljate. Dokončno se olajšava upošteva pri letni odmeri.",
    },
  ],
  glosario: [
    { termino: "Akontacija dohodnine", definicion: "Predplačilo dohodnine, ki ga delodajalec odtegne pri vsaki plači." },
    { termino: "Glavni delodajalec", definicion: "Delodajalec, pri katerem delavec dosega pretežni del dohodka. Samo ta upošteva olajšave in lestvico." },
    { termino: "Splošna olajšava", definicion: "Znesek, ki vsakemu rezidentu zmanjša letno davčno osnovo." },
  ],
});
