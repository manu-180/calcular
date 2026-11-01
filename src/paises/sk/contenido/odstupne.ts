import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sk.odstupne",
  h1: "Odstupné {{anio}}",
  title: "Odstupné {{anio}}: výpočet podľa § 76 Zákonníka práce",
  description: "Vypočítajte odstupné: {{sk.odstupne[vypoved2]}} až {{sk.odstupne[dohoda20]}} násobok priemerného zárobku podľa dĺžky práce a toho, či ide o výpoveď alebo dohodu.",
  intro: [
    "Odstupné patrí pri skončení pracovného pomeru z organizačných dôvodov alebo zo zdravotných dôvodov. Pri dohode býva vyššie ako pri výpovedi: najmenej {{sk.odstupne[vypoved20]}} zárobky po dvadsiatich rokoch pri výpovedi a {{sk.odstupne[dohoda20]}} pri dohode.",
    "Výška závisí od trvania pracovného pomeru. Zákon určuje minimum, kolektívna zmluva môže dať viac. Priemerný zárobok zistíte v kalkulačke náhrady mzdy.",
  ],
  comoSeCalcula: [
    "Pri výpovedi je to jeden zárobok od dvoch rokov práce, dva od piatich, tri od desiatich a štyri od dvadsiatich rokov.",
    "Pri dohode je to jeden zárobok pod dva roky, dva od dvoch, tri od piatich, štyri od desiatich a päť od dvadsiatich rokov.",
    "Násobok sa vynásobí priemerným mesačným zárobkom.",
  ],
  ejemplo: ["Pri zárobku 1 800 eur a šiestich rokoch práce je odstupné pri výpovedi 3 600 eur a pri dohode 5 400 eur."],
  faq: [
    { pregunta: "Kedy mi patrí odstupné?", respuesta: "Pri výpovedi alebo dohode z dôvodov podľa § 63 ods. 1 písm. a), b) alebo f), alebo ak ste zo zdravotných dôvodov stratili spôsobilosť vykonávať doterajšiu prácu (§ 76)." },
    { pregunta: "Patrí odstupné pri výpovedi po roku práce?", respuesta: "Zákon ho pri výpovedi určuje až od dvoch rokov trvania pracovného pomeru. Pri dohode patrí jeden priemerný zárobok aj pri kratšom trvaní." },
    { pregunta: "Aký zárobok sa používa?", respuesta: "Priemerný mesačný zárobok podľa § 134 Zákonníka práce, teda z predchádzajúceho štvrťroka." },
  ],
  glosario: [
    { termino: "Odstupné", definicion: "Jednorazová platba pri skončení pracovného pomeru z vymedzených dôvodov." },
    { termino: "Organizačné dôvody", definicion: "Zrušenie alebo premiestnenie zamestnávateľa, prípadne nadbytočnosť zamestnanca." },
  ],
});
