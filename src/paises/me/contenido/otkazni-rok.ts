import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "me.otkazni-rok",
  h1: "Otkazni rok {{anio}}: do kog datuma ostajete na poslu",
  title: "Otkazni rok {{anio}}: najmanje {{me.otkazni-rok}}, datum poslednjeg dana",
  description: "Otkazni rok traje najmanje {{me.otkazni-rok}}, a na probnom radu {{me.otkazni-probni}}. Unesite datum otkaza i saznajte poslednji radni dan i časove za traženje posla.",
  intro: [
    "Po Zakonu o radu otkazni rok traje najmanje {{me.otkazni-rok}} od dana dostavljanja otkaza ili odluke o prestanku radnog odnosa. Za vrijeme probnog rada dovoljno je {{me.otkazni-probni}}.",
    "Unesite datum kada je otkaz dostavljen i, ako je ugovoreno duže, broj dana iz ugovora. Dobićete poslednji dan roka.",
  ],
  comoSeCalcula: [
    "Rok se broji kalendarski, od datuma dostavljanja. Kalkulator na taj datum dodaje broj dana.",
    "Ako je ugovor dao duži rok, važi ugovor. Kraći od zakonskog ne može, osim kad se zaposleni i poslodavac sporazumiju da rad prestane ranije.",
    "Za vrijeme roka zaposleni ima pravo da odsustvuje najmanje {{me.otkazni-casovi}} sedmično radi traženja posla.",
  ],
  ejemplo: [
    "Otkaz je dostavljen 2. novembra 2026. Uz rok od 30 dana poslednji dan je 2. decembar 2026. U tih pet započetih sedmica imate pravo na najmanje 20 časova odsustva radi traženja novog posla.",
  ],
  faq: [
    {
      pregunta: "Mora li zaposleni da poštuje otkazni rok kad sam daje otkaz?",
      respuesta: "Da. Član 166 Zakona o radu traži da otkaz, prethodno ovjeren, dostavi poslodavcu pisano najmanje 30 dana prije dana prestanka, osim ako se drugačije dogovore. Ako rok ne ispoštuje, poslodavac ima pravo na naknadu štete.",
    },
    {
      pregunta: "Kada poslodavac može da otkaže bez otkaznog roka?",
      respuesta: "U slučajevima iz člana 172 stav 1 koje navodi član 177 stav 2 i kod teže povrede radne obaveze po kolektivnom ugovoru.",
    },
    {
      pregunta: "Šta ako me poslodavac oslobodi rada prije kraja roka?",
      respuesta: "Tada imate pravo na naknadu zarade i ostala prava kao da ste radili do kraja roka (Zakon o radu, čl. 177 st. 4).",
    },
  ],
  glosario: [
    { termino: "Otkazni rok", definicion: "Vrijeme između dostavljanja otkaza i prestanka radnog odnosa." },
    { termino: "Probni rad", definicion: "Period na početku rada za provjeru sposobnosti, uz kraći otkazni rok." },
    { termino: "Sporazumni prestanak", definicion: "Prekid radnog odnosa uz pisani dogovor obje strane, ovjeren kod nadležnog organa." },
  ],
});
