import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "fi.lomakorvauslaskuri",
  h1: "Lomakorvauslaskuri: lomakorvaus työsuhteen päättyessä",
  title: "Lomakorvauslaskuri: paljonko lomakorvausta saat",
  description:
    "Laske lomakorvaus, kun työsuhde päättyy. Laskuri lisää pitämättömiin lomiin kuluvana vuonna kertyneet päivät ja käyttää vuosilomalain jakajaa 25.",
  intro: [
    "Kun työsuhde päättyy, pitämättömät lomat maksetaan rahana. Tätä kutsutaan lomakorvaukseksi.",
    "Korvaus maksetaan sekä aiemmin ansaituista lomista että kuluvana lomanmääräytymisvuonna kertyneistä päivistä.",
  ],
  comoSeCalcula: [
    "Kuluvana vuonna lomaa kertyy {{fi.lomapaivat[vuosi]}} kultakin täydeltä kuukaudelta, jos työsuhde on päättyessään jatkunut vähintään vuoden. Muuten lomaa kertyy {{fi.lomapaivat[alle-vuosi]}} kuukaudelta.",
    "Näihin päiviin lisätään aiemmin ansaitut lomapäivät, joita et ole pitänyt.",
    "Kuukausipalkkaisen lomapäivän palkka on kuukausipalkka jaettuna {{fi.lomakorvauksen-jakajat[kuukausi]}}:llä. Viikkopalkkaisella jakaja on {{fi.lomakorvauksen-jakajat[viikko]}}.",
    "Jos teit töitä alle 14 päivänä kuukaudessa, lomakorvaus on {{fi.lomapalkka-prosentti[alle-vuosi]}} tai vähintään vuoden työsuhteessa {{fi.lomapalkka-prosentti[vuosi]}} palkoista.",
  ],
  ejemplo: [
    "Kuukausipalkka on 3 000 euroa. Sinulla on 10 pitämätöntä lomapäivää, ja huhtikuun jälkeen ehdit tehdä 5 täyttä kuukautta.",
    "Kuluvalta vuodelta kertyy 5 × 2,5 eli 12,5 päivää, joka pyöristetään 13 päivään. Lomakorvaus on 23 × 120 eli 2 760 euroa.",
  ],
  faq: [
    {
      pregunta: "Milloin lomakorvaus maksetaan?",
      respuesta: "Lomakorvaus maksetaan, kun työsuhde päättyy. Se korvaa lomat, joita et ehtinyt pitää.",
    },
    {
      pregunta: "Verotetaanko lomakorvaus?",
      respuesta: "Lomakorvaus on palkkaa. Siitä pidätetään vero ja palkansaajan maksut samalla tavalla kuin muustakin palkasta.",
    },
    {
      pregunta: "Lasketaanko ensimmäinen ja viimeinen kuukausi?",
      respuesta:
        "Jos ensimmäisen ja viimeisen kuukauden työpäivät riittävät yhdessä täyteen kuukauteen, ne lasketaan yhdeksi täydeksi lomanmääräytymiskuukaudeksi.",
    },
  ],
  glosario: [
    { termino: "Lomakorvaus", definicion: "Rahakorvaus pitämättömistä lomista työsuhteen päättyessä." },
    { termino: "Täysi kuukausi", definicion: "Kuukausi, jona olit töissä vähintään 14 päivää tai 35 tuntia." },
  ],
});
