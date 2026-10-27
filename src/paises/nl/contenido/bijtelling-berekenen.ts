import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "nl.bijtelling-berekenen",
  h1: "Bijtelling auto van de zaak berekenen {{anio}}",
  title: "Bijtelling {{anio}} berekenen: auto van de zaak en elektrisch",
  description:
    "Bereken de bijtelling voor je auto van de zaak in {{anio}}: {{nl.bijtelling[algemeen]}} van de cataloguswaarde, met korting voor elektrische auto's. Met wat de auto je netto kost.",
  intro: [
    "Mag je een auto van de zaak ook privé gebruiken, dan tel je een bedrag bij je inkomen op: de bijtelling. Voor de meeste auto's is dat {{nl.bijtelling[algemeen]}} van de cataloguswaarde per jaar.",
    "Voor een auto zonder CO2-uitstoot geldt een korting op de bijtelling, tot een maximale cataloguswaarde (de cap). Hoe groot die korting is, hangt af van het jaar waarin de auto voor het eerst op de weg kwam.",
  ],
  comoSeCalcula: [
    "Bijtelling = cataloguswaarde × {{nl.bijtelling[algemeen]}}. Voor een auto die voor 2017 voor het eerst is toegelaten is het {{nl.bijtelling[voor-2017]}}.",
    "Voor een elektrische auto van 2026 gaat er {{nl.bijtelling-korting-emissievrij[2026]}} af over de waarde tot {{nl.bijtelling-cap[2026]}}. Bij waterstof en zonnecellen geldt geen cap.",
    "Is de auto meer dan 16 jaar geleden voor het eerst in gebruik genomen, dan is de bijtelling {{nl.bijtelling[youngtimer]}} van de waarde in het economisch verkeer.",
    "Een eigen bijdrage die je aan je werkgever betaalt, gaat van de bijtelling af. Over wat overblijft betaal je belasting tegen je tarief in box 1.",
  ],
  ejemplo: [
    "Een elektrische auto van 2026 met een cataloguswaarde van € 45.000: 22% × € 45.000 = € 9.900, min 4% × € 30.000 = € 1.200. De bijtelling is € 8.700 per jaar. Bij een inkomen van € 60.000 kost dat je ongeveer € 272 per maand netto.",
  ],
  faq: [
    {
      pregunta: "Hoe voorkom je bijtelling?",
      respuesta: "Rijd je aantoonbaar niet meer dan 500 kilometer per jaar privé, bijvoorbeeld met een rittenregistratie, dan heb je geen bijtelling. Woon-werkverkeer telt niet als privé.",
    },
    {
      pregunta: "Wat is de cataloguswaarde?",
      respuesta: "De catalogusprijs van de auto inclusief btw en bpm. Voor een auto die meer dan vijftien jaar geleden voor het eerst in gebruik is genomen, geldt de waarde in het economisch verkeer.",
    },
    {
      pregunta: "Blijft het percentage van mijn elektrische auto altijd gelden?",
      respuesta: "Het percentage dat geldt bij de eerste toelating blijft in principe 60 maanden gelden. Daarna geldt het percentage van dat moment. Daarom maakt het jaar van eerste toelating uit.",
    },
  ],
  glosario: [
    { termino: "Bijtelling", definicion: "Het bedrag dat je bij je inkomen telt voor het privégebruik van een auto van de zaak." },
    { termino: "Cap", definicion: "De cataloguswaarde tot waar de korting voor een emissievrije auto geldt." },
  ],
});
