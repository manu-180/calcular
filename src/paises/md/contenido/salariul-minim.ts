import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "md.salariul-minim",
  h1: "Salariul minim pe țară {{anio}}",
  title: "Salariul minim {{anio}} în Moldova: brut, net și pe oră",
  description: "Salariul minim pe țară este {{md.salariu-minim}} pe lună de la {{md.salariu-minim#desde}}, adică {{md.salariu-minim-orar}} pe oră. Vedeți netul și costul.",
  intro: [
    "Salariul minim pe țară se stabilește în fiecare an prin hotărâre de Guvern. Este cel mai mic salariu permis pentru un program complet de lucru.",
    "Calculatorul arată valoarea în vigoare, salariul pe oră, netul și costul pentru angajator.",
  ],
  comoSeCalcula: [
    "Valoarea lunară este {{md.salariu-minim}} pentru un program complet de {{md.ore-lunare-salariu-minim}} pe lună, în medie. Pe oră înseamnă {{md.salariu-minim-orar}}.",
    "La un program mai scurt de 40 de ore pe săptămână, salariul minim se socotește pe oră, proporțional cu orele din contract.",
    "Netul scade prima medicală de {{md.prima-medicala}} și impozitul de {{md.impozit-venit}}, după scutirea personală de {{md.scutire-personala}} pe an.",
  ],
  faq: [
    {
      pregunta: "Cât este salariul minim în Moldova în 2026?",
      respuesta: "De la {{md.salariu-minim#desde}} salariul minim pe țară este {{md.salariu-minim}} pe lună. În 2025 a fost 5.500 de lei.",
    },
    {
      pregunta: "Cât este salariul minim pe oră?",
      respuesta: "{{md.salariu-minim-orar}}, pentru un program complet de {{md.ore-lunare-salariu-minim}} pe lună, în medie.",
    },
    {
      pregunta: "Cât primește în mână un salariat cu salariul minim?",
      respuesta: "Cu scutirea personală și fără persoane întreținute, netul este cel din rezultat. Din brut se rețin prima medicală și impozitul pe venit.",
    },
    {
      pregunta: "Când se schimbă salariul minim?",
      respuesta: "La 1 ianuarie, când intră în vigoare noua hotărâre a Guvernului. Calculatorul se actualizează după publicarea ei în Monitorul Oficial.",
    },
  ],
  glosario: [
    { termino: "Program complet", definicion: "Programul normal de 40 de ore pe săptămână, socotit de hotărâre la {{md.ore-lunare-salariu-minim}} pe lună." },
    { termino: "Monitorul Oficial", definicion: "Publicația în care intră actele normative ale Republicii Moldova." },
  ],
});
