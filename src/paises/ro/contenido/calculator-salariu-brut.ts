import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ro.calculator-salariu-brut",
  h1: "Calculator salariu brut din net",
  title: "Calculator salariu brut din net 2026",
  description:
    "Aflați ce salariu brut trebuie trecut în contract pentru netul dorit, cu CAS {{ro.cas}}, CASS {{ro.cass}}, impozit {{ro.impozit-venit}} și deducerea personală.",
  intro: [
    "Când negociați un salariu, de obicei știți suma pe care vreți să o primiți în mână. Contractul de muncă se scrie însă în brut.",
    "Calculatorul caută brutul în lei întregi care dă cel puțin netul cerut, cu aceleași reguli ca la calculul salariului net.",
  ],
  comoSeCalcula: [
    "Pentru fiecare brut posibil se rețin CAS de {{ro.cas}} și CASS de {{ro.cass}}, se scade deducerea personală și se aplică impozitul de {{ro.impozit-venit}}.",
    "Se alege cel mai mic brut la care netul ajunge la suma dorită.",
    "Dacă salariul de bază este egal cu minimul, se ține cont și de suma neimpozabilă de {{ro.facilitate-salariu-minim[suma]}}.",
  ],
  ejemplo: ["Pentru 3.523 de lei net, fără persoane în întreținere, brutul necesar este 6.000 de lei."],
  faq: [
    {
      pregunta: "Cât brut înseamnă 4.000 de lei net?",
      respuesta: "Puneți 4.000 în calculator. Rezultatul depinde de deducerea personală, deci de persoanele aflate în întreținere și de vârstă.",
    },
    {
      pregunta: "De ce brutul nu crește proporțional cu netul?",
      respuesta: "Deducerea personală scade pe măsură ce salariul crește și dispare peste {{ro.salariu-minim}} plus {{ro.deducere-plafon}}. De aceea, la salariile mici, fiecare leu net în plus cere ceva mai mult brut.",
    },
    {
      pregunta: "Brutul include contribuția angajatorului?",
      respuesta: "Nu. Angajatorul plătește în plus contribuția asiguratorie pentru muncă de {{ro.cam}}. Costul total îl găsiți în calculatorul de cost angajator.",
    },
  ],
  glosario: [
    { termino: "Salariu net", definicion: "Suma care ajunge în contul angajatului după contribuții și impozit." },
    { termino: "Salariu brut", definicion: "Suma din contractul de muncă, din care se rețin contribuțiile și impozitul." },
  ],
});
