import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ro.calculator-drepturi-de-autor",
  h1: "Calculator drepturi de autor {{anio}}",
  title: "Calculator drepturi de autor {{anio}}: impozit, CAS și CASS",
  description:
    "Calculați netul din drepturi de autor: cota forfetară de {{ro.forfetar-drepturi-autor}}, impozit de {{ro.impozit-venit}}, plus CAS și CASS pe trepte de salarii minime.",
  intro: [
    "Pentru un contract de cesiune de drepturi de autor plătit de o firmă, plătitorul reține impozitul. CAS și CASS se stabilesc pe an, după totalul veniturilor.",
    "Calculatorul arată ce vă rămâne dintr-o sumă brută anuală.",
  ],
  comoSeCalcula: [
    "Venitul net este brutul minus cota forfetară de cheltuieli de {{ro.forfetar-drepturi-autor}}.",
    "Impozitul este {{ro.impozit-venit}} din venitul net și este final.",
    "CAS de {{ro.cas}} se datorează dacă venitul net ajunge la {{ro.plafoane-cas[minim]}} × salariul minim, la o bază de {{ro.plafoane-cas[minim]}} × sau {{ro.plafoane-cas[maxim]}} × salariul minim. Cine are și salariu nu datorează CAS pe drepturile de autor.",
    "CASS de {{ro.cass}} se calculează pe trepte, de la {{ro.plafoane-cass[minim]}} × salariul minim în sus. Salariul minim folosit este cel de la 1 ianuarie, {{ro.salariu-minim-1-ianuarie}}.",
  ],
  ejemplo: ["Din 100.000 de lei drepturi de autor, fără salariu, plătiți 6.000 de lei impozit, 12.150 de lei CAS și 4.860 de lei CASS. Rămân 76.990 de lei."],
  faq: [
    {
      pregunta: "Cât impozit se plătește pe drepturile de autor?",
      respuesta: "{{ro.impozit-venit}} din venitul net, adică din brut după scăderea cotei forfetare de {{ro.forfetar-drepturi-autor}}.",
    },
    {
      pregunta: "Plătesc CAS dacă am și contract de muncă?",
      respuesta: "Nu. Persoanele care au venituri din salarii nu datorează CAS pentru drepturile de autor. CASS se poate datora în continuare.",
    },
    {
      pregunta: "Pensionarii plătesc CAS pe drepturile de autor?",
      respuesta: "Nu. Pensionarii nu datorează CAS pentru aceste venituri.",
    },
  ],
  glosario: [
    { termino: "Cota forfetară", definicion: "Partea din venit considerată cheltuială, fără documente." },
    { termino: "Impozit final", definicion: "Impozitul reținut la sursă care nu se mai recalculează în declarația anuală." },
  ],
});
