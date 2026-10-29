import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ro.salariul-minim",
  h1: "Salariul minim pe economie {{anio}}",
  title: "Salariul minim {{anio}}: {{ro.salariu-minim}} brut, net și pe oră",
  description:
    "Salariul minim brut pe țară este {{ro.salariu-minim}} de la {{ro.salariu-minim#desde}}, adică {{ro.salariu-minim-orar}} pe oră. Vedeți netul și costul pentru angajator.",
  intro: [
    "Salariul de bază minim brut pe țară garantat în plată se stabilește prin hotărâre de Guvern. Este cel mai mic salariu de bază permis pentru un program normal de lucru.",
    "Calculatorul arată valoarea în vigoare, salariul pe oră, netul la normă întreagă și costul total pentru firmă.",
  ],
  comoSeCalcula: [
    "Valoarea lunară este {{ro.salariu-minim}}, pentru un program mediu de {{ro.ore-lunare-salariu-minim}} pe lună. Pe oră înseamnă {{ro.salariu-minim-orar}}.",
    "La normă parțială, salariul se calculează proporțional cu orele din contract.",
    "Netul scade CAS de {{ro.cas}}, CASS de {{ro.cass}} și impozitul de {{ro.impozit-venit}}, după deducerea personală de {{ro.deducere-baza[0]}} din salariul minim.",
    "În 2026 suma de {{ro.facilitate-salariu-minim[suma]}} pe lună nu se impozitează și nu intră în baza contribuțiilor, dacă salariul de bază este egal cu minimul și venitul brut nu trece de {{ro.facilitate-salariu-minim[plafon]}}.",
  ],
  faq: [
    {
      pregunta: "Cât este salariul minim pe economie în 2026?",
      respuesta: "Între 1 ianuarie și 30 iunie 2026 a fost 4.050 de lei brut. De la 1 iulie 2026 este {{ro.salariu-minim}} brut pe lună.",
    },
    {
      pregunta: "Cât este salariul minim net?",
      respuesta: "La 4.325 de lei brut, cu suma neimpozabilă de 200 de lei și fără persoane în întreținere, netul este 2.699 de lei.",
    },
    {
      pregunta: "Cât este salariul minim pe oră?",
      respuesta: "{{ro.salariu-minim-orar}} pe oră, pentru un program normal de lucru în medie de {{ro.ore-lunare-salariu-minim}} pe lună.",
    },
    {
      pregunta: "Când se schimbă salariul minim?",
      respuesta: "Când Guvernul adoptă o nouă hotărâre. Calculatorul se actualizează după publicarea ei în Monitorul Oficial.",
    },
  ],
  glosario: [
    { termino: "Salariu minim brut", definicion: "Salariul de bază minim pentru normă întreagă, fără sporuri și alte adaosuri." },
    { termino: "Normă întreagă", definicion: "Programul normal de lucru, pentru care hotărârea Guvernului socotește în medie {{ro.ore-lunare-salariu-minim}} pe lună." },
  ],
});
