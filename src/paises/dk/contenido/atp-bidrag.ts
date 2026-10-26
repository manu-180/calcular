import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "dk.atp-bidrag",
  h1: "ATP-bidrag 2026: hvad betaler du og din arbejdsgiver?",
  title: "ATP-bidrag 2026: beregn dit og arbejdsgiverens bidrag",
  description:
    "Beregn ATP-bidraget efter dine arbejdstimer om måneden. Ved fuld tid betaler du {{dk.atp-loenmodtager[fuld]}} og arbejdsgiveren {{dk.atp-arbejdsgiver[fuld]}} om måneden.",
  intro: [
    "ATP Livslang Pension er en pension, som næsten alle lønmodtagere betaler til. Bidraget er et fast beløb, der afhænger af dine arbejdstimer.",
    "Skriv hvor mange timer du arbejder om måneden. Beregneren viser din andel og arbejdsgiverens andel for månedslønnede i det private.",
  ],
  comoSeCalcula: [
    "Mindst {{dk.atp-timegraenser[fuld]}} om måneden: du betaler {{dk.atp-loenmodtager[fuld]}} og arbejdsgiveren {{dk.atp-arbejdsgiver[fuld]}}.",
    "Fra {{dk.atp-timegraenser[to-tredjedele]}}: du betaler {{dk.atp-loenmodtager[to-tredjedele]}} og arbejdsgiveren {{dk.atp-arbejdsgiver[to-tredjedele]}}.",
    "Fra {{dk.atp-timegraenser[en-tredjedel]}}: du betaler {{dk.atp-loenmodtager[en-tredjedel]}} og arbejdsgiveren {{dk.atp-arbejdsgiver[en-tredjedel]}}.",
    "Under {{dk.atp-timegraenser[en-tredjedel]}} om måneden betales der ikke ATP.",
  ],
  ejemplo: ["Arbejder du 160 timer om måneden, betaler du 99 kr. og arbejdsgiveren 198 kr. Det giver 3.564 kr. til din ATP om året."],
  faq: [
    {
      pregunta: "Hvor meget betaler jeg i ATP om måneden?",
      respuesta: "Med mindst {{dk.atp-timegraenser[fuld]}} om måneden betaler du {{dk.atp-loenmodtager[fuld]}}. Arbejdsgiveren betaler det dobbelte.",
    },
    {
      pregunta: "Hvad hvis jeg er på deltid?",
      respuesta: "Så betaler du et lavere bidrag. Fra {{dk.atp-timegraenser[to-tredjedele]}} om måneden er din andel {{dk.atp-loenmodtager[to-tredjedele]}}.",
    },
    {
      pregunta: "Gælder satserne også i det offentlige?",
      respuesta: "Nej. Beregneren bruger satserne for månedslønnede i private virksomheder. Offentlige virksomheder har deres egne satser.",
    },
  ],
  glosario: [
    { termino: "ATP", definicion: "ATP Livslang Pension. Du og din arbejdsgiver betaler et fast bidrag hver måned." },
    { termino: "A-bidrag", definicion: "Det almindelige ATP-bidrag for lønmodtagere i private virksomheder." },
  ],
});
