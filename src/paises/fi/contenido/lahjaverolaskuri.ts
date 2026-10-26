import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "fi.lahjaverolaskuri",
  h1: "Lahjaverolaskuri: paljonko lahjaveroa maksat",
  title: "Lahjaverolaskuri 2026: laske lahjavero",
  description:
    "Laske lahjavero lahjan arvosta ja veroluokasta. Vuodesta 2026 alle {{fi.lahjavero-1[1].desde}} lahja on verovapaa. Mukana kolmen vuoden aikana saadut lahjat.",
  intro: [
    "Lahjaveroa maksaa lahjan saaja. Laskuri laskee veron lahjan arvosta ja ottaa huomioon samalta lahjoittajalta aiemmin saadut lahjat.",
    "Veroluokka riippuu siitä, kuka lahjan antaa. Lähimmiltä sukulaisilta saadusta lahjasta vero on pienempi.",
  ],
  comoSeCalcula: [
    "Veroa ei makseta, jos lahjan arvo on alle {{fi.lahjavero-1[1].desde}}. Jos arvo on tätä suurempi, vero lasketaan koko arvosta.",
    "Samalta lahjoittajalta kolmen vuoden aikana saadut lahjat lasketaan yhteen. Aiemmista lahjoista maksettu vero vähennetään.",
    "Veroluokassa I vero alkaa {{fi.lahjavero-1[1].cuotaFija}} ja ylimenevän osan prosentti on {{fi.lahjavero-1[1].tasa}}. Veroluokassa II prosentti on aluksi {{fi.lahjavero-2[1].tasa}}.",
  ],
  ejemplo: [
    "Saat mummoltasi 30 000 euron rahalahjan. Vero 25 000 eurosta on 1 500 euroa ja ylimenevästä 5 000 eurosta {{fi.lahjavero-1[2].tasa}} eli 500 euroa.",
    "Lahjaveroa maksetaan yhteensä 2 000 euroa.",
  ],
  faq: [
    {
      pregunta: "Paljonko rahaa voi lahjoittaa verovapaasti?",
      respuesta: "Vuodesta 2026 alkaen alle {{fi.lahjavero-1[1].desde}} arvoinen lahja on verovapaa. Raja koskee samalta lahjoittajalta kolmen vuoden aikana saatuja lahjoja yhteensä.",
    },
    {
      pregunta: "Kuka maksaa lahjaveron?",
      respuesta: "Lahjan saaja. Hän tekee lahjaveroilmoituksen, kun lahjojen arvo ylittää verovapaan rajan.",
    },
    {
      pregunta: "Mikä muuttui vuonna 2026?",
      respuesta: "Verovapaa raja nousi aiemmasta 5 000 eurosta. Uusi taulukko koskee lahjoja, joiden verovelvollisuus alkoi 1.1.2026 tai myöhemmin.",
    },
  ],
  glosario: [
    { termino: "Lahjavero", definicion: "Vero, jonka lahjan saaja maksaa lahjan arvosta." },
    { termino: "Veroluokka", definicion: "Lahjoittajan ja saajan sukulaisuuteen perustuva luokka." },
  ],
});
