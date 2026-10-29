import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ro.calculator-ore-suplimentare",
  h1: "Calculator ore suplimentare",
  title: "Calculator ore suplimentare {{anio}}: plata cu spor",
  description:
    "Calculați cât primiți pentru orele suplimentare: tariful orar din salariul de bază plus sporul minim de {{ro.spor-ore-suplimentare}} sau sporul din contract.",
  intro: [
    "Orele lucrate peste programul normal se compensează în primul rând cu timp liber plătit. Dacă nu se poate, se plătesc cu un spor.",
    "Calculatorul pornește de la salariul de bază și de la orele normale ale lunii.",
  ],
  comoSeCalcula: [
    "Tariful orar este salariul de bază împărțit la orele normale ale lunii.",
    "Fiecare oră suplimentară se plătește cu tariful orar plus sporul, de cel puțin {{ro.spor-ore-suplimentare}}.",
  ],
  faq: [
    {
      pregunta: "Cât este sporul pentru orele suplimentare?",
      respuesta: "Cel puțin {{ro.spor-ore-suplimentare}} din salariul de bază, dacă orele nu sunt compensate cu timp liber.",
    },
  ],
  glosario: [
    { termino: "Ore suplimentare", definicion: "Orele lucrate peste durata normală a timpului de lucru." },
  ],
});
