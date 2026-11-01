import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "fi.lomapalkkalaskuri",
  h1: "Lomapalkkalaskuri: lomapäivät ja lomapalkka",
  title: "Lomapalkkalaskuri: paljonko lomaa ja lomapalkkaa kertyy",
  description:
    "Laske ansaitsemasi lomapäivät ja lomapalkka vuosilomalain mukaan: kuukausipalkka, tuntipalkka keskipäiväpalkalla tai prosenttiperusteinen lomapalkka.",
  intro: [
    "Lomaa kertyy jokaiselta täydeltä lomanmääräytymiskuukaudelta. Laskuri kertoo, montako lomapäivää olet ansainnut ja paljonko saat lomapalkkaa.",
    "Lomapalkan laskutapa riippuu siitä, saatko kuukausipalkkaa vai tuntipalkkaa ja kuinka monena päivänä kuukaudessa teet töitä.",
  ],
  comoSeCalcula: [
    "Lomaa kertyy {{fi.lomapaivat[vuosi]}} kultakin täydeltä kuukaudelta, jos työsuhde on jatkunut vähintään vuoden maaliskuun loppuun mennessä. Muuten lomaa kertyy {{fi.lomapaivat[alle-vuosi]}} kuukaudelta. Päivän osa pyöristetään ylöspäin.",
    "Kuukausipalkkainen saa lomaltaan tavallisen palkkansa. Lomapäivän arvo on kuukausipalkka jaettuna {{fi.lomakorvauksen-jakajat[kuukausi]}}:llä.",
    "Tunti- tai urakkapalkkaisen lomapalkka on keskipäiväpalkka kertaa lomapäivien kerroin. Esimerkiksi 30 lomapäivän kerroin on {{fi.lomapalkan-kertoimet[30]}}.",
    "Jos teet töitä alle 14 päivänä kuukaudessa, lomapalkka on {{fi.lomapalkka-prosentti[alle-vuosi]}} tai vähintään vuoden työsuhteessa {{fi.lomapalkka-prosentti[vuosi]}} vuoden palkoista.",
  ],
  ejemplo: [
    "Kuukausipalkka on 3 000 euroa ja työsuhde on kestänyt yli vuoden. Täydestä vuodesta kertyy 12 × 2,5 eli 30 lomapäivää.",
    "Lomapäivän arvo on 3 000 / 25 eli 120 euroa, joten 30 päivän lomapalkka on 3 600 euroa.",
  ],
  faq: [
    {
      pregunta: "Montako lomapäivää saan vuodessa?",
      respuesta:
        "Täydestä lomanmääräytymisvuodesta kertyy 30 lomapäivää, kun työsuhde on kestänyt vähintään vuoden. Ensimmäisenä vuonna lomaa kertyy {{fi.lomapaivat[alle-vuosi]}} kuukaudelta.",
    },
    {
      pregunta: "Mikä on lomanmääräytymisvuosi?",
      respuesta: "Se on 1.4. alkava ja 31.3. päättyvä jakso. Loma lasketaan sen kuukausista, joten maaliskuun lopussa näet koko vuoden lomapäivät.",
    },
    {
      pregunta: "Mikä on täysi lomanmääräytymiskuukausi?",
      respuesta: "Kuukausi, jona olet ollut töissä vähintään 14 päivää. Jos teet töitä harvempina päivinä, täysi kuukausi on kuukausi, jona olet tehnyt vähintään 35 tuntia.",
    },
    {
      pregunta: "Sisältyykö lomaraha lomapalkkaan?",
      respuesta: "Ei sisälly. Vuosilomalaissa ei ole säännöksiä lomarahasta. Tarkista oikeutesi lomarahaan omasta työehtosopimuksestasi tai työsopimuksestasi ja laske summa lomarahalaskurilla.",
    },
  ],
  glosario: [
    { termino: "Lomanmääräytymisvuosi", definicion: "1.4.-31.3. välinen jakso, jonka aikana loma kertyy." },
    { termino: "Keskipäiväpalkka", definicion: "Lomanmääräytymisvuoden palkat jaettuna tehdyillä työpäivillä." },
  ],
});
