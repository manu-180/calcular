import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lv.mikrouznemuma-nodoklis",
  h1: "Mikrouzņēmuma nodoklis {{anio}}: {{lv.mikro-likme}} no apgrozījuma",
  title: "Mikrouzņēmuma nodoklis {{anio}}: {{lv.mikro-likme}} no apgrozījuma",
  description:
    "Aprēķiniet mikrouzņēmumu nodokli: {{lv.mikro-likme}} no apgrozījuma, {{lv.mikro-socialajai-dalai}} no tā sociālajām iemaksām. Pārbaudiet arī PVN slieksni {{lv.pvn-slieksnis}}.",
  intro: [
    "Mikrouzņēmumu nodokļa likme ir {{lv.mikro-likme}} no apgrozījuma. {{lv.mikro-socialajai-dalai}} no šī nodokļa novirza īpašnieka sociālajām iemaksām, tāpēc VSAOI atsevišķi nav jāmaksā.",
    "Ievadiet apgrozījumu un izdevumus. Kalkulators parādīs nodokli un summu, kas paliek. Svarīgi: nodokli rēķina no apgrozījuma, nevis peļņas, tāpēc izdevumi to nesamazina.",
  ],
  comoSeCalcula: [
    "Nodoklis ir apgrozījums, reizināts ar {{lv.mikro-likme}}. Izdevumi nodokli neietekmē, tāpēc pie lieliem izdevumiem šis režīms kļūst mazāk izdevīgs.",
    "No nodokļa {{lv.mikro-socialajai-dalai}} tiek novirzīti sociālajām iemaksām. VID salīdzina: vispārējā režīmā pašnodarbinātais maksātu lielāku likmi no iemaksu objekta, kas attiecīgi veido lielāku sociālo aizsardzību.",
    "Plānotais apgrozījums nedrīkst pārsniegt PVN reģistrācijas slieksni, kas ir {{lv.pvn-slieksnis}} gadā. Ja to pārsniedz, kalkulators parādīs brīdinājumu. Mikrouzņēmuma darbinieku alga tiek aplikta kā jebkurā citā uzņēmumā.",
    "Deklarāciju iesniedz reizi ceturksnī līdz nākamā mēneša 15. datumam.",
  ],
  ejemplo: [
    "Apgrozījums 3000 eiro, izdevumi 500 eiro. Nodoklis: 3000 × 25% = 750 eiro. No tiem 600 eiro aiziet sociālajām iemaksām. Pēc izdevumiem un nodokļa paliek 1750 eiro.",
  ],
  faq: [
    {
      pregunta: "Vai mikrouzņēmuma īpašnieks maksā arī VSAOI?",
      respuesta: "Nē. VID norāda, ka īpašnieks maksā tikai mikrouzņēmumu nodokli, un {{lv.mikro-socialajai-dalai}} no tā novirza viņa sociālajām iemaksām.",
    },
    {
      pregunta: "Kāds ir apgrozījuma limits?",
      respuesta: "VID nosaka, ka plānotais apgrozījums nedrīkst pārsniegt PVN reģistrācijas slieksni ({{lv.pvn-slieksnis}} gadā).",
    },
    {
      pregunta: "Vai šis režīms vienmēr ir izdevīgāks?",
      respuesta: "Ne vienmēr. Nodoklis ir no apgrozījuma, tāpēc pie lieliem izdevumiem vai zemas peļņas var būt izdevīgāk maksāt kā pašnodarbinātajam. Vērts salīdzināt abus aprēķinus ar saviem skaitļiem.",
    },
  ],
  glosario: [
    { termino: "Apgrozījums", definicion: "Visi ieņēmumi no darbības par periodu, pirms izdevumiem." },
    { termino: "Mikrouzņēmumu nodoklis", definicion: "Vienots nodoklis no apgrozījuma, kas aizstāj IIN un VSAOI īpašniekam." },
  ],
});
