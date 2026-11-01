import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "fi.alv-laskuri",
  h1: "Alv-laskuri: lisää tai poista arvonlisävero",
  title: "Alv-laskuri {{anio}}: {{fi.alv[yleinen]}}, {{fi.alv[alennettu]}} ja {{fi.alv[erityinen]}}",
  description:
    "Laske arvonlisävero Suomen verokannoilla: yleinen {{fi.alv[yleinen]}}, elintarvikkeet ja ravintolat {{fi.alv[alennettu]}}, lehdet {{fi.alv[erityinen]}}. Lisää tai poista alv yhdellä kertaa.",
  intro: [
    "Alv-laskurilla lisäät arvonlisäveron verottomaan hintaan tai poistat sen verollisesta hinnasta. Valitse tuotteen tai palvelun verokanta.",
    "Suomessa on kolme verokantaa. Yleinen verokanta koskee useimpia tuotteita ja palveluja, ja alennetut verokannat esimerkiksi ruokaa ja lehtiä.",
  ],
  comoSeCalcula: [
    "Kun lisäät alv:n, vero on veroton hinta kertaa verokanta. Verollinen hinta on veroton hinta ja vero yhteensä.",
    "Kun poistat alv:n, veroton hinta on verollinen hinta jaettuna luvulla 1 plus verokanta. Esimerkiksi yleisellä verokannalla jakaja on 1,255.",
    "Yleinen verokanta on {{fi.alv[yleinen]}}. Elintarvikkeiden, ravintola- ja ateriapalvelujen, kirjojen, lääkkeiden, henkilöliikenteen ja majoituksen verokanta on {{fi.alv[alennettu]}}. Sanoma- ja aikakauslehtien verokanta on {{fi.alv[erityinen]}}.",
  ],
  ejemplo: [
    "Veroton hinta on 100 euroa. Yleisellä verokannalla vero on 25,50 euroa ja verollinen hinta 125,50 euroa.",
    "Ruokaostoksessa samasta 100 eurosta veroa on 13,50 euroa, joten verollinen hinta on 113,50 euroa.",
  ],
  faq: [
    {
      pregunta: "Mikä on alv Suomessa vuonna 2026?",
      respuesta: "Yleinen verokanta on {{fi.alv[yleinen]}}. Alennetut verokannat ovat {{fi.alv[alennettu]}} ja {{fi.alv[erityinen]}}.",
    },
    {
      pregunta: "Muuttuiko ruoan alv vuoden 2026 alussa?",
      respuesta: "Muuttui. Alennettu verokanta laski 14 prosentista {{fi.alv[alennettu]}} 1.1.2026. Se koskee muun muassa elintarvikkeita ja ravintolaruokaa.",
    },
    {
      pregunta: "Mikä on alkoholin alv?",
      respuesta: "Alkoholijuomiin ja tupakkaan sovelletaan yleistä verokantaa {{fi.alv[yleinen]}}, myös ravintolassa.",
    },
    {
      pregunta: "Miten alv poistetaan hinnasta?",
      respuesta: "Jaa verollinen hinta luvulla 1 plus verokanta. Esimerkiksi 125,50 euroa jaettuna 1,255:llä on 100 euroa veroton hinta.",
    },
  ],
  glosario: [
    { termino: "Arvonlisävero (alv)", definicion: "Kulutusvero, joka lisätään useimpien tavaroiden ja palvelujen hintaan." },
    { termino: "Verokanta", definicion: "Prosentti, jolla arvonlisävero lasketaan verottomasta hinnasta." },
  ],
});
