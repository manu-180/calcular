import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hr.trosak-poslodavca",
  h1: "Trošak poslodavca {{anio}}: koliko stoji radnik",
  title: "Trošak poslodavca {{anio}}: bruto 2 i zdravstveno {{hr.zdravstveno}}",
  description: "Izračunajte koliko tvrtku stoji plaća: bruto uz zdravstveno {{hr.zdravstveno}}, neoporezivi primici i iznos koji radnik dobiva. Unesite bruto i grad.",
  intro: [
    "Na bruto plaću poslodavac plaća doprinos za zdravstveno osiguranje od {{hr.zdravstveno}}. Taj zbroj u praksi se zove bruto 2 i prava je cijena radnika, uz eventualne neoporezive primitke.",
    "Kalkulator pokazuje i koliko od svakog eura stiže radniku, nakon mirovinskih doprinosa ({{hr.mio-i}} i {{hr.mio-ii}}) i poreza njegova grada.",
  ],
  comoSeCalcula: [
    "Zdravstveno: {{hr.zdravstveno}} bruto plaće, na teret poslodavca i povrh bruto iznosa.",
    "Ukupan trošak: bruto, plus zdravstveno, plus neoporezivi primici koje sami unesete. Trošak za 12 mjeseci je mjesečni iznos puta dvanaest.",
    "Isplata radniku: neto plaća, uz neoporezive primitke, s odbitkom od {{hr.osobni-odbitak}} bez djece.",
  ],
  ejemplo: [
    "Bruto 2.000 eura: zdravstveno je 330 eura, pa je mjesečni trošak 2.330 eura, odnosno 27.960 eura godišnje. Radnik u Zagrebu dobiva 1.370 eura, što je oko 59 % ukupnog troška.",
    "Uz 100 eura neoporezive naknade trošak je 2.430 eura, a radniku stiže 1.470 eura. Taj dio do radnika dolazi u cijelosti.",
  ],
  faq: [
    {
      pregunta: "Koje doprinose plaća poslodavac?",
      respuesta: "Na plaću se plaća doprinos za zdravstveno osiguranje po stopi od {{hr.zdravstveno}}. Mirovinski doprinosi ({{hr.mio-i}} i {{hr.mio-ii}}) plaćaju se iz plaće, pa ih poslodavac samo obračunava i uplaćuje, kako navodi Porezna uprava.",
    },
    {
      pregunta: "Koliko se neoporezivo može isplatiti za prehranu?",
      respuesta: "Novčana paušalna naknada za prehranu neoporeziva je do {{hr.prehrana}} godišnje, a nagrade za radne rezultate do {{hr.nagrade-rezultati}} godišnje. Te svote objavljuje Porezna uprava.",
    },
    {
      pregunta: "Ulaze li mirovinski doprinosi u trošak poslodavca?",
      respuesta: "Već su u bruto iznosu. Radnik ih plaća iz plaće ({{hr.mio-i}} i {{hr.mio-ii}}), pa se trošku dodaje samo zdravstveno od {{hr.zdravstveno}}.",
    },
  ],
  glosario: [
    { termino: "Bruto 2", definicion: "Bruto plaća uvećana za doprinos za zdravstveno osiguranje." },
    { termino: "Doprinosi iz plaće", definicion: "Mirovinski doprinosi koje radnik plaća iz bruto iznosa." },
    { termino: "Doprinosi na plaću", definicion: "Zdravstveno osiguranje koje poslodavac plaća povrh bruto iznosa." },
  ],
});
