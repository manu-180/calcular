import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "fi.sairauspaivaraha-laskuri",
  h1: "Sairauspäivärahalaskuri: paljonko sairauspäivärahaa saat",
  title: "Sairauspäiväraha laskuri {{anio}}: laske Kelan päiväraha",
  description:
    "Laske Kelan sairauspäiväraha vuosituloistasi. Näet päivärahan arkipäivältä, arvion kuukaudessa ja summan omavastuuajan jälkeen.",
  intro: [
    "Sairauspäiväraha korvaa ansionmenetystä, kun olet työkyvytön sairauden vuoksi. Kela laskee sen vuosituloistasi.",
    "Laskuri käyttää Kelan laskukaavaa ja ottaa huomioon omavastuuajan, jonka ajalta päivärahaa ei makseta.",
  ],
  comoSeCalcula: [
    "Palkasta vähennetään vakuutusmaksuvähennys {{fi.vakuutusmaksuvahennys}}. Tulos on vuositulo.",
    "Päiväraha on {{fi.sairauspaivaraha-prosentit[perus]}} vuositulosta jaettuna 300:lla. Kun vuositulo ylittää {{fi.sairauspaivaraha-rajat[taite]}}, ylittävästä osasta vähennetään {{fi.sairauspaivaraha-prosentit[pienennys]}} jaettuna 300:lla.",
    "Jos vuositulo on enintään {{fi.sairauspaivaraha-rajat[vahimmais]}}, päiväraha on vähimmäismäärä {{fi.vahimmaispaivaraha}}.",
    "Päivärahaa maksetaan omavastuuajan jälkeen. Omavastuuaika on sairastumispäivä ja yhdeksän sitä seuraavaa arkipäivää.",
  ],
  ejemplo: [
    "Palkkasi on 40 000 euroa vuodessa, joten vuositulo on 36 372 euroa. Sairauspäiväraha on 71,17 euroa arkipäivältä.",
    "Jos olet sairaana 30 arkipäivää, saat päivärahaa 20 päivältä eli 1 423,40 euroa.",
  ],
  faq: [
    {
      pregunta: "Kuinka kauan sairauspäivärahaa maksetaan?",
      respuesta: "Enintään 300 arkipäivää, eli noin vuoden.",
    },
    {
      pregunta: "Maksaako työnantaja palkkaa sairausajalta?",
      respuesta: "Jos työnantaja maksaa sinulle palkkaa sairausajalta, Kela maksaa sairauspäivärahan työnantajalle. Jos palkanmaksu loppuu tai palkkaa ei makseta lainkaan, Kela maksaa päivärahan sinulle.",
    },
    {
      pregunta: "Mikä on sairauspäivärahan vähimmäismäärä?",
      respuesta: "Vähimmäismäärä on {{fi.vahimmaispaivaraha}} arkipäivältä.",
    },
  ],
  glosario: [
    { termino: "Omavastuuaika", definicion: "Sairauden alun jakso, jonka ajalta sairauspäivärahaa ei makseta." },
    { termino: "Vakuutusmaksuvähennys", definicion: "Kelan vuositulosta tekemä vähennys, joka vastaa palkansaajan maksuja." },
  ],
});
