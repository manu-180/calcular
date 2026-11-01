import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "fi.veroprosenttilaskuri",
  h1: "Veroprosenttilaskuri: palkan, eläkkeen ja etuuden vero",
  title: "Veroprosenttilaskuri {{anio}}: laske veroprosentti",
  description:
    "Laske veroprosentti palkalle, eläkkeelle tai etuudelle. Laskuri käyttää valtion tuloveroasteikkoa, kuntasi veroprosenttia ja vuoden vähennyksiä.",
  intro: [
    "Veroprosenttilaskurilla arvioit, millaisen veroprosentin saat verokorttiisi. Syötä vuositulot ja valitse, onko tulo palkkaa, eläkettä vai etuutta.",
    "Sama tulo verotetaan eri tavalla eri tulolajeissa. Palkansaaja saa työtulovähennyksen, eläkeläinen eläketulovähennyksen ja etuuden saaja vain perusvähennyksen.",
  ],
  comoSeCalcula: [
    "Tuloista vähennetään ensin palkansaajan maksut ja automaattiset vähennykset: tulonhankkimisvähennys {{fi.tulonhankkimisvahennys}} palkasta, eläketulovähennys (enintään {{fi.elaketulovahennys[enimmais]}}) eläkkeestä ja perusvähennys (enintään {{fi.perusvahennys}}) pienistä tuloista.",
    "Valtion vero lasketaan verotettavasta tulosta tuloveroasteikolla. Ensimmäinen porras on {{fi.valtion-tuloveroasteikko[0].tasa}} ja ylin {{fi.valtion-tuloveroasteikko[-1].tasa}} tuloista, jotka ylittävät {{fi.valtion-tuloveroasteikko[-1].desde}}.",
    "Kunnallisvero ja kirkollisvero ovat kotikuntasi prosentteja verotettavasta tulosta. Sairaanhoitomaksu on palkasta {{fi.palkansaajan-maksut[sairaanhoito]}} ja muista tuloista {{fi.palkansaajan-maksut[sairaanhoito-korotus]}} enemmän.",
    "Palkansaajan veroa pienentää työtulovähennys, enintään {{fi.tyotulovahennys[enimmais]}}. Eläkkeen siitä osasta, joka ylittää {{fi.elaketulon-lisaveron-raja}}, peritään lisäveroa {{fi.elaketulon-lisavero}}.",
    "Veroprosentti on verojen osuus tuloista. Verokorttiin se pyöristetään ylöspäin puolen prosenttiyksikön tarkkuudella.",
  ],
  ejemplo: [
    "Helsinkiläinen evankelis-luterilaisen kirkon jäsen saa eläkettä 20 000 euroa vuodessa. Veroja kertyy 2 340,15 euroa, joten veroprosentti on 12,0.",
    "Jos sama 20 000 euroa olisi palkkaa, veroja olisi vain 278,50 euroa ja veroprosentti 1,5. Ero syntyy työtulovähennyksestä.",
  ],
  faq: [
    {
      pregunta: "Miksi eläkkeen veroprosentti on suurempi kuin palkan?",
      respuesta:
        "Palkansaaja saa työtulovähennyksen, joka pienentää veroa. Eläkkeestä tehdään eläketulovähennys, mutta se on pienempi ja poistuu tulojen kasvaessa.",
    },
    {
      pregunta: "Mikä on lisäprosentti?",
      respuesta:
        "Lisäprosentti on verokortin toinen prosentti. Sitä käytetään, kun vuositulosi ylittävät verokortin tulorajan. Tämä laskuri arvioi perusprosentin.",
    },
    {
      pregunta: "Mitä tapahtuu, jos veroprosentti on liian pieni?",
      respuesta:
        "Silloin maksat jäännösveroa verotuksen valmistuttua. Voit tehdä uuden verokortin OmaVerossa milloin tahansa vuoden aikana.",
    },
    {
      pregunta: "Kuuluuko Yle-vero veroprosenttiin?",
      respuesta:
        "Kuuluu. Yle-vero on {{fi.yle-vero}} tuloista, jotka ylittävät {{fi.yle-veron-tuloraja}}, ja enintään {{fi.yle-veron-enimmaismaara}}. Se peritään 18 vuotta täyttäneiltä samalla veroprosentilla.",
    },
  ],
  glosario: [
    { termino: "Puhdas ansiotulo", definicion: "Ansiotulot, joista on vähennetty tulonhankkimismenot." },
    { termino: "Verotettava tulo", definicion: "Tulo, josta vero lasketaan, kun kaikki vähennykset on tehty." },
    { termino: "Perusvähennys", definicion: "Pienituloisten vähennys. Se pienenee tulojen kasvaessa ja poistuu kokonaan." },
  ],
});
