import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "md.cost-total-angajator",
  h1: "Costul total al unui salariat pentru angajator",
  title: "Cost total angajator 2026: brut plus CNAS",
  description: "Calculați cât costă un salariat: salariul brut plus contribuția de asigurări sociale de {{md.cas-angajator}}, cu netul angajatului alături.",
  intro: [
    "Pentru firmă, un salariat costă mai mult decât brutul din contract. Peste brut se plătește contribuția de asigurări sociale de stat.",
    "Calculatorul arată costul lunar și anual și cât din această sumă ajunge la stat.",
  ],
  comoSeCalcula: [
    "Contribuția de asigurări sociale este {{md.cas-angajator}} din salariul brut și o plătește angajatorul.",
    "Costul total este brutul plus această contribuție.",
    "Din brut, angajatorul reține pentru stat prima medicală de {{md.prima-medicala}} și impozitul pe venit de {{md.impozit-venit}}.",
  ],
  faq: [
    {
      pregunta: "Cât plătește angajatorul la CNAS în 2026?",
      respuesta: "{{md.cas-angajator}} din salariul brut al fiecărui salariat, peste salariu.",
    },
    {
      pregunta: "Angajatorul plătește și prima medicală?",
      respuesta: "Prima de {{md.prima-medicala}} se reține din salariul brut al angajatului. Angajatorul doar o calculează și o virează.",
    },
    {
      pregunta: "Ce înseamnă partea statului din costul total?",
      respuesta: "Suma contribuției CNAS, a primei medicale și a impozitului pe venit, împărțită la costul total. Restul este salariul net.",
    },
  ],
  glosario: [
    { termino: "CNAS", definicion: "Casa Națională de Asigurări Sociale, care administrează pensiile și indemnizațiile." },
    { termino: "Cost total", definicion: "Tot ce plătește firma pentru un salariat într-o lună: brutul și contribuția de asigurări sociale." },
  ],
});
