import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lv.maternitates-pabalsts",
  h1: "Maternitātes pabalsts {{anio}}: aprēķins pēc iemaksu algas",
  title: "Maternitātes pabalsts {{anio}}: {{lv.maternitates-pabalsts}} no iemaksu algas",
  description:
    "Aprēķiniet maternitātes pabalstu: {{lv.maternitates-pabalsts}} no vidējās iemaksu algas. Ilgākais periods: {{lv.maternitates-max-dienas}}. Summa par laiku pirms un pēc dzemdībām.",
  intro: [
    "Maternitātes pabalsts ir {{lv.maternitates-pabalsts}} no vidējās apdrošināšanas iemaksu algas, un ilgākais periods ir {{lv.maternitates-max-dienas}}. To piešķir VSAA.",
    "Pabalstu maksā divās daļās: pirms dzemdībām un pēc tām. Kalkulators aprēķina summu no iemaksu algas un izvēlētajām dienām, tāpēc ievadiet summu no sava VSAA pārskata portālā Latvija.lv.",
  ],
  comoSeCalcula: [
    "VSAA formula: vidējā iemaksu alga dienā ir iemaksu algu kopsumma par 12 mēnešiem, dalīta ar kalendāra dienām. Periods beidzas divus mēnešus pirms atvaļinājuma sākuma mēneša. Pašnodarbinātajiem tas beidzas ceturksni pirms attiecīgā ceturkšņa.",
    "Rezultātu reizina ar pabalsta dienām un {{lv.maternitates-pabalsts}}. No aprēķina izslēdz dienas, kad bijāt, piemēram, bērna kopšanas atvaļinājumā, slimības vai grūtniecības atvaļinājumā.",
    "Pirmā daļa ir 56 vai 70 dienas pirms dzemdībām. 70 dienas pienākas, ja medicīniskā uzraudzība sākta līdz 12. grūtniecības nedēļai un turpināta visu grūtniecības laiku. Otrā daļa ir 56 vai 70 dienas, un 70 dienas pienākas sarežģījumu gadījumā vai ja piedzimuši divi vai vairāki bērni.",
    "Mēnešos bez nodarbinātības un iemaksām VSAA izmanto 70% no valsts vidējās iemaksu algas. Kalkulators to neņem vērā.",
  ],
  ejemplo: [
    "Iemaksu alga par 12 mēnešiem ir 18 250 eiro, periodā 365 dienas. Dienā tas ir 50 eiro. Pabalsts par 112 dienām: 50 × 112 × 80% = 4480 eiro. Par 140 dienām tas būtu 5600 eiro.",
  ],
  faq: [
    {
      pregunta: "Kad var pieteikties?",
      respuesta: "VSAA norāda, ka pieteikums jāiesniedz 6 mēnešu laikā no atvaļinājuma pirmās dienas. Nepieciešama ārsta izsniegta darbnespējas lapa B.",
    },
    {
      pregunta: "Vai jābūt apdrošinātai noteiktu laiku?",
      respuesta: "Iemaksām jābūt vismaz 3 mēnešus pēdējos 6 mēnešos vai vismaz 6 mēnešus pēdējos 24 mēnešos pirms apdrošināšanas gadījuma mēneša.",
    },
    {
      pregunta: "Vai pabalsta laikā var strādāt?",
      respuesta: "Pabalstu izmaksā par laiku, kad nav darba ienākumu. Izņēmums ir pašnodarbinātā ar mēneša ienākumiem līdz minimālajai algai, ja viņa maksā iemaksas vispārējā kārtībā.",
    },
  ],
  glosario: [
    { termino: "Vidējā iemaksu alga", definicion: "Ienākums, no kura veiktas sociālās iemaksas, vidēji dienā par 12 mēnešu periodu." },
    { termino: "Darbnespējas lapa B", definicion: "Ārsta izsniegts dokuments, uz kura pamata VSAA piešķir pabalstu." },
  ],
});
