import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lv.neapliekamais-minimums",
  h1: "Neapliekamais minimums {{anio}}: cik no ienākuma nav apliekams",
  title: "Neapliekamais minimums {{anio}}: {{lv.neapliekamais-minimums}} mēnesī",
  description:
    "Neapliekamais minimums ir {{lv.neapliekamais-minimums}} mēnesī, pensionāram {{lv.neapliekamais-pensionars}}. Pieskaitiet {{lv.apgadajamais}} par apgādājamo un papildu atvieglojumus.",
  intro: [
    "Neapliekamais minimums strādājošajam ir {{lv.neapliekamais-minimums}} mēnesī, bet pensijas saņēmējam {{lv.neapliekamais-pensionars}} mēnesī. Par katru apgādājamo pienākas vēl {{lv.apgadajamais}} mēnesī.",
    "Kalkulators saskaita jūsu neapliekamo summu mēnesī un gadā un parāda, cik nodokļa tā ļauj ietaupīt, ja ienākums ir pietiekami liels, lai atvieglojumus izmantotu pilnībā.",
  ],
  comoSeCalcula: [
    "Summa veidojas no trim daļām: neapliekamais minimums, atvieglojums par apgādājamiem un papildu atvieglojums. Papildu atvieglojums ir {{lv.papildu-atvieglojums[invaliditate-1-2]}} I vai II grupas invaliditātes gadījumā, {{lv.papildu-atvieglojums[invaliditate-3]}} III grupas gadījumā un {{lv.papildu-atvieglojums[represeta]}} politiski represētai personai.",
    "Lielākais ietaupījums ir šī summa, reizināta ar algas nodokļa likmi {{lv.iin-alga}}. Ja ienākums ir mazāks par neapliekamo summu, ietaupījums ir mazāks, jo nodokļa vienkārši nav.",
    "Algai minimumu un atvieglojumus piemēro darbavietā, kur iesniegta algas nodokļa grāmatiņa. Papildu atvieglojumam jābūt atzīmētam grāmatiņā, citādi to nepiemēros.",
  ],
  ejemplo: [
    "Strādājošs vecāks ar diviem apgādājamiem: 550 + 2 × 250 = 1050 eiro mēnesī, tātad 12 600 eiro gadā. Lielākais ietaupījums ir 1050 × 25,5% = 267,75 eiro mēnesī. Ar I grupas invaliditāti summa būtu 1204 eiro.",
  ],
  faq: [
    {
      pregunta: "Kā minimumu sadala pensionāram, kas arī strādā?",
      respuesta: "VID norāda: ja pensionārs iesniedz grāmatiņu darba devējam, minimumu sadala uz pusēm, 500 eiro pensijai un 500 eiro algai. Ja neiesniedz, visu {{lv.neapliekamais-pensionars}} piemēro pensijai, un darba devējs ietur nodokli no pirmā eiro.",
    },
    {
      pregunta: "Vai minimumu var saņemt vairākās darbavietās?",
      respuesta: "Algas nodokļa grāmatiņa darbojas tajā darbavietā, kurā tā iesniegta. Neizmantoto daļu var atgūt ar gada ienākumu deklarāciju.",
    },
    {
      pregunta: "Cik liels atvieglojums ir par apgādājamo?",
      respuesta: "{{lv.apgadajamais}} mēnesī par katru personu (VID skaidrojums par apgādībā esošām personām). Tas samazina apliekamo summu, nevis pašu nodokli.",
    },
  ],
  glosario: [
    { termino: "Neapliekamais minimums", definicion: "Ienākuma daļa, no kuras IIN nerēķina." },
    { termino: "Apgādājamais", definicion: "Persona jūsu apgādībā, par kuru pienākas nodokļa atvieglojums." },
  ],
});
