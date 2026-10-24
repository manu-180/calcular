import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "zz-ro.bono",
  h1: "Calculator primă semestrială în Zetalandia",
  title: "Prima semestrială în Zetalandia: cât primiți",
  description: "Calculați prima semestrială cu salariul minim din regiunea dumneavoastră și suplimentul de {{zz.bonificacion}}, cu valorile oficiale, data și sursa.",
  intro: [
    "Prima semestrială este un salariu lunar în plus, plătit de două ori pe an.",
    "Dacă ați lucrat tot semestrul, primiți un salariu lunar întreg și un supliment de {{zz.bonificacion}}.",
  ],
  comoSeCalcula: [
    "Calculul pornește de la salariul brut lunar. Dacă este sub minimul din regiunea dumneavoastră, se folosește minimul.",
    "Acest salariu se înmulțește cu lunile lucrate și se împarte la 6.",
    "Într-o companie mică prima este jumătate.",
    "La primă se adaugă suplimentul de {{zz.bonificacion}}.",
  ],
  faq: [
    { pregunta: "Care este salariul minim în regiunea de nord?", respuesta: "Este de {{zz.minimo@norte}}, în vigoare de la {{zz.minimo@norte#desde}}." },
    { pregunta: "Ce se întâmplă dacă nu am lucrat tot semestrul?", respuesta: "Primiți partea care corespunde lunilor lucrate." },
    { pregunta: "Suplimentul se plătește întotdeauna?", respuesta: "Da. Este de {{zz.bonificacion}} din primă, iar compania îl plătește odată cu prima." },
  ],
  glosario: [
    { termino: "Prima semestrială", definicion: "Plata suplimentară pe care legea o cere în iulie și în decembrie." },
    { termino: "Salariul minim", definicion: "Cea mai mică plată permisă pentru o zi întreagă de muncă în fiecare regiune." },
  ],
});
