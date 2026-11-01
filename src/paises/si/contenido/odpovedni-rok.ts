import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "si.odpovedni-rok",
  h1: "Odpovedni rok {{anio}}: izračun po ZDR-1",
  title: "Odpovedni rok {{anio}}: koliko dni po ZDR-1",
  description: "Odpovedni rok po 94. členu ZDR-1: od {{si.odpovedni-rok[poskusno]}} do {{si.odpovedni-rok[nad25]}}. Izračun glede na razlog in leta zaposlitve.",
  intro: [
    "Odpovedni rok je odvisen od tega, kdo odpoveduje, zakaj in kako dolgo ste zaposleni. Najkrajši je pri neuspešnem poskusnem delu: {{si.odpovedni-rok[poskusno]}}. Najdaljši je po 25 letih: {{si.odpovedni-rok[nad25]}}.",
    "Kalkulator pokaže najkrajši zakonski rok iz 94. člena ZDR-1. Kolektivna pogodba ali pogodba o zaposlitvi lahko določi drugačnega v okviru zakona.",
  ],
  comoSeCalcula: [
    "Delavec: do enega leta {{si.odpovedni-rok[delavec-do1]}}, nato {{si.odpovedni-rok[delavec-nad1]}}. Dogovorjeni rok ne sme biti daljši od {{si.odpovedni-rok[najvec]}}.",
    "Delodajalec, poslovni razlog ali nesposobnost: do enega leta {{si.odpovedni-rok[do1]}}, od enega do dveh let {{si.odpovedni-rok[do2]}}, nato se rok podaljša za {{si.odpovedni-rok[prirastek]}} za vsako izpolnjeno leto, do {{si.odpovedni-rok[najvec]}}.",
    "Nad 25 let je rok {{si.odpovedni-rok[nad25]}}, če kolektivna pogodba dejavnosti ne določa drugače. Pri krivdnem razlogu je {{si.odpovedni-rok[krivdni]}}.",
  ],
  ejemplo: [
    "Delodajalec odpove iz poslovnega razloga po petih letih zaposlitve: 30 dni in 3 krat 2 dneva, skupaj 36 dni.",
    "Delavec po treh letih sam odpove pogodbo: rok je 30 dni.",
  ],
  faq: [
    {
      pregunta: "Kdaj začne teči odpovedni rok?",
      respuesta: "Praviloma naslednji dan po vročitvi odpovedi, kot določa ZDR-1. Pri izračunu datuma si lahko pomagate s kalkulatorjem za prištevanje dni.",
    },
    {
      pregunta: "Ali se šteje čas pri prejšnjem delodajalcu?",
      respuesta: "Za dobo zaposlitve se šteje tudi doba pri pravnih prednikih delodajalca (peti odstavek 94. člena ZDR-1), ne pa pri drugih delodajalcih.",
    },
    {
      pregunta: "Ali je mogoč krajši rok?",
      respuesta: "Pri rednih odpovedih so to minimalni roki. Pri krivdnem razlogu velja rok {{si.odpovedni-rok[krivdni]}}, pri izredni odpovedi pa posebna pravila 109. člena ZDR-1.",
    },
  ],
  glosario: [
    { termino: "Odpovedni rok", definicion: "Čas od odpovedi do prenehanja pogodbe o zaposlitvi." },
    { termino: "Krivdni razlog", definicion: "Kršitev pogodbenih ali drugih obveznosti iz delovnega razmerja." },
  ],
});
