import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hr.godisnji-odmor",
  h1: "Godišnji odmor {{anio}}: izračun dana i naknade",
  title: "Godišnji odmor {{anio}}: najmanje {{hr.odmor-tjedana}}, izračun dana",
  description: "Izračunajte dane godišnjeg odmora: zakonski minimum {{hr.odmor-tjedana}}, razmjerni dio od 1/12 po mjesecu i procjena naknade prema prosječnoj plaći.",
  intro: [
    "Zakon o radu jamči najmanje {{hr.odmor-tjedana}} godišnjeg odmora, a maloljetnicima {{hr.odmor-maloljetnik}}. Kolektivni ugovor, pravilnik o radu ili ugovor o radu mogu odrediti više.",
    "Kod pet radnih dana u tjednu četiri tjedna znače 20 radnih dana. Puno pravo stječe se nakon šest mjeseci neprekidnog rada kod istog poslodavca.",
  ],
  comoSeCalcula: [
    "Puni odmor je broj tjedana pomnožen s radnim danima u tjednu.",
    "Razmjerni dio je jedna dvanaestina za svaki mjesec rada (čl. 78.). Vrijedi prije isteka šest mjeseci i kad radni odnos prestaje tijekom godine. Najmanje pola dana zaokružuje se na cijeli dan (čl. 79.).",
    "Naknada je najmanje prosjek zadnja tri mjeseca (čl. 81.). Svotu po danu procjenjujemo kao godišnju plaću podijeljenu s radnim danima u 52 tjedna. Stvarni obračun ovisi o rasporedu rada.",
  ],
  ejemplo: [
    "Pet radnih dana u tjednu, cijela godina rada i prosjek od 2.000 eura. Pravo je 20 dana. Dnevna procjena je 2.000 x 12 / 260 = 92,31 euro, a za 20 dana 1.846,15 eura.",
    "Ako radni odnos prestaje nakon sedam mjeseci, računa se 20 x 7 / 12 = 11,67, što se zaokružuje na 12 dana.",
  ],
  faq: [
    {
      pregunta: "Što ako nisam iskoristio godišnji odmor pri prestanku rada?",
      respuesta: "Poslodavac isplaćuje naknadu umjesto korištenja godišnjeg odmora, prema članku 82. Zakona o radu.",
    },
    {
      pregunta: "Imam li pravo na odmor u prvih šest mjeseci?",
      respuesta: "Da, na razmjerni dio: jednu dvanaestinu za svaki mjesec trajanja radnog odnosa (čl. 78.). Nakon šest mjeseci stječete puno pravo od najmanje {{hr.odmor-tjedana}}.",
    },
    {
      pregunta: "Tko ima pet tjedana odmora?",
      respuesta: "Prema članku 77. maloljetnici i radnici na određenim poslovima s posebnim rizicima imaju najmanje {{hr.odmor-maloljetnik}}. Ostali mogu imati više po kolektivnom ili ugovoru o radu.",
    },
  ],
  glosario: [
    { termino: "Razmjerni dio", definicion: "Dvanaestina godišnjeg odmora za svaki mjesec rada." },
    { termino: "Naknada za godišnji odmor", definicion: "Plaća za vrijeme odmora, najmanje prosjek zadnja tri mjeseca." },
    { termino: "Regres", definicion: "Dodatni novčani primitak za godišnji odmor, odvojen od ove naknade." },
  ],
});
