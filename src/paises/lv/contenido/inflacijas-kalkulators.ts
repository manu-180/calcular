import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lv.inflacijas-kalkulators",
  h1: "Inflācijas kalkulators {{anio}}: cik naudas vērtība mainījusies",
  title: "Inflācijas kalkulators {{anio}}: patēriņa cenu indekss",
  description:
    "Aprēķiniet, cik vērta šodien ir kādreizējā summa, izmantojot CSP patēriņa cenu indeksu. Pirktspēja starp diviem mēnešiem, sākot no 2000. gada.",
  intro: [
    "Kalkulators izmanto Centrālās statistikas pārvaldes patēriņa cenu indeksu, kas aprēķināts ar 1990. gada decembri kā bāzi. Jaunākais indekss ir {{lv.pci}}, un tā mēnesis: {{lv.pci#desde}}.",
    "Ievadiet summu un divus mēnešus. Rezultāts rāda, kāda summa beigu mēnesī dod tādu pašu pirktspēju kā sākotnējā summa sākuma mēnesī. Tas noder algām, īres maksai un ilgtermiņa plāniem.",
  ],
  comoSeCalcula: [
    "Summu reizina ar indeksu attiecību: beigu mēneša indekss, dalīts ar sākuma mēneša indeksu. Attiecība rāda, cik reizes pieaugušas cenas šajā periodā.",
    "Rezultāts ir vidējais visam patēriņa grozam. Atsevišķas preces, piemēram, enerģija vai pārtika, var mainīties ātrāk vai lēnāk, tāpēc jūsu personīgā inflācija var atšķirties.",
    "Ja beigu mēnesis ir pēc pēdējā publicētā, aprēķins beidzas ar jaunākajiem datiem, un kalkulators to atzīmē.",
  ],
  ejemplo: [
    "1000 eiro 2025. gada septembrī. Indekss toreiz bija 28 840, bet 2026. gada septembrī 29 751. Rezultāts: 1000 × 29 751 / 28 840 = 1031,59 eiro. Tātad cenas gada laikā pieaugušas par 3,2%.",
  ],
  faq: [
    {
      pregunta: "No kurienes ir dati?",
      respuesta: "No CSP datubāzes tabulas PCI030m. Dati ir oficiāli, un kalkulators tos izmanto bez korekcijām.",
    },
    {
      pregunta: "Vai šis ir tas pats, kas gada inflācija?",
      respuesta: "Gada inflāciju iegūst, salīdzinot vienu un to pašu mēnesi divos pēc kārtas gados. Ievadiet, piemēram, septembri un nākamā gada septembri, un pēdējā rindā redzēsiet to pašu rādītāju.",
    },
    {
      pregunta: "Kā izmantot rezultātu, runājot par algu?",
      respuesta: "Ja alga šajā periodā augusi lēnāk par rezultātu, reālā pirktspēja ir samazinājusies. Salīdzinājumam var izmantot arī CSP datus par vidējo algu mūsu vidējās algas lapā.",
    },
  ],
  glosario: [
    { termino: "Patēriņa cenu indekss", definicion: "Rādītājs, kas parāda vidējās patēriņa preču un pakalpojumu cenu pārmaiņas." },
    { termino: "Pirktspēja", definicion: "Cik daudz preču un pakalpojumu var nopirkt par noteiktu summu." },
  ],
});
