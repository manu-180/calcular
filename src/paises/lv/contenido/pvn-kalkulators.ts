import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lv.pvn-kalkulators",
  h1: "PVN kalkulators {{anio}}: {{lv.pvn[standarta]}}, {{lv.pvn[samazinata]}} un {{lv.pvn[gramatas]}}",
  title: "PVN kalkulators {{anio}}: pieskaitīt vai izdalīt {{lv.pvn[standarta]}}",
  description:
    "Pieskaitiet vai izdaliet PVN: standarta likme {{lv.pvn[standarta]}}, samazinātās {{lv.pvn[samazinata]}} un {{lv.pvn[gramatas]}}. Summa ar nodokli, bez tā un PVN apmērs uzreiz.",
  intro: [
    "Pievienotās vērtības nodokļa standarta likme Latvijā ir {{lv.pvn[standarta]}}. Samazinātā likme {{lv.pvn[samazinata]}} attiecas, piemēram, uz zālēm un pasažieru pārvadājumiem, bet {{lv.pvn[gramatas]}} uz grāmatām un preses izdevumiem.",
    "Kalkulators pieskaita PVN summai bez nodokļa vai izdala to no cenas, kurā nodoklis jau iekļauts. Tas noder rēķiniem, piedāvājumiem un cenu pārbaudei.",
  ],
  comoSeCalcula: [
    "Pieskaitot: PVN ir summa bez nodokļa, reizināta ar likmi. Summa ar PVN ir abu saskaitījums.",
    "Izdalot: summu ar PVN dala ar 1,21 (samazinātajām likmēm ar 1,12 vai 1,05), un iegūst summu bez nodokļa. PVN ir starpība. Vienkārši atņemt {{lv.pvn[standarta]}} no cenas ir kļūda, jo tā iegūst pārāk mazu summu bez nodokļa.",
    "Likmes izvēlas pēc preces vai pakalpojuma. Samazinātā {{lv.pvn[samazinata]}} attiecas uz zālēm un medicīnas ierīcēm, zīdaiņu pārtiku, sabiedrisko transportu, malku un apkuri mājsaimniecībām, kā arī noteiktiem augļiem, dārzeņiem, maizi, pienu, putna gaļu un olām.",
  ],
  ejemplo: [
    "Pakalpojums 100 eiro bez nodokļa: PVN 21 eiro, kopā 121 eiro. Cena 121 eiro ar nodokli: 121 / 1,21 = 100 eiro, PVN 21 eiro. Grāmata par 21 eiro ar {{lv.pvn[gramatas]}} likmi: 20 eiro bez nodokļa un 1 eiro PVN.",
  ],
  faq: [
    {
      pregunta: "Kāda ir PVN standarta likme?",
      respuesta: "{{lv.pvn[standarta]}}. Tā attiecas uz visu, kam VID sarakstā nav noteikta samazināta likme vai atbrīvojums.",
    },
    {
      pregunta: "Kāds ir PVN slieksnis mazajiem uzņēmumiem?",
      respuesta: "VID īpašajā reģistrācijas kārtībā slieksnis ir {{lv.pvn-slieksnis}} apgrozījuma gadā. Sasniedzot to, jāpāriet uz vispārējo PVN režīmu.",
    },
    {
      pregunta: "Vai eksportam ir PVN?",
      respuesta: "Eksportam un piegādēm reģistrētiem nodokļu maksātājiem citās ES dalībvalstīs VID norāda 0% likmi. Kalkulators šo gadījumu nerēķina, jo nodoklis ir nulle.",
    },
  ],
  glosario: [
    { termino: "PVN", definicion: "Pievienotās vērtības nodoklis, ko pircējs maksā cenā." },
    { termino: "Samazinātā likme", definicion: "Zemāka PVN likme noteiktām precēm un pakalpojumiem." },
  ],
});
