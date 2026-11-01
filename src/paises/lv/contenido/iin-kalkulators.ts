import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lv.iin-kalkulators",
  h1: "IIN kalkulators {{anio}}: iedzīvotāju ienākuma nodoklis gadā",
  title: "IIN kalkulators {{anio}}: likmes {{lv.iin-gada[0].tasa}} un {{lv.iin-gada[1].tasa}}",
  description:
    "Aprēķiniet gada iedzīvotāju ienākuma nodokli: {{lv.iin-gada[0].tasa}} līdz sliekšņa summai {{lv.iin-gada[0].hasta}} un {{lv.iin-gada[1].tasa}} virs tās. Salīdziniet ar ieturēto.",
  intro: [
    "Gada ienākuma daļai līdz {{lv.iin-gada[0].hasta}} iedzīvotāju ienākuma nodokļa likme ir {{lv.iin-gada[0].tasa}}. Daļai, kas pārsniedz šo slieksni, likme ir {{lv.iin-gada[1].tasa}}, un no ienākuma virs {{lv.iin-gada[2].desde}} klāt nāk 3% papildu likme.",
    "Kalkulators aprēķina gada nodokli pa šīm daļām, ņem vērā neapliekamo minimumu un apgādājamos un parāda vidējo likmi. Ja ievadīsiet jau ieturēto nodokli, redzēsiet aptuveno starpību gada deklarācijai.",
  ],
  comoSeCalcula: [
    "Ievadiet ienākumu pēc sociālajām iemaksām. No tā kalkulators atņem gada neapliekamo minimumu (12 reizes {{lv.neapliekamais-minimums}}) un atvieglojumu par apgādājamiem (12 reizes {{lv.apgadajamais}} par katru).",
    "Atlikušo summu sadala daļās. Pirmajai daļai piemēro {{lv.iin-gada[0].tasa}}, nākamajai {{lv.iin-gada[1].tasa}}, bet virs {{lv.iin-gada[2].desde}} likme kopā ar papildu likmi ir {{lv.iin-gada[2].tasa}}.",
    "Darba alga mēnesī vienmēr tiek aplikta ar vienu likmi ({{lv.iin-alga}}) neatkarīgi no algas apmēra un darbavietu skaita. Augstākās likmes starpību nomaksā, iesniedzot gada ienākumu deklarāciju.",
    "VID šādas likmes piemēro atkarībā no ienākuma veida. Īpašām situācijām (kapitāla pieaugums, autoratlīdzība, sezonas darbs) ir citi noteikumi, un šis kalkulators tos nerēķina.",
  ],
  ejemplo: [
    "Gada ienākums pēc VSAOI ir 30 000 eiro, minimums piemērots visam gadam. Atbrīvotā summa ir 6600 eiro, apliekamā 23 400 eiro. Nodoklis: 23 400 × 25,5% = 5967 eiro. Vidējā likme no visa ienākuma ir 19,9%.",
  ],
  faq: [
    {
      pregunta: "No kuras summas sākas {{lv.iin-gada[1].tasa}} likme?",
      respuesta: "No gada ienākuma daļas, kas pārsniedz {{lv.iin-gada[0].hasta}}. Nodokļu likme mainās tikai šai daļai, nevis visam ienākumam.",
    },
    {
      pregunta: "Vai darba devējs ietur {{lv.iin-gada[1].tasa}} no lielas algas?",
      respuesta: "Nē. VID materiālos norādīts, ka algas nodoklim piemēro vienu likmi {{lv.iin-alga}} neatkarīgi no algas apmēra. Starpību maksā ar gada ienākumu deklarāciju.",
    },
    {
      pregunta: "Kā rīkoties, ja atvieglojumi nav izmantoti?",
      respuesta: "VID skaidro, ka neizmantotos atvieglojumus var atgūt nākamajā gadā, iesniedzot gada ienākumu deklarāciju. Šeit varat aptuveni aprēķināt starpību, ievadot gadā ieturēto nodokli.",
    },
  ],
  glosario: [
    { termino: "IIN", definicion: "Iedzīvotāju ienākuma nodoklis, ko maksā fiziskās personas." },
    { termino: "Gada ienākumu deklarācija", definicion: "Pārskats, ko iesniedz VID, lai aprēķinātu gada nodokli un piemaksu vai atmaksu." },
  ],
});
