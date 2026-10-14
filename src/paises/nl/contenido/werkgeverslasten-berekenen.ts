import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "nl.werkgeverslasten-berekenen",
  h1: "Werkgeverslasten berekenen 2026",
  title: "Werkgeverslasten 2026: wat kost een werknemer echt?",
  description:
    "Bereken de loonkosten van een werknemer in 2026: brutoloon, vakantiegeld, premies werknemersverzekeringen en de werkgeversheffing Zvw van {{nl.zvw-werkgeversheffing}}.",
  intro: [
    "Een werknemer kost meer dan zijn brutoloon. Als werkgever betaal je premies werknemersverzekeringen en de werkgeversheffing Zorgverzekeringswet, en vaak ook pensioenpremie.",
    "Vul het brutoloon en het soort contract in. Je ziet wat de werknemer je per jaar en per maand kost met de premiepercentages van 2026.",
  ],
  comoSeCalcula: [
    "Het loon is het brutoloon plus vakantiegeld. De premies betaal je over het loon tot het maximumpremieloon van {{nl.maximumpremieloon}} per jaar.",
    "WW-premie (AWf): {{nl.premies-werkgever[awf-laag]}} voor een schriftelijk contract voor onbepaalde tijd dat geen oproepcontract is, anders {{nl.premies-werkgever[awf-hoog]}}.",
    "Arbeidsongeschiktheidspremie (Aof): {{nl.premies-werkgever[aof-laag]}} voor kleine werkgevers en {{nl.premies-werkgever[aof-hoog]}} voor middelgrote en grote. Daarbovenop de opslag kinderopvang (Wko) van {{nl.premies-werkgever[wko]}}.",
    "De Whk-premie verschilt per werkgever. Vul die in uit je beschikking. Daarnaast betaal je {{nl.zvw-werkgeversheffing}} werkgeversheffing Zvw.",
  ],
  ejemplo: [
    "Een werknemer met € 3.500 per maand, vakantiegeld en een vast contract bij een kleine werkgever kost je zonder Whk en pensioen € 52.440,70 per jaar: 15,6% bovenop het brutoloon.",
  ],
  faq: [
    {
      pregunta: "Wanneer betaal je de hoge WW-premie?",
      respuesta: "De lage premie geldt voor een schriftelijke arbeidsovereenkomst voor onbepaalde tijd die geen oproepovereenkomst is. Voor de meeste andere contracten betaal je de hoge premie.",
    },
    {
      pregunta: "Wanneer ben je een kleine werkgever?",
      respuesta: "Voor 2026 als je premieloonsom in 2024 niet hoger was dan 25 keer het gemiddelde premieloon van € 43.300, dus tot en met € 1.082.500.",
    },
    {
      pregunta: "Gaan deze premies van het loon van de werknemer af?",
      respuesta: "Nee. Premies werknemersverzekeringen en de werkgeversheffing Zvw betaal je als werkgever zelf, bovenop het brutoloon.",
    },
  ],
  glosario: [
    { termino: "AWf", definicion: "Algemeen Werkloosheidsfonds: de premie voor de WW." },
    { termino: "Aof", definicion: "Arbeidsongeschiktheidsfonds: de premie voor arbeidsongeschiktheidsuitkeringen." },
    { termino: "Whk", definicion: "Werkhervattingskas: een premie die per werkgever of sector wordt vastgesteld." },
    { termino: "Maximumpremieloon", definicion: "Het loon tot waar je premies werknemersverzekeringen betaalt." },
  ],
});
