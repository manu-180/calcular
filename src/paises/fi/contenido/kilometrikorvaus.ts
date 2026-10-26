import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "fi.kilometrikorvaus",
  h1: "Kilometrikorvaus ja päiväraha: laske verovapaat matkakorvaukset",
  title: "Kilometrikorvaus: {{fi.kilometrikorvaus}} kilometriltä ja päivärahat",
  description:
    "Laske verovapaa kilometrikorvaus ({{fi.kilometrikorvaus}}/km), kotimaan kokopäiväraha {{fi.paivarahat[kokopaiva]}}, osapäiväraha {{fi.paivarahat[osapaiva]}} ja ateriakorvaus.",
  intro: [
    "Kun teet työmatkan omalla autollasi, työnantaja voi maksaa sinulle verovapaata kilometrikorvausta. Pitkältä työmatkalta voit saada myös päivärahaa.",
    "Laskuri käyttää Verohallinnon vahvistamia verovapaita enimmäismääriä.",
  ],
  comoSeCalcula: [
    "Kilometrikorvaus on {{fi.kilometrikorvaus}} kilometriltä, kun ajat omalla autolla.",
    "Kokopäiväraha {{fi.paivarahat[kokopaiva]}} maksetaan, kun työmatka kestää yli 10 tuntia. Osapäiväraha {{fi.paivarahat[osapaiva]}} maksetaan yli 6 tunnin matkasta.",
    "Ateriakorvaus {{fi.paivarahat[ateria]}} maksetaan päivältä, jolta ei makseta päivärahaa.",
  ],
  ejemplo: [
    "Ajat vuonna 2026 työajoja 250 kilometriä ja olet kahdella yli 10 tunnin työmatkalla.",
    "Kilometrikorvaus on 137,50 euroa ja päivärahat 108 euroa, joten verovapaita korvauksia on yhteensä 245,50 euroa.",
  ],
  faq: [
    {
      pregunta: "Paljonko kilometrikorvaus on nyt?",
      respuesta: "Verovapaa kilometrikorvaus on {{fi.kilometrikorvaus}} kilometriltä, kun ajat omalla autolla.",
    },
    {
      pregunta: "Muuttuuko kilometrikorvaus vuonna 2027?",
      respuesta: "Muuttuu. Verohallinnon päätöksen mukaan kilometrikorvaus on vuonna 2027 enintään 58 senttiä kilometriltä ja kotimaan kokopäiväraha 55 euroa.",
    },
    {
      pregunta: "Onko työnantajan pakko maksaa kilometrikorvausta?",
      respuesta: "Verohallinnon päätös kertoo vain verovapaat enimmäismäärät. Se ei velvoita työnantajaa maksamaan korvauksia.",
    },
  ],
  glosario: [
    { termino: "Kilometrikorvaus", definicion: "Korvaus oman auton käytöstä työajoissa." },
    { termino: "Päiväraha", definicion: "Korvaus työmatkan aiheuttamista ylimääräisistä elantokustannuksista." },
  ],
});
