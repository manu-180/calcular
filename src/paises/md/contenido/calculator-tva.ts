import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "md.calculator-tva",
  h1: "Calculator TVA Moldova",
  title: "Calculator TVA {{anio}}: adăugați sau extrageți TVA",
  description: "Adăugați TVA la un preț sau extrageți TVA dintr-un preț cu taxă, la cota standard de {{md.tva[standard]}} sau la cota redusă de {{md.tva[redusa]}}.",
  intro: [
    "Taxa pe valoarea adăugată se aplică la majoritatea bunurilor și serviciilor vândute în Republica Moldova. Cota standard este {{md.tva[standard]}}.",
    "Calculatorul face ambele drumuri: de la prețul fără TVA la prețul final și invers.",
  ],
  comoSeCalcula: [
    "Adăugare: TVA este prețul fără taxă înmulțit cu cota. Prețul cu TVA este suma celor două.",
    "Extragere: prețul fără TVA este prețul cu taxă împărțit la 1 plus cota. TVA este diferența.",
    "Fiecare sumă se rotunjește la ban.",
  ],
  faq: [
    {
      pregunta: "Care este cota standard a TVA în 2026?",
      respuesta: "{{md.tva[standard]}} din valoarea impozabilă a livrării.",
    },
    {
      pregunta: "Pentru ce se aplică cota redusă de {{md.tva[redusa]}}?",
      respuesta: "Pentru bunurile și serviciile enumerate la art. 96 din Codul fiscal. Verificați lista în Codul fiscal sau la Serviciul Fiscal de Stat înainte să o aplicați.",
    },
    {
      pregunta: "Cum scot TVA dintr-un preț?",
      respuesta: "Alegeți „Extrageți TVA” și introduceți prețul cu taxă. La cota standard, TVA este prețul împărțit la 6.",
    },
  ],
  glosario: [
    { termino: "TVA", definicion: "Taxa pe valoarea adăugată, plătită de cumpărător în preț și virată la buget de vânzător." },
    { termino: "Cotă redusă", definicion: "Cota mai mică prevăzută de Codul fiscal pentru anumite bunuri și servicii." },
  ],
});
