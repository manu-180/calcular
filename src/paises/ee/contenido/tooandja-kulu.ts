import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ee.tooandja-kulu",
  h1: "Tööandja kulu kalkulaator",
  title: "Tööandja kulu {{anio}}: palk, sotsiaalmaks ja lisamaksed",
  description: "Kui palju töötaja päriselt maksma läheb? Arvuta tööandja kulu: sotsiaalmaks {{ee.sotsiaalmaks}}, töötuskindlustus {{ee.tootuskindlustus-tooandja}}, miinimum {{ee.sotsiaalmaksu-miinimum}}.",
  intro: [
    "Tööandja kulu on suurem kui töölepingu palk. Brutopalgale lisandub sotsiaalmaks {{ee.sotsiaalmaks}} ja tööandja töötuskindlustusmakse {{ee.tootuskindlustus-tooandja}}. Kokku on see iga palgaeuro kohta ligi kolmandik peale.",
    "Väikese palga puhul tuleb arvestada minimaalse sotsiaalmaksuga: {{ee.sotsiaalmaksu-miinimum}} kuus, mis tuleneb kuumäärast. See mõjutab osalise tööajaga töötajate kulu kõige rohkem.",
  ],
  comoSeCalcula: [
    "Sotsiaalmaks on {{ee.sotsiaalmaks}} brutopalgast (sotsiaalmaksuseadus, § 7).",
    "Kui see jääb alla {{ee.sotsiaalmaksu-miinimum}} ja töötaja kohta kehtib minimaalne kohustus, tasutakse miinimum.",
    "Tööandja töötuskindlustusmakse on {{ee.tootuskindlustus-tooandja}} brutopalgast.",
    "Kogukulu on brutopalk pluss need kaks summat.",
  ],
  ejemplo: [
    "Brutopalk 1500 eurot: sotsiaalmaks 495 eurot ja töötuskindlustus 12 eurot, kogukulu 2007 eurot kuus ja 24 084 eurot aastas.",
    "Brutopalk 500 eurot minimaalse kohustusega: 33 protsendist tuleks 165 eurot, kuid tasuda tuleb 292,38 eurot. Kogukulu on 796,38 eurot, seega ligi 60 protsenti palgale peale.",
  ],
  faq: [
    {
      pregunta: "Millal minimaalne sotsiaalmaks ei kehti?",
      respuesta: "Kui inimene töötab mitme tööandja juures, tasub kuumäärast sotsiaalmaksu see, kes arvestab maksuvaba tulu (sotsiaalmaksuseadus, § 2 lõige 21). Seadus näeb ette ka muid erandeid, nii et kontrolli oma juhtumit Maksu- ja Tolliametist.",
    },
    {
      pregunta: "Mis on sotsiaalmaksu kuumäär?",
      respuesta: "Riigieelarvega igaks aastaks kehtestatud summa, millelt minimaalne kohustus arvutatakse. See ei tohi olla väiksem kui eelneva aasta 1. juulil kehtinud töötasu alammäär (sotsiaalmaksuseadus, § 21).",
    },
    {
      pregunta: "Kas minimaalne kohustus kehtib ka osalise tööajaga?",
      respuesta: "Üldjuhul jah. Sotsiaalmaksu makstakse kuu eest makstud tasult, kuid mitte vähem kui kuumääralt (§ 2 lõige 2). Seepärast on väike koormus tööandjale suhteliselt kallis.",
    },
  ],
  glosario: [
    { termino: "Sotsiaalmaks", definicion: "Tööandja maks, millest rahastatakse pensione ja ravikindlustust." },
    { termino: "Kuumäär", definicion: "Summa, millelt arvestatakse minimaalset sotsiaalmaksu." },
    { termino: "Kogukulu", definicion: "Brutopalk koos tööandja maksudega." },
  ],
});
