import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "se.fastighetsavgift",
  h1: "Räkna ut fastighetsavgiften för ditt hus",
  title: "Fastighetsavgift {{anio}}: räkna ut avgiften för småhus",
  description:
    "Räkna ut den kommunala fastighetsavgiften för ditt småhus {{anio}}: {{se.fastighetsavgift[sats]}} procent av taxeringsvärdet, högst {{se.fastighetsavgift[tak]}} kronor.",
  intro: [
    "Äger du ett småhus betalar du kommunal fastighetsavgift varje år. Den beror på taxeringsvärdet men har ett tak.",
    "Nyare hus är avgiftsfria de första åren. Kalkylatorn räknar ut avgiften per år och per månad.",
  ],
  comoSeCalcula: [
    "Avgiften är {{se.fastighetsavgift[sats]}} procent av taxeringsvärdet.",
    "Den blir aldrig högre än {{se.fastighetsavgift[tak]}} kronor per år för 2026.",
    "Hus med värdeår 2012 eller senare betalar ingen fastighetsavgift de första {{se.fastighetsavgift[fria-ar]}} åren.",
  ],
  ejemplo: ["Ett hus med taxeringsvärdet 1 000 000 kronor ger 7 500 kronor i fastighetsavgift. Med taxeringsvärdet 2 000 000 kronor når du taket."],
  faq: [
    {
      pregunta: "Hur mycket är fastighetsavgiften 2026?",
      respuesta: "{{se.fastighetsavgift[sats]}} procent av taxeringsvärdet, men högst {{se.fastighetsavgift[tak]}} kronor för ett småhus.",
    },
    {
      pregunta: "När betalar jag fastighetsavgiften?",
      respuesta: "Den ingår i din slutliga skatt och räknas fram i deklarationen för året.",
    },
    {
      pregunta: "Vad är värdeår?",
      respuesta: "Värdeåret används i fastighetstaxeringen och är ofta det år huset byggdes. Du hittar det på beslutet om fastighetstaxering.",
    },
  ],
  glosario: [
    { termino: "Taxeringsvärde", definicion: "Fastighetens värde enligt Skatteverkets fastighetstaxering." },
    { termino: "Småhus", definicion: "Villa, radhus eller fritidshus för en eller två familjer." },
  ],
});
