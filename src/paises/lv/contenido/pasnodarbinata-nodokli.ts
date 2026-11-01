import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lv.pasnodarbinata-nodokli",
  h1: "Pašnodarbinātā nodokļi {{anio}}: VSAOI un IIN no peļņas",
  title: "Pašnodarbinātā nodokļi {{anio}}: VSAOI {{lv.pasnodarbinata-likme[vispariga]}}",
  description:
    "Aprēķiniet pašnodarbinātā iemaksas: {{lv.pasnodarbinata-likme[vispariga]}} no {{lv.pasnodarbinata-objekts}} un {{lv.pasnodarbinata-pensija}} pensijai no pārējā. Ar IIN un summu, kas paliek.",
  intro: [
    "Pašnodarbinātais maksā VSAOI {{lv.pasnodarbinata-likme[vispariga]}} no vismaz {{lv.pasnodarbinata-objekts}} mēnesī, ja mēneša ienākums sasniedz šo summu. Ja ienākums ir mazāks, maksā tikai {{lv.pasnodarbinata-pensija}} pensiju apdrošināšanai no visa ienākuma.",
    "Ievadiet mēneša ienākumu pēc izdevumiem. Kalkulators aprēķina obligātās iemaksas, pensiju daļu, gada IIN un summu, kas paliek jūsu rīcībā.",
  ],
  comoSeCalcula: [
    "Ienākums šeit nozīmē ieņēmumus mīnus izdevumus mēnesī, neskaitot citus ienākumus, piemēram, algu. Ja tas sasniedz {{lv.pasnodarbinata-objekts}}, no šīs summas maksā {{lv.pasnodarbinata-likme[vispariga]}}. Pensijas saņēmējam likme ir {{lv.pasnodarbinata-likme[pensijas-vecums]}}, bet nekustamā īpašuma apsaimniekotājam {{lv.pasnodarbinata-likme[apsaimniekotajs]}}.",
    "No ienākuma daļas virs objekta maksā {{lv.pasnodarbinata-pensija}} pensiju apdrošināšanai. Objektu drīkst izvēlēties arī lielāku, bet kalkulators rēķina ar obligāto minimumu.",
    "IIN rēķina gadam. No gada ienākuma atskaita VSAOI, neapliekamo minimumu ({{lv.neapliekamais-minimums}} mēnesī) un atvieglojumus. Likme ir {{lv.iin-gada[0].tasa}} līdz {{lv.iin-gada[0].hasta}} gadā un {{lv.iin-gada[1].tasa}} virs tās.",
    "Atskaites un iemaksas ir reizi ceturksnī: ziņojums līdz 17. datumam, maksājums līdz 23. datumam pēc ceturkšņa beigām.",
  ],
  ejemplo: [
    "VID piemērs: mēneša ienākums 1200 eiro. No 780 eiro aprēķina 242,35 eiro VSAOI, bet no atlikušajiem 420 eiro vēl 42 eiro pensijai. Kopā 284,35 eiro. Pēc IIN (ar minimumu) mēnesī paliek apmēram 822 eiro.",
  ],
  faq: [
    {
      pregunta: "Kas notiek, ja mēneša ienākums ir mazāks par {{lv.pasnodarbinata-objekts}}?",
      respuesta: "Tad obligāto VSAOI nemaksā. Par visu ienākumu maksā tikai {{lv.pasnodarbinata-pensija}} pensiju apdrošināšanai. VID piemērs: no 500 eiro tie ir 50 eiro.",
    },
    {
      pregunta: "Kad jāiesniedz ziņojums un jāmaksā iemaksas?",
      respuesta: "VID norāda: „Pašnodarbinātā vai darba ņēmēja ziņojums“ jāiesniedz 17 dienu laikā pēc ceturkšņa beigām, bet iemaksas jāveic 23 dienu laikā.",
    },
    {
      pregunta: "Vai pašnodarbinātais var izvēlēties mikrouzņēmumu nodokli?",
      respuesta: "Reģistrējoties var izvēlēties mikrouzņēmumu nodokļa maksātāja statusu. Tad IIN un VSAOI vietā maksā {{lv.mikro-likme}} no apgrozījuma. Salīdziniet abus variantus mūsu mikrouzņēmuma kalkulatorā.",
    },
  ],
  glosario: [
    { termino: "Pašnodarbinātais", definicion: "Persona, kas reģistrējusi saimniecisko darbību un maksā iemaksas pati." },
    { termino: "Iemaksu objekts", definicion: "Ienākuma daļa, no kuras rēķina VSAOI pilnā likmē." },
  ],
});
