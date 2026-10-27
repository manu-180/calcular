import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "be.erfbelasting-berekenen",
  h1: "Erfbelasting berekenen in Vlaanderen",
  title: "Erfbelasting berekenen in Vlaanderen: successierechten {{anio}}",
  description:
    "Bereken de erfbelasting (successierechten) in Vlaanderen voor partners en kinderen, broers en zussen of andere erfgenamen, met de officiële tarieven per schijf.",
  intro: [
    "De Vlaamse erfbelasting wordt geïnd door de Vlaamse Belastingdienst. Het tarief hangt af van je band met de overledene en van de grootte van je erfdeel.",
    "Partners en verwanten in rechte lijn betalen het minst. Broers en zussen en andere erfgenamen betalen hogere tarieven.",
  ],
  comoSeCalcula: [
    "Rechte lijn en partners: per erfgenaam, apart op het roerende en het onroerende deel. {{be.erfbelasting-vl-rechte-lijn[0].tasa}} tot {{be.erfbelasting-vl-rechte-lijn[0].hasta}}, {{be.erfbelasting-vl-rechte-lijn[1].tasa}} tot {{be.erfbelasting-vl-rechte-lijn[1].hasta}} en {{be.erfbelasting-vl-rechte-lijn[-1].tasa}} daarboven.",
    "Broers en zussen: per erfgenaam op het hele erfdeel. {{be.erfbelasting-vl-broers-zussen[0].tasa}} tot {{be.erfbelasting-vl-broers-zussen[0].hasta}}, {{be.erfbelasting-vl-broers-zussen[1].tasa}} tot {{be.erfbelasting-vl-broers-zussen[1].hasta}} en {{be.erfbelasting-vl-broers-zussen[-1].tasa}} daarboven.",
    "Andere personen: op de erfdelen van alle erfgenamen in die groep samen. {{be.erfbelasting-vl-anderen[0].tasa}} tot {{be.erfbelasting-vl-anderen[0].hasta}}, {{be.erfbelasting-vl-anderen[1].tasa}} tot {{be.erfbelasting-vl-anderen[1].hasta}} en {{be.erfbelasting-vl-anderen[-1].tasa}} daarboven.",
    "Elke schijf wordt aan haar eigen tarief belast.",
  ],
  ejemplo: [
    "Je erft van je moeder € 150.000 in onroerende en € 50.000 in roerende goederen. Op het roerende deel betaal je € 1.500, op het onroerende € 10.500. Samen € 12.000.",
  ],
  faq: [
    {
      pregunta: "Waarom worden roerend en onroerend apart belast?",
      respuesta:
        "In rechte lijn en tussen partners past de Vlaamse Belastingdienst de schijven apart toe op het roerende en het onroerende deel. Zo betaal je vaker het lage tarief. In het voorbeeld van de moeder zou je zonder die opsplitsing € 15.000 betalen in plaats van € 12.000.",
    },
    {
      pregunta: "Wie is een partner voor de erfbelasting?",
      respuesta:
        "Je echtgenoot, je wettelijk samenwonende partner, of iemand met wie je op de dag van het overlijden minstens één jaar ononderbroken samenwoonde en een gemeenschappelijke huishouding voerde.",
    },
    {
      pregunta: "Gelden er vrijstellingen?",
      respuesta:
        "Ja, er bestaan verminderingen en vrijstellingen. Die zitten niet in deze berekening. Een notaris kan je precies zeggen wat in jouw geval geldt.",
    },
  ],
  glosario: [
    { termino: "Erfbelasting", definicion: "De Vlaamse belasting op een erfenis, vroeger successierechten genoemd." },
    { termino: "Rechte lijn", definicion: "Verwanten die van elkaar afstammen, zoals ouders en kinderen of grootouders en kleinkinderen." },
    { termino: "Netto-erfdeel", definicion: "Jouw deel van de erfenis waarop de erfbelasting berekend wordt." },
  ],
});
