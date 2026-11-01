import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "is.erfdafjarskattur",
  h1: "Erfðafjárskattur {{anio}}: reiknaðu skattinn",
  title: "Erfðafjárskattur {{anio}}: {{is.erfdafjarskattur}} af dánarbúi",
  description: "Erfðafjárskattur er {{is.erfdafjarskattur}} af dánarbúi umfram {{is.erfdafjarskattur-fritekjumark}}. Sláðu inn fjárhæðina og sjáðu skattinn.",
  intro: [
    "Erfðafjárskattur er {{is.erfdafjarskattur}} af skattskyldri fjárhæð dánarbús, og fyrstu {{is.erfdafjarskattur-fritekjumark}} eru skattfrjálsar, óháð fjölda erfingja. Tölurnar eru úr helstu tölum Skattsins.",
    "Skattfrjálsa fjárhæðin er uppfærð árlega með vísitölu neysluverðs fyrir dánarbú þeirra sem létust 2021 eða síðar. Reiknivélin miðar við dánarbúið í heild, ekki hlut hvers erfingja.",
  ],
  comoSeCalcula: [
    "Skattfrjálsa fjárhæðin dregst frá fjárhæð dánarbúsins, aldrei niður fyrir núll.",
    "Afgangurinn er skattstofninn. Skatturinn er {{is.erfdafjarskattur}} af honum.",
    "Sláðu inn fjárhæð sem búið er að lækka um skuldir og annan frádrátt.",
  ],
  ejemplo: [
    "Dánarbú upp á 20.000.000 kr.: 6.789.790 kr. eru skattfrjálsar og stofninn 13.210.210 kr. Skatturinn er 1.321.021 kr. og eftir standa 18.678.979 kr.",
  ],
  faq: [
    { pregunta: "Hækkar hlutfallið með stærð búsins?", respuesta: "Nei. Sama hlutfall, {{is.erfdafjarskattur}}, leggst á alla fjárhæðina umfram skattfrjálsa hlutann, hvort sem búið er stórt eða lítið." },
    { pregunta: "Skiptir fjöldi erfingja máli?", respuesta: "Ekki fyrir skattfrjálsu fjárhæðina. Samkvæmt Skattinum gildir hún fyrir búið, óháð fjölda erfingja." },
    { pregunta: "Breytist fjárhæðin á milli ára?", respuesta: "Já, hún er uppfærð árlega með vísitölu neysluverðs samkvæmt helstu tölum Skattsins." },
    { pregunta: "Hvað er skattskylt?", respuesta: "Reiknivélin tekur við fjárhæðinni sem þú slærð inn. Fáðu staðfest hjá Skattinum eða sýslumanni hvað telst til hennar." },
  ],
  glosario: [
    { termino: "Dánarbú", definicion: "Eignir og skuldir þess sem er látinn." },
    { termino: "Erfingi", definicion: "Sá sem fær arf úr dánarbúi." },
  ],
});
