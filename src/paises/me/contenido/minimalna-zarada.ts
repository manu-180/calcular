import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "me.minimalna-zarada",
  h1: "Minimalna zarada u Crnoj Gori {{anio}}: {{me.minimalna-do-v}} i {{me.minimalna-vi}} neto",
  title: "Minimalna zarada {{anio}}: {{me.minimalna-do-v}} i {{me.minimalna-vi}} neto, sa brutom",
  description: "Minimalna neto zarada je {{me.minimalna-do-v}} do V nivoa kvalifikacije i {{me.minimalna-vi}} od VI nivoa. Provjerite bruto, trošak firme i iznos za nepuno radno vrijeme.",
  intro: [
    "Minimalac u Crnoj Gori ima dva iznosa, oba neto: {{me.minimalna-do-v}} za radna mjesta do V nivoa kvalifikacije i {{me.minimalna-vi}} za radna mjesta sa VI i višim nivoom.",
    "Odlučuje nivo koji traži radno mjesto, a ne diploma koju imate. Kalkulator daje i bruto koji odgovara tom neto iznosu i trošak poslodavca.",
  ],
  comoSeCalcula: [
    "Polazi se od neto iznosa iz člana 101 Zakona o radu. Kod nepunog radnog vremena on se umanjuje srazmjerno.",
    "Iz neta se traži bruto. Za {{me.minimalna-do-v}} poreza nema, pa je bruto neto podijeljen sa 0,895. Za {{me.minimalna-vi}} bruto prelazi {{me.porez-zarada[0].hasta}}, pa ulaze i porez i prirez.",
    "Trošak poslodavca je taj bruto uvećan za {{me.nezaposlenost-poslodavac}} i {{me.fond-rada}}.",
  ],
  ejemplo: [
    "Prodavac na radnom mjestu sa IV nivoom, puno radno vrijeme: minimalno {{me.minimalna-do-v}} neto, odnosno 670,39 eura bruto. Firmu ta zarada košta 675,08 eura mjesečno.",
    "Isti radnik na pola radnog vremena ima pravo na najmanje 300 eura neto, a bruto je 335,20 eura.",
  ],
  faq: [
    {
      pregunta: "Važi li viši iznos ako imam fakultet, a radim na mjestu sa SSS?",
      respuesta: "Ne. Član 101 stav 2 Zakona o radu veže iznos za nivo kvalifikacije radnog mjesta, a ne za diplomu zaposlenog. Isto objašnjenje dalo je resorno ministarstvo u svojim odgovorima na pitanja.",
    },
    {
      pregunta: "Ko i kada mijenja minimalnu zaradu?",
      respuesta: "Vlada na predlog Socijalnog savjeta, za period od dvije godine (Zakon o radu, čl. 101 st. 3). Mjerila su opšti nivo zarada, kupovna moć, troškovi života i ekonomski faktori.",
    },
    {
      pregunta: "Da li uvećanja ulaze u minimalnu zaradu?",
      respuesta: "Posebni dio zarade, koji čine naknada za topli obrok i dvanaestina regresa, čini sastavni dio minimalne zarade (Zakon o radu, čl. 96). Uvećanja za prekovremeni, noćni rad i praznike u nju ne ulaze, prema Opštem kolektivnom ugovoru (čl. 15).",
    },
  ],
  glosario: [
    { termino: "Minimalac", definicion: "Uobičajen naziv za najnižu zaradu koju poslodavac mora isplatiti za puno radno vrijeme." },
    { termino: "Nivo kvalifikacije", definicion: "Nivo obrazovanja koji se traži za radno mjesto po aktu o sistematizaciji." },
    { termino: "Socijalni savjet", definicion: "Tijelo u kom sjede Vlada, sindikati i poslodavci." },
  ],
});
