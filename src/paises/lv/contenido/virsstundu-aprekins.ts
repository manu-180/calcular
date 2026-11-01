import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lv.virsstundu-aprekins",
  h1: "Virsstundu aprēķins {{anio}}: samaksa un piemaksa",
  title: "Virsstundu aprēķins {{anio}}: piemaksa {{lv.virsstundu-piemaksa}}",
  description:
    "Aprēķiniet samaksu par virsstundām: Darba likumā piemaksa ir vismaz {{lv.virsstundu-piemaksa}} no stundas likmes. Ievadiet likmi, stundas un līgumā noteikto piemaksu.",
  intro: [
    "Par virsstundu darbu pienākas piemaksa vismaz {{lv.virsstundu-piemaksa}} no stundas vai dienas algas likmes (Darba likuma 68. pants). Tātad par katru virsstundu parasti saņemat divkāršu stundas likmi.",
    "Ievadiet stundas likmi un virsstundu skaitu, un kalkulators parādīs bruto summu. Ja līgumā vai koplīgumā ir noteikta lielāka piemaksa, ievadiet to atsevišķi.",
  ],
  comoSeCalcula: [
    "Parastā samaksa ir stundas likme, reizināta ar virsstundām. Piemaksa ir šīs summas {{lv.virsstundu-piemaksa}}. Abas summas saskaita.",
    "Ja nolīgta akorda alga, piemaksa ir vismaz tādā pašā apmērā no akorddarba izcenojuma par paveikto darbu. Šo gadījumu kalkulators nerēķina.",
    "Valsts darba inspekcija norāda izņēmumu: nozares ģenerālvienošanās, kas būtiski paaugstina minimālo algu, var noteikt mazāku piemaksu, bet ne mazāku par 50%. Tādas ir dzelzceļa, būvniecības un stikla šķiedras nozarē. Ja uz jums attiecas šāda vienošanās, rezultāts būs mazāks.",
  ],
  ejemplo: [
    "Stundas likme 10 eiro, 8 virsstundas. Parastā samaksa ir 80 eiro, piemaksa 80 eiro, kopā 160 eiro bruto. Ja līgumā paredzēts 150%, piemaksa ir 120 eiro un kopā 200 eiro.",
  ],
  faq: [
    {
      pregunta: "Vai virsstundas var kompensēt ar brīvu laiku?",
      respuesta: "Jā. Valsts darba inspekcija norāda: puses var vienoties par apmaksātu atpūtu citā laikā atbilstoši nostrādāto virsstundu skaitam (136. panta devītā daļa).",
    },
    {
      pregunta: "Vai virsstundas svētku dienā maksā divreiz?",
      respuesta: "Valsts darba inspekcija skaidro: ja virsstundas nostrādātas svētku dienā, darbiniekam ir tiesības gan uz piemaksu par virsstundām, gan uz piemaksu par darbu svētku dienā.",
    },
    {
      pregunta: "Vai līgumā var noteikt lielāku piemaksu?",
      respuesta: "Jā. 68. panta otrā daļa ļauj koplīgumā vai darba līgumā noteikt lielāku piemaksu. Mazāku var noteikt tikai iepriekš minētajās nozaru ģenerālvienošanās.",
    },
  ],
  glosario: [
    { termino: "Virsstundas", definicion: "Darbs ārpus jums noteiktā normālā darba laika." },
    { termino: "Ģenerālvienošanās", definicion: "Nozares darba devēju un arodbiedrību vienošanās, kas attiecas uz visu nozari." },
  ],
});
