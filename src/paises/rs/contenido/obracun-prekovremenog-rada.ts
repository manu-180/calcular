import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "rs.obracun-prekovremenog-rada",
  h1: "Obračun prekovremenog rada",
  title: "Prekovremeni rad {{anio}}: obračun uz uvećanje {{rs.prekovremeni-uvecanje}}",
  description: "Izračunajte plaćanje prekovremenih sati: uvećanje najmanje {{rs.prekovremeni-uvecanje}}, noću još {{rs.nocni-uvecanje}}, na praznik {{rs.praznik-uvecanje}}, do {{rs.prekovremeni-limit}} sati nedeljno.",
  intro: [
    "Za prekovremeni rad zarada se uvećava za najmanje {{rs.prekovremeni-uvecanje}}. Opšti akt ili ugovor o radu mogu da odrede i veći procenat.",
    "Zakon ograničava prekovremeni rad na {{rs.prekovremeni-limit}} časova nedeljno. Zajedno sa redovnim radom, dan ne sme da traje duže od 12 časova.",
  ],
  comoSeCalcula: [
    "Cena časa = bruto zarada podeljena brojem radnih časova u mesecu.",
    "Osnovna vrednost = cena časa puta broj prekovremenih časova.",
    "Uvećanje je najmanje {{rs.prekovremeni-uvecanje}}. Noćni rad dodaje {{rs.nocni-uvecanje}}, a rad na praznik {{rs.praznik-uvecanje}}. Kad je više osnova istovremeno, procenti se sabiraju.",
    "Rezultat je bruto. Neto zavisi od ostatka zarade, pa ga proverite u kalkulatoru plate.",
  ],
  ejemplo: [
    "Bruto 130.500 dinara i 174 radna časa daju 750 dinara po času. Deset prekovremenih časova vredi 7.500 dinara, uvećanje je 1.950 dinara, ukupno 9.450 dinara bruto.",
    "Dva časa noću na praznik nose 162 odsto uvećanja: 1.500 dinara osnovno i 2.430 dinara uvećanja, ukupno 3.930 dinara.",
  ],
  faq: [
    {
      pregunta: "Koliko prekovremenih časova je dozvoljeno?",
      respuesta: "Najviše {{rs.prekovremeni-limit}} časova nedeljno, a dan sa prekovremenim radom ne sme da pređe 12 časova (Zakon o radu, čl. 53).",
    },
    {
      pregunta: "Da li se uvećanja sabiraju?",
      respuesta: "Da. Ako je ispunjeno više osnova, procenat ne može biti niži od zbira procenata po svakom osnovu (čl. 108).",
    },
    {
      pregunta: "Može li poslodavac da traži prekovremeni rad?",
      respuesta: "Da, u slučaju više sile, iznenadnog povećanja obima posla i kad je neophodno da se u određenom roku završi posao koji nije planiran (čl. 53).",
    },
    {
      pregunta: "Važi li to i uz skraćeno radno vreme?",
      respuesta: "Na poslovima sa skraćenim radnim vremenom iz čl. 52 prekovremeni rad se po pravilu ne može odrediti (čl. 53).",
    },
  ],
  glosario: [
    { termino: "Prekovremeni rad", definicion: "Rad duži od punog radnog vremena, na zahtev poslodavca." },
    { termino: "Uvećana zarada", definicion: "Dodatak na osnovnu zaradu po osnovu iz člana 108 Zakona o radu." },
    { termino: "Cena časa", definicion: "Mesečna bruto zarada podeljena brojem radnih časova." },
  ],
});
