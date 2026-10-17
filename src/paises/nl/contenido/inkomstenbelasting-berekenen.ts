import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "nl.inkomstenbelasting-berekenen",
  h1: "Inkomstenbelasting berekenen 2026 (box 1)",
  title: "Inkomstenbelasting 2026 berekenen: box 1 en kortingen",
  description:
    "Bereken je inkomstenbelasting box 1 over 2026: drie schijven, algemene heffingskorting, arbeidskorting en de tariefsaanpassing voor aftrekposten.",
  intro: [
    "In box 1 betaal je belasting over je inkomen uit werk en woning, zoals loon, winst en het saldo van je eigen woning. In 2026 zijn er drie schijven. In de eerste schijf zitten ook de premies volksverzekeringen.",
    "Van de belasting gaan heffingskortingen af. Iedereen krijgt de algemene heffingskorting, wie werkt de arbeidskorting, en ouders van een kind jonger dan 12 soms de inkomensafhankelijke combinatiekorting.",
  ],
  comoSeCalcula: [
    "Trek je aftrekposten af van je inkomen. Wat overblijft is je belastbaar inkomen uit werk en woning.",
    "Bereken de belasting per schijf: tot en met € 38.883 tegen 35,75%, tot en met € 78.426 tegen 37,56% en daarboven 49,50%.",
    "Valt een deel van je aftrekposten in de hoogste schijf, dan krijg je daarover maar {{nl.aftrek-maximumtarief}} terug. Het verschil komt erbij als tariefsaanpassing.",
    "Trek de heffingskortingen af. Ze kunnen de belasting niet onder nul brengen.",
  ],
  ejemplo: [
    "Verdien je € 50.000 en heb je geen aftrekposten, dan is de belasting volgens de schijven € 18.076,22. Daar gaat € 1.818,51 algemene heffingskorting en € 5.398,04 arbeidskorting af. Je betaalt € 10.859,67 inkomstenbelasting.",
  ],
  faq: [
    {
      pregunta: "Wat is de algemene heffingskorting in 2026?",
      respuesta: "Maximaal {{nl.ahk[max]}}. Boven een verzamelinkomen van {{nl.ahk[afbouwgrens]}} wordt de korting {{nl.ahk-afbouw}} lager per euro die je meer verdient, tot nul.",
    },
    {
      pregunta: "Wie krijgt de inkomensafhankelijke combinatiekorting?",
      respuesta: "Je krijgt hem als je werkt en meer dan {{nl.iack[drempel]}} arbeidsinkomen hebt, en minstens zes maanden van het jaar een kind jonger dan 12 bij je woont. Heb je een partner, dan alleen als jij het laagste arbeidsinkomen hebt. De korting is maximaal {{nl.iack[max]}}.",
    },
    {
      pregunta: "Wat is de tariefsaanpassing?",
      respuesta: "Heb je een inkomen in de hoogste schijf, dan krijg je over aftrekposten zoals hypotheekrente maar {{nl.aftrek-maximumtarief}} belasting terug in plaats van het toptarief. Het verschil telt de Belastingdienst als tariefsaanpassing bij je belasting op.",
    },
    {
      pregunta: "Geldt dit ook voor box 2 en box 3?",
      respuesta: "Nee. Deze berekening gaat alleen over box 1. Voor sparen en beleggen in box 3 hebben we een aparte berekening.",
    },
  ],
  glosario: [
    { termino: "Verzamelinkomen", definicion: "Je inkomen uit box 1, 2 en 3 samen. Zonder box 2 en 3 is het gelijk aan je belastbaar inkomen uit werk en woning." },
    { termino: "Arbeidsinkomen", definicion: "Wat je verdient met werken: loon, winst uit onderneming en resultaat uit overig werk." },
    { termino: "Heffingskorting", definicion: "Een bedrag dat direct van je belasting afgaat." },
  ],
});
