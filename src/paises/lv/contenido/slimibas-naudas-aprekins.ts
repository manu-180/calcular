import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lv.slimibas-naudas-aprekins",
  h1: "Slimības naudas aprēķins {{anio}}: darba devējs un VSAA",
  title: "Slimības naudas aprēķins {{anio}}: {{lv.slimibas-pabalsts}} no algas",
  description:
    "Aprēķiniet slimības naudu: no 2. dienas {{lv.slimibas-nauda-2-3}} un no 4. dienas {{lv.slimibas-nauda-4-9}} maksā darba devējs, no 10. dienas VSAA {{lv.slimibas-pabalsts}}.",
  intro: [
    "Par slimības 2. un 3. dienu darba devējs maksā vismaz {{lv.slimibas-nauda-2-3}} no vidējās izpeļņas, bet no 4. līdz 9. dienai vismaz {{lv.slimibas-nauda-4-9}}. No 10. dienas VSAA maksā slimības pabalstu {{lv.slimibas-pabalsts}} apmērā no vidējās iemaksu algas.",
    "Par pirmo slimības dienu nekas nav jāmaksā. Kalkulators sadala summu starp darba devēju un VSAA, ņemot vērā abus aprēķina pamatus.",
  ],
  comoSeCalcula: [
    "Darba devēja daļa (A lapa): dienas vidējo izpeļņu reizina ar dienu skaitu periodā un likmi. Likme ir vismaz {{lv.slimibas-nauda-2-3}} par 2. un 3. dienu un vismaz {{lv.slimibas-nauda-4-9}} par nākamajām sešām dienām.",
    "VSAA daļa (B lapa): vidējā iemaksu alga dienā ir 12 mēnešu iemaksu algas kopsumma, dalīta ar kalendāra dienām periodā, kas beidzas divus mēnešus pirms slimības. No tās aprēķina {{lv.slimibas-pabalsts}} par katru dienu, sākot ar 10.",
    "Nepārtrauktā slimībā VSAA ilgākais periods ir {{lv.slimibas-nedelas}}, un ar valsts ārstu komisijas atzinumu to var pagarināt līdz 52 nedēļām. Ar pārtraukumiem periods ir 52 nedēļas trijos gados. Pabalsta summai piemēro IIN.",
    "Nelaimes gadījumā darbā noteikumi atšķiras, un kalkulators tos nerēķina.",
  ],
  ejemplo: [
    "14 slimības dienas, vidējā izpeļņa 80 eiro dienā, iemaksu alga 55 eiro dienā. Darba devējs: 2 × 80 × 75% = 120 eiro un 6 × 80 × 80% = 384 eiro, kopā 504 eiro. VSAA par 5 dienām: 5 × 55 × 80% = 220 eiro. Pavisam 724 eiro bruto.",
  ],
  faq: [
    {
      pregunta: "Vai pirmā slimības diena tiek apmaksāta?",
      respuesta: "Nē. Darba devēja maksājumi sākas ar otro dienu. Tāpēc ļoti īsa slimība var būt neapmaksāta.",
    },
    {
      pregunta: "Cik ilgi jābūt apdrošinātam?",
      respuesta: "VSAA prasa iemaksas vismaz 3 mēnešus pēdējos 6 mēnešos vai vismaz 6 mēnešus pēdējos 24 mēnešos. Pieteikums jāiesniedz 6 mēnešu laikā no pirmās slimības dienas.",
    },
    {
      pregunta: "Kas notiek, ja darba attiecības beidzas slimības laikā?",
      respuesta: "VSAA norāda: pabalstu izmaksā vēl 30 kalendāra dienas pēc darba attiecību izbeigšanas. Tas neattiecas uz nelaimes gadījumu darbā vai arodslimību.",
    },
  ],
  glosario: [
    { termino: "Slimības lapa A", definicion: "Pamats darba devēja maksājumam par slimības pirmajām dienām." },
    { termino: "Slimības lapa B", definicion: "Pamats VSAA slimības pabalstam, sākot ar 10. dienu." },
  ],
});
