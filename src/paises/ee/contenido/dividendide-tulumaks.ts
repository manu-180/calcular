import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ee.dividendide-tulumaks",
  h1: "Dividendide tulumaksu kalkulaator",
  title: "Dividendide tulumaks {{anio}}: 22/78 netodividendilt",
  description: "Arvuta dividendide tulumaks: ettevõte maksab {{ee.tulumaks}} jaotatud kasumilt ehk 22/78 netodividendilt. Sisesta neto või kasum ja näed mõlemat.",
  intro: [
    "Eesti ettevõte maksab tulumaksu siis, kui ta kasumit jaotab, mitte siis, kui ta selle teenib. Määr on {{ee.tulumaks}} ja see arvutatakse netodividendist kujul 22/78 (tulumaksuseadus, § 4 ja § 50).",
    "Alates 1. jaanuarist 2025 enam madalamat 14/86 määra ei kasutata. Maks on ettevõtte kohustus, nii et 22/78 määraga maksustatud dividendi eest ei pea omanik eraldi maksu tasuma. Maksu- ja Tolliamet käsitleb 14/86 määraga kuni 2024. aasta lõpuni maksustatud dividende üleminekureeglitega.",
  ],
  comoSeCalcula: [
    "Kui tead netodividendi, korruta see murruga 22/78. Tulemus on tulumaks.",
    "Kui tead kasumit, mida soovid jaotada, korruta see määraga {{ee.tulumaks}}. Ülejäänu läheb omanikule.",
    "Maks deklareeritakse vormil TSD ja selle lisal 7.",
  ],
  ejemplo: [
    "Netodividend 78 000 eurot: tulumaks 78 000 × 22/78 = 22 000 eurot. Ettevõtte kasumist läheb kokku 100 000 eurot.",
    "Kasum 10 000 eurot: maks 2200 eurot ja omanikule 7800 eurot.",
  ],
  faq: [
    {
      pregunta: "Kas omanik maksab dividendilt veel tulumaksu?",
      respuesta: "22/78 määraga maksustatud dividendilt mitte. Maksu- ja Tolliamet kirjeldab lisamaksu ainult varem 14/86 määraga maksustatud dividendide puhul.",
    },
    {
      pregunta: "Miks arvutatakse jagatisega 22/78?",
      respuesta: "Tulumaksuseaduse § 4 lõike 11 järgi jagatakse maksustatav summa enne määraga korrutamist arvuga 0,78. Netodividendi kohta on see sama mis 22/78.",
    },
    {
      pregunta: "Kas dividend asendab palka?",
      respuesta: "Maksuliselt on need eri asjad. Dividendilt ei tasuta sotsiaalmaksu, seega see ei anna ravikindlustust ega lisa pensioni osakuid. Palga mõju näed palgakalkulaatoris.",
    },
  ],
  glosario: [
    { termino: "Dividend", definicion: "Osa kasumist, mille ettevõte maksab omanikule." },
    { termino: "TSD", definicion: "Tulu- ja sotsiaalmaksu deklaratsioon." },
  ],
});
