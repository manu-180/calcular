import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "fi.lomarahalaskuri",
  h1: "Lomarahalaskuri: lomarahan laskeminen",
  title: "Lomarahalaskuri: laske lomaraha ja paljonko jää käteen",
  description:
    "Laske lomaraha kuukausipalkasta ja lomapäivistä. Syötä työehtosopimuksesi prosentti ja veroprosentti, niin näet myös summan, joka jää käteen.",
  intro: [
    "Lomaraha eli lomaltapaluuraha on lomapalkan päälle maksettava lisä. Laskuri laskee sen lomapalkasta sillä prosentilla, joka sinulle kuuluu.",
    "Lomaraha ei perustu vuosilomalakiin. Sen maksaminen perustuu työehtosopimukseen, työsopimukseen tai työpaikan käytäntöön, joten tarkista prosentti sieltä.",
  ],
  comoSeCalcula: [
    "Lomapäivän palkka on kuukausipalkka jaettuna {{fi.lomakorvauksen-jakajat[kuukausi]}}:llä. Tämä on sama jakaja, jota vuosilomalaki käyttää lomakorvauksessa.",
    "Lomapalkka on lomapäivän palkka kertaa lomapäivät.",
    "Lomaraha on valittu prosentti lomapalkasta. Laskurin oletus on 50 prosenttia, ja voit muuttaa sen.",
    "Lomarahasta peritään työeläkemaksu {{fi.palkansaajan-maksut[tyel]}}, työttömyysvakuutusmaksu {{fi.palkansaajan-maksut[tyottomyys]}} ja vero verokorttisi prosentilla.",
  ],
  ejemplo: [
    "Kuukausipalkka on 3 000 euroa ja lomaa 30 päivää. Lomapäivän palkka on 120 euroa ja lomapalkka 3 600 euroa.",
    "Lomaraha 50 prosentilla on 1 800 euroa. Kun veroprosentti on 20, käteen jää 1 292,58 euroa.",
  ],
  faq: [
    {
      pregunta: "Miten lomaraha lasketaan?",
      respuesta: "Laskuri ottaa lomapalkasta sen prosentin, joka sopimuksessasi on. Kuukausipalkkaisen lomapäivän palkka on kuukausipalkka jaettuna 25:llä, ja se kerrotaan lomapäivillä.",
    },
    {
      pregunta: "Onko lomaraha pakko maksaa?",
      respuesta: "Laki ei velvoita maksamaan lomarahaa. Jos työehtosopimuksesi tai työsopimuksesi määrää lomarahasta, työnantajan on maksettava se sen ehtojen mukaan.",
    },
    {
      pregunta: "Millä veroprosentilla lomaraha verotetaan?",
      respuesta: "Lomaraha on palkkaa, ja siitä pidätetään vero samalla verokortilla kuin muustakin palkasta. Lomaraha kasvattaa vuositulojasi, joten huomioi se verokortissa.",
    },
  ],
  glosario: [
    { termino: "Lomaraha", definicion: "Lomapalkan lisäksi maksettava raha, jonka peruste on työehtosopimuksessa tai työsopimuksessa." },
    { termino: "Lomapalkka", definicion: "Palkka, joka maksetaan vuosiloman ajalta." },
  ],
});
