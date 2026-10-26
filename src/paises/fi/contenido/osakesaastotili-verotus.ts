import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "fi.osakesaastotili-verotus",
  h1: "Osakesäästötilin verotus: paljonko nostosta menee veroa",
  title: "Osakesäästötili verotus: laske noston vero",
  description:
    "Laske, kuinka suuri osa osakesäästötilin nostosta on veronalaista tuottoa ja paljonko siitä menee pääomatuloveroa. Talletusraja on {{fi.osakesaastotilin-talletusraja}}.",
  intro: [
    "Osakesäästötilillä voit käydä kauppaa pörssiosakkeilla ilman, että jokaisesta myynnistä menee veroa. Vero maksetaan vasta, kun nostat rahaa tililtä.",
    "Jokainen nosto jaetaan pääomaan ja tuottoon samassa suhteessa kuin ne ovat tilillä. Laskuri näyttää jaon ja tuoton veron.",
  ],
  comoSeCalcula: [
    "Tilin tuotto on tilin arvo miinus talletettu pääoma, josta on vähennetty aiemmat pääoman nostot.",
    "Nostosta veronalaista on tuoton osuus tilin arvosta kertaa nostettu summa. Loppu on verovapaata pääoman palautusta.",
    "Veronalainen tuotto verotetaan pääomatulona: {{fi.paaomatulovero[0].tasa}} ja yli {{fi.paaomatulovero[1].desde}} menevältä osalta {{fi.paaomatulovero[1].tasa}}.",
    "Talletusten yläraja on {{fi.osakesaastotilin-talletusraja}}. Pääoman nostot pienentävät talletusten määrää, joten voit tallettaa nostetun pääoman uudelleen.",
  ],
  ejemplo: [
    "Olet tallettanut tilille 10 000 euroa, ja tilin arvo on nyt 15 000 euroa. Tuottoa on 5 000 euroa eli kolmasosa tilin arvosta.",
    "Kun nostat 1 500 euroa, siitä 500 euroa on veronalaista tuottoa ja 1 000 euroa pääomaa. Vero on 150 euroa.",
  ],
  faq: [
    {
      pregunta: "Paljonko osakesäästötilille voi tallettaa?",
      respuesta: "Enintään {{fi.osakesaastotilin-talletusraja}}. Raja koskee talletettua rahaa, ei tilin arvoa, joten tilin arvo voi kasvaa rajaa suuremmaksi.",
    },
    {
      pregunta: "Pitääkö osingoista maksaa veroa osakesäästötilillä?",
      respuesta: "Ei heti. Tilille maksetut osingot ovat osa tilin tuottoa, ja niitä verotetaan vasta, kun nostat varoja tililtä.",
    },
    {
      pregunta: "Mitä tilille voi ostaa?",
      respuesta: "Pörssiosakkeita ja monenkeskisellä markkinapaikalla noteerattuja osakkeita. Rahasto-osuuksia, ETF-rahastoja tai listaamattomia osakkeita tilille ei voi ostaa.",
    },
    {
      pregunta: "Voiko osakkeet siirtää tililtä pois?",
      respuesta: "Ei voi. Tililtä voi nostaa vain rahaa, joten osakkeet pitää ensin myydä.",
    },
  ],
  glosario: [
    { termino: "Osakesäästötili", definicion: "Tili, jolla voi sijoittaa pörssiosakkeisiin ja jonka tuotto verotetaan vasta nostettaessa." },
    { termino: "Talletettu pääoma", definicion: "Tilille tallettamasi raha, josta on vähennetty aiemmat pääoman nostot." },
  ],
});
