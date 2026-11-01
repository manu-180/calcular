import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lv.bezdarbnieka-pabalsts",
  h1: "Bezdarbnieka pabalsts {{anio}}: aprēķins pa mēnešiem",
  title: "Bezdarbnieka pabalsts {{anio}}: aprēķins pa mēnešiem",
  description:
    "Aprēķiniet bezdarbnieka pabalstu: {{lv.bezdarbnieka-stazs[1-9]}} līdz {{lv.bezdarbnieka-stazs[30]}} no iemaksu algas pēc stāža, ar samazinājumu ik pēc diviem mēnešiem. Līdz 8 mēnešiem.",
  intro: [
    "Bezdarbnieka pabalsts ir {{lv.bezdarbnieka-stazs[1-9]}} līdz {{lv.bezdarbnieka-stazs[30]}} no vidējās iemaksu algas atkarībā no apdrošināšanas stāža. To maksā līdz astoņiem mēnešiem, un summa pakāpeniski samazinās.",
    "Ievadiet vidējo iemaksu algu un stāžu. Kalkulators parādīs summu katrā izmaksas posmā, lai varat plānot budžetu visam periodam.",
  ],
  comoSeCalcula: [
    "Vidējo iemaksu algu rēķina par 12 mēnešiem, kas beidzas divus mēnešus pirms mēneša, kurā iegūts bezdarbnieka statuss. Likme atkarīga no stāža: 1 līdz 9 gadi {{lv.bezdarbnieka-stazs[1-9]}}, 10 līdz 19 gadi {{lv.bezdarbnieka-stazs[10-19]}}, 20 līdz 29 gadi {{lv.bezdarbnieka-stazs[20-29]}}, 30 gadi un vairāk {{lv.bezdarbnieka-stazs[30]}}.",
    "No piešķirtās summas pirmajos divos mēnešos izmaksā visu, 3. un 4. mēnesī {{lv.bezdarbnieka-posmi[3-4]}}, 5. un 6. mēnesī {{lv.bezdarbnieka-posmi[5-6]}}, bet 7. un 8. mēnesī {{lv.bezdarbnieka-posmi[7-8]}}.",
    "VSAA pabalstu izmaksā par iepriekšējo mēnesi pēc dienām, kurās bijāt bezdarbnieks, tāpēc reālā summa var nedaudz atšķirties no šīs mēneša aplēses.",
  ],
  ejemplo: [
    "Vidējā iemaksu alga 1500 eiro, stāžs 5 gadi. Piešķirtais pabalsts: 1500 × 50% = 750 eiro. Tālāk 562,50 eiro, 375 eiro un 337,50 eiro mēnesī. Par visiem astoņiem mēnešiem kopā 4050 eiro.",
  ],
  faq: [
    {
      pregunta: "Kādi ir nosacījumi pabalsta saņemšanai?",
      respuesta: "VSAA prasa bezdarbnieka statusu Nodarbinātības valsts aģentūrā, apdrošināšanas stāžu vismaz gadu un iemaksas vismaz 12 mēnešus pēdējos 16 mēnešos pirms statusa iegūšanas.",
    },
    {
      pregunta: "Kas notiek, ja darbu pametu pats?",
      respuesta: "Ja darba attiecības izbeigtas pēc darbinieka vēlēšanās vai pārkāpuma dēļ, pabalstu piešķir ne agrāk kā divus mēnešus pēc statusa iegūšanas, un pirmo maksājumu saņem trešajā mēnesī.",
    },
    {
      pregunta: "Vai var saņemt pabalstu, ja ir ienākumi?",
      respuesta: "VSAA nosaka, ka pabalsta laikā nedrīkst būt ienākumu, arī autoratlīdzības. Izmaksu aptur slimības, maternitātes un vecāku pabalsta laikā.",
    },
  ],
  glosario: [
    { termino: "Apdrošināšanas stāžs", definicion: "Laiks, par kuru veiktas sociālās apdrošināšanas iemaksas." },
    { termino: "Bezdarbnieka statuss", definicion: "Statuss, ko piešķir Nodarbinātības valsts aģentūra." },
  ],
});
