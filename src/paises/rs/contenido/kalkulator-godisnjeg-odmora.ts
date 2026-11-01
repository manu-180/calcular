import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "rs.kalkulator-godisnjeg-odmora",
  h1: "Kalkulator godišnjeg odmora",
  title: "Godišnji odmor {{anio}}: srazmerni deo i naknada za dane",
  description: "Izračunajte koliko dana godišnjeg odmora vam pripada: najmanje {{rs.godisnji-odmor-minimum}} za celu godinu, dvanaestina po mesecu rada i naknada pri odlasku.",
  intro: [
    "U svakoj kalendarskoj godini imate pravo na najmanje {{rs.godisnji-odmor-minimum}} radnih dana odmora. Opšti akt ili ugovor o radu taj broj mogu samo da povećaju.",
    "Ako ste se zaposlili ili odlazite tokom godine, pripada vam dvanaestina odmora za svaki mesec rada. Kalkulator računa i novčanu naknadu za neiskorišćene dane kad radni odnos prestaje.",
  ],
  comoSeCalcula: [
    "Za punu godinu pripada vam broj dana iz ugovora, ali ne manje od zakonskog minimuma.",
    "Za nepunu godinu: dani iz ugovora puta meseci rada, podeljeno sa 12.",
    "Oduzmite već iskorišćene dane.",
    "Naknada = prosečna zarada iz prethodnih 12 meseci, srazmerno neiskorišćenim danima. Ovde se mesečni iznos deli unetim brojem radnih dana.",
  ],
  ejemplo: [
    "Radili ste šest meseci i imate 20 dana po ugovoru. Pripada vam 10 dana. Ako ste iskoristili pet, ostaje pet.",
    "Uz prosečnu zaradu od 120.000 dinara i 21 radni dan u mesecu, naknada za tih pet dana je 28.571,43 dinara.",
  ],
  faq: [
    {
      pregunta: "Da li subota ulazi u godišnji odmor?",
      respuesta: "Radna nedelja se računa kao pet radnih dana, a praznici koji su neradni dani i bolovanje ne računaju se u dane odmora (Zakon o radu, čl. 70).",
    },
    {
      pregunta: "Da li odmor može da se zameni novcem?",
      respuesta: "Ne, osim kad radni odnos prestaje. Tada poslodavac isplaćuje naknadu za neiskorišćene dane, koja ima karakter naknade štete (čl. 68 i 76).",
    },
    {
      pregunta: "Kada stičem pravo na godišnji odmor?",
      respuesta: "Posle mesec dana neprekidnog rada od zasnivanja radnog odnosa kod poslodavca (čl. 68).",
    },
    {
      pregunta: "Mogu li odmor da koristim u delovima?",
      respuesta: "Da. Prvi deo traje najmanje dve radne nedelje neprekidno u toku kalendarske godine, a ostatak se koristi najkasnije do 30. juna naredne godine (čl. 73).",
    },
  ],
  glosario: [
    { termino: "Srazmerni deo", definicion: "Dvanaestina godišnjeg odmora za svaki mesec rada u godini." },
    { termino: "Naknada zarade", definicion: "Iznos koji se isplaćuje umesto zarade za vreme odsustva." },
    { termino: "Opšti akt", definicion: "Kolektivni ugovor ili pravilnik o radu poslodavca." },
  ],
});
