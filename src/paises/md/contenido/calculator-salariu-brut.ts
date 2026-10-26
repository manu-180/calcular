import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "md.calculator-salariu-brut",
  h1: "Calculator salariu brut din net",
  title: "Calculator salariu brut din net 2026",
  description: "Aflați ce salariu brut trebuie trecut în contract pentru netul dorit, cu prima CNAM de {{md.prima-medicala}} și impozitul de {{md.impozit-venit}}.",
  intro: [
    "Când negociați un salariu în mână, angajatorul vă cere de obicei suma brută. Calculatorul face drumul invers: de la net la brut.",
    "Arată și cât plătește firma în total, cu contribuția de asigurări sociale de {{md.cas-angajator}}.",
  ],
  comoSeCalcula: [
    "Netul este brutul minus prima medicală de {{md.prima-medicala}} și minus impozitul de {{md.impozit-venit}}, aplicat după scăderea primei și a scutirilor lunare.",
    "Calculatorul caută cel mai mic brut, la ban, care dă cel puțin netul cerut.",
    "Dacă brutul găsit înseamnă un venit anual peste {{md.plafon-scutire}}, scutirea personală nu se mai aplică și brutul se recalculează fără ea.",
  ],
  faq: [
    {
      pregunta: "Ce brut corespunde unui net de 10.000 de lei?",
      respuesta: "Introduceți 10.000 în calculator. Rezultatul depinde de scutirea personală și de persoanele întreținute pe care le declarați la angajator.",
    },
    {
      pregunta: "De ce netul iese uneori cu câțiva bani mai mare?",
      respuesta: "Prima și impozitul se rotunjesc la ban. Calculatorul alege cel mai mic brut care nu dă un net sub suma cerută.",
    },
    {
      pregunta: "Contribuția la fondul social scade din brut?",
      respuesta: "Nu. Contribuția de asigurări sociale de {{md.cas-angajator}} o plătește angajatorul, peste brut. Din brut se rețin doar prima medicală și impozitul.",
    },
  ],
  glosario: [
    { termino: "Salariu net", definicion: "Suma primită pe card după reținerea primei medicale și a impozitului pe venit." },
    { termino: "Cost total", definicion: "Brutul plus contribuția de asigurări sociale plătită de angajator." },
  ],
});
