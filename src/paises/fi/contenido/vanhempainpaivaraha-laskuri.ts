import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "fi.vanhempainpaivaraha-laskuri",
  h1: "Vanhempainpäivärahalaskuri: paljonko vanhempainrahaa saat",
  title: "Vanhempainpäiväraha laskuri {{anio}}: laske vanhempainraha",
  description:
    "Laske Kelan vanhempainraha vuosituloistasi. Näet päivärahan arkipäivältä, korotetun rahan ensimmäisiltä päiviltä ja arvion kuukaudessa.",
  intro: [
    "Vanhempainraha korvaa palkan, kun hoidat lasta vanhempainvapaalla. Sen määrä riippuu vuosituloistasi.",
    "Laskuri käyttää Kelan laskukaavoja. Ensimmäisiltä vanhempainrahapäiviltä ({{fi.korotetun-vanhempainrahan-paivat}}) maksetaan korotettua rahaa, ja sen jälkeen tavallista vanhempainrahaa.",
  ],
  comoSeCalcula: [
    "Palkasta vähennetään ensin vakuutusmaksuvähennys {{fi.vakuutusmaksuvahennys}}. Tulos on vuositulo, josta päiväraha lasketaan.",
    "Tavallinen vanhempainraha on {{fi.vanhempainpaivaraha-prosentit[p1]}} vuositulosta {{fi.vanhempainpaivaraha-rajat[taite1]}} asti jaettuna 300:lla. Sen ylittävältä osalta osuus on {{fi.vanhempainpaivaraha-prosentit[p2]}} ja yli {{fi.vanhempainpaivaraha-rajat[taite2]}} menevältä osalta {{fi.vanhempainpaivaraha-prosentit[p3]}}.",
    "Korotettu raha on {{fi.vanhempainpaivaraha-prosentit[korotettu1]}} vuositulosta {{fi.vanhempainpaivaraha-rajat[taite2]}} asti ja {{fi.vanhempainpaivaraha-prosentit[korotettu2]}} sen ylittävältä osalta, jaettuna 300:lla.",
    "Jos vuositulo on enintään {{fi.vanhempainpaivaraha-rajat[vahimmais]}}, saat vähimmäispäivärahan {{fi.vahimmaispaivaraha}} arkipäivältä.",
  ],
  ejemplo: [
    "Palkkasi on ollut 40 000 euroa vuodessa. Vuositulo vakuutusmaksuvähennyksen jälkeen on 36 372 euroa.",
    "Tavallinen vanhempainraha on 84,87 euroa ja korotettu 109,12 euroa arkipäivältä. 160 päivän vanhempainraha on yhteensä 13 967,20 euroa.",
  ],
  faq: [
    {
      pregunta: "Montako vanhempainrahapäivää saan?",
      respuesta: "Kumpikin vanhempi saa vanhempainrahaa {{fi.vanhempainrahapaivat}}, ja päivät ovat arkipäiviä. Omasta kiintiöstä voi luovuttaa enintään 63 päivää toiselle lasta hoitavalle henkilölle.",
    },
    {
      pregunta: "Mistä tuloista vanhempainraha lasketaan?",
      respuesta:
        "Yleensä 12 kuukauden tuloista, jotka päättyvät vapaan alkua edeltävää kuukautta edeltävään kuukauteen. Jos vapaa alkaa toukokuussa 2026, tulot lasketaan ajalta 1.4.2025-31.3.2026.",
    },
    {
      pregunta: "Maksetaanko vanhempainrahasta veroa?",
      respuesta: "Maksetaan. Vanhempainraha on etuutta, ja etuudet verotetaan ansiotulona. Siitä pidätetään vero etuuden veroprosentilla.",
    },
  ],
  glosario: [
    { termino: "Vuositulo", definicion: "Kelan päivärahan laskennassa käytetty 12 kuukauden tulo, josta on tehty vakuutusmaksuvähennys." },
    { termino: "Arkipäivä", definicion: "Kelan päivärahoissa päivät maanantaista lauantaihin." },
  ],
});
