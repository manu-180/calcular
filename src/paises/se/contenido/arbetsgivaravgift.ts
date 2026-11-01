import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "se.arbetsgivaravgift",
  h1: "Räkna ut arbetsgivaravgift",
  title: "Arbetsgivaravgift {{anio}}: räkna ut kostnaden för en anställd",
  description:
    "Räkna ut arbetsgivaravgiften på en lön: {{se.arbetsgivaravgift}} i full avgift, sänkt avgift för unga och {{se.alderspensionsavgift}} för den som fyllt 67 år.",
  intro: [
    "Som arbetsgivare betalar du arbetsgivaravgifter ovanpå bruttolönen. Kalkylatorn visar avgiften och vad lönen kostar dig per månad och per år.",
    "Avgiften beror på den anställdas ålder. De flesta har full avgift, medan unga och äldre anställda har lägre avgift.",
  ],
  comoSeCalcula: [
    "Full arbetsgivaravgift är {{se.arbetsgivaravgift}} av bruttolönen och förmånerna.",
    "För anställda som är 19 till 23 år betalar du {{se.arbetsgivaravgift-unga}} på lön upp till {{se.unga-tak}} per kalendermånad. På den del som är över taket betalar du full avgift.",
    "För den som har fyllt 67 år vid årets början betalar du bara ålderspensionsavgiften, {{se.alderspensionsavgift}}.",
    "Lön och avgift tillsammans är din kostnad för lönen, före kollektivavtalets avgifter och försäkringar.",
  ],
  ejemplo: [
    "En lön på 35 000 kronor med full avgift ger 10 997 kronor i arbetsgivaravgift. Lönen kostar då 45 997 kronor i månaden.",
  ],
  faq: [
    {
      pregunta: "Hur mycket är arbetsgivaravgiften 2026?",
      respuesta: "Full avgift är {{se.arbetsgivaravgift}} av lönen. Den består av flera delar, bland annat ålderspensionsavgift, sjukförsäkringsavgift och allmän löneavgift.",
    },
    {
      pregunta: "Vilka omfattas av den sänkta avgiften för unga?",
      respuesta:
        "Ersättning som betalas ut från {{se.arbetsgivaravgift-unga#desde}} till och med 30 september 2027 till anställda som är 19 till 23 år. Under 2026 gäller det den som är född 2003 till 2007. Sänkningen gäller lön upp till {{se.unga-tak}} i månaden.",
    },
    {
      pregunta: "Vad gäller för anställda över 67 år?",
      respuesta: "Från 1 januari 2026 betalar du bara ålderspensionsavgiften, {{se.alderspensionsavgift}}, för den som har fyllt 67 år vid årets början.",
    },
    {
      pregunta: "Ingår semesterersättning och tjänstepension?",
      respuesta: "Nej. Kalkylatorn räknar bara avgiften på den lön du skriver in. Semesterlön, tjänstepension och avtalsförsäkringar kostar oftast mer.",
    },
  ],
  glosario: [
    { termino: "Arbetsgivaravgift", definicion: "Sociala avgifter som arbetsgivaren betalar på lön och förmåner." },
    { termino: "Ålderspensionsavgift", definicion: "Den del av avgifterna som går till den allmänna pensionen." },
    { termino: "Arbetsgivardeklaration", definicion: "Redovisningen till Skatteverket varje månad av löner, avdragen skatt och avgifter." },
  ],
});
