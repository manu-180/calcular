import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "dk.kommuneskat",
  h1: "Kommuneskat {{anio}} for alle 98 kommuner",
  title: "Kommuneskat {{anio}}: se skatteprocenten i din kommune",
  description: "Find kommuneskat, kirkeskat og grundskyld for {{anio}} i din kommune. I København er kommuneskatten {{dk.kommuneskat[koebenhavn]}}.",
  intro: [
    "Vælg din kommune og se kommuneskat, kirkeskat og den samlede skatteprocent med bundskatten for 2026.",
    "Skriv din skattepligtige indkomst, hvis du vil se kommuneskatten i kroner.",
  ],
  comoSeCalcula: [
    "Kommuneskat og kirkeskat betales af den skattepligtige indkomst over personfradraget på {{dk.personfradrag}}.",
    "Bundskatten på {{dk.bundskat}} er den samme i hele landet og går til staten.",
    "Kirkeskat betaler du kun, hvis du er medlem af folkekirken.",
    "Skatteloftet på {{dk.skatteloft}} sætter mellemskatten ned i de kommuner, hvor kommuneskat, bundskat og mellemskat tilsammen ligger over loftet.",
  ],
  ejemplo: ["I København er kommuneskatten {{dk.kommuneskat[koebenhavn]}} og kirkeskatten {{dk.kirkeskat[koebenhavn]}}. Med bundskatten bliver det 36,20 % i alt."],
  faq: [
    {
      pregunta: "Hvilken kommune har den laveste kommuneskat i 2026?",
      respuesta: "København har den laveste kommuneskat med {{dk.kommuneskat[koebenhavn]}}. Vejle og Rudersdal ligger også lavt med {{dk.kommuneskat[vejle]}} og {{dk.kommuneskat[rudersdal]}}.",
    },
    {
      pregunta: "Hvilken kommune har den højeste kommuneskat?",
      respuesta: "Flere kommuner ligger på {{dk.kommuneskat[lolland]}}, blandt andet Lolland, Langeland og Vordingborg.",
    },
    {
      pregunta: "Hvad er grundskyld?",
      respuesta: "Grundskyld er en skat til kommunen af grundværdien, hvis du ejer en bolig. Promillen fastsættes af kommunen. I København er den {{dk.grundskyld[koebenhavn]}} promille.",
    },
  ],
  glosario: [
    { termino: "Kommuneskat", definicion: "Skat til kommunen af den skattepligtige indkomst. Procenten fastsættes af hver kommune." },
    { termino: "Kirkeskat", definicion: "Skat til folkekirken. Den betales kun af medlemmer." },
    { termino: "Skatteloftsnedslag", definicion: "Det antal procentpoint, mellemskatten sættes ned med i kommuner med høj kommuneskat." },
  ],
});
