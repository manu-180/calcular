import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ro.calculator-concediu-de-odihna",
  h1: "Calculator concediu de odihnă și indemnizație",
  title: "Calculator concediu de odihnă 2026: zile și indemnizație",
  description:
    "Aflați câte zile de concediu de odihnă vi se cuvin pentru lunile lucrate și cât este indemnizația, din media salariului pe ultimele 3 luni.",
  intro: [
    "Calculatorul socotește zilele de concediu cuvenite proporțional cu lunile lucrate și indemnizația pentru zilele pe care le luați.",
    "Durata minimă legală a concediului de odihnă este {{ro.concediu-odihna-minim}} lucrătoare pe an. Contractul poate prevedea mai multe.",
  ],
  comoSeCalcula: [
    "Zilele cuvenite sunt zilele pe an din contract (cel puțin minimul legal) înmulțite cu lunile lucrate și împărțite la 12.",
    "Media zilnică este suma salariilor de bază și a sporurilor permanente din ultimele 3 luni, împărțită la zilele lucrătoare din aceste luni.",
    "Indemnizația este media zilnică înmulțită cu zilele de concediu.",
  ],
  faq: [
    {
      pregunta: "Câte zile de concediu de odihnă am pe an?",
      respuesta: "Cel puțin {{ro.concediu-odihna-minim}} lucrătoare. Contractul colectiv sau cel individual poate da mai multe.",
    },
  ],
  glosario: [
    { termino: "Indemnizație de concediu", definicion: "Suma plătită pentru zilele de concediu, în locul salariului." },
  ],
});
