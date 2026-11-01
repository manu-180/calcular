import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "si.izracun-pokojnine",
  h1: "Izračun pokojnine {{anio}}: okvirna starostna pokojnina",
  title: "Izračun pokojnine {{anio}}: odmerni odstotek in osnova",
  description: "Okvirna starostna pokojnina: {{si.pokojnina-odstotek[zacetek]}} za 15 let in {{si.pokojnina-odstotek[na-leto]}} za vsako nadaljnje leto. Izračun po ZPIZ-2.",
  intro: [
    "Starostna pokojnina je pokojninska osnova, pomnožena z odmernim odstotkom. Za pokojnine, uveljavljene v letih 2026 in 2027, je odstotek {{si.pokojnina-odstotek[zacetek]}} za 15 let in še {{si.pokojnina-odstotek[na-leto]}} za vsako nadaljnje leto.",
    "To je okvirna ocena za načrtovanje. Dejansko pokojninsko osnovo izračuna ZPIZ iz vaših podatkov, zato bo točen znesek drugačen.",
  ],
  comoSeCalcula: [
    "Odmerni odstotek = {{si.pokojnina-odstotek[zacetek]}} + (pokojninska doba − 15) × {{si.pokojnina-odstotek[na-leto]}} (37. člen ZPIZ-2).",
    "Pokojninska osnova je povprečje neto osnov iz najboljših zaporednih 40 let (30. člen ZPIZ-2). Ne more biti nižja od {{si.pokojninska-osnova[najnizja]}} in ne višja od {{si.pokojninska-osnova[najvisja]}}.",
    "Pravico lahko pridobite pri starosti {{si.pokojnina-starost}} in dobi {{si.pokojnina-doba}}. Zakon postopno dviguje starost po letih upokojitve.",
  ],
  ejemplo: [
    "Osnova 1.700,00 € in 40 let dobe: odstotek 63,50, pokojnina 1.079,50 € na mesec.",
    "Pri 30 letih dobe je odstotek 49,90, pokojnina pa 848,30 €.",
  ],
  faq: [
    {
      pregunta: "Zakaj je odstotek drugačen kot v starih preglednicah?",
      respuesta: "Pokojninska reforma je spremenila 37. člen ZPIZ-2. Zakon določa posebne odstotke za pokojnine, uveljavljene v letih 2026 in 2027, pozneje pa se odstotek zvišuje po letih.",
    },
    {
      pregunta: "Kako izvem svojo pokojninsko osnovo?",
      respuesta: "Pri ZPIZ, ki jo izračuna ob uveljavitvi pravice. Vpišite oceno, kalkulator pa pokaže, kako se znesek spreminja z dobo.",
    },
    {
      pregunta: "Je to neto ali bruto znesek?",
      respuesta: "Osnova je po 30. členu ZPIZ-2 zmanjšana za davke in prispevke po povprečni stopnji. Kalkulator ne upošteva odbitkov od same pokojnine, zato je rezultat okviren.",
    },
  ],
  glosario: [
    { termino: "Pokojninska osnova", definicion: "Povprečje osnov zavarovanca, od katerega se odmeri pokojnina." },
    { termino: "Odmerni odstotek", definicion: "Delež osnove, ki ga prinese pokojninska doba." },
  ],
});
