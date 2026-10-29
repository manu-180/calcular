import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sr.bonus-belasting-berekenen",
  h1: "Belasting op je bonus of gratificatie berekenen",
  title: "Bonus of gratificatie Suriname: wat hou je netto over?",
  description:
    "Een bonus is tot een maandloon vrij van loonbelasting, met een maximum van {{sr.vrijstelling-vakantie-bonus}} per jaar. Bereken de belasting en de AOV-premie over de rest.",
  intro: [
    "Krijg je een bonus, gratificatie of eindejaarsuitkering, dan is een deel daarvan vrij van loonbelasting. Over de rest betaal je belasting, maar niet in een keer tegen je hoogste tarief.",
    "Vul je brutoloon per maand en de bonus in. Je ziet wat je netto overhoudt.",
  ],
  comoSeCalcula: [
    "Vrijgesteld: de bonus tot het bedrag van je maandloon, met een maximum van {{sr.vrijstelling-vakantie-bonus}} per jaar.",
    "Het belaste deel wordt volgens de wet over de maanden verdeeld waar de bonus bij hoort (bij een jaarbonus twaalf) en bij je gewone loon geteld. De belasting op de bonus is het verschil tussen de belasting met en zonder dat deel.",
    "Over het belaste deel betaal je ook {{sr.aov-premie}} AOV-premie.",
  ],
  ejemplo: ["Verdien je SRD 15.000 per maand en krijg je een bonus van SRD 20.000, dan is SRD 15.000 vrij. Over de overige SRD 5.000 betaal je SRD 900 loonbelasting en SRD 200 AOV-premie. Netto hou je SRD 18.900 over."],
  faq: [
    {
      pregunta: "Geldt de vrijstelling voor elke bonus?",
      respuesta: "Voor gratificaties en bonussen als extra beloning voor verricht werk, waarvoor geen andere bijzondere regeling geldt. Gaat de bonus over een periode korter dan een jaar, dan is het maximum naar verhouding lager.",
    },
    {
      pregunta: "Zijn vakantietoelage en bonus samen vrij tot het maximum?",
      respuesta: "Nee, de wet noemt ze apart. De vakantie-uitkering is vrij tot een maandloon met een eigen maximum, en de gratificatie of bonus ook.",
    },
    {
      pregunta: "Wat is een uitkering ineens?",
      respuesta: "Een eenmalige uitkering uit je werk die niet bij een bepaalde periode hoort. Op verzoek wordt die met een apart tarief belast. Daarvoor is er een eigen berekening.",
    },
  ],
  glosario: [
    { termino: "Gratificatie", definicion: "Een extra beloning van de werkgever voor verricht werk, bijvoorbeeld aan het eind van het jaar." },
    { termino: "Bijzondere beloning", definicion: "Een beloning over een periode van meer dan een loontijdvak, zoals een jaarbonus." },
  ],
});
