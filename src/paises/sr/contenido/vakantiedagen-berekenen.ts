import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sr.vakantiedagen-berekenen",
  h1: "Vakantiedagen berekenen in Suriname",
  title: "Vakantiedagen Suriname: van {{sr.vakantiedagen-basis}} tot {{sr.vakantiedagen-max}} per jaar",
  description:
    "Hoeveel vakantiedagen heb je volgens de Vacantiewet 1975? Na een vol jaar {{sr.vakantiedagen-basis}}, daarna elk jaar {{sr.vakantiedagen-stap}} meer tot {{sr.vakantiedagen-max}}. Reken het uit.",
  intro: [
    "Elke werknemer in Suriname heeft recht op jaarlijkse vakantie met behoud van loon. Het aantal dagen groeit met het aantal jaren dat je bij dezelfde werkgever werkt.",
    "Je werkgever mag je vakantie niet afkopen of laten vervallen. Afspraken die je meer vakantie geven, mogen wel.",
  ],
  comoSeCalcula: [
    "Na een kalenderjaar onafgebroken bij dezelfde werkgever heb je {{sr.vakantiedagen-basis}} werkdagen vakantie.",
    "Elk volgend kalenderjaar komen er {{sr.vakantiedagen-stap}} werkdagen bij, tot het maximum van {{sr.vakantiedagen-max}} werkdagen.",
    "Ben je dit jaar begonnen, dan krijg je een werkdag per volle maand in dienst.",
  ],
  ejemplo: ["Ben je drie volle kalenderjaren bij dezelfde werkgever, dan heb je 12 + 2 + 2 = 16 vakantiedagen."],
  faq: [
    {
      pregunta: "Wanneer neem ik mijn vakantie op?",
      respuesta: "Je neemt de vakantiedagen na afloop van het kalenderjaar op, in de loop van het jaar daarna. Heb je recht op meer dan zes dagen, dan neem je minstens een periode van zes werkdagen aaneen. Je werkgever bepaalt de data in overleg met jou.",
    },
    {
      pregunta: "Telt afwezigheid mee?",
      respuesta: "Je geldt als een vol jaar in dienst als je in dat jaar hoogstens dertig werkdagen geoorloofd afwezig was, ziekte en ongeval niet meegerekend. Was je langer afwezig, dan krijg je een evenredig deel van je vakantie.",
    },
    {
      pregunta: "Krijg ik ook vakantiegeld?",
      respuesta: "Ja. Tijdens je vakantie betaalt je werkgever naast je loon een vakantietoelage van de helft van het loon over je vakantiedagen. Reken het uit met de berekening van de vakantietoelage.",
    },
    {
      pregunta: "Mag ik tijdens mijn vakantie ergens anders werken?",
      respuesta: "Nee. De Vacantiewet verbiedt betaald werk tijdens je vakantie.",
    },
  ],
  glosario: [
    { termino: "Vacantiewet 1975", definicion: "De wet die de jaarlijkse vakantie van werknemers in Suriname regelt." },
    { termino: "Werkdag", definicion: "Een dag waarop je volgens je rooster normaal werkt." },
  ],
});
