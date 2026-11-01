import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "is.ellilifeyrir",
  h1: "Ellilífeyrir {{anio}}: reiknaðu greiðslu frá TR",
  title: "Ellilífeyrir {{anio}}: greiðsla og skerðing vegna tekna",
  description: "Fullur ellilífeyrir er {{is.ellilifeyrir}} á mánuði og skerðist um {{is.elli-skerding}} af tekjum umfram frítekjumörk. Reiknaðu greiðsluna frá TR.",
  intro: [
    "Fullur ellilífeyrir er {{is.ellilifeyrir}} á mánuði fyrir skatt, samkvæmt Tryggingastofnun. Hann skerðist um {{is.elli-skerding}} af tekjum umfram frítekjumörk, og heimilisuppbót fyrir þá sem búa einir er allt að {{is.heimilisuppbot}}.",
    "Almennt frítekjumark er {{is.elli-fritekjumark}} á mánuði og sérstakt frítekjumark vegna atvinnutekna {{is.elli-fritekjumark-atvinna}}. Greiðslur úr lífeyrissjóði teljast til tekna.",
  ],
  comoSeCalcula: [
    "Frá atvinnutekjum dregst fyrst sérstaka frítekjumarkið.",
    "Afgangurinn og aðrar tekjur leggjast saman, og almenna frítekjumarkið dregst frá.",
    "Ellilífeyririnn lækkar um {{is.elli-skerding}} af því sem eftir stendur, aldrei niður fyrir núll.",
    "Heimilisuppbót er aðeins sýnd þegar engin skerðing er. Hún skerðist annars eftir eigin reglu, sem er ekki reiknuð hér.",
  ],
  ejemplo: [
    "Með 300.000 kr. á mánuði úr lífeyrissjóði eru 256.342 kr. umfram almennt frítekjumark. Skerðingin er 115.354 kr. og ellilífeyririnn 250.238 kr. Með 400.000 kr. í atvinnutekjur er hann 299.918 kr.",
  ],
  faq: [
    { pregunta: "Hvað með hálfan ellilífeyri?", respuesta: "Tryggingastofnun birtir líka hálfan ellilífeyri, 182.796 kr. á mánuði, með eigin frítekjumarki. Hann er ekki reiknaður hér, svo að reiknivél stofnunarinnar hentar þá betur." },
    { pregunta: "Við hvaða tekjur fellur ellilífeyrir niður?", respuesta: "Við 856.085 kr. tekjur á mánuði fyrir skatt, samkvæmt töflu Tryggingastofnunar." },
    { pregunta: "Fæ ég líka orlofs- og desemberuppbót?", respuesta: "Tryggingastofnun greiðir slíkar uppbætur sérstaklega. Þær eru ekki reiknaðar í þessari reiknivél." },
    { pregunta: "Eru þetta tölur eftir skatt?", respuesta: "Nei. Allar fjárhæðir eru fyrir skatt. Tekjuskattur og útsvar reiknast af þeim eins og öðrum tekjum." },
  ],
  glosario: [
    { termino: "Frítekjumark", definicion: "Tekjur sem skerða ekki ellilífeyri." },
    { termino: "Heimilisuppbót", definicion: "Viðbótargreiðsla til þeirra sem búa einir." },
  ],
});
