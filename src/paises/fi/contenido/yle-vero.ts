import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "fi.yle-vero",
  h1: "Yle-verolaskuri: paljonko maksat yleisradioveroa",
  title: "Yle-vero 2026: laske yleisradiovero tuloistasi",
  description:
    "Laske Yle-vero eli yleisradiovero. Vero on {{fi.yle-vero}} tuloista, jotka ylittävät {{fi.yle-veron-tuloraja}}, ja enintään {{fi.yle-veron-enimmaismaara}} vuodessa.",
  intro: [
    "Yle-vero eli yleisradiovero lisätään muihin veroihisi, ja se peritään verokortin veroprosentilla samalla tavalla kuin muut verot.",
    "Laskuri laskee veron vuoden ansio- ja pääomatuloista. Pienituloinen ei maksa Yle-veroa lainkaan.",
  ],
  comoSeCalcula: [
    "Veron pohjana ovat puhtaat ansio- ja pääomatulot. Palkasta vähennetään tulonhankkimisvähennys {{fi.tulonhankkimisvahennys}}.",
    "Vero on {{fi.yle-vero}} siitä osasta, joka ylittää {{fi.yle-veron-tuloraja}}.",
    "Veroa maksetaan enintään {{fi.yle-veron-enimmaismaara}} vuodessa. Sitä maksavat ne, jotka täyttävät vuoden aikana vähintään 18 vuotta.",
  ],
  ejemplo: [
    "Palkkasi on 20 000 euroa vuodessa. Tulonhankkimisvähennyksen jälkeen tuloja on 19 250 euroa, josta 4 100 euroa ylittää rajan.",
    "Yle-vero on {{fi.yle-vero}} 4 100 eurosta eli 102,50 euroa.",
  ],
  faq: [
    {
      pregunta: "Paljonko Yle-vero on vuonna 2026?",
      respuesta: "{{fi.yle-vero}} tuloista, jotka ylittävät {{fi.yle-veron-tuloraja}}, ja enintään {{fi.yle-veron-enimmaismaara}} vuodessa.",
    },
    {
      pregunta: "Maksaako opiskelija tai eläkeläinen Yle-veroa?",
      respuesta: "Maksaa, jos tulot ylittävät rajan. Vero lasketaan kaikista puhtaista ansio- ja pääomatuloista, myös eläkkeistä ja etuuksista.",
    },
    {
      pregunta: "Pitääkö Yle-vero maksaa erikseen?",
      respuesta: "Ei tarvitse. Yle-vero sisältyy verokortin veroprosenttiin, ja se peritään palkasta, eläkkeestä tai etuudesta.",
    },
  ],
  glosario: [
    { termino: "Yleisradiovero", definicion: "Yle-veron virallinen nimi." },
    { termino: "Puhdas ansiotulo", definicion: "Ansiotulot, joista on vähennetty tulonhankkimismenot." },
  ],
});
