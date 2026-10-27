import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "md.salariul-mediu-pe-economie",
  h1: "Salariul mediu pe economie 2026",
  title: "Salariul mediu pe economie 2026: {{md.salariu-mediu}}",
  description: "Salariul mediu lunar pe economie prognozat pentru 2026 este {{md.salariu-mediu}}. Comparați-vă salariul și vedeți plafonul pentru indemnizații.",
  intro: [
    "Guvernul aprobă în fiecare an salariul mediu lunar pe economie prognozat. Valoarea se folosește la plafoane, deduceri și indemnizații.",
    "Introduceți salariul dumneavoastră brut ca să vedeți cum se situează față de medie.",
  ],
  comoSeCalcula: [
    "Valoarea în vigoare de la {{md.salariu-mediu#desde}} este {{md.salariu-mediu}} pe lună.",
    "Procentul este salariul dumneavoastră brut împărțit la salariul mediu.",
    "Pentru indemnizațiile de la CNAS, venitul asigurat luat în calcul nu poate trece de {{md.plafon-salarii-medii}} salarii medii pe lună.",
  ],
  faq: [
    {
      pregunta: "Cât este salariul mediu pe economie în 2026?",
      respuesta: "{{md.salariu-mediu}} pe lună, conform hotărârii Guvernului nr. 773 din 17 decembrie 2025. În 2025 a fost 16.100 de lei.",
    },
    {
      pregunta: "La ce se folosește salariul mediu pe economie?",
      respuesta: "La plafonul venitului asigurat pentru indemnizații, la unele deduceri din Codul fiscal și la calculul unor plăți sociale.",
    },
    {
      pregunta: "Este salariul mediu real sau o prognoză?",
      respuesta: "Este o prognoză aprobată de Guvern la sfârșitul anului precedent. Salariul mediu realizat îl publică Biroul Național de Statistică.",
    },
  ],
  glosario: [
    { termino: "Salariu mediu prognozat", definicion: "Valoarea estimată de Guvern pentru anul următor, folosită în calcule stabilite de lege." },
  ],
});
