import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ro.impozit-dividende",
  h1: "Calculator impozit pe dividende 2026",
  title: "Impozit pe dividende 2026: {{ro.impozit-dividende}} și CASS",
  description:
    "Calculați impozitul pe dividende de {{ro.impozit-dividende}} și CASS de {{ro.cass}} datorată de asociat, cu pragurile în salarii minime pentru veniturile din 2026.",
  intro: [
    "Când firma distribuie dividende, reține impozitul și vi-l plătește pe restul. Pentru dividendele distribuite din 2026 impozitul este {{ro.impozit-dividende}}.",
    "Pe lângă impozit, asociatul poate datora CASS, dacă dividendele nete și celelalte venituri din alte surse trec de un prag în salarii minime.",
  ],
  comoSeCalcula: [
    "Impozitul este {{ro.impozit-dividende}} din dividendele brute, rotunjit la leu. Este impozit final.",
    "Pentru CASS se adună dividendele nete cu celelalte venituri din alte surse: chirii, dobânzi, drepturi de autor.",
    "Baza CASS este {{ro.plafoane-cass[minim]}} × salariul minim, {{ro.plafoane-cass[mediu]}} × sau {{ro.plafoane-cass[maxim]}} ×, după treapta în care intră totalul. Se folosește salariul minim de la 1 ianuarie, {{ro.salariu-minim-1-ianuarie}}.",
    "CASS este {{ro.cass}} din bază.",
  ],
  ejemplo: [
    "La 100.000 de lei dividende brute, firma reține 16.000 de lei impozit. Din cei 84.000 de lei încasați, CASS este 4.860 de lei. Vă rămân 79.140 de lei.",
  ],
  faq: [
    {
      pregunta: "Cât este impozitul pe dividende în 2026?",
      respuesta: "{{ro.impozit-dividende}} pentru dividendele distribuite începând cu 1 ianuarie 2026. Dividendele interimare din 2025 au rămas la 10 %.",
    },
    {
      pregunta: "Se plătește CASS pe dividende?",
      respuesta: "Da, dacă dividendele nete împreună cu celelalte venituri din alte surse ajung la {{ro.plafoane-cass[minim]}} × salariul minim. CASS nu depinde de procentul din venit, ci de treapta în care vă încadrați.",
    },
    {
      pregunta: "Cine plătește impozitul pe dividende?",
      respuesta: "Firma îl calculează, îl reține la plată și îl virează până pe 25 a lunii următoare. Asociatul primește dividendele deja impozitate.",
    },
  ],
  glosario: [
    { termino: "Dividende brute", definicion: "Suma hotărâtă pentru distribuire, înainte de impozit." },
    { termino: "CASS", definicion: "Contribuția de asigurări sociale de sănătate, plătită și pe veniturile din investiții și chirii, pe trepte." },
  ],
});
