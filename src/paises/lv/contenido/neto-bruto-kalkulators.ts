import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lv.neto-bruto-kalkulators",
  h1: "No neto uz bruto {{anio}}: cik jābūt algai līgumā",
  title: "Neto bruto kalkulators {{anio}}: alga līgumā",
  description:
    "Zināt, cik vēlaties saņemt uz rokas? Aprēķiniet bruto algu ar VSAOI {{lv.vsaoi-darba-nemejs[vispariga]}}, IIN {{lv.iin-alga}} un minimumu {{lv.neapliekamais-minimums}}.",
  intro: [
    "Darba sludinājumos un sarunās bieži runā par summu uz rokas, bet līgumā raksta bruto algu. Ar pašreizējām likmēm ({{lv.vsaoi-darba-nemejs[vispariga]}} VSAOI un {{lv.iin-alga}} IIN) no katra bruto eiro virs atvieglojumiem uz rokas paliek apmēram divas trešdaļas.",
    "Šis kalkulators darbojas pretējā virzienā: ievadiet vēlamo neto summu, un tas atradīs bruto algu, kas jānorāda līgumā.",
  ],
  comoSeCalcula: [
    "Neto alga ir bruto alga mīnus VSAOI un IIN. Nodokli rēķina no summas, kas paliek pēc VSAOI, neapliekamā minimuma ({{lv.neapliekamais-minimums}}) un atvieglojumiem par apgādājamiem ({{lv.apgadajamais}} par katru).",
    "Kalkulators meklē tādu bruto algu, kas pēc šiem ieturējumiem dod jūsu ievadīto neto summu. Tā rezultāts sakrīt ar algas kalkulatoru pretējā virzienā.",
    "Ja neto ir tik mazs, ka apliekamā summa nerodas, ietur tikai VSAOI. Ja grāmatiņa nav iesniegta, minimumu neņem vērā, un vajadzīgā bruto alga ir lielāka.",
  ],
  ejemplo: [
    "Lai uz rokas saņemtu 1307,11 eiro, bez apgādājamiem un ar grāmatiņu, līgumā jābūt 1750 eiro. To apstiprina VID piemērs: VSAOI 183,75 eiro un IIN 259,14 eiro. Bez grāmatiņas tai pašai neto summai bruto būtu aptuveni 1960 eiro.",
  ],
  faq: [
    {
      pregunta: "Kāpēc neto un bruto starpība nav vienāda visām algām?",
      respuesta: "Neapliekamais minimums ({{lv.neapliekamais-minimums}}) ir fiksēta summa, nevis procents. Pie mazas algas tas atbrīvo lielāku algas daļu, tāpēc ieturējumu īpatsvars aug līdz ar algu.",
    },
    {
      pregunta: "Vai šeit ir iekļauta arī darba devēja daļa?",
      respuesta: "Nē. Darba devējs papildus maksā savu VSAOI daļu, ko aprēķina atsevišķi darba devēja izmaksu kalkulatorā. Bruto alga šo summu neietver.",
    },
    {
      pregunta: "Kuru summu rakstīt darba līgumā?",
      respuesta: "Līgumā parasti norāda bruto algu, un tieši no tās VID likmes aprēķina ieturējumus. Tāpēc pirms sarunas vērts zināt, kam vēlamais neto atbilst bruto izteiksmē.",
    },
  ],
  glosario: [
    { termino: "Neto alga", definicion: "Summa, ko saņemat kontā pēc VSAOI un IIN ieturēšanas." },
    { termino: "Apliekamā summa", definicion: "Algas daļa, no kuras rēķina IIN: bruto mīnus VSAOI, minimums un atvieglojumi." },
  ],
});
