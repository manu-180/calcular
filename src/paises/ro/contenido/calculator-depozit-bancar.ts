import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ro.calculator-depozit-bancar",
  h1: "Calculator depozit bancar: dobânda netă",
  title: "Calculator depozit bancar 2026: dobânda după impozit",
  description:
    "Calculați dobânda la un depozit la termen, cu sau fără capitalizare, după impozitul pe dobânzi de {{ro.impozit-dobanzi}} reținut de bancă.",
  intro: [
    "Introduceți suma, dobânda anuală din oferta băncii și termenul. Calculatorul arată dobânda brută, impozitul și suma pe care o aveți la final.",
    "La depozitele cu prelungire automată, dobânda netă se adaugă la sumă la fiecare termen și produce la rândul ei dobândă.",
  ],
  comoSeCalcula: [
    "Dobânda pe un termen este suma × dobânda anuală × lunile termenului / 12.",
    "Banca reține impozit de {{ro.impozit-dobanzi}} din dobândă când o înregistrează în cont. Impozitul este final.",
    "Cu capitalizare, dobânda netă se adaugă la sold înainte de termenul următor.",
  ],
  ejemplo: ["La 10.000 de lei pe 12 luni cu 6 % pe an, dobânda brută este 600 de lei, impozitul 60 de lei, iar la final aveți 10.540 de lei."],
  faq: [
    {
      pregunta: "Cât este impozitul pe dobânda la depozit?",
      respuesta: "{{ro.impozit-dobanzi}} din dobândă, reținut direct de bancă. Nu trebuie să declarați nimic pentru impozit.",
    },
    {
      pregunta: "Se plătește CASS pe dobânzi?",
      respuesta: "Poate, dacă dobânzile nete împreună cu alte venituri din alte surse (chirii, dividende) trec de pragul anual în salarii minime. Verificați cu calculatorul CASS.",
    },
    {
      pregunta: "Ce dobândă să introduc?",
      respuesta: "Dobânda anuală fixă din contractul sau oferta băncii pentru termenul ales. Calculatorul nu cunoaște ofertele băncilor.",
    },
  ],
  glosario: [
    { termino: "Depozit la termen", definicion: "Bani blocați la bancă pe o perioadă fixă, pentru o dobândă stabilită." },
    { termino: "Capitalizare", definicion: "Adăugarea dobânzii la suma depusă, ca termenul următor să aducă dobândă și la dobândă." },
  ],
});
