import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "rs.obracun-bolovanja",
  h1: "Obračun bolovanja",
  title: "Bolovanje {{anio}}: naknada {{rs.bolovanje-bolest}} ili {{rs.bolovanje-povreda}} zarade",
  description: "Izračunajte naknadu za bolovanje: {{rs.bolovanje-bolest}} za bolest, {{rs.bolovanje-povreda}} za povredu na radu. Prvih {{rs.bolovanje-poslodavac-dana}} dana plaća poslodavac, potom RFZO.",
  intro: [
    "Za bolest ili povredu van rada naknada je {{rs.bolovanje-bolest}} prosečne zarade iz prethodnih 12 meseci, a za povredu na radu i profesionalnu bolest {{rs.bolovanje-povreda}}. Ne može biti niža od minimalne zarade.",
    "Prvih {{rs.bolovanje-poslodavac-dana}} dana plaća poslodavac. Od sledećeg dana naknadu obezbeđuje Republički fond za zdravstveno osiguranje (RFZO).",
  ],
  comoSeCalcula: [
    "Prosečnu zaradu iz prethodnih 12 meseci pomnožite procentom za vaš slučaj.",
    "Ako je rezultat manji od minimalne zarade, uzima se minimalna zarada. Ovde je to bruto iznos za 174 časa po {{rs.minimalna-cena-rada}}.",
    "Mesečni iznos podelite sa 30 i pomnožite brojem dana. Ovo je procena: stvarni obračun ide po radnim časovima u mesecu.",
    "Za dane na teret RFZO zarada se ograničava najvišom osnovicom od {{rs.najvisa-osnovica}}.",
  ],
  ejemplo: [
    "Prosečna zarada 200.000 dinara i deset dana bolesti: 65 odsto je 130.000 dinara mesečno, pa je naknada 43.333,33 dinara bruto, a plaća je poslodavac.",
    "Četrdeset dana zbog povrede na radu: poslodavac plaća 200.000 dinara za prvih 30 dana, a RFZO 66.666,67 dinara za ostalih 10.",
  ],
  faq: [
    {
      pregunta: "Koliko se plaća bolovanje zbog održavanja trudnoće?",
      respuesta: "Naknada je 100 odsto od osnova. Prvih 30 dana plaća poslodavac. Od 31. dana 65 odsto obezbeđuje zdravstveno osiguranje, a 35 odsto budžet Republike (Zakon o zdravstvenom osiguranju).",
    },
    {
      pregunta: "Koja je osnovica za naknadu?",
      respuesta: "Prosečna zarada koju je osiguranik ostvario u prethodnih 12 meseci pre meseca u kome je nastupila sprečenost za rad (Zakon o zdravstvenom osiguranju, čl. 87).",
    },
    {
      pregunta: "Može li naknada biti ispod minimalca?",
      respuesta: "Ne. Zakon o radu u čl. 115 kaže da ne može biti niža od minimalne zarade, a isto važi i za iznos iz zdravstvenog osiguranja.",
    },
  ],
  glosario: [
    { termino: "Privremena sprečenost za rad", definicion: "Zvanični naziv za bolovanje." },
    { termino: "RFZO", definicion: "Republički fond za zdravstveno osiguranje." },
    { termino: "Osnov za naknadu", definicion: "Prosečna zarada iz prethodnih 12 meseci." },
  ],
});
