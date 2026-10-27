import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ro.cost-total-angajator",
  h1: "Calculator cost total angajator",
  title: "Cost total angajator {{anio}}: salariu brut și CAM",
  description:
    "Calculați cât costă un angajat pentru firmă: salariul brut plus contribuția asiguratorie pentru muncă (CAM) de {{ro.cam}}, pe lună și pe an.",
  intro: [
    "În România aproape toate contribuțiile se rețin din salariul brut al angajatului. Angajatorul mai plătește în plus doar CAM.",
    "Calculatorul arată costul lunar și anual, plus salariul net pe care îl primește angajatul.",
  ],
  comoSeCalcula: [
    "CAM este {{ro.cam}} din salariul brut și se rotunjește la leu.",
    "Costul total este salariul brut plus CAM.",
    "La salariul minim cu normă întreagă, suma neimpozabilă de {{ro.facilitate-salariu-minim[suma]}} nu intră în baza CAM.",
  ],
  ejemplo: ["Pentru 6.000 de lei brut, CAM este 135 de lei, iar costul total ajunge la 6.135 de lei pe lună."],
  faq: [
    {
      pregunta: "Cât costă un angajat cu salariul minim?",
      respuesta: "De la 1 iulie 2026, la {{ro.salariu-minim}} brut și cu suma neimpozabilă de {{ro.facilitate-salariu-minim[suma]}}, costul total este 4.418 lei pe lună.",
    },
    {
      pregunta: "Ce este CAM?",
      respuesta: "Contribuția asiguratorie pentru muncă, de {{ro.cam}}, datorată de angajator. Se calculează din câștigurile brute ale salariaților, conform Codului fiscal (art. 220^3 și 220^4).",
    },
    {
      pregunta: "Intră tichetele de masă în cost?",
      respuesta: "Nu. Calculatorul include doar salariul brut și CAM. Tichetele, bonusurile și alte beneficii se adaugă separat.",
    },
  ],
  glosario: [
    { termino: "CAM", definicion: "Contribuția asiguratorie pentru muncă, contribuția plătită de angajator peste salariul brut, în condiții normale de muncă." },
    { termino: "Cost total", definicion: "Salariul brut plus CAM, adică suma pe care firma o plătește lunar pentru un post." },
  ],
});
