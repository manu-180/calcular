import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hr.otkazni-rok",
  h1: "Otkazni rok {{anio}}: izračun po godinama rada",
  title: "Otkazni rok {{anio}}: koliko traje po Zakonu o radu",
  description: "Izračunajte najkraći otkazni rok prema godinama rada i dobi: od dva tjedna do tri mjeseca, uz produljenje nakon 50. godine, po članku 122. Zakona o radu.",
  intro: [
    "Otkazni rok ovisi o neprekidnom radu kod istog poslodavca. Ide od dva tjedna do tri mjeseca nakon dvadeset godina rada (Zakon o radu, čl. 122.).",
    "Uz dvadeset godina rada rok je dulji za stariju dob: za dva tjedna od 50. godine života, a za mjesec dana od 55. godine. Kod skrivljenog ponašanja rok je upola kraći.",
  ],
  comoSeCalcula: [
    "Rok prema godinama rada: manje od godine dva tjedna, godina mjesec dana, dvije godine mjesec i dva tjedna, pet godina dva mjeseca, deset godina dva mjeseca i dva tjedna, dvadeset godina tri mjeseca.",
    "Ako ste radili dvadeset godina, dodaju se dva tjedna od 50. godine života, odnosno mjesec dana od 55. godine.",
    "Za otkaz zbog skrivljenog ponašanja rok je polovica tih rokova.",
  ],
  ejemplo: [
    "Šest godina rada i 40 godina života: dva mjeseca. Ako je otkaz uvjetovan skrivljenim ponašanjem, rok je mjesec dana.",
    "Dvadeset dvije godine rada i 56 godina života: tri mjeseca, uvećana za mjesec dana, dakle 4 mjeseca.",
  ],
  faq: [
    {
      pregunta: "Vrijede li isti rokovi kad radnik daje otkaz?",
      respuesta: "Kolektivni ugovor ili ugovor o radu mogu radniku odrediti kraći rok. Ako radnik ima osobito važan razlog, rok ne može biti dulji od mjesec dana.",
    },
    {
      pregunta: "Imam li slobodno vrijeme za traženje posla?",
      respuesta: "Da. Tijekom otkaznog roka radnik ima pravo na najmanje četiri plaćena sata tjedno za traženje novog posla (čl. 122. st. 5.).",
    },
    {
      pregunta: "Što ako me poslodavac oslobodi rada?",
      respuesta: "Poslodavac tada mora isplatiti plaću i ostala prava kao da radite do kraja otkaznog roka (čl. 122. st. 4.).",
    },
  ],
  glosario: [
    { termino: "Otkazni rok", definicion: "Razdoblje od otkaza do prestanka radnog odnosa." },
    { termino: "Skrivljeno ponašanje", definicion: "Povreda obveze iz radnog odnosa zbog koje poslodavac daje otkaz." },
    { termino: "Neprekidni rad", definicion: "Rad kod istog poslodavca bez prekida radnog odnosa." },
  ],
});
