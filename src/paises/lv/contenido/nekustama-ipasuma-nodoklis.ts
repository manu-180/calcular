import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lv.nekustama-ipasuma-nodoklis",
  h1: "Nekustamā īpašuma nodoklis {{anio}}: aprēķins no kadastrālās vērtības",
  title: "Nekustamā īpašuma nodoklis {{anio}}: aprēķins",
  description:
    "Aprēķiniet nekustamā īpašuma nodokli no kadastrālās vērtības: pašvaldības likme no {{lv.nin-min}} līdz {{lv.nin-max}}. Summa gadā un vidēji mēnesī.",
  intro: [
    "Nekustamā īpašuma nodokļa likme ir no {{lv.nin-min}} līdz {{lv.nin-max}} kadastrālās vērtības. Konkrēto likmi nosaka katra pašvaldība saistošajos noteikumos, tāpēc starp novadiem tā var atšķirties.",
    "Ievadiet kadastrālo vērtību un sava novada likmi. Kalkulators parādīs nodokli gadā un vidēji mēnesī. Tā ir aplēse: oficiālo summu aprēķina pašvaldība.",
  ],
  comoSeCalcula: [
    "Nodoklis ir kadastrālā vērtība, reizināta ar pašvaldības likmi. Bāze var būt zeme, ēkas un inženierbūves.",
    "Pašvaldība saistošos noteikumus par likmēm publicē līdz iepriekšējā gada 1. novembrim. Tāpēc nākamā gada likmes parasti ir zināmas jau rudenī.",
    "Pašvaldība aprēķina nodokli un paziņo par to ar maksāšanas paziņojumu līdz 15. februārim. Nauda nonāk tās pašvaldības budžetā, kur atrodas īpašums. Nodokļa atvieglojumus šis kalkulators nerēķina, tāpēc faktiskā summa var būt mazāka.",
  ],
  ejemplo: [
    "Dzīvoklis ar kadastrālo vērtību 60 000 eiro novadā ar likmi 0,2%: 60 000 × 0,2% = 120 eiro gadā, vidēji 10 eiro mēnesī. Tas pats īpašums ar 3% likmi maksātu 1800 eiro gadā.",
  ],
  faq: [
    {
      pregunta: "Kur atrast sava novada likmi?",
      respuesta: "Pašvaldības saistošajos noteikumos. VID norāda, ka likmi nosaka pašvaldība robežās no {{lv.nin-min}} līdz {{lv.nin-max}}. Ja likme nav zināma, jautājiet savai pašvaldībai.",
    },
    {
      pregunta: "Kas aprēķina nodokli?",
      respuesta: "Pašvaldība. Tā līdz 15. februārim nosūta maksāšanas paziņojumu, un tas ir administratīvais akts.",
    },
    {
      pregunta: "Kas maksā nodokli?",
      respuesta: "VID norāda: fiziskās un juridiskās personas, kuru īpašumā vai valdījumā ir nekustamais īpašums, kā arī to pārstāvji, tostarp ārvalstnieki.",
    },
  ],
  glosario: [
    { termino: "Kadastrālā vērtība", definicion: "Valsts reģistrā noteikta īpašuma vērtība, no kuras rēķina nodokli." },
    { termino: "Saistošie noteikumi", definicion: "Pašvaldības izdots normatīvs akts, kas nosaka likmi tās teritorijā." },
  ],
});
