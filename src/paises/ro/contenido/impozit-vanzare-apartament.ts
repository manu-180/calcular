import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ro.impozit-vanzare-apartament",
  h1: "Calculator impozit vânzare apartament sau casă",
  title: "Impozit vânzare apartament {{anio}}: {{ro.impozit-transfer-imobiliar[peste-3-ani]}} sau {{ro.impozit-transfer-imobiliar[max-3-ani]}}",
  description:
    "Calculați impozitul la vânzarea unei locuințe: {{ro.impozit-transfer-imobiliar[max-3-ani]}} dacă o dețineți de cel mult 3 ani și {{ro.impozit-transfer-imobiliar[peste-3-ani]}} după 3 ani, cu grila notarilor.",
  intro: [
    "La vânzarea unei case, a unui apartament sau a unui teren din patrimoniul personal, vânzătorul datorează un impozit calculat la valoarea tranzacției.",
    "Notarul calculează și încasează impozitul înainte de semnarea contractului. Calculatorul vă arată suma dinainte.",
  ],
  comoSeCalcula: [
    "Cota depinde de cât timp ați deținut proprietatea: {{ro.impozit-transfer-imobiliar[max-3-ani]}} până la 3 ani inclusiv și {{ro.impozit-transfer-imobiliar[peste-3-ani]}} peste 3 ani.",
    "Baza este prețul din contract. Dacă prețul este sub valoarea minimă din studiul de piață al camerei notarilor, baza devine acea valoare.",
    "Impozitul este cota înmulțită cu baza, rotunjit la leu.",
  ],
  ejemplo: ["Pentru un apartament vândut cu 500.000 de lei, deținut de 5 ani, impozitul este 5.000 de lei."],
  faq: [
    {
      pregunta: "Cât este impozitul la vânzarea unui apartament în 2026?",
      respuesta: "{{ro.impozit-transfer-imobiliar[max-3-ani]}} din valoarea tranzacției dacă l-ați deținut cel mult 3 ani și {{ro.impozit-transfer-imobiliar[peste-3-ani]}} dacă l-ați deținut mai mult de 3 ani.",
    },
    {
      pregunta: "Cine plătește impozitul, vânzătorul sau cumpărătorul?",
      respuesta: "Impozitul îl datorează vânzătorul. Notarul îl calculează și îl încasează înainte de autentificarea contractului.",
    },
    {
      pregunta: "Se plătește impozit la donație?",
      respuesta: "Nu, la donațiile între rude și afini până la gradul al III-lea inclusiv și între soți.",
    },
    {
      pregunta: "Se plătește impozit la moștenire?",
      respuesta: "Nu, dacă succesiunea este dezbătută și finalizată în 2 ani de la deces. După acest termen, moștenitorii datorează 1 % din valoarea masei succesorale.",
    },
  ],
  glosario: [
    { termino: "Grila notarilor", definicion: "Studiul de piață anual al camerelor notarilor, cu valorile minime ale imobilelor pe zone." },
    { termino: "Valoarea tranzacției", definicion: "Prețul declarat de părți în contractul de vânzare." },
  ],
});
