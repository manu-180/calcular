import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sk.minimalna-mzda",
  h1: "Minimálna mzda {{anio}}",
  title: "Minimálna mzda {{anio}}: {{sk.minimalna-mzda}} a mzdové nároky",
  description: "Minimálna mzda je {{sk.minimalna-mzda}} mesačne a {{sk.minimalna-mzda-hodinova}} za hodinu. Vypočítajte nárok podľa stupňa náročnosti a úväzku.",
  intro: [
    "Minimálna mzda je {{sk.minimalna-mzda}} mesačne. Platí od {{sk.minimalna-mzda#desde}}, ale nie pre každého je to konečná hranica.",
    "Ak firma nemá kolektívnu zmluvu, platí minimálny mzdový nárok podľa šiestich stupňov náročnosti práce. Kalkulačka ho vypočíta aj pre kratší úväzok a ukáže čistú sumu.",
  ],
  comoSeCalcula: [
    "Podľa § 120 ods. 4 Zákonníka práce sa od minimálnej mzdy odráta suma na rok 2020 ({{sk.minimalna-mzda-2020}}).",
    "K rozdielu sa pripočíta suma na rok 2020 vynásobená koeficientom stupňa: od {{sk.koeficienty-stupnov[s1]}} pri prvom stupni po {{sk.koeficienty-stupnov[s6]}} pri šiestom.",
    "Pri kratšom týždennom pracovnom čase sa mesačný nárok pomerne zníži.",
  ],
  ejemplo: [
    "Pri druhom stupni je výpočet 915 − 580 + 580 × 1,2, teda 1 031 eur. Ak pracujete 20 hodín týždenne, nárok je 515,50 eura.",
  ],
  faq: [
    { pregunta: "Koľko je minimálna mzda v čistom?", respuesta: "Pri {{sk.minimalna-mzda}} v hrubom, bez detí a s uplatnenou nezdaniteľnou časťou 728,90 eura." },
    { pregunta: "Ako sa určuje výška minimálnej mzdy?", respuesta: "Podľa zákona č. 663/2007 Z. z., ak sa sociálni partneri nedohodnú, je to 60 % priemernej mesačnej mzdy spred dvoch rokov." },
    { pregunta: "Čo keď moja mzda nedosiahne minimálny nárok?", respuesta: "Zamestnávateľ bez kolektívnej zmluvy vám musí doplatiť rozdiel podľa § 120 ods. 1 Zákonníka práce." },
    { pregunta: "Na čo ešte vplýva minimálna mzda?", respuesta: "Na príplatky za prácu v sobotu, v nedeľu a v noci. Tie sa počítajú ako percento z hodinovej minimálnej mzdy {{sk.minimalna-mzda-hodinova}}." },
  ],
  glosario: [
    { termino: "Stupeň náročnosti", definicion: "Zaradenie pracovného miesta podľa prílohy č. 1 Zákonníka práce." },
    { termino: "Minimálny mzdový nárok", definicion: "Najnižšia mzda pre daný stupeň, ak firma nemá kolektívnu zmluvu." },
  ],
});
