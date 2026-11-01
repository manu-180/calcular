import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lv.atvalinajuma-naudas-aprekins",
  h1: "Atvaļinājuma naudas aprēķins {{anio}}: kalkulators",
  title: "Atvaļinājuma naudas aprēķins {{anio}}: cik saņemsiet",
  description:
    "Aprēķiniet atvaļinājuma naudu no pēdējo sešu mēnešu vidējās izpeļņas un darba dienām. Aprēķina periods: {{lv.videja-izpelna-periods}}. Minimums: {{lv.atvalinajums-nedelas}}.",
  intro: [
    "Ikgadējā apmaksātā atvaļinājuma minimums ir {{lv.atvalinajums-nedelas}}, neskaitot svētku dienas. Atvaļinājuma naudu rēķina no vidējās izpeļņas. Aprēķina periods: {{lv.videja-izpelna-periods}}.",
    "Kalkulators aprēķina dienas vidējo izpeļņu un reizina to ar darba dienām atvaļinājuma laikā. Rezultāts ir bruto summa, no kuras vēl ietur VSAOI un IIN tāpat kā no algas.",
  ],
  comoSeCalcula: [
    "Darba likuma 75. pants: saskaitiet darba samaksu par pēdējiem sešiem kalendāra mēnešiem, tostarp piemaksas un prēmijas, un daliet ar šajā periodā nostrādāto dienu skaitu. Tā ir dienas vidējā izpeļņa.",
    "Valsts darba inspekcija skaidro: atvaļinājuma nauda ir dienas vai stundas vidējā izpeļņa, reizināta ar darba dienu vai stundu skaitu atvaļinājuma laikā. Skaita dienas, kuras darbinieks būtu strādājis pēc sava grafika.",
    "Svētku dienas atvaļinājumā neapmaksā kā atvaļinājumu, bet atvaļinājums par tām pagarinās. Četras nedēļas piecu dienu darba nedēļā ir 20 darba dienas.",
    "Summētā darba laika gadījumā dienas vidējo izpeļņu rēķina no stundas vidējās izpeļņas. Šis kalkulators šo gadījumu nerēķina.",
  ],
  ejemplo: [
    "Pēdējos sešos mēnešos samaksa kopā ir 10 500 eiro un nostrādātas 125 dienas. Dienas vidējā izpeļņa: 10 500 / 125 = 84 eiro. Četru nedēļu atvaļinājums (20 darba dienas): 84 × 20 = 1680 eiro bruto.",
  ],
  faq: [
    {
      pregunta: "Cik garš ir ikgadējais atvaļinājums?",
      respuesta: "Minimums ir {{lv.atvalinajums-nedelas}}, tas ir, 28 kalendāra dienas, neskaitot svētku dienas (Darba likuma 149. pants). Personām līdz 18 gadu vecumam pienākas viens mēnesis. Tas pats minimums ir arī nepilnā darba laikā.",
    },
    {
      pregunta: "Kad rodas tiesības uz pilnu atvaļinājumu?",
      respuesta: "Valsts darba inspekcija norāda: pēc sešiem mēnešiem nepārtrauktā darbā pie viena darba devēja (150. panta trešā daļa). Avansā var pieprasīt divas nedēļas vai, ja darba devējs piekrīt, visu gada atvaļinājumu.",
    },
    {
      pregunta: "Kāpēc atvaļinājuma nauda atšķiras no algas?",
      respuesta: "Tajā ietilpst arī piemaksas un prēmijas no pēdējiem sešiem mēnešiem, un to dala ar nostrādātajām dienām, nevis kalendāra dienām. Tāpēc summa var būt lielāka vai mazāka par parasto mēneša algu.",
    },
  ],
  glosario: [
    { termino: "Vidējā izpeļņa", definicion: "Darba samaksas vidējais par pēdējiem sešiem kalendāra mēnešiem." },
    { termino: "Summētais darba laiks", definicion: "Grafiks, kurā darba laiku uzskaita par ilgāku periodu, nevis katrai dienai atsevišķi." },
  ],
});
