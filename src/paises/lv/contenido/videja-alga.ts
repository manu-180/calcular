import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lv.videja-alga",
  h1: "Vidējā alga Latvijā {{anio}}: salīdziniet savu algu",
  title: "Vidējā alga Latvijā {{anio}}: {{lv.videja-alga}} bruto",
  description:
    "Vidējā bruto alga Latvijā pēc CSP datiem ir {{lv.videja-alga}} mēnesī. Salīdziniet savu algu ar vidējo un uzziniet starpību procentos un eiro.",
  intro: [
    "Vidējā bruto mēneša alga Latvijā pēc Centrālās statistikas pārvaldes datiem ir {{lv.videja-alga}}. Datu mēnesis: {{lv.videja-alga#desde}}.",
    "Ievadiet savu bruto algu, lai redzētu, cik tā ir procentos no vidējās. Mēneša dati svārstās, tāpēc salīdzinājums ir orientējošs.",
  ],
  comoSeCalcula: [
    "Kalkulators dala jūsu algu ar jaunāko publicēto vidējo algu un rezultātu izsaka procentos. Starpība eiro ir abu summu atšķirība.",
    "Rādītājs ir vidējais, tāpēc to ietekmē arī ļoti lielas algas. CSP tabulā publicēta arī neto vidējā alga.",
    "Dati tiek publicēti ar aptuveni triju mēnešu nokavēšanos. Salīdzinājumam vajadzētu izmantot bruto algu, nevis neto, jo tabulā izmantots bruto rādītājs.",
  ],
  ejemplo: [
    "Bruto alga 1500 eiro, salīdzinot ar 2026. gada jūnija vidējo 1946 eiro: 1500 / 1946 = 77%. Starpība ir 446 eiro mēnesī. Lai to pārvērstu summā uz rokas, izmantojiet algas kalkulatoru.",
  ],
  faq: [
    {
      pregunta: "No kurienes ir vidējās algas dati?",
      respuesta: "No CSP tabulas DSV010m, kas publicē strādājošo mēneša vidējo darba samaksu. Tabula ietver arī neto rādītāju, sadalījumu pa sektoriem un pārmaiņas pret iepriekšējo periodu.",
    },
    {
      pregunta: "Kāpēc vidējā alga mainās katru mēnesi?",
      respuesta: "CSP dati svārstās pa mēnešiem: 2026. gada aprīlī bija mazāk nekā martā, bet jūnijā atkal vairāk. Vērtējiet tendenci pa gadiem, nevis vienu mēnesi.",
    },
    {
      pregunta: "Kāda ir atšķirība no minimālās algas?",
      respuesta: "Minimālo algu nosaka Ministru kabinets, un tas ir zemākais atļautais atalgojums par pilnu slodzi. Vidējā alga ir statistikas rādītājs, ko aprēķina no faktiskajām izmaksām.",
    },
  ],
  glosario: [
    { termino: "Vidējā alga", definicion: "Kopējā izmaksātā darba samaksa, dalīta ar strādājošo skaitu." },
    { termino: "Bruto alga", definicion: "Alga pirms VSAOI un IIN ieturēšanas." },
  ],
});
