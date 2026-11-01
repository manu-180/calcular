import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lv.vsaoi-kalkulators",
  h1: "VSAOI kalkulators {{anio}}: sociālās iemaksas no algas",
  title: "VSAOI kalkulators {{anio}}: iemaksas no bruto algas",
  description:
    "Aprēķiniet VSAOI no algas: darba ņēmējs {{lv.vsaoi-darba-nemejs[vispariga]}}, darba devējs {{lv.vsaoi-darba-devejs[vispariga]}}. Atsevišķas likmes pensijas vecumā un maksimuma pārbaude.",
  intro: [
    "Valsts sociālās apdrošināšanas obligātās iemaksas vispārējā gadījumā ir {{lv.vsaoi-darba-nemejs[vispariga]}} darba ņēmēja daļa un {{lv.vsaoi-darba-devejs[vispariga]}} darba devēja daļa. Kopā tas ir vairāk nekā trešdaļa no bruto algas.",
    "Ievadiet algu un izvēlieties kategoriju. Kalkulators parādīs abas daļas eiro un pateiks, vai jūsu gada ienākums pārsniedz iemaksu objekta maksimumu {{lv.vsaoi-maksimums}}.",
  ],
  comoSeCalcula: [
    "Katru daļu rēķina atsevišķi no bruto algas, ar likmi no VID tabulas. Darba ņēmēja daļu darba devējs ietur no aprēķinātās algas, bet savu daļu maksā no paša līdzekļiem.",
    "Likme atkarīga no statusa. Pēc valsts vecuma pensijas vecuma sasniegšanas darba ņēmējs maksā {{lv.vsaoi-darba-nemejs[pensijas-vecums]}}, bet darba devējs {{lv.vsaoi-darba-devejs[pensijas-vecums]}}. Izdienas pensijas saņēmējam likmes ir {{lv.vsaoi-darba-nemejs[izdienas]}} un {{lv.vsaoi-darba-devejs[izdienas]}}.",
    "Iemaksu objekta maksimums gadā ir {{lv.vsaoi-maksimums}}. Ja strādājat vairākos statusos, summas saskaita. No ienākuma virs maksimuma maksā solidaritātes nodokli. VID piemēros daļas ir tās pašas: {{lv.solidaritate-darba-nemejs}} un {{lv.solidaritate-darba-devejs}}.",
  ],
  ejemplo: [
    "Alga 1000 eiro vispārējā kategorijā: darba ņēmēja daļa 105 eiro, darba devēja daļa 235,90 eiro, kopā 340,90 eiro. Ja alga ir 10 000 eiro mēnesī, gada ienākums ir 120 000 eiro, un 14 700 eiro no tā ir virs maksimuma.",
  ],
  faq: [
    {
      pregunta: "Kāda ir kopējā VSAOI likme?",
      respuesta: "Darba ņēmējam vispārējā gadījumā tā ir abu daļu summa: {{lv.vsaoi-darba-nemejs[vispariga]}} un {{lv.vsaoi-darba-devejs[vispariga]}}. VID iemaksu tabulā ir arī citas kategorijas, piemēram, valdes locekļi un pašnodarbinātie.",
    },
    {
      pregunta: "Kurš pārskaita VSAOI?",
      respuesta: "Darba devējs aprēķina un iemaksā abas daļas vienotajā nodokļu kontā līdz nākamā mēneša 23. datumam. Darba ņēmēja daļu viņš ietur no algas, tāpēc pašam darbiniekam nekas nav jāpārskaita.",
    },
    {
      pregunta: "Kas notiek ar ienākumu virs maksimuma?",
      respuesta: "VID informatīvajā materiālā teikts, ka objekts, kas pārsniedz {{lv.vsaoi-maksimums}}, ir solidaritātes nodokļa objekts. Tātad maksājums neapstājas, mainās tā nosaukums.",
    },
  ],
  glosario: [
    { termino: "Iemaksu objekts", definicion: "Ienākums, no kura rēķina sociālās iemaksas." },
    { termino: "Solidaritātes nodoklis", definicion: "Maksājums no ienākuma daļas virs iemaksu objekta maksimuma." },
  ],
});
