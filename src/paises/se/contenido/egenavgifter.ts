import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "se.egenavgifter",
  h1: "Räkna ut egenavgifter för enskild firma",
  title: "Egenavgifter {{anio}}: räkna ut avgifterna i din enskilda firma",
  description:
    "Räkna ut egenavgifterna på överskottet i din enskilda firma: {{se.egenavgifter[full]}} med schablonavdrag och nedsättning, steg för steg.",
  intro: [
    "Har du enskild firma betalar du dina sociala avgifter själv, i form av egenavgifter. De räknas på överskottet i verksamheten.",
    "Kalkylatorn visar schablonavdraget, avgiftsunderlaget, nedsättningen och vad som blir kvar innan inkomstskatten dras.",
  ],
  comoSeCalcula: [
    "Från överskottet gör du ett schablonavdrag för egenavgifterna: {{se.schablonavdrag-egenavgifter[full]}} om du är född 1959 eller senare.",
    "Det som blir kvar är avgiftsunderlaget. Fulla egenavgifter är {{se.egenavgifter[full]}} av underlaget.",
    "Har du ett underlag från näringsverksamhet över {{se.nedsattning-egenavgifter[golv]}} kronor sätts avgifterna ned med {{se.nedsattning-egenavgifter[sats]}} procent av underlaget, högst {{se.nedsattning-egenavgifter[max]}} kronor per år.",
    "Har du fyllt 67 år vid årets början betalar du bara ålderspensionsavgiften, {{se.egenavgifter[aldre]}}, och schablonavdraget är {{se.schablonavdrag-egenavgifter[aldre]}}.",
  ],
  ejemplo: [
    "Med 200 000 kronor i överskott blir schablonavdraget 50 000 kronor och underlaget 150 000 kronor. Avgifterna före nedsättning är 43 455 kronor, nedsättningen 11 250 kronor och egenavgifterna 32 205 kronor.",
  ],
  faq: [
    {
      pregunta: "Vad är skillnaden mellan egenavgifter och arbetsgivaravgifter?",
      respuesta:
        "Det är samma typ av sociala avgifter. Arbetsgivaren betalar arbetsgivaravgifter för sina anställda, och du som har enskild firma betalar egenavgifter för dig själv.",
    },
    {
      pregunta: "Varför gör man ett schablonavdrag?",
      respuesta:
        "Du vet inte de faktiska egenavgifterna förrän skatten är beräknad. Därför drar du av ett schablonbelopp i deklarationen. Året efter återförs det och du drar av de avgifter som faktiskt debiterades.",
    },
    {
      pregunta: "Hur betalar jag egenavgifterna?",
      respuesta: "De ingår i din F-skatt. Du betalar preliminär skatt varje månad, och den slutliga avgiften räknas fram i deklarationen.",
    },
    {
      pregunta: "Påverkar karensdagarna avgiften?",
      respuesta:
        "Ja, lite. Sjukförsäkringsavgiften beror på hur många karensdagar du har valt hos Försäkringskassan. Kalkylatorn räknar med de fulla egenavgifterna på {{se.egenavgifter[full]}}.",
    },
  ],
  glosario: [
    { termino: "Egenavgifter", definicion: "Sociala avgifter som du betalar själv på inkomst av aktiv näringsverksamhet." },
    { termino: "Avgiftsunderlag", definicion: "Överskottet efter schablonavdraget, som avgifterna räknas på." },
    { termino: "Schablonavdrag", definicion: "Ett preliminärt avdrag för egenavgifterna i deklarationen." },
  ],
});
