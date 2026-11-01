import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "dk.aktieskat",
  h1: "Aktieskat: beregn skat af aktiegevinst og udbytte",
  title: "Aktieskat {{anio}}: beregn skat af aktieindkomst",
  description:
    "Beregn skatten af aktiegevinster og udbytte: {{dk.aktieindkomst-satser[lav]}} op til {{dk.aktieindkomst-graense}} og {{dk.aktieindkomst-satser[hoej]}} af resten.",
  intro: [
    "Gevinster og udbytte fra aktier i et almindeligt depot er aktieindkomst. Den beskattes for sig, uden for den almindelige indkomstskat.",
    "Skriv din samlede aktieindkomst for året. Beregneren deler den op på de to skattetrin.",
  ],
  comoSeCalcula: [
    "Op til {{dk.aktieindkomst-graense}} betaler du {{dk.aktieindkomst-satser[lav]}}.",
    "Af den del, der ligger over grænsen, betaler du {{dk.aktieindkomst-satser[hoej]}}.",
    "Gevinster, tab og udbytte for hele året lægges sammen til én aktieindkomst.",
  ],
  ejemplo: ["I 2026 med 100.000 kr. i aktieindkomst betaler du 21.438 kr. på laveste trin og 8.652 kr. på højeste trin. I alt 30.090 kr."],
  faq: [
    {
      pregunta: "Hvad er grænsen for aktieindkomst?",
      respuesta: "Fra {{dk.aktieindkomst-graense#desde}} er progressionsgrænsen {{dk.aktieindkomst-graense}} pr. person. Under grænsen er skatten {{dk.aktieindkomst-satser[lav]}}, over grænsen {{dk.aktieindkomst-satser[hoej]}}.",
    },
    {
      pregunta: "Gælder aktieskatten også for udbytte?",
      respuesta: "Ja. Udbytte og gevinster lægges sammen som aktieindkomst og beskattes efter de samme satser.",
    },
    {
      pregunta: "Hvad med aktiesparekonto og pension?",
      respuesta: "De beskattes efter andre regler. Beregneren gælder aktier og aktiebaserede investeringsbeviser i et almindeligt depot.",
    },
  ],
  glosario: [
    { termino: "Aktieindkomst", definicion: "Gevinst, tab og udbytte af aktier, der beskattes særskilt." },
    { termino: "Progressionsgrænse", definicion: "Grænsen, hvor skatten stiger fra {{dk.aktieindkomst-satser[lav]}} til {{dk.aktieindkomst-satser[hoej]}}." },
  ],
});
