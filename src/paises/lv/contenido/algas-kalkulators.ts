import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lv.algas-kalkulators",
  h1: "Algas kalkulators {{anio}}: no bruto uz neto",
  title: "Algas kalkulators {{anio}}: neto alga no bruto",
  description:
    "Aprēķiniet neto algu no bruto: VSAOI {{lv.vsaoi-darba-nemejs[vispariga]}}, IIN {{lv.iin-alga}}, neapliekamais minimums {{lv.neapliekamais-minimums}}. Ar apgādājamiem un grāmatiņu.",
  intro: [
    "No bruto algas Latvijā ietur valsts sociālās apdrošināšanas iemaksas ({{lv.vsaoi-darba-nemejs[vispariga]}}) un iedzīvotāju ienākuma nodokli ({{lv.iin-alga}}). Neapliekamais minimums ir {{lv.neapliekamais-minimums}} mēnesī, ja darba devējam ir iesniegta algas nodokļa grāmatiņa.",
    "Ievadiet bruto algu, un kalkulators parādīs summu uz rokas, kā arī katru ieturējumu atsevišķi. Par katru apgādājamo atvieglojums ir {{lv.apgadajamais}} mēnesī.",
  ],
  comoSeCalcula: [
    "Vispirms no bruto algas aprēķina darba ņēmēja VSAOI daļu. Vispārējā likme ir {{lv.vsaoi-darba-nemejs[vispariga]}}, bet pēc valsts vecuma pensijas vecuma sasniegšanas {{lv.vsaoi-darba-nemejs[pensijas-vecums]}}.",
    "Pēc tam no atlikuma atņem neapliekamo minimumu ({{lv.neapliekamais-minimums}}), atvieglojumu par apgādājamiem ({{lv.apgadajamais}} par katru) un papildu atvieglojumu, ja tāds pienākas. Bez grāmatiņas šos atvieglojumus nepiemēro, un nodokli rēķina jau no pirmā eiro.",
    "No atlikušās summas aprēķina algas nodokli {{lv.iin-alga}}. Neto alga ir bruto alga mīnus VSAOI un IIN.",
    "Gada ienākuma daļai virs {{lv.iin-gada[1].desde}} likme ir {{lv.iin-gada[1].tasa}}, bet virs {{lv.iin-gada[2].desde}} klāt nāk 3% papildu likme. Darba devējs tomēr ietur vienu likmi, tāpēc starpību nomaksā ar gada ienākumu deklarāciju. Kalkulators šo summu rāda atsevišķi kā mēneša vidējo.",
  ],
  ejemplo: [
    "VID piemērs: bruto alga 1750 eiro, grāmatiņa iesniegta, apgādājamo nav. VSAOI ir 183,75 eiro. Apliekamā summa: 1750 - 183,75 - 550 = 1016,25 eiro. IIN ir 259,14 eiro. Uz rokas paliek 1307,11 eiro.",
  ],
  faq: [
    {
      pregunta: "Cik liels ir neapliekamais minimums?",
      respuesta: "Tas ir {{lv.neapliekamais-minimums}} mēnesī. Darba devējs to piemēro tikai tad, ja viņam ir iesniegta algas nodokļa grāmatiņa. Pensijas saņēmējam minimums ir {{lv.neapliekamais-pensionars}} mēnesī, un to piemēro pensijai.",
    },
    {
      pregunta: "Kas notiek, ja algas nodokļa grāmatiņa nav iesniegta?",
      respuesta: "Darba devējs nepiemēro ne neapliekamo minimumu, ne atvieglojumus, tāpēc neto alga ir mazāka. Neizmantotos atvieglojumus var atgūt, nākamajā gadā iesniedzot gada ienākumu deklarāciju (VID skaidrojums).",
    },
    {
      pregunta: "Cik samazina atvieglojums par apgādājamo?",
      respuesta: "Par katru apgādājamo apliekamo summu samazina par {{lv.apgadajamais}} mēnesī. Tas ietaupa šīs summas daļu nodokļa likmes apmērā, nevis visu summu.",
    },
    {
      pregunta: "Vai VSAOI ir griesti?",
      respuesta: "Iemaksu objekta maksimums ir {{lv.vsaoi-maksimums}} gadā. Tomēr ienākumam virs tā maksā solidaritātes nodokli, un VID piemēros darba ņēmēja daļa ir tā pati ({{lv.solidaritate-darba-nemejs}}), tāpēc neto alga no šī sliekšņa neuzlabojas.",
    },
  ],
  glosario: [
    { termino: "Bruto alga", definicion: "Alga pirms nodokļiem, parasti tā, kas ierakstīta darba līgumā." },
    { termino: "VSAOI", definicion: "Valsts sociālās apdrošināšanas obligātās iemaksas. Tās dod tiesības uz pensiju un pabalstiem." },
    { termino: "Algas nodokļa grāmatiņa", definicion: "Elektronisks ieraksts VID sistēmā, kas norāda, kurā darbavietā piemērot neapliekamo minimumu un atvieglojumus." },
  ],
});
