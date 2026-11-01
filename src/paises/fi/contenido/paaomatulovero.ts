import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "fi.paaomatulovero",
  h1: "Pääomatulovero: myyntivoiton, osingon ja vuokratulon vero",
  title: "Pääomatulovero {{anio}}: laske myyntivoiton ja osingon vero",
  description:
    "Laske pääomatulovero osakkeiden myyntivoitosta, pörssiosingosta tai vuokratulosta. Vero on {{fi.paaomatulovero[0].tasa}} ja yli {{fi.paaomatulovero[1].desde}} menevältä osalta {{fi.paaomatulovero[1].tasa}}.",
  intro: [
    "Pääomatuloja ovat esimerkiksi osakkeiden ja rahastojen myyntivoitot, osingot ja vuokratulot. Niistä maksetaan pääomatuloveroa.",
    "Laskuri ottaa huomioon hankintameno-olettaman, pörssiosingon verovapaan osuuden ja koko vuoden pääomatulojen rajan.",
  ],
  comoSeCalcula: [
    "Myyntivoitto on myyntihinta miinus hankintahinta ja kulut. Jos se on edullisempaa, hankintahinnan sijaan vähennetään hankintameno-olettama: {{fi.hankintameno-olettama[alle-10]}} myyntihinnasta tai {{fi.hankintameno-olettama[vahintaan-10]}}, jos omistit omaisuuden vähintään 10 vuotta.",
    "Pörssiyhtiön osingosta {{fi.porssiosingon-veronalainen-osuus}} on veronalaista pääomatuloa ja loput verovapaata.",
    "Vero on {{fi.paaomatulovero[0].tasa}} pääomatuloista {{fi.paaomatulovero[1].desde}} asti ja {{fi.paaomatulovero[1].tasa}} sen ylittävältä osalta. Raja koskee koko vuoden pääomatuloja yhteensä, joten syötä myös muut pääomatulosi.",
    "Jos kaikkien vuoden aikana myymiesi omaisuuserien myyntihinnat ovat yhteensä enintään {{fi.luovutusten-verovapausraja}}, myyntivoitto on verovapaa.",
  ],
  ejemplo: [
    "Myyt yli 10 vuotta omistamasi osakkeet 2 500 eurolla. Hankintameno-olettama on {{fi.hankintameno-olettama[vahintaan-10]}} eli 1 000 euroa, joten voittoa on 1 500 euroa.",
    "Voitosta maksetaan pääomatuloveroa {{fi.paaomatulovero[0].tasa}} eli 450 euroa.",
  ],
  faq: [
    {
      pregunta: "Paljonko on osinkovero?",
      respuesta: "Pörssiosingosta {{fi.porssiosingon-veronalainen-osuus}} on veronalaista pääomatuloa. Kun pääomatulosi ovat alle rajan, vero on {{fi.paaomatulovero[0].tasa}} veronalaisesta osasta eli 25,5 % koko osingosta.",
    },
    {
      pregunta: "Mikä on hankintameno-olettama?",
      respuesta:
        "Se on laskennallinen hankintameno, jota voit käyttää todellisen hankintamenon sijaan. Olettama on {{fi.hankintameno-olettama[alle-10]}} myyntihinnasta tai {{fi.hankintameno-olettama[vahintaan-10]}}, jos omistit omaisuuden vähintään 10 vuotta.",
    },
    {
      pregunta: "Milloin myyntivoitto on verovapaa?",
      respuesta: "Kun kaikkien vuoden aikana myymiesi omaisuuserien myyntihinnat ovat yhteensä enintään {{fi.luovutusten-verovapausraja}}.",
    },
  ],
  glosario: [
    { termino: "Pääomatulo", definicion: "Omaisuudesta saatu tulo, kuten myyntivoitto, osinko tai vuokra." },
    { termino: "Hankintameno", definicion: "Omaisuuden ostohinta ja ostamiseen liittyvät kulut." },
  ],
});
