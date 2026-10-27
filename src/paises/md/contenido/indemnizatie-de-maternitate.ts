import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "md.indemnizatie-de-maternitate",
  h1: "Calculator indemnizație de maternitate",
  title: "Indemnizația de maternitate {{anio}}: calculator CNAS",
  description: "Calculați indemnizația de maternitate: {{md.maternitate-procent}} din venitul mediu lunar asigurat, pe {{md.maternitate-zile[normala]}}, cu plafonul din {{anio}}.",
  intro: [
    "Femeile asigurate primesc în concediul de maternitate o indemnizație de la Casa Națională de Asigurări Sociale, în locul salariului.",
    "Calculatorul arată suma lunară și durata concediului.",
  ],
  comoSeCalcula: [
    "Baza de calcul este venitul mediu lunar asigurat din ultimele 12 luni calendaristice înainte de luna concediului.",
    "Baza nu poate trece de {{md.plafon-salarii-medii}} salarii medii lunare pe economie ({{md.salariu-mediu}} în 2026).",
    "Indemnizația lunară este {{md.maternitate-procent}} din bază.",
    "Concediul durează {{md.maternitate-zile[normala]}} calendaristice, iar la nașteri complicate sau la doi copii, {{md.maternitate-zile[complicata]}}.",
  ],
  faq: [
    {
      pregunta: "Când se acordă indemnizația de maternitate?",
      respuesta: "Integral, la a 30-a săptămână de sarcină, pentru toată perioada concediului de maternitate.",
    },
    {
      pregunta: "Primesc indemnizație dacă soțul este asigurat, iar eu nu?",
      respuesta: "Da, soțiile aflate la întreținerea soților asigurați au dreptul. Baza de calcul este venitul mediu lunar asigurat al soțului.",
    },
    {
      pregunta: "Cât durează concediul de maternitate?",
      respuesta: "{{md.maternitate-zile[normala]}} calendaristice, sau {{md.maternitate-zile[complicata]}} la nașteri complicate ori la nașterea a doi copii.",
    },
  ],
  glosario: [
    { termino: "Baza de calcul", definicion: "Venitul mediu lunar asigurat pe care se aplică procentul indemnizației." },
    { termino: "CNAS", definicion: "Casa Națională de Asigurări Sociale, care stabilește și plătește indemnizația." },
  ],
});
