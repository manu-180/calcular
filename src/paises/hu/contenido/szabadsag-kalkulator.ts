import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hu.szabadsag-kalkulator",
  h1: "Szabadság kalkulátor",
  title: "Szabadság kalkulátor: hány nap szabadság jár idén?",
  description:
    "Alapszabadság ({{hu.alapszabadsag}}), pótszabadság életkor és gyermekek szerint, arányos szabadság év közbeni kezdésnél. A Munka Törvénykönyve alapján.",
  intro: [
    "Minden munkavállalónak évi {{hu.alapszabadsag}} alapszabadság jár. Erre jön a pótszabadság az életkor, a gyermekek és néhány más körülmény szerint.",
    "Ha a munkaviszonyod év közben kezdődött vagy ér véget, a szabadság arányos része jár. A kalkulátor ezt is kiszámolja.",
  ],
  comoSeCalcula: [
    "Alapszabadság: {{hu.alapszabadsag}}.",
    "Életkor szerinti pótszabadság: 25 évesen egy nap, utána néhány évente eggyel több, 45 évesen tíz nap. Abban az évben jár először, amelyben betöltöd az adott életkort.",
    "Gyermekek után, 16 éves korukig: egy gyermek után {{hu.potszabadsag-gyermek[1]}}, kettő után {{hu.potszabadsag-gyermek[2]}}, kettőnél több után összesen {{hu.potszabadsag-gyermek[3]}}. Fogyatékos gyermekenként további {{hu.potszabadsag-gyermek[fogyatekos]}}.",
    "A fiatal munkavállalónak annak az évnek a végéig, amelyben betölti a 18. életévét, további {{hu.potszabadsag-egyeb[fiatal]}} jár.",
    "Arányos szabadság: az éves szabadság szorozva a munkaviszonyban töltött napok arányával. A fél napot elérő töredéknap egész napnak számít.",
  ],
  ejemplo: [
    "Egy 36 éves, két gyermeket nevelő munkavállalónak 20 nap alapszabadság, 5 nap életkor szerinti és 4 nap gyermekek utáni pótszabadság jár: összesen 29 munkanap.",
  ],
  faq: [
    {
      pregunta: "Hány nap szabadság jár 40 évesen?",
      respuesta: "Gyermek nélkül 27 munkanap: 20 nap alapszabadság és 7 nap pótszabadság, mert a 39. életévtől hét nap pótszabadság jár.",
    },
    {
      pregunta: "Mennyi pótszabadság jár a gyermekek után?",
      respuesta: "16 év alatti gyermekenként: egy gyermek után {{hu.potszabadsag-gyermek[1]}}, kettő után {{hu.potszabadsag-gyermek[2]}}, kettőnél több után összesen {{hu.potszabadsag-gyermek[3]}}. Fogyatékos gyermek után további {{hu.potszabadsag-gyermek[fogyatekos]}}.",
    },
    {
      pregunta: "Hogyan számolom az arányos szabadságot?",
      respuesta: "Az egész évre járó szabadságot szorozd meg a munkaviszonyban töltött napokkal, és oszd el az év napjaival. Július elsejei kezdésnél 29 napból 15 nap jár.",
    },
    {
      pregunta: "Az apasági szabadság is ide tartozik?",
      respuesta: "Nem. Az apának a gyermek születése után tíz munkanap apasági szabadság jár, a szülőknek pedig a gyermek hároméves koráig 44 munkanap szülői szabadság. Ezek az éves szabadságon felül járnak, és nem arányosítják őket.",
    },
  ],
  glosario: [
    { termino: "Alapszabadság", definicion: "Az évi szabadság, ami minden munkavállalónak jár." },
    { termino: "Pótszabadság", definicion: "Az alapszabadságon felüli napok életkor, gyermekek vagy egészségi állapot miatt." },
  ],
});
