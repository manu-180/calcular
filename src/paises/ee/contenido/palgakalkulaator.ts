import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ee.palgakalkulaator",
  h1: "Palgakalkulaator {{anio}}",
  title: "Palgakalkulaator {{anio}}: netopalk brutopalgast",
  description: "Arvuta netopalk brutopalgast: tulumaks {{ee.tulumaks}}, maksuvaba tulu {{ee.maksuvaba-kuu}}, töötuskindlustus {{ee.tootuskindlustus-tootaja}} ja II sammas.",
  intro: [
    "Brutopalgast peetakse Eestis kinni kolm asja: töötuskindlustusmakse {{ee.tootuskindlustus-tootaja}}, II samba makse (tavaliselt {{ee.kogumispension[2]}}) ja tulumaks {{ee.tulumaks}}. Tulumaksu arvestamisel jääb maksust välja kuni {{ee.maksuvaba-kuu}} maksuvaba tulu kuus.",
    "Alates 2026. aastast ei sõltu maksuvaba tulu enam sissetuleku suurusest, nii et sama reegel kehtib väikese ja suure palga kohta. Kalkulaator näitab ka seda, mis töökoht tööandjale tegelikult maksma läheb.",
  ],
  comoSeCalcula: [
    "Töötuskindlustusmakse on {{ee.tootuskindlustus-tootaja}} ja II samba makse sinu valitud protsent brutopalgast.",
    "Mõlemad arvatakse enne tulumaksu arvutamist palgast maha (tulumaksuseadus, § 42).",
    "Järele jäänud summast võetakse maha maksuvaba tulu, kui oled selleks tööandjale avalduse esitanud. Pensioniealisel on see {{ee.maksuvaba-pension-kuu}} kuus.",
    "Ülejäänud summalt arvutatakse tulumaks {{ee.tulumaks}}. Netopalk on brutopalk miinus need kolm kinnipidamist.",
    "Tööandja maksab palgale lisaks sotsiaalmaksu {{ee.sotsiaalmaks}} ja töötuskindlustusmakset {{ee.tootuskindlustus-tooandja}}.",
  ],
  ejemplo: [
    "Brutopalk 2000 eurot, II sammas 2% ja maksuvaba tulu kasutusel. Töötuskindlustus on 32 eurot ja II sammas 40 eurot. Tulumaksu alus on 2000 − 32 − 40 − 700 = 1228 eurot, millest tulumaks on 270,16 eurot. Netopalk on 1657,84 eurot.",
    "Ilma maksuvaba tulu avalduseta jääks samast palgast kätte 1503,84 eurot. Vahe tuleb tagasi tuludeklaratsiooniga, kui maksuvaba tulu ei ole aasta jooksul mujal kasutatud. Tööandjale läheb see palk maksma 2676 eurot kuus.",
  ],
  faq: [
    {
      pregunta: "Kui suur on maksuvaba tulu?",
      respuesta: "Üldine maksuvaba tulu on {{ee.maksuvaba-kuu}} kuus ehk {{ee.maksuvaba-aasta}} aastas (tulumaksuseadus, § 23). Vanaduspensionieas on see {{ee.maksuvaba-pension-kuu}} kuus ehk {{ee.maksuvaba-pension-aasta}} aastas.",
    },
    {
      pregunta: "Kas maksuvaba tulu rakendub iseenesest?",
      respuesta: "Ei. Tööandjale tuleb esitada kirjalik avaldus ja seda saab teha ainult ühe tööandja juures. Avalduseta peetakse tulumaks kinni esimesest eurost. Kasutamata jäänud osa ei kandu järgmisesse kuusse, aga aasta lõikes saab selle arvesse võtta tuludeklaratsiooniga.",
    },
    {
      pregunta: "Kui suur on II samba makse?",
      respuesta: "Saad valida {{ee.kogumispension[2]}}, {{ee.kogumispension[4]}} või {{ee.kogumispension[6]}}. Makse arvatakse enne tulumaksu palgast maha, nii et see vähendab ka tulumaksu.",
    },
    {
      pregunta: "Kui palju maksab tööandja palgale lisaks?",
      respuesta: "Sotsiaalmaks on {{ee.sotsiaalmaks}} ja tööandja töötuskindlustusmakse {{ee.tootuskindlustus-tooandja}} brutopalgast. Sotsiaalmaksul on ka minimaalne kohustus {{ee.sotsiaalmaksu-miinimum}} kuus.",
    },
  ],
  glosario: [
    { termino: "Brutopalk", definicion: "Töölepingus kokku lepitud palk enne maksude ja maksete kinnipidamist." },
    { termino: "Netopalk", definicion: "Summa, mille saad pärast kinnipidamisi kätte." },
    { termino: "II sammas", definicion: "Kohustuslik kogumispension, mille makse peetakse kinni palgast." },
    { termino: "Maksuvaba tulu", definicion: "Tulu osa, millelt tulumaksu ei arvestata." },
  ],
});
