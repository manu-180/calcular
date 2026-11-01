import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lv.vecaku-pabalsts",
  h1: "Vecāku pabalsts {{anio}}: 13 vai 19 mēneši",
  title: "Vecāku pabalsts {{anio}}: {{lv.vecaku-pabalsts[m13]}} vai {{lv.vecaku-pabalsts[m19]}}",
  description:
    "Salīdziniet vecāku pabalstu: 13 mēneši pa {{lv.vecaku-pabalsts[m13]}} vai 19 mēneši pa {{lv.vecaku-pabalsts[m19]}} no vidējās iemaksu algas. Summa mēnesī un kopā.",
  intro: [
    "Vecāku pabalstu var saņemt 13 mēnešus pa {{lv.vecaku-pabalsts[m13]}} no vidējās apdrošināšanas iemaksu algas vai 19 mēnešus pa {{lv.vecaku-pabalsts[m19]}}. Izvēli pēc tam nevar mainīt, tāpēc vērts salīdzināt abus variantus iepriekš.",
    "Ievadiet vidējo iemaksu algu un periodu. Kalkulators parādīs summu mēnesī un kopējo summu par visu periodu.",
  ],
  comoSeCalcula: [
    "Summa mēnesī ir vidējā iemaksu alga, reizināta ar izvēlētā perioda likmi. Vidējo algu rēķina par 12 mēnešiem, kas beidzas divus mēnešus pirms pabalsta sākuma mēneša. Pašnodarbinātajiem periods beidzas ceturksni pirms attiecīgā ceturkšņa.",
    "Katrā variantā ir pamata daļa un divi nenododami mēneši katram vecākam, ko var izmantot līdz bērna 8 gadu vecumam. 13 mēnešos pamata daļa ir 9 mēneši līdz bērna gada vecumam, bet 19 mēnešos 15 mēneši līdz pusotra gada vecumam. Pamata mēnešos ieskaita maternitātes atvaļinājumu, ja tāds bija, un kalkulators to neatņem.",
    "Ja pamata daļas laikā strādājat vai gūstat ienākumus kā pašnodarbinātais, izmaksā {{lv.vecaku-pabalsts-stradajot}} no piešķirtās summas. Nenododamo daļu maksā tikai bērna kopšanas atvaļinājuma laikā.",
  ],
  ejemplo: [
    "Vidējā iemaksu alga 1500 eiro. 13 mēneši: 1500 × 60% = 900 eiro mēnesī, kopā 11 700 eiro. 19 mēneši: 1500 × 43,75% = 656,25 eiro mēnesī, kopā 12 468,75 eiro. Strādājot pamata daļas laikā, 900 eiro vietā izmaksā 675 eiro.",
  ],
  faq: [
    {
      pregunta: "Kuru periodu izvēlēties?",
      respuesta: "Īsākajam periodam summa mēnesī ir lielāka, bet garākajam kopsumma var būt nedaudz lielāka. VSAA norāda, ka izvēlēto periodu vairs nevar mainīt, izņemot gadījumu, kad bērns nonāk ārpusģimenes aprūpē.",
    },
    {
      pregunta: "Vai pabalstu var saņemt, ja vecāks strādā?",
      respuesta: "Jā. Pamata daļu tad izmaksā {{lv.vecaku-pabalsts-stradajot}} apmērā. Pilnu summu izmaksā, ja periodā nav ienākumu, arī autoratlīdzības.",
    },
    {
      pregunta: "Kādas ir prasības?",
      respuesta: "VSAA prasa iemaksas vismaz 3 mēnešus pēdējos 6 mēnešos vai vismaz 6 mēnešus pēdējos 24 mēnešos. No 2026. gada 1. jūlija bērnam jābūt personas kodam, aktīvam statusam Iedzīvotāju reģistrā un pastāvīgai dzīvesvietai Latvijā, ar izņēmumiem ES noteikumu gadījumā.",
    },
  ],
  glosario: [
    { termino: "Pamata daļa", definicion: "Pabalsta mēneši, kas jāizmanto līdz bērna gada vai pusotra gada vecumam." },
    { termino: "Nenododamā daļa", definicion: "Divi mēneši katram vecākam, ko nevar nodot otram." },
  ],
});
