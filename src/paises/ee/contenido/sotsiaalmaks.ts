import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ee.sotsiaalmaks",
  h1: "Sotsiaalmaksu kalkulaator",
  title: "Sotsiaalmaks {{anio}}: {{ee.sotsiaalmaks}} palgast ja kuumäär {{ee.sotsiaalmaksu-kuumaar}}",
  description: "Arvuta sotsiaalmaks palgast: määr {{ee.sotsiaalmaks}}, kuumäär {{ee.sotsiaalmaksu-kuumaar}}, minimaalne kohustus {{ee.sotsiaalmaksu-miinimum}} kuus. Näed ka töötuskindlustuse makseid.",
  intro: [
    "Sotsiaalmaks on {{ee.sotsiaalmaks}} maksustatavalt summalt (sotsiaalmaksuseadus, § 7). Seda maksab tööandja palgale lisaks, töötaja palgast seda kinni ei peeta.",
    "Kuumäär on {{ee.sotsiaalmaksu-kuumaar}}, millest tuleb minimaalne kohustus {{ee.sotsiaalmaksu-miinimum}} kuus. Selle täitmine on seotud ka ravikindlustusega, seepärast tasub väikese palga puhul seda eraldi vaadata.",
  ],
  comoSeCalcula: [
    "Korrutame brutopalga määraga {{ee.sotsiaalmaks}}.",
    "Kui tulemus jääb alla {{ee.sotsiaalmaksu-miinimum}} ja minimaalne kohustus kehtib, võtame aluseks miinimumi.",
    "Töötuskindlustus arvutatakse eraldi: töötaja {{ee.tootuskindlustus-tootaja}} ja tööandja {{ee.tootuskindlustus-tooandja}}.",
  ],
  ejemplo: [
    "Brutopalk 2000 eurot: sotsiaalmaks 660 eurot kuus ja 7920 eurot aastas. Töötaja töötuskindlustus on 32 eurot ja tööandja oma 16 eurot.",
    "Brutopalk 500 eurot: arvutatud summa on 165 eurot, kuid minimaalne kohustus nõuab 292,38 eurot.",
  ],
  faq: [
    {
      pregunta: "Kes sotsiaalmaksu maksab?",
      respuesta: "Tööandja. Maks ei vähenda töötaja netopalka, aga see on osa tööandja kuludest. Füüsilisest isikust ettevõtja maksab sotsiaalmaksu ise oma ettevõtlustulult.",
    },
    {
      pregunta: "Kuidas kuumäär aastati muutub?",
      respuesta: "Kuumäär kehtestatakse igaks eelarveaastaks riigieelarvega ja see ei tohi olla väiksem kui eelneva aasta 1. juulil kehtinud töötasu alammäär (§ 21). 2026. aasta kuumäär on {{ee.sotsiaalmaksu-kuumaar}}.",
    },
    {
      pregunta: "Kas palgalt peetakse kinni ka töötuskindlustust?",
      respuesta: "Jah. Töötaja makse on {{ee.tootuskindlustus-tootaja}} ja tööandja makse {{ee.tootuskindlustus-tooandja}}. Need on sotsiaalmaksust eraldi maksed, mis lähevad Töötukassale.",
    },
  ],
  glosario: [
    { termino: "Minimaalne kohustus", definicion: "Väikseim sotsiaalmaks kuus, mis arvutatakse kuumäärast." },
    { termino: "Ravikindlustus", definicion: "Õigus riigi rahastatud tervishoiuteenustele ja hüvitistele." },
  ],
});
