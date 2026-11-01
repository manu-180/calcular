import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lv.darba-deveja-izmaksas",
  h1: "Darba devēja izmaksas {{anio}}: cik maksā darbinieks",
  title: "Darba devēja izmaksas {{anio}}: VSAOI {{lv.vsaoi-darba-devejs[vispariga]}}",
  description:
    "Aprēķiniet, cik uzņēmumam izmaksā darbinieks: bruto alga plus darba devēja VSAOI {{lv.vsaoi-darba-devejs[vispariga]}}. Rezultāts mēnesī, gadā un ar darbinieka neto algu.",
  intro: [
    "Darba devējs papildus bruto algai maksā savu VSAOI daļu: {{lv.vsaoi-darba-devejs[vispariga]}} vispārējā gadījumā. Kopā ar darba ņēmēja {{lv.vsaoi-darba-nemejs[vispariga]}} tas veido kopējo likmi, ko VID publicē iemaksu likmju tabulā.",
    "Ievadiet bruto algu, un kalkulators parādīs pilnas izmaksas mēnesī un gadā, kā arī summu, ko darbinieks saņems uz rokas.",
  ],
  comoSeCalcula: [
    "Darba devēja daļa ir bruto alga, reizināta ar likmi. Vispārējā likme ir {{lv.vsaoi-darba-devejs[vispariga]}}. Darbiniekam, kas sasniedzis valsts vecuma pensijas vecumu, tā ir {{lv.vsaoi-darba-devejs[pensijas-vecums]}}, bet izdienas pensijas saņēmējam {{lv.vsaoi-darba-devejs[izdienas]}}.",
    "Izmaksas mēnesī ir bruto alga plus šī daļa. Darba devējs to iemaksā vienotajā nodokļu kontā līdz nākamā mēneša 23. datumam.",
    "Ienākumam virs {{lv.vsaoi-maksimums}} gadā maksā solidaritātes nodokli, un VID piemēros darba devēja daļa ir {{lv.solidaritate-darba-devejs}}. Tāpēc izmaksas turpina augt ar to pašu likmi.",
  ],
  ejemplo: [
    "Bruto alga 1750 eiro. Darba devēja VSAOI: 1750 × 23,59% = 412,83 eiro. Izmaksas mēnesī ir 2162,83 eiro, gadā 25 953,96 eiro. Darbinieks saņem 1307,11 eiro, ja iesniegta grāmatiņa un apgādājamo nav.",
  ],
  faq: [
    {
      pregunta: "Vai darba devēja daļu var ieturēt no algas?",
      respuesta: "Nē. VID skaidro, ka darba ņēmēja {{lv.vsaoi-darba-nemejs[vispariga]}} ietur no aprēķinātās algas, bet darba devēja {{lv.vsaoi-darba-devejs[vispariga]}} maksā no paša līdzekļiem.",
    },
    {
      pregunta: "Kad jāmaksā iemaksas?",
      respuesta: "VID norāda: līdz pārskata mēnesim sekojošā mēneša 23. datumam, iemaksājot vienotajā nodokļu kontā.",
    },
    {
      pregunta: "Kas ir minimālās iemaksas par darbinieku?",
      respuesta: "Ja darbinieka ceturkšņa ienākumi nesasniedz trīskāršu minimālo algu ({{lv.minimala-alga}} mēnesī), VID iemaksu likmju tabulā paredzētas darba devēja minimālās iemaksas. Šis kalkulators tās nerēķina.",
    },
  ],
  glosario: [
    { termino: "Darba devēja VSAOI", definicion: "Iemaksas, ko uzņēmums maksā no saviem līdzekļiem virs bruto algas." },
    { termino: "Solidaritātes nodoklis", definicion: "Maksājums no ienākuma daļas virs iemaksu objekta maksimuma." },
  ],
});
