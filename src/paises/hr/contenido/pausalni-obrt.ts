import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hr.pausalni-obrt",
  h1: "Paušalni obrt {{anio}}: kalkulator poreza i doprinosa",
  title: "Paušalni obrt {{anio}}: porez {{hr.pausal-stopa}} i doprinosi",
  description: "Izračunajte paušalni porez i doprinose obrta za svoj razred primitaka do {{hr.pausal-limit}}: dohodak, tromjesečni porez i godišnji iznos doprinosa.",
  intro: [
    "Paušalni obrt ne vodi stvarne troškove. Porez ovisi o razredu godišnjih primitaka: Porezna uprava određuje paušalni dohodak, a porez na njega je {{hr.pausal-stopa}}. Granica primitaka je {{hr.pausal-limit}} godišnje.",
    "Doprinosi su za 2026. fiksni: osnovica je {{hr.osnovice-samostalni[obrt-pausal]}} mjesečno, a mjesečno se plaća {{hr.pausal-doprinosi[mio-i]}} za I. stup, {{hr.pausal-doprinosi[mio-ii]}} za II. stup i {{hr.pausal-doprinosi[zdravstveno]}} za zdravstveno.",
  ],
  comoSeCalcula: [
    "Prema primicima odaberete razred iz tablice. Najniži razred ide do {{hr.pausal-ljestvica[0].hasta}} s dohotkom od {{hr.pausal-ljestvica[0].cuotaFija}}, a najviši s dohotkom od {{hr.pausal-ljestvica[-1].cuotaFija}}.",
    "Godišnji porez je {{hr.pausal-stopa}} paušalnog dohotka, a plaća se tromjesečno.",
    "Ako je obrt jedino osiguranje, doprinosi se plaćaju svaki mjesec. Ako ste osigurani po drugoj osnovi, plaćate {{hr.pausal-doprinosi-uz-rad[mio-i]}}, {{hr.pausal-doprinosi-uz-rad[mio-ii]}} i {{hr.pausal-doprinosi-uz-rad[zdravstveno]}} na godišnji paušalni dohodak.",
  ],
  ejemplo: [
    "Primici 30.000 eura, obrt je jedino zanimanje. Paušalni dohodak je 4.590 eura, a porez 550,80 eura, odnosno 137,70 eura po tromjesečju. Doprinosi su 290,98 eura mjesečno, ili 3.491,76 eura godišnje. Prije troškova poslovanja ostaje 25.957,44 eura.",
    "Uz radni odnos doprinosi za isti obrt iznose 803,25 eura godišnje.",
  ],
  faq: [
    {
      pregunta: "Kada se plaća paušalni porez?",
      respuesta: "Predujmovi se plaćaju do zadnjeg dana svakog tromjesečja. Izvješće PO-SD predaje se do 15. siječnja iduće godine, a razlika se plaća pri predaji.",
    },
    {
      pregunta: "Što ako primici prijeđu {{hr.pausal-limit}}?",
      respuesta: "Tada više nisu ispunjeni uvjeti za paušal. Prema Poreznoj upravi ista svota je i granica za obvezni ulazak u sustav PDV-a.",
    },
    {
      pregunta: "Što još plaća paušalist?",
      respuesta: "Porezna uprava navodi i članarinu turističkoj zajednici. Ovdje nije uključena, kao ni stvarni troškovi poslovanja. Rok za doprinose je 15. dan u mjesecu za prethodni mjesec.",
    },
  ],
  glosario: [
    { termino: "Paušalni dohodak", definicion: "Svota iz tablice na koju se plaća porez, bez obzira na stvarne troškove." },
    { termino: "PO-SD", definicion: "Godišnje izvješće paušalista Poreznoj upravi." },
    { termino: "KPR", definicion: "Knjiga prometa koju vodi paušalni obrtnik." },
  ],
});
