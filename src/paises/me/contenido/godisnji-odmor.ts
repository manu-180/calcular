import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "me.godisnji-odmor",
  h1: "Godišnji odmor {{anio}}: koliko dana vam pripada",
  title: "Godišnji odmor {{anio}}: najmanje {{me.odmor-najmanje}}, i po mjesecima",
  description: "Zakon daje najmanje {{me.odmor-najmanje}} odmora u radnim danima, a {{me.odmor-sest-dana}} pri šestodnevnoj sedmici. Izračunajte dane za cijelu godinu ili za mjesece rada.",
  intro: [
    "Svako zaposlen u Crnoj Gori ima pravo na najmanje {{me.odmor-najmanje}} plaćenog odmora godišnje, računato u radnim danima. Pri šestodnevnoj radnoj sedmici to je {{me.odmor-sest-dana}}, a pri skraćenom radnom vremenu najmanje {{me.odmor-skraceno}}.",
    "Ako ste se zaposlili ili otišli tokom godine, pripada vam dvanaestina za svaki započeti mjesec. Kalkulator to računa i zaokružuje onako kako propisuje zakon.",
  ],
  comoSeCalcula: [
    "Prvo se uzima broj dana iz kolektivnog ugovora ili ugovora o radu, ali ne manji od zakonskog minimuma.",
    "Za nepunu godinu taj broj se dijeli sa 12 i množi brojem započetih mjeseci rada.",
    "Rezultat se zaokružuje: najmanje pola dana računa se kao cijeli dan (čl. 79 st. 4).",
    "Praznici i bolovanje ne ulaze u dane odmora, jer se odmor broji u radnim danima (čl. 80).",
  ],
  ejemplo: [
    "Radnica je počela u junu, ima petodnevnu sedmicu i ugovorena 22 dana. Do kraja godine ima sedam započetih mjeseci. 22 podijeljeno sa 12 i pomnoženo sa 7 daje 12,83, pa joj pripada 13 dana odmora.",
  ],
  faq: [
    {
      pregunta: "Može li se odmor zamijeniti novcem?",
      respuesta: "Samo pri prestanku radnog odnosa. Član 79 stav 7 Zakona o radu kaže da se pravo na odmor inače ne može zamijeniti novčanom naknadom, a stav 6 da ga se zaposleni ne može odreći.",
    },
    {
      pregunta: "Računa li se bolovanje kao vrijeme na radu?",
      respuesta: "Da. Prema članu 79 stav 5, bolest, održavanje trudnoće, plaćeno, porodiljsko, očinsko i roditeljsko odsustvo računaju se kao vrijeme provedeno na radu za sticanje odmora.",
    },
    {
      pregunta: "Kad poslodavac mora da odredi termin odmora?",
      respuesta: "Plan korišćenja donosi do 30. aprila tekuće godine, a rješenje dostavlja najkasnije 30 dana prije početka odmora, ako se ne dogovorite drugačije (Zakon o radu, čl. 83).",
    },
    {
      pregunta: "Koliko dana ima zaposleno lice sa invaliditetom?",
      respuesta: "Najmanje 26 radnih dana plaćenog odmora, prema članu 119a Zakona o radu.",
    },
  ],
  glosario: [
    { termino: "Radni dan", definicion: "Dan u kom biste po rasporedu radili. Neradni praznik to nije." },
    { termino: "Rješenje o odmoru", definicion: "Akt poslodavca kojim se određuje vrijeme korišćenja odmora." },
    { termino: "Srazmjerni odmor", definicion: "Dvanaestina odmora za svaki započeti mjesec rada." },
  ],
});
