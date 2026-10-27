import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "be.loonkost-berekenen",
  h1: "Loonkost berekenen: wat kost een werknemer?",
  title: "Loonkost berekenen {{anio}}: brutoloon plus werkgeversbijdragen",
  description:
    "Bereken wat een werknemer je als werkgever kost: brutoloon, werkgeversbijdragen RSZ, vakantiegeld van arbeiders en dubbel vakantiegeld van bedienden.",
  intro: [
    "Een werknemer kost meer dan zijn brutoloon. Bovenop het loon betaal je als werkgever RSZ-bijdragen: een basisbijdrage van {{be.rsz-werkgever[basis]}} en een loonmatigingsbijdrage van {{be.rsz-werkgever[loonmatiging]}} voor de meeste werknemers in de privésector.",
    "Vul het brutoloon in en kies bediende of arbeider. Je ziet de loonkost per maand en per jaar, zonder de verminderingen waar je misschien recht op hebt.",
  ],
  comoSeCalcula: [
    "Werkgeversbijdragen: basisbijdrage plus loonmatiging op het brutoloon. Voor arbeiders op 108 % van het brutoloon.",
    "Arbeiders: daarbovenop een bijdrage voor het vakantiegeld, dat de RJV of een vakantiefonds uitbetaalt.",
    "Bedienden: hun vakantiegeld betaal je zelf. Het enkel vakantiegeld is het gewone loon tijdens de vakantie, het dubbel vakantiegeld komt er één keer per jaar bij.",
    "Loonkost per jaar: 12 keer de maandkost, plus het dubbel vakantiegeld voor bedienden.",
  ],
  ejemplo: [
    "Een bediende met € 3.000 bruto kost € 750 aan werkgeversbijdragen, dus € 3.750 per maand. Met het dubbel vakantiegeld komt dat op € 47.760 per jaar.",
  ],
  faq: [
    {
      pregunta: "Betaal ik als werkgever altijd hetzelfde tarief?",
      respuesta:
        "Het tarief van {{be.rsz-werkgever[basis]}} basisbijdrage en {{be.rsz-werkgever[loonmatiging]}} loonmatiging geldt voor de meeste werknemers in de privésector. Andere categorieën, zoals de openbare sector, hebben andere percentages. Verminderingen kunnen de echte kost flink verlagen.",
    },
    {
      pregunta: "Waarom zijn de bijdragen voor arbeiders hoger?",
      respuesta:
        "Voor arbeiders worden de bijdragen berekend op 108 % van het brutoloon, en betaal je een extra bijdrage van {{be.rsz-werkgever[vakantie-arbeiders]}} op dat bedrag voor de vakantieregeling. Daarmee financier je het vakantiegeld dat de RJV of een vakantiefonds uitbetaalt.",
    },
    {
      pregunta: "Wat zit er niet in deze berekening?",
      respuesta:
        "De eindejaarspremie, maaltijdcheques, de verzekering arbeidsongevallen, een groepsverzekering, vervoerskosten en de RSZ-verminderingen. Die hangen af van je sector en je onderneming.",
    },
  ],
  glosario: [
    { termino: "Loonmatigingsbijdrage", definicion: "Een werkgeversbijdrage bovenop de basisbijdrage, die voor bijna alle werknemers verschuldigd is." },
    { termino: "Structurele vermindering", definicion: "Een korting op de werkgeversbijdragen, vooral voor lage lonen." },
    { termino: "Dubbel vakantiegeld", definicion: "Het extra vakantiegeld dat een bediende één keer per jaar krijgt, {{be.vakantiegeld[dubbel-bediende]}} van het maandloon." },
  ],
});
