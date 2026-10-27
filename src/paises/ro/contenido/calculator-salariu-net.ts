import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ro.calculator-salariu-net",
  h1: "Calculator salariu net {{anio}}",
  title: "Calculator salariu net {{anio}}: cât primiți în mână",
  description:
    "Calculați salariul net din brut: CAS {{ro.cas}}, CASS {{ro.cass}}, impozit {{ro.impozit-venit}} și deducerea personală, cu salariul minim de {{ro.salariu-minim}}.",
  intro: [
    "Introduceți salariul brut din contract și aflați cât primiți în mână. Calculul urmează Codul fiscal: contribuțiile sociale, deducerea personală și impozitul pe venit.",
    "Deducerea depinde de câte persoane aveți în întreținere și de cât de aproape este salariul de minimul pe țară. Peste {{ro.salariu-minim}} plus {{ro.deducere-plafon}} nu se mai acordă deducerea de bază.",
  ],
  comoSeCalcula: [
    "Din brut se rețin CAS de {{ro.cas}} (pensia) și CASS de {{ro.cass}} (sănătatea). Fiecare se rotunjește la leu.",
    "Deducerea personală de bază este un procent din salariul minim: {{ro.deducere-baza[0]}} fără persoane în întreținere și până la {{ro.deducere-baza[4]}} cu patru sau mai multe. Procentul scade cu {{ro.deducere-scadere}} la fiecare {{ro.deducere-pas}} peste salariul minim.",
    "Se adaugă, dacă este cazul, deducerea pentru tinerii sub 26 de ani ({{ro.deducere-tineri}} din salariul minim) și {{ro.deducere-copil}} pentru fiecare copil înscris la școală.",
    "Impozitul este {{ro.impozit-venit}} din venitul rămas după contribuții și deduceri.",
    "Salariul net este brutul minus CAS, CASS și impozit.",
  ],
  ejemplo: [
    "La 6.000 de lei brut, fără persoane în întreținere, se rețin 1.500 de lei CAS, 600 de lei CASS și 377 de lei impozit. Rămân 3.523 de lei în mână.",
  ],
  faq: [
    {
      pregunta: "Cât este salariul minim net în 2026?",
      respuesta: "De la 1 iulie 2026 salariul minim brut este {{ro.salariu-minim}}. Cu suma neimpozabilă de {{ro.facilitate-salariu-minim[suma]}}, netul este 2.699 de lei pentru un angajat fără persoane în întreținere.",
    },
    {
      pregunta: "Ce este suma neimpozabilă de la salariul minim?",
      respuesta: "În 2026, pentru salariații cu normă întreagă și salariul de bază egal cu minimul, o parte din salariu nu intră în calculul CAS, CASS și al impozitului. Acum este {{ro.facilitate-salariu-minim[suma]}} pe lună, dacă venitul brut nu depășește {{ro.facilitate-salariu-minim[plafon]}}.",
    },
    {
      pregunta: "Cine este persoană în întreținere?",
      respuesta: "Copiii sub 18 ani și membrii familiei până la gradul al doilea care au venituri lunare de cel mult 20 % din salariul minim. Pentru un copil, deducerea se acordă fiecărui părinte care îl are în întreținere.",
    },
    {
      pregunta: "Se mai acordă scutirea de impozit pentru IT sau construcții?",
      respuesta: "Calculatorul aplică regulile generale din Codul fiscal. Nu include facilitățile speciale ale unor domenii și nici pensia privată facultativă sau cotizația sindicală.",
    },
    {
      pregunta: "De ce netul diferă puțin de cel din fluturaș?",
      respuesta: "Angajatorul poate avea sporuri, tichete de masă sau rețineri proprii. Calculatorul pornește doar de la salariul brut și rotunjește sumele la leu, cum cere Codul fiscal.",
    },
  ],
  glosario: [
    { termino: "Salariu brut", definicion: "Suma din contractul de muncă, înainte de contribuții și impozit." },
    { termino: "CAS", definicion: "Contribuția de asigurări sociale, care merge la pensie." },
    { termino: "CASS", definicion: "Contribuția de asigurări sociale de sănătate." },
    { termino: "Deducere personală", definicion: "Suma care se scade din venit înainte de calculul impozitului, pentru salariile mici și pentru familiile cu persoane în întreținere." },
  ],
});
