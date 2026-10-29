import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "md.calculator-concediu-medical",
  h1: "Calculator concediu medical",
  title: "Calculator concediu medical {{anio}}: cât plătește CNAS",
  description: "Calculați indemnizația pentru incapacitate temporară de muncă: {{md.itm[sub5]}}, {{md.itm[intre-5-8]}} sau {{md.itm[peste8]}} din venitul asigurat, după stagiu.",
  intro: [
    "În concediu medical nu primiți salariu, ci o indemnizație pentru incapacitate temporară de muncă. Primele zile le plătește angajatorul, restul Casa Națională de Asigurări Sociale.",
    "Calculatorul arată cât înseamnă indemnizația pentru o lună întreagă, după stagiul de cotizare.",
  ],
  comoSeCalcula: [
    "Baza de calcul este venitul mediu lunar asigurat din ultimele 12 luni calendaristice înainte de îmbolnăvire.",
    "Baza nu poate trece de {{md.plafon-salarii-medii}} salarii medii lunare pe economie. În 2026 salariul mediu prognozat este {{md.salariu-mediu}}.",
    "CNAS plătește {{md.itm[sub5]}} din bază la un stagiu de până la 5 ani, {{md.itm[intre-5-8]}} între 5 și 8 ani și {{md.itm[peste8]}} peste 8 ani.",
    "La tuberculoză, SIDA, boală oncologică sau accident de muncă indemnizația este {{md.itm[special]}} din bază, indiferent de stagiu.",
    "Pentru zilele plătite de angajator indemnizația este {{md.itm[angajator]}} din salariul mediu al angajatului.",
  ],
  faq: [
    {
      pregunta: "Câte zile de concediu medical plătește angajatorul?",
      respuesta: "Primele cinci zile calendaristice, dar nu mai mult de 15 zile pe an pentru același angajat. Restul le plătește CNAS.",
    },
    {
      pregunta: "Ce stagiu trebuie să am?",
      respuesta: "Un stagiu total de cotizare de cel puțin 3 ani. Cu mai puțin, aveți dreptul dacă aveți cel puțin 9 luni de stagiu în ultimele 24 de luni.",
    },
    {
      pregunta: "Ce se întâmplă la un accident de muncă?",
      respuesta: "Indemnizația este {{md.itm[special]}} din bază, indiferent de stagiu. Primele 20 de zile le plătește angajatorul la care s-a produs accidentul.",
    },
  ],
  glosario: [
    { termino: "Venit mediu lunar asigurat", definicion: "Venitul din ultimele 12 luni din care s-au plătit contribuții, împărțit la 12." },
    { termino: "Stagiu de cotizare", definicion: "Perioada în care ați lucrat și s-au plătit contribuții de asigurări sociale." },
  ],
});
