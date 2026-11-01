import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "se.barnbidrag",
  h1: "Räkna ut barnbidrag och flerbarnstillägg",
  title: "Barnbidrag {{anio}}: räkna ut barnbidrag och flerbarnstillägg",
  description:
    "Räkna ut barnbidraget för dina barn: {{se.barnbidrag}} per barn och månad, plus flerbarnstillägg från det andra barnet.",
  intro: [
    "Barnbidraget är {{se.barnbidrag}} i månaden för varje barn. Har du två eller fler barn får du också flerbarnstillägg, som blir större för varje barn.",
    "Skriv in hur många barn du får barnbidrag för, så ser du vad som betalas ut per månad och per år.",
  ],
  comoSeCalcula: [
    "Barnbidraget är {{se.barnbidrag}} per barn och månad.",
    "Flerbarnstillägget är {{se.flerbarnstillagg[2]}} för det andra barnet, {{se.flerbarnstillagg[3]}} för det tredje och {{se.flerbarnstillagg[4]}} för det fjärde.",
    "För det femte barnet och varje barn därefter är tillägget {{se.flerbarnstillagg[5]}}.",
    "Delar två föräldrar på bidraget får var och en hälften.",
  ],
  ejemplo: ["Med tre barn blir barnbidraget 3 750 kronor och flerbarnstillägget 730 kronor. Totalt 4 480 kronor i månaden."],
  faq: [
    {
      pregunta: "Hur mycket är barnbidraget 2026?",
      respuesta: "{{se.barnbidrag}} i månaden för varje barn, från och med månaden efter att barnet har fötts.",
    },
    {
      pregunta: "Räknas barn över 16 år?",
      respuesta:
        "Ja, för flerbarnstillägget kan barn som studerar och får förlängt barnbidrag eller studiebidrag räknas med. Kalkylatorn räknar med de barn du skriver in.",
    },
    {
      pregunta: "Hur mycket får man i flerbarnstillägg för två barn?",
      respuesta: "{{se.flerbarnstillagg[2]}} i månaden. Tillsammans med barnbidraget blir det 2 650 kronor för två barn.",
    },
  ],
  glosario: [
    { termino: "Barnbidrag", definicion: "Ett bidrag från Försäkringskassan för varje barn, till och med det kvartal barnet fyller 16 år." },
    { termino: "Flerbarnstillägg", definicion: "Ett extra bidrag för familjer med två eller fler barn." },
  ],
});
