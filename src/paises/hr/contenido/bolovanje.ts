import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hr.bolovanje",
  h1: "Bolovanje {{anio}}: kalkulator naknade plaće",
  title: "Bolovanje {{anio}}: naknada {{hr.bolovanje-stopa}}, najviše {{hr.bolovanje-najvise}}",
  description: "Izračunajte naknadu za bolovanje: {{hr.bolovanje-stopa}} osnovice, prvih {{hr.bolovanje-poslodavac-dani}} na teret poslodavca, zatim HZZO do {{hr.bolovanje-najvise}} mjesečno.",
  intro: [
    "Za bolest ili ozljedu naknada je {{hr.bolovanje-stopa}} osnovice u prvih šest mjeseci, a nakon toga {{hr.bolovanje-stopa-nakon}}. Prvih {{hr.bolovanje-poslodavac-dani}} plaća poslodavac, a od 43. dana naknada je na teret HZZO-a.",
    "Na teret HZZO-a vrijede granice: najviše {{hr.bolovanje-najvise}} i najmanje {{hr.bolovanje-najmanje}} mjesečno za puno radno vrijeme. Te svote vrijede od 1. kolovoza 2025.",
  ],
  comoSeCalcula: [
    "Osnovica je prosječna plaća isplaćena u zadnjih šest mjeseci prije mjeseca u kojem je bolovanje počelo.",
    "Do {{hr.bolovanje-poslodavac-dani}} računamo {{hr.bolovanje-stopa}} osnovice, što je najmanji iznos: pravilnik ili kolektivni ugovor mogu dati više.",
    "Od 43. dana isti se postotak ograničava na {{hr.bolovanje-najvise}}. Za njegu djeteta do 7 godina postotak je {{hr.bolovanje-dijete}}, uz istu granicu, a za priznatu ozljedu na radu nema granice.",
  ],
  ejemplo: [
    "Osnovica 2.000 eura i 60 dana bolovanja. Prvih 42 dana poslodavac plaća najmanje 1.400 eura mjesečno, dakle 1.960 eura. Za preostalih 18 dana HZZO plaća do 995,45 eura mjesečno, dakle 597,27 eura. Ukupno oko 2.557,27 eura.",
    "Kod osnovice od 1.000 eura nakon šest mjeseci bolovanja naknada je 800 eura mjesečno.",
  ],
  faq: [
    {
      pregunta: "Tko plaća bolovanje?",
      respuesta: "Poslodavac iz svojih sredstava plaća prvih {{hr.bolovanje-poslodavac-dani}} bolovanja zbog bolesti ili ozljede (sedam dana za radnika invalida rada). Od 43. dana trošak preuzima HZZO, a poslodavac naknadu isplaćuje i traži povrat.",
    },
    {
      pregunta: "Kada je naknada 100 %?",
      respuesta: "Između ostalog za komplikacije u trudnoći, njegu djeteta do 7 godina i presađivanje, uz granicu od {{hr.bolovanje-najvise}}, te za priznatu ozljedu na radu i profesionalnu bolest, bez granice.",
    },
    {
      pregunta: "Koliko traje njega djeteta?",
      respuesta: "Za dijete do 7 godina do 60 dana po dijagnozi, uz {{hr.bolovanje-dijete}} osnovice. Za dijete od 7 godina do 40 dana, uz {{hr.bolovanje-stopa}} osnovice.",
    },
  ],
  glosario: [
    { termino: "Osnovica za naknadu", definicion: "Prosječna plaća iz zadnjih šest mjeseci." },
    { termino: "HZZO", definicion: "Hrvatski zavod za zdravstveno osiguranje." },
    { termino: "Privremena nesposobnost", definicion: "Službeni naziv za bolovanje." },
  ],
});
