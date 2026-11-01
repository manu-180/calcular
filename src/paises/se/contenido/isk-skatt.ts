import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "se.isk-skatt",
  h1: "Räkna ut skatten på ditt ISK",
  title: "Skatt på ISK {{anio}}: räkna ut schablonskatten",
  description:
    "Räkna ut skatten på ditt investeringssparkonto {{anio}}. Schablonintäkten är {{se.isk-schablonranta}} och de första {{se.isk-grundniva}} är skattefria.",
  intro: [
    "På ett investeringssparkonto betalar du inte skatt på vinsterna. I stället betalar du en schablonskatt varje år, räknad på värdet och insättningarna.",
    "Från 2026 är sparande upp till {{se.isk-grundniva}} skattefritt. Kalkylatorn visar kapitalunderlaget, schablonintäkten och skatten.",
  ],
  comoSeCalcula: [
    "Lägg ihop värdet på kontot vid början av varje kvartal och alla insättningar under året. Dela summan med fyra. Det är kapitalunderlaget.",
    "Schablonintäkten är kapitalunderlaget gånger {{se.isk-schablonranta}}, som är statslåneräntan i slutet av november året innan plus en procentenhet.",
    "Den skattefria grundnivån ger ett avdrag på {{se.isk-grundniva}} gånger samma procentsats.",
    "På det som blir kvar betalar du {{se.kapitalskatt}} skatt.",
  ],
  ejemplo: ["Är kapitalunderlaget 425 000 kronor blir schablonintäkten 15 087 kronor. Avdraget för grundnivån är 10 650 kronor, och skatten blir 1 331 kronor."],
  faq: [
    {
      pregunta: "Hur mycket skatt betalar man på ISK 2026?",
      respuesta: "Skatten är {{se.kapitalskatt}} av en schablonintäkt på {{se.isk-schablonranta}}, räknat på det kapitalunderlag som är över grundnivån på {{se.isk-grundniva}}.",
    },
    {
      pregunta: "Betalar jag skatt om kontot har gått med förlust?",
      respuesta: "Ja. Skatten räknas på värdet och insättningarna, inte på vinsten. Du kan inte dra av förluster på ett investeringssparkonto.",
    },
    {
      pregunta: "Behöver jag deklarera mitt ISK?",
      respuesta: "Nej. Banken lämnar en kontrolluppgift och schablonintäkten finns redan i din deklaration. Grundnivån dras av automatiskt.",
    },
    {
      pregunta: "Gäller grundnivån per konto?",
      respuesta: "Nej, den gäller ditt sammanlagda sparande på investeringssparkonto, kapitalförsäkring och PEPP.",
    },
  ],
  glosario: [
    { termino: "ISK", definicion: "Investeringssparkonto, en sparform med schablonbeskattning i stället för skatt på vinster." },
    { termino: "Kapitalunderlag", definicion: "Genomsnittet av kvartalsvärdena och årets insättningar." },
    { termino: "Schablonintäkt", definicion: "En beräknad intäkt som skatten tas ut på." },
  ],
});
