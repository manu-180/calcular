import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "fi.irtisanomisaika",
  h1: "Irtisanomisaika: laske, milloin työsuhde päättyy",
  title: "Irtisanomisaika laskuri: työntekijä ja työnantaja",
  description:
    "Laske irtisanomisaika työsopimuslain mukaan ja näe päivä, jona työsuhde päättyy. Työntekijällä aika on {{fi.irtisanomisaika-lyhin}} tai kuukausi.",
  intro: [
    "Irtisanomisaika riippuu siitä, kuka irtisanoo ja kuinka kauan työsuhde on kestänyt. Syötä päivämäärät, niin laskuri kertoo irtisanomisajan ja työsuhteen viimeisen päivän.",
    "Laskuri käyttää työsopimuslain irtisanomisaikoja. Ne ovat voimassa, jos työsopimuksessa tai työehtosopimuksessa ei ole sovittu muuta.",
  ],
  comoSeCalcula: [
    "Kun irtisanoudut itse, irtisanomisaika on {{fi.irtisanomisaika-lyhin}}, jos työsuhde on kestänyt enintään viisi vuotta. Pidemmässä työsuhteessa aika on {{fi.irtisanomisaika-tyontekija}}.",
    "Kun työnantaja irtisanoo, aika on {{fi.irtisanomisaika-lyhin}} enintään vuoden työsuhteessa. Sen jälkeen aika pitenee: {{fi.irtisanomisaika-tyonantaja[1-4]}}, {{fi.irtisanomisaika-tyonantaja[4-8]}}, {{fi.irtisanomisaika-tyonantaja[8-12]}} ja yli 12 vuoden työsuhteessa {{fi.irtisanomisaika-tyonantaja[yli-12]}}.",
    "Irtisanomispäivää ei lasketa mukaan. Päivinä laskettu aika alkaa seuraavasta päivästä, ja kuukausina laskettu aika päättyy samana päivänä numeroltaan. Jos sellaista päivää ei ole, aika päättyy kuun viimeisenä päivänä.",
  ],
  ejemplo: [
    "Olet ollut samassa työpaikassa kolme vuotta ja irtisanoudut 1.10.2026. Irtisanomisaika on 14 päivää, joten viimeinen työsuhdepäivä on 15.10.2026.",
    "Jos työnantaja irtisanoo kuusi vuotta kestäneen työsuhteen 10.9.2026, irtisanomisaika on kaksi kuukautta ja työsuhde päättyy 10.11.2026.",
  ],
  faq: [
    {
      pregunta: "Paljonko on työntekijän irtisanomisaika?",
      respuesta: "Työsopimuslain mukaan {{fi.irtisanomisaika-lyhin}}, jos työsuhde on kestänyt enintään viisi vuotta, ja {{fi.irtisanomisaika-tyontekija}}, jos se on kestänyt pidempään.",
    },
    {
      pregunta: "Voiko irtisanomisajasta sopia toisin?",
      respuesta:
        "Voi. Irtisanomisaika voidaan sopia enintään kuudeksi kuukaudeksi. Jos työnantajan sovittu irtisanomisaika on lyhyempi kuin työntekijän, myös työntekijä saa noudattaa sitä.",
    },
    {
      pregunta: "Mitä jos työnantaja ei noudata irtisanomisaikaa?",
      respuesta: "Silloin työnantajan on maksettava korvauksena täysi palkka irtisanomisaikaa vastaavalta ajalta.",
    },
    {
      pregunta: "Mitä jos en itse noudata irtisanomisaikaa?",
      respuesta: "Työntekijä joutuu maksamaan työnantajalle kertakorvauksena irtisanomisajan palkkaa vastaavan summan.",
    },
  ],
  glosario: [
    { termino: "Irtisanomisaika", definicion: "Aika irtisanomisilmoituksesta siihen päivään, jona työsuhde päättyy." },
  ],
});
