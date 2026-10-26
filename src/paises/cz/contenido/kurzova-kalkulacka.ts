import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cz.kurzova-kalkulacka",
  h1: "Kurzová kalkulačka podle kurzu ČNB",
  title: "Kurzová kalkulačka ČNB: euro, dolar, libra, frank",
  description:
    "Převeďte eura, dolary, libry, franky nebo zloté na koruny a zpět podle aktuálního kurzu devizového trhu ČNB. Kurz eura je dnes {{cz.eur}}.",
  intro: [
    "Kalkulačka převádí částky mezi korunou a nejčastějšími měnami podle kurzu, který Česká národní banka vyhlašuje každý pracovní den.",
    "Kurz ČNB se používá v účetnictví, při přepočtu faktur a v daňovém přiznání. Při výměně peněz v bance nebo směnárně dostanete jiný kurz.",
  ],
  comoSeCalcula: [
    "Z cizí měny na koruny: částka × kurz ČNB.",
    "Z korun na cizí měnu: částka / kurz ČNB.",
    "Kalkulačka používá poslední vyhlášený kurz. Kurz eura je {{cz.eur}} ze dne {{cz.eur#desde}}.",
  ],
  ejemplo: ["Při kurzu 24,335 Kč za euro je 100 eur 2 433,50 Kč."],
  faq: [
    {
      pregunta: "Kdy ČNB vyhlašuje kurzy?",
      respuesta: "Každý pracovní den kolem 14.30. Kurz platí pro daný den a také pro následující sobotu, neděli nebo státní svátek.",
    },
    {
      pregunta: "Jaký je kurz eura?",
      respuesta: "Podle posledního kurzu ČNB {{cz.eur}} za 1 euro (vyhlášeno {{cz.eur#desde}}).",
    },
    {
      pregunta: "Proč mi banka dala jiný kurz?",
      respuesta: "Banky a směnárny mají vlastní nákupní a prodejní kurzy s přirážkou. Kurz ČNB je střední kurz devizového trhu.",
    },
  ],
  glosario: [
    { termino: "Kurz devizového trhu", definicion: "Kurz, který ČNB vyhlašuje každý pracovní den podle obchodů na devizovém trhu." },
    { termino: "Střední kurz", definicion: "Kurz mezi nákupním a prodejním kurzem, bez přirážky banky." },
  ],
});
