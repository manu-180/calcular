import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "md.calculator-salariu-net",
  h1: "Calculator salariu net 2026",
  title: "Calculator salariu net 2026: cât primiți în mână",
  description:
    "Aflați salariul net din brut: prima CNAM de {{md.prima-medicala}}, impozitul de {{md.impozit-venit}} și scutirea personală de {{md.scutire-personala}} pe an.",
  intro: [
    "Introduceți salariul brut din contract și vedeți cât primiți pe card. Calculul urmează regulile din 2026 pentru salariații din Republica Moldova.",
    "Din salariu se rețin doar două sume: prima de asigurare medicală și impozitul pe venit. Contribuția la fondul social o plătește angajatorul, peste brut.",
  ],
  comoSeCalcula: [
    "Prima de asigurare obligatorie de asistență medicală este {{md.prima-medicala}} din brut.",
    "Din brut se scad prima și a douăsprezecea parte din scutirile anuale: scutirea personală de {{md.scutire-personala}} (sau cea majorată, de {{md.scutire-majorata}}) și {{md.scutire-intretinut}} pentru fiecare persoană întreținută.",
    "Pe suma rămasă se aplică impozitul pe venit de {{md.impozit-venit}}.",
    "Salariul net este brutul minus prima și impozitul.",
    "Dacă venitul pe an depășește {{md.plafon-scutire}}, scutirea personală nu se mai acordă.",
  ],
  ejemplo: [
    "La 15.000 de lei brut, cu scutirea personală, se rețin 1.350 de lei prima medicală și 1.341 de lei impozit. Rămân 12.309 lei în mână.",
  ],
  faq: [
    {
      pregunta: "Ce rețineri se fac din salariu în 2026?",
      respuesta: "Prima de asigurare medicală de {{md.prima-medicala}} și impozitul pe venit de {{md.impozit-venit}}. Contribuția de asigurări sociale de {{md.cas-angajator}} o plătește angajatorul și nu scade din brut.",
    },
    {
      pregunta: "Cât este scutirea personală în 2026?",
      respuesta: "{{md.scutire-personala}} pe an, adică a douăsprezecea parte pe lună. Scutirea personală majorată este {{md.scutire-majorata}}. Se acordă dacă venitul anual impozabil nu trece de {{md.plafon-scutire}}.",
    },
    {
      pregunta: "Cât este scutirea pentru o persoană întreținută?",
      respuesta: "{{md.scutire-intretinut}} pe an pentru fiecare persoană întreținută și {{md.scutire-intretinut-dizabilitate}} pentru o persoană întreținută cu dizabilitate.",
    },
    {
      pregunta: "Ce aleg dacă am doi angajatori?",
      respuesta: "Scutirea anuală se scade o singură dată. Dacă o aplică deja alt angajator, alegeți „Fără scutire personală” pentru al doilea salariu.",
    },
    {
      pregunta: "De ce netul diferă puțin de cel din fișa de salariu?",
      respuesta: "Angajatorul poate avea sporuri, premii sau alte rețineri. Calculatorul pornește doar de la salariul brut lunar și presupune că este același tot anul.",
    },
  ],
  glosario: [
    { termino: "Salariu brut", definicion: "Suma din contractul individual de muncă, înainte de prima medicală și de impozit." },
    { termino: "Prima CNAM", definicion: "Prima de asigurare obligatorie de asistență medicală, care se varsă Companiei Naționale de Asigurări în Medicină." },
    { termino: "Scutire personală", definicion: "Suma anuală pe care nu se plătește impozit pe venit. Se împarte egal pe lunile anului." },
    { termino: "Contribuția CNAS", definicion: "Contribuția de asigurări sociale de stat, plătită de angajator la Casa Națională de Asigurări Sociale." },
  ],
});
