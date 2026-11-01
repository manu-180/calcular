import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "si.izracun-nadur",
  h1: "Izračun nadur {{anio}}: plačilo in dodatek",
  title: "Izračun nadur {{anio}}: plačilo, dodatek in meje",
  description: "Izračunajte bruto plačilo nadur z dodatkom iz vaše kolektivne pogodbe. Zakonske meje: {{si.nadure-meje[teden]}} na teden in {{si.nadure-meje[mesec]}} na mesec.",
  intro: [
    "Za nadurno delo, ki lahko traja največ {{si.nadure-meje[mesec]}} na mesec, pripada plačilo ure in dodatek. Višine dodatka ZDR-1 ne določa: po 128. členu jo določa kolektivna pogodba na ravni dejavnosti. Zato vpišite odstotek iz svoje pogodbe.",
    "Zakon pa določa meje. Nadure lahko trajajo največ {{si.nadure-meje[teden]}} na teden, {{si.nadure-meje[mesec]}} na mesec in {{si.nadure-meje[leto]}} na leto.",
  ],
  comoSeCalcula: [
    "Urna postavka = mesečna bruto plača / delovne ure v mesecu.",
    "Plačilo ur = urna postavka × nadure. Dodatek = plačilo ur × odstotek iz kolektivne pogodbe.",
    "S pisnim soglasjem delavca lahko nadure trajajo do {{si.nadure-meje[soglasje]}} na leto (144. člen ZDR-1).",
  ],
  ejemplo: [
    "Bruto plača 2.000,00 €, 174 ur v mesecu, 10 nadur in dodatek 30 odstotkov: urna postavka je 11,49 €, plačilo ur 114,94 €, dodatek 34,48 €, skupaj 149,42 € bruto.",
  ],
  faq: [
    {
      pregunta: "Kje najdem odstotek dodatka?",
      respuesta: "V kolektivni pogodbi svoje dejavnosti, ker 128. člen ZDR-1 prepušča višino dodatkov kolektivnim pogodbam. Odstotek 30 je v kalkulatorju le začetna vrednost, ki jo zamenjajte.",
    },
    {
      pregunta: "Ali lahko delodajalec odredi nadure ustno?",
      respuesta: "Praviloma mora biti odreditev pisna in pred začetkom dela. Če to zaradi narave dela ni mogoče, jo lahko odredi ustno in pisno potrdi pozneje (144. člen ZDR-1).",
    },
    {
      pregunta: "Ali lahko starejšemu delavcu odredijo nadure?",
      respuesta: "Ne brez njegovega soglasja. Delavcu, starejšemu od 55 let, nadurnega ali nočnega dela ni mogoče odrediti brez soglasja (199. člen ZDR-1).",
    },
  ],
  glosario: [
    { termino: "Nadurno delo", definicion: "Delo preko polnega delovnega časa na zahtevo delodajalca." },
    { termino: "Kolektivna pogodba", definicion: "Dogovor med sindikati in delodajalci, ki določa pravice v dejavnosti." },
  ],
});
