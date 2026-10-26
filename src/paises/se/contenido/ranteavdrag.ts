import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "se.ranteavdrag",
  h1: "Räkna ut ränteavdrag på bolånet",
  title: "Ränteavdrag 2026: räkna ut skattereduktionen för dina räntor",
  description:
    "Räkna ut ränteavdraget: {{se.ranteavdrag[sats]}} procent skattereduktion på underskott upp till {{se.ranteavdrag[grans]}} kronor och {{se.ranteavdrag[over]}} procent på resten.",
  intro: [
    "Betalar du ränta på bolånet får du tillbaka en del i deklarationen. Ränteutgifterna ger ett underskott av kapital, och på det får du en skattereduktion.",
    "Kalkylatorn visar skattereduktionen per år och per månad och vad räntan kostar dig efter avdraget.",
  ],
  comoSeCalcula: [
    "Dra av dina kapitalinkomster, till exempel ränta och vinster, från ränteutgifterna. Blir det minus har du ett underskott av kapital.",
    "På underskottet upp till {{se.ranteavdrag[grans]}} kronor får du {{se.ranteavdrag[sats]}} procent i skattereduktion.",
    "På den del av underskottet som är över {{se.ranteavdrag[grans]}} kronor får du {{se.ranteavdrag[over]}} procent.",
    "Har du i stället ett överskott betalar du {{se.kapitalskatt}} skatt på det.",
  ],
  ejemplo: ["Betalar du 60 000 kronor i ränta på bolånet och har inga andra kapitalinkomster får du 18 000 kronor i skattereduktion. Räntan kostar dig då 42 000 kronor."],
  faq: [
    {
      pregunta: "Hur mycket får man tillbaka på räntan?",
      respuesta: "{{se.ranteavdrag[sats]}} procent av ränteutgifterna upp till ett underskott på {{se.ranteavdrag[grans]}} kronor. Över det får du {{se.ranteavdrag[over]}} procent.",
    },
    {
      pregunta: "Får jag ränteavdrag för lån utan säkerhet?",
      respuesta: "Nej. Räntor på lån utan säkerhet, som blancolån och krediter, ska inte tas med när du räknar avdraget.",
    },
    {
      pregunta: "Vad händer om min skatt är för låg?",
      respuesta: "Skattereduktionen kan inte bli större än den skatt du ska betala. Det som inte ryms försvinner och kan inte sparas till ett annat år.",
    },
    {
      pregunta: "Kan vi fördela räntan mellan oss om vi har ett gemensamt lån?",
      respuesta: "Ja. Ni kan fördela ränteutgifterna på ett annat sätt i deklarationen, så att den som har tillräckligt hög skatt får avdraget.",
    },
  ],
  glosario: [
    { termino: "Underskott av kapital", definicion: "När dina kapitalutgifter, till exempel räntor, är större än dina kapitalinkomster." },
    { termino: "Skattereduktion", definicion: "Ett belopp som dras direkt från den skatt du ska betala." },
  ],
});
