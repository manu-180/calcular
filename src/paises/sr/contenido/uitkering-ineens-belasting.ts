import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sr.uitkering-ineens-belasting",
  h1: "Belasting op een uitkering ineens berekenen",
  title: "Uitkering ineens Suriname: belasting van {{sr.uitkering-ineens-tarief[0].tasa}} tot {{sr.uitkering-ineens-tarief[-1].tasa}}",
  description:
    "Een eenmalige uitkering uit je werk kan op verzoek apart worden belast, van {{sr.uitkering-ineens-tarief[0].tasa}} tot {{sr.uitkering-ineens-tarief[-1].tasa}}. Bereken wat je netto overhoudt.",
  intro: [
    "Krijg je van je werkgever een bedrag ineens dat niet hoort bij een bepaalde periode, dan kun je vragen om het apart te belasten. Het tarief is dan lager dan bij je gewone loon.",
    "Vul het brutobedrag in. Je ziet de loonbelasting volgens het aparte tarief en het bedrag dat overblijft.",
  ],
  comoSeCalcula: [
    "Tot en met {{sr.uitkering-ineens-tarief[0].hasta}}: {{sr.uitkering-ineens-tarief[0].tasa}}.",
    "Daarboven tot en met {{sr.uitkering-ineens-tarief[1].hasta}}: {{sr.uitkering-ineens-tarief[1].tasa}}, en tot en met {{sr.uitkering-ineens-tarief[2].hasta}}: {{sr.uitkering-ineens-tarief[2].tasa}}.",
    "Over het deel boven {{sr.uitkering-ineens-tarief[-1].desde}}: {{sr.uitkering-ineens-tarief[-1].tasa}}.",
    "Er is geen belastingvrije som bij dit tarief: het geldt vanaf de eerste dollar.",
  ],
  ejemplo: ["Over een uitkering ineens van SRD 100.000 betaal je SRD 12.400 loonbelasting. Je houdt SRD 87.600 over."],
  faq: [
    {
      pregunta: "Wanneer geldt dit tarief?",
      respuesta: "Voor uitkeringen ineens die loon uit dienstbetrekking zijn, maar niet horen bij een bepaalde periode van meerdere loontijdvakken. Het geldt alleen als je erom vraagt.",
    },
    {
      pregunta: "Is dit gunstiger dan gewoon belasten?",
      respuesta: "Vaak wel, omdat de tarieven lager zijn dan de gewone schijven. Maar er is geen vrije som. Bij een klein bedrag en een laag loon kan de gewone berekening voordeliger zijn. Vergelijk het met de berekening voor een bonus.",
    },
    {
      pregunta: "Betaal ik ook AOV-premie?",
      respuesta: "Dit aparte tarief gaat alleen over de loonbelasting. Of en hoeveel AOV-premie je over de uitkering betaalt, hangt af van je situatie; deze berekening rekent die niet mee.",
    },
  ],
  glosario: [{ termino: "Uitkering ineens", definicion: "Een eenmalig bedrag uit je werk dat niet hoort bij een bepaalde loonperiode." }],
});
