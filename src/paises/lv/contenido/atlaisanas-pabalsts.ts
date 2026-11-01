import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lv.atlaisanas-pabalsts",
  h1: "Atlaišanas pabalsts {{anio}}: cik pienākas pēc darba stāža",
  title: "Atlaišanas pabalsts {{anio}}: no 1 līdz 4 mēnešu izpeļņai",
  description:
    "Aprēķiniet atlaišanas pabalstu pēc vidējās izpeļņas: {{lv.atlaisanas-pabalsts[lidz-5]}} īsam darbam, {{lv.atlaisanas-pabalsts[virs-20]}} pēc 20 gadiem pie viena darba devēja.",
  intro: [
    "Atlaišanas pabalsta apmērs vidējās izpeļņas izteiksmē ir {{lv.atlaisanas-pabalsts[lidz-5]}} īsam darbam un {{lv.atlaisanas-pabalsts[virs-20]}} pēc 20 gadiem. Tas atkarīgs no tā, cik ilgi strādājat pie šī darba devēja. Darba koplīgumā vai līgumā var būt noteikts vairāk.",
    "Ievadiet mēneša vidējo izpeļņu un nodarbinātības ilgumu, un kalkulators parādīs summu. Summa ir bruto, un tā izmaksājama atlaišanas dienā.",
  ],
  comoSeCalcula: [
    "Summa ir mēneša vidējā izpeļņa, reizināta ar mēnešu skaitu: mazāk nekā 5 gadi {{lv.atlaisanas-pabalsts[lidz-5]}}, no 5 līdz 10 gadiem {{lv.atlaisanas-pabalsts[5-10]}}, no 10 līdz 20 gadiem {{lv.atlaisanas-pabalsts[10-20]}}, vairāk nekā 20 gadi {{lv.atlaisanas-pabalsts[virs-20]}}.",
    "Vidējo izpeļņu rēķina no algas, piemaksām un prēmijām (Darba likuma 75. pants). Aprēķina periods: {{lv.videja-izpelna-periods}}.",
    "Labklājības ministrija skaidro: pabalsts pienākas, ja darba devējs uzteic darba līgumu Darba likumā noteiktajos gadījumos, piemēram, darbinieku skaita samazināšanas dēļ. Ja darba attiecības izbeidz pēc abu pušu vienošanās (114. pants), pabalsts nepienākas.",
  ],
  ejemplo: [
    "Mēneša vidējā izpeļņa 1500 eiro un 7 gadi pie darba devēja: 1500 × 2 = 3000 eiro. Pēc 21 gada tā pati alga dotu 6000 eiro. Darba devējam jāizmaksā arī neizmantotā atvaļinājuma kompensācija.",
  ],
  faq: [
    {
      pregunta: "Kad jāizmaksā atlaišanas pabalsts?",
      respuesta: "Labklājības ministrija norāda: atlaišanas dienā kopā ar nesaņemto algu un atvaļinājuma kompensāciju (Darba likuma 128. panta pirmā daļa).",
    },
    {
      pregunta: "Vai pabalsts pienākas, ja vienojamies par darba attiecību izbeigšanu?",
      respuesta: "Nē. Ja darba tiesiskās attiecības beidzas pēc vienošanās (114. pants), pabalsts likumā nav paredzēts.",
    },
    {
      pregunta: "Vai darba līgumā var būt lielāks pabalsts?",
      respuesta: "Jā. Darba koplīgumā vai darba līgumā var noteikt lielāku pabalstu, un tad izmaksā to, nevis šeit aprēķināto minimumu.",
    },
  ],
  glosario: [
    { termino: "Vidējā izpeļņa", definicion: "Darba samaksas vidējais par pēdējiem sešiem kalendāra mēnešiem." },
    { termino: "Uzteikums", definicion: "Rakstisks paziņojums par darba līguma izbeigšanu." },
  ],
});
