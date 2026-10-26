import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ro.calculator-pfa",
  h1: "Calculator PFA 2026: CAS, CASS și impozit",
  title: "Calculator PFA 2026: CAS, CASS și impozit pe venit",
  description:
    "Calculați taxele unui PFA în sistem real sau la normă de venit: CAS {{ro.cas}}, CASS {{ro.cass}} și impozit {{ro.impozit-venit}}, cu plafoanele din 2026.",
  intro: [
    "Calculatorul estimează ce plătiți în Declarația unică pentru veniturile dintr-un PFA, o întreprindere individuală sau o profesie liberală.",
    "Plafoanele se socotesc în salarii minime brute. Pentru veniturile din 2026 se folosește salariul minim de la 1 ianuarie 2026, {{ro.salariu-minim-1-ianuarie}}, chiar dacă minimul a crescut în cursul anului.",
  ],
  comoSeCalcula: [
    "Venitul net este diferența dintre venituri și cheltuielile deductibile (sistem real) sau norma anuală de venit stabilită pentru activitate și județ.",
    "CAS de {{ro.cas}} se plătește la o bază aleasă de dumneavoastră. Dacă venitul net ajunge la {{ro.plafoane-cas[minim]}} × salariul minim, baza este de cel puțin {{ro.plafoane-cas[minim]}} × salariul minim. Dacă ajunge la {{ro.plafoane-cas[maxim]}} × salariul minim, baza este de cel puțin {{ro.plafoane-cas[maxim]}} × salariul minim. Calculatorul folosește baza minimă.",
    "CASS de {{ro.cass}} se plătește la venitul net, cu o bază de cel puțin {{ro.plafoane-cass-pfa[minim]}} × salariul minim și de cel mult {{ro.plafoane-cass-pfa[maxim]}} × salariul minim.",
    "În sistem real impozitul este {{ro.impozit-venit}} din venitul net minus CAS și CASS. La normă, impozitul este {{ro.impozit-venit}} din normă.",
  ],
  ejemplo: [
    "Cu 120.000 de lei venituri și 20.000 de lei cheltuieli, venitul net este 100.000 de lei. Plătiți 24.300 de lei CAS, 10.000 de lei CASS și 6.570 de lei impozit. Vă rămân 59.130 de lei.",
  ],
  faq: [
    {
      pregunta: "Cât CAS plătește un PFA în 2026?",
      respuesta: "Cu un venit net de cel puțin {{ro.plafoane-cas[minim]}} × salariul minim, CAS este {{ro.cas}} din {{ro.plafoane-cas[minim]}} × salariul minim. De la {{ro.plafoane-cas[maxim]}} × salariul minim în sus, CAS este {{ro.cas}} din {{ro.plafoane-cas[maxim]}} × salariul minim. Sub primul prag CAS este opțional.",
    },
    {
      pregunta: "Cât CASS plătește un PFA?",
      respuesta: "{{ro.cass}} din venitul net, cu o bază între {{ro.plafoane-cass-pfa[minim]}} × și {{ro.plafoane-cass-pfa[maxim]}} × salariul minim. Dacă din salarii ați câștigat în an cel puțin {{ro.plafoane-cass-pfa[minim]}} × salariul minim, nu datorați diferența până la baza minimă.",
    },
    {
      pregunta: "Pensionarii plătesc CAS la PFA?",
      respuesta: "Nu. Persoanele care au calitatea de pensionar nu datorează CAS pentru veniturile din activități independente.",
    },
    {
      pregunta: "Când trebuie trecut PFA-ul în sistem real?",
      respuesta: "Dacă la normă de venit ați avut într-un an venituri brute de peste echivalentul a 25.000 de euro, din anul următor venitul net se stabilește în sistem real.",
    },
  ],
  glosario: [
    { termino: "Sistem real", definicion: "Venitul net este calculat din evidența contabilă: venituri minus cheltuieli deductibile." },
    { termino: "Normă de venit", definicion: "Un venit net anual fix, stabilit de direcția regională a finanțelor publice pentru fiecare activitate." },
    { termino: "Declarația unică", definicion: "Formularul prin care persoanele fizice declară veniturile și plătesc impozitul și contribuțiile, până la 25 mai a anului următor." },
  ],
});
