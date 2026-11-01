import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ee.tulumaksu-kalkulaator",
  h1: "Tulumaksu kalkulaator",
  title: "Tulumaksu kalkulaator {{anio}}: maksuvaba tulu ja tagastus",
  description: "Arvuta aasta tulumaks {{ee.tulumaks}}: maksuvaba tulu {{ee.maksuvaba-aasta}}, koolituskulud kuni {{ee.mahaarvamiste-piir}} ja III sammas. Vaata, kas raha tuleb tagasi.",
  intro: [
    "Füüsilise isiku tulumaks on Eestis {{ee.tulumaks}} (tulumaksuseadus, § 4). Aastatulust arvatakse enne seda maha maksuvaba tulu {{ee.maksuvaba-aasta}} ning kohustuslikud maksed.",
    "Tuludeklaratsioonis saab lisaks maha arvata koolituskulud, kingitused ja annetused kuni {{ee.mahaarvamiste-piir}} ning III samba maksed kuni {{ee.iii-sammas-maar}} tulust, aga mitte üle {{ee.iii-sammas-piir}}. Kalkulaator näitab, palju need sulle tegelikult sisse toovad.",
  ],
  comoSeCalcula: [
    "Tulust lahutatakse töötuskindlustuse ja II samba maksed.",
    "Seejärel lahutatakse maksuvaba tulu. Vanaduspensionieas on see {{ee.maksuvaba-pension-aasta}} aastas.",
    "Koolituskulud, kingid ja annetused lähevad arvesse kuni {{ee.mahaarvamiste-piir}} ja mitte üle poole maksustatavast tulust (§ 282).",
    "III samba maksed lähevad arvesse kuni {{ee.iii-sammas-maar}} tulust, kõige rohkem {{ee.iii-sammas-piir}} (§ 28).",
    "Ülejäänud summalt on tulumaks {{ee.tulumaks}}. Kui sisestad aasta jooksul kinni peetud maksu, näed ka tagastust või juurdemakset.",
  ],
  ejemplo: [
    "Tulu 30 000 eurot ja maksed 1080 eurot. Maksustatav summa on 30 000 − 1080 − 8400 = 20 520 eurot ja tulumaks 4514,40 eurot.",
    "Kui maksid koolituse eest 1000 eurot ja III sambasse 1000 eurot, langeb maksustatav summa 18 520 euroni ja maks 4074,40 euroni. Need kaks mahaarvamist toovad tagasi 440 eurot.",
  ],
  faq: [
    {
      pregunta: "Mis on tulumaksumäär?",
      respuesta: "{{ee.tulumaks}}. Sama määr kehtib ka ettevõtte jaotatud kasumile, kuid sel juhul arvestatakse seda netosummalt.",
    },
    {
      pregunta: "Kas maksuküür kehtib veel?",
      respuesta: "Ei. Alates 1. jaanuarist 2026 on üldine maksuvaba tulu {{ee.maksuvaba-aasta}} aastas ja see ei vähene suurema tulu korral. Seda ütleb tulumaksuseaduse § 23.",
    },
    {
      pregunta: "Mis siis, kui maksuvaba tulu jäi kuudel kasutamata?",
      respuesta: "Palgaarvestuses see järgmisse kuusse ei kandu, kuid aasta kokkuvõttes arvestatakse see tuludeklaratsiooniga ja enammakstud tulumaks tuleb tagasi.",
    },
  ],
  glosario: [
    { termino: "Tuludeklaratsioon", definicion: "Aasta tulude ja mahaarvamiste aruanne Maksu- ja Tolliametile." },
    { termino: "III sammas", definicion: "Vabatahtlik täiendav kogumispension." },
    { termino: "Mahaarvamine", definicion: "Summa, mis vähendab maksustatavat tulu." },
  ],
});
