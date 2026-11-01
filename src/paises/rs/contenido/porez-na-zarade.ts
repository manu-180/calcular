import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "rs.porez-na-zarade",
  h1: "Porez na zarade {{anio}}: obračun",
  title: "Porez na zarade {{anio}}: stopa {{rs.porez-na-zarade}} i neoporezivi iznos",
  description: "Obračunajte porez na zarade: {{rs.porez-na-zarade}} na bruto umanjen za neoporezivih {{rs.neoporezivi-iznos}}. Vidite osnovicu, stvarnu stopu i godišnji iznos.",
  intro: [
    "Porez na zarade je {{rs.porez-na-zarade}} i plaća se na bruto zaradu umanjenu za {{rs.neoporezivi-iznos}} mesečno. Taj iznos važi od {{rs.neoporezivi-iznos#desde}} za puno radno vreme.",
    "Pošto je jedan deo plate oslobođen, stvarna stopa na celu bruto zaradu uvek je manja od zakonske. Što je zarada niža, razlika je veća.",
  ],
  comoSeCalcula: [
    "Od bruto zarade oduzmite neoporezivi iznos. Pri nepunom radnom vremenu oduzima se srazmeran deo.",
    "Na ostatak primenite stopu od {{rs.porez-na-zarade}}.",
    "Doprinosi se ne oduzimaju od osnovice: porez se računa na bruto, a ne na iznos posle doprinosa.",
  ],
  ejemplo: [
    "Za bruto od 100.000 dinara osnovica je 65.779 dinara, a porez 6.577,90 dinara. Stvarna stopa je oko 6,58 odsto.",
    "Na pola radnog vremena i bruto od 50.000 dinara neoporezivo je 17.110,50 dinara, osnovica 32.889,50, a porez 3.288,95 dinara.",
  ],
  faq: [
    {
      pregunta: "Kolika je stopa poreza na zarade?",
      respuesta: "{{rs.porez-na-zarade}} (Zakon o porezu na dohodak građana, čl. 16).",
    },
    {
      pregunta: "Koliko se menja neoporezivi iznos u 2027. godini?",
      respuesta: "Član 15a posle izmene iz „Službenog glasnika RS“ 80/2026 predviđa 37.369 dinara mesečno, sa primenom od 1. januara 2027.",
    },
    {
      pregunta: "Da li se na topli obrok i regres plaća ovaj porez?",
      respuesta: "Da. Ishrana u toku rada i regres ulaze u zaradu (Zakon o radu, čl. 105 i 118), pa se porezuju po istoj stopi. Izuzeti su, do propisanih iznosa, recimo prevoz do posla i dnevnice (Zakon o porezu na dohodak građana, čl. 18).",
    },
    {
      pregunta: "Šta ako radim kod dva poslodavca?",
      respuesta: "Kad ostvarujete puno radno vreme kod više poslodavaca, svaki umanjuje osnovicu srazmerno vašem radnom vremenu kod njega, a ukupno umanjenje ostaje jedan mesečni iznos (čl. 15a).",
    },
  ],
  glosario: [
    { termino: "Neoporezivi iznos", definicion: "Deo zarade na koji se porez ne plaća." },
    { termino: "Poreska osnovica", definicion: "Bruto zarada umanjena za neoporezivi iznos." },
    { termino: "Stvarna stopa", definicion: "Porez podeljen sa celom bruto zaradom." },
  ],
});
