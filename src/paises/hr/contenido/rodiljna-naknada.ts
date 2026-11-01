import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hr.rodiljna-naknada",
  h1: "Rodiljna naknada {{anio}}: izračun po vrsti dopusta",
  title: "Rodiljna naknada {{anio}}: {{hr.rodiljna-stopa}}, najviše {{hr.roditeljska-najvise}}",
  description: "Izračunajte rodiljnu i roditeljsku naknadu: rodiljni {{hr.rodiljna-stopa}} osnovice, roditeljski najviše {{hr.roditeljska-najvise}} i najmanje {{hr.rodiljna-najmanje}} mjesečno.",
  intro: [
    "Za rodiljni dopust naknada je {{hr.rodiljna-stopa}} osnovice, bez gornje granice. Traje do šest mjeseci života djeteta. Bez propisanog prethodnog staža osiguranja naknada je {{hr.rodiljna-najmanje}} mjesečno.",
    "Za roditeljski dopust naknada je također puna osnovica, ali najviše {{hr.roditeljska-najvise}} i najmanje {{hr.rodiljna-najmanje}} mjesečno. Svote objavljuje HZZO.",
  ],
  comoSeCalcula: [
    "Unesite osnovicu za naknadu plaće. Izračunava je HZZO iz vaših plaća, a ovdje je dovoljna procjena.",
    "Rodiljni dopust: {{hr.rodiljna-stopa}} osnovice. Roditeljski dopust: osnovica, ograničena između {{hr.rodiljna-najmanje}} i {{hr.roditeljska-najvise}}.",
    "Preostali roditeljski dopust, za blizance, treće i svako iduće dijete, plaća se fiksno: {{hr.roditeljska-preostali}} mjesečno.",
  ],
  ejemplo: [
    "Osnovica 4.000 eura. Na rodiljnom dopustu naknada je 4.000 eura mjesečno. Na roditeljskom je ograničena na 3.001,79 euro mjesečno.",
    "Kod osnovice od 500 eura roditeljska naknada podiže se na 701,89 eura mjesečno, što je zakonski najmanji iznos.",
  ],
  faq: [
    {
      pregunta: "Koliko traje roditeljski dopust?",
      respuesta: "Prema HZZO-u od šest mjeseci života do osme godine djeteta: 8 mjeseci za prvo i drugo dijete, a 30 mjeseci za blizance, treće i svako iduće dijete. Ako ga koristi samo jedan roditelj, 6 odnosno 28 mjeseci.",
    },
    {
      pregunta: "Koliko traje obvezni dio rodiljnog dopusta?",
      respuesta: "Od 28 dana prije očekivanog poroda do 70 dana nakon poroda. Cijeli rodiljni dopust traje do šest mjeseci života djeteta.",
    },
    {
      pregunta: "Kolika je naknada za očinski dopust?",
      respuesta: "Očinski dopust traje 20 radnih dana, a 30 radnih dana za blizance ili više djece. Naknada je 100 % osnovice, bez gornje granice.",
    },
  ],
  glosario: [
    { termino: "Rodiljni dopust", definicion: "Dopust majke oko poroda i do šest mjeseci života djeteta." },
    { termino: "Roditeljski dopust", definicion: "Dopust koji mogu koristiti oba roditelja nakon rodiljnog." },
    { termino: "Proračunska osnovica", definicion: "Iznos prema kojem se određuju najniže i najviše naknade." },
  ],
});
