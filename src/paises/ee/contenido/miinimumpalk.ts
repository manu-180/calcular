import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ee.miinimumpalk",
  h1: "Miinimumpalk {{anio}}",
  title: "Miinimumpalk {{anio}}: {{ee.miinimumpalk-kuu}} kuus, neto ja tunnitasu",
  description: "Miinimumpalk on {{ee.miinimumpalk-kuu}} kuus ja {{ee.miinimumpalk-tund}} tunnis. Arvuta neto, osalise tööaja summa ja tööandja kulu.",
  intro: [
    "Töötasu alammäär ehk miinimumpalk on täistööajaga töötamisel {{ee.miinimumpalk-kuu}} kuus ja {{ee.miinimumpalk-tund}} tunnis. Kehtib alates: {{ee.miinimumpalk-kuu#desde}}.",
    "Alammäära kehtestab Vabariigi Valitsus määrusega, lähtudes tööandjate ja ametiühingute keskliidu kokkuleppest. Sellest väiksemat töötasu maksta ei tohi (töölepingu seadus, § 29).",
  ],
  comoSeCalcula: [
    "Täistööaeg on 40 tundi nädalas. Osalise tööaja korral on kuusumma proportsionaalselt väiksem.",
    "Netosumma leiame tavalise palgaarvestusega: töötuskindlustus {{ee.tootuskindlustus-tootaja}}, valitud II sammas, maksuvaba tulu {{ee.maksuvaba-kuu}} ja tulumaks {{ee.tulumaks}}.",
    "Tööandja kulu sisaldab sotsiaalmaksu {{ee.sotsiaalmaks}} ja töötuskindlustust {{ee.tootuskindlustus-tooandja}}.",
  ],
  ejemplo: [
    "Täistööajal 946 eurot bruto: töötuskindlustus 15,14 eurot, II sammas 18,92 eurot, tulumaks 46,63 eurot, kätte jääb 865,31 eurot. Tööandjale läheb see maksma 1265,75 eurot kuus.",
    "Pool kohta (20 tundi nädalas) tähendab vähemalt 473 eurot kuus. Tunnitasu miinimum jääb samaks.",
  ],
  faq: [
    {
      pregunta: "Kui suur on miinimumpalk neto?",
      respuesta: "Täistööajal maksuvaba tulu ja {{ee.kogumispension[2]}} II sambaga on neto 865,31 eurot. Ilma II sambata jääb kätte natuke rohkem. Täpse summa näitab kalkulaator.",
    },
    {
      pregunta: "Mis määrusega miinimumpalk kehtestati?",
      respuesta: "Vabariigi Valitsuse 23. märtsi 2026. aasta määrus nr 36, mis jõustus 1. aprillil 2026 ja tunnistas kehtetuks varasema määruse nr 87.",
    },
    {
      pregunta: "Kas tööandja võib maksta alammäärast vähem?",
      respuesta: "Ei. Töölepingu seaduse § 29 lõike 6 järgi ei või alammäärast madalamat töötasu maksta. Kollektiivlepinguga võib kokku leppida suurema, aga mitte väiksema tasu.",
    },
  ],
  glosario: [
    { termino: "Töötasu alammäär", definicion: "Väikseim lubatud töötasu ajaühiku kohta." },
    { termino: "Täistööaeg", definicion: "Eeldatavalt 40 tundi seitsmepäevase ajavahemiku jooksul." },
  ],
});
