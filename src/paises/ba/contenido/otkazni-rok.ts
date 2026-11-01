import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ba.otkazni-rok",
  h1: "Otkazni rok {{anio}}: koliko traje u FBiH i RS",
  title: "Otkazni rok {{anio}}: {{ba.otkazni-radnik@fbih}} ili {{ba.otkazni-radnik@rs}} za radnika",
  description: "Otkazni rok je najmanje {{ba.otkazni-radnik@fbih}} u FBiH i {{ba.otkazni-radnik@rs}} u RS kad otkazuje radnik, a {{ba.otkazni-poslodavac@fbih}} i {{ba.otkazni-poslodavac@rs}} kad otkazuje firma.",
  intro: [
    "Entiteti se ovdje jako razlikuju. U FBiH radnik ima rok od najmanje {{ba.otkazni-radnik@fbih}}, a poslodavac {{ba.otkazni-poslodavac@fbih}}. U RS radnik ima najmanje {{ba.otkazni-radnik@rs}}, a poslodavac {{ba.otkazni-poslodavac@rs}}, u kalendarskim danima.",
    "Upišite datum kada je otkaz uručen, pa ćete vidjeti zadnji dan roka.",
  ],
  comoSeCalcula: [
    "Rok počinje da teče od dana uručenja otkaza, kako kažu oba zakona.",
    "Kalkulator uzima veći broj: zakonski minimum ili rok iz ugovora, kolektivnog ugovora ili pravilnika.",
    "U FBiH ugovorom se rok ne može produžiti preko mjesec dana kad otkazuje radnik, ni preko tri mjeseca kad otkazuje poslodavac.",
  ],
  ejemplo: [
    "Radnik u Tuzli uruči otkaz 1. novembra. Bez dužeg roka u ugovoru, zadnji dan je 8. novembar.",
    "Poslodavac u Banjoj Luci uruči otkaz 1. novembra, a ugovor predviđa 45 dana. Važi 45 dana, a ne zakonskih {{ba.otkazni-poslodavac@rs}}.",
  ],
  faq: [
    {
      pregunta: "Gdje je otkazni rok propisan u FBiH?",
      respuesta: "Član 105 Zakona o radu FBiH. Stav 1 daje minimum od sedam dana za radnika i 14 dana za poslodavca, a stav 3 gornje granice za ugovoreni rok.",
    },
    {
      pregunta: "Gdje je otkazni rok propisan u RS?",
      respuesta: "Član 192 Zakona o radu RS: najmanje 15 kalendarskih dana kad otkazuje radnik i 30 kalendarskih dana kad otkazuje poslodavac. Ostala pitanja uređuju opšti akt i ugovor o radu.",
    },
    {
      pregunta: "Šta ako me poslodavac oslobodi rada prije isteka roka u FBiH?",
      respuesta: "Član 106 kaže da poslodavac mora isplatiti naknadu plate i priznati sva ostala prava kao da je radnik radio do isteka roka.",
    },
  ],
  glosario: [
    { termino: "Otkazni rok", definicion: "Vrijeme između uručenja otkaza i prestanka radnog odnosa." },
    { termino: "Uručenje otkaza", definicion: "Trenutak kad druga strana primi pisani otkaz." },
    { termino: "Opšti akt", definicion: "Pravilnik o radu ili kolektivni ugovor kod poslodavca." },
  ],
});
