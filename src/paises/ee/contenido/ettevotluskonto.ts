import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ee.ettevotluskonto",
  h1: "Ettevõtluskonto kalkulaator",
  title: "Ettevõtluskonto {{anio}}: maks {{ee.ettevotluskonto[0]}} ja mis kätte jääb",
  description: "Arvuta ettevõtluskonto maks: {{ee.ettevotluskonto[0]}} laekumiselt, II sambaga kuni {{ee.ettevotluskonto[6]}}. Piir on {{ee.ettevotluskonto-piir}} aastas. Vaata, mis sulle jääb.",
  intro: [
    "Ettevõtluskontole laekuvalt summalt peetakse kinni ettevõtlustulu maks {{ee.ettevotluskonto[0]}}. Pank kannab selle Maksu- ja Tolliametile ning ülejäänud raha on sinu. Kulusid maha arvata ei saa.",
    "Kui teed II samba makseid, on määr {{ee.ettevotluskonto[2]}}, {{ee.ettevotluskonto[4]}} või {{ee.ettevotluskonto[6]}}. Aastane laekumiste piir on {{ee.ettevotluskonto-piir}}. Selle ületamisel tuleb registreerida ettevõtjaks ja käibemaksukohustuslaseks.",
  ],
  comoSeCalcula: [
    "Laekunud summa korrutatakse valitud maksumääraga.",
    "Sulle jääb laekumine miinus maks. Kulud ei vähenda maksu.",
    "Kuu laekumisest {{ee.ettevotluskonto-ravikindlustus}} ilma II sambata piisab ravikindlustuse jaoks, kui laekumine tuleb teenustest või müügist.",
  ],
  ejemplo: [
    "Laekumine 2500 eurot kuus ilma II sambata: maks 500 eurot, kätte 2000 eurot. Aastas teeb see 30 000 eurot laekumist, mis jääb piiri sisse.",
    "Maksu- ja Tolliameti näide II sambaga 6%: saad 100 eurot, kontole jääb 74 eurot.",
  ],
  faq: [
    {
      pregunta: "Mis saab siis, kui laekumine ületab aastas piiri?",
      respuesta: "Üle {{ee.ettevotluskonto-piir}} kalendriaastas tähendab, et tuleb tegutseda FIE või osaühinguna ning registreeruda käibemaksukohustuslaseks.",
    },
    {
      pregunta: "Kas ettevõtluskonto annab ravikindlustuse?",
      respuesta: "Jah, kui kuus on tasutud minimaalne sotsiaalmaks. 2026. aastal tähendab see ilma II sambata umbes {{ee.ettevotluskonto-ravikindlustus}} laekumist kuus.",
    },
    {
      pregunta: "Kas kulud saab maha arvata?",
      respuesta: "Ei saa. Kui kulud on suured, võib FIE või osaühing tulla odavam. Arvuta võrdluseks ka FIE maksud.",
    },
    {
      pregunta: "Kuidas maks jaguneb?",
      respuesta: "Maksu- ja Tolliamet jagab kinni peetud summa tulumaksuks ja sotsiaalmaksuks ning II samba korral ka pensionimakseks. Sina teed ainult ühe valiku: kas {{ee.ettevotluskonto[0]}}, {{ee.ettevotluskonto[2]}}, {{ee.ettevotluskonto[4]}} või {{ee.ettevotluskonto[6]}}.",
    },
  ],
  glosario: [
    { termino: "Ettevõtluskonto", definicion: "Pangakonto, kust maks makstakse laekumise pealt automaatselt." },
    { termino: "Ettevõtlustulu maks", definicion: "Üks määr, mis katab tulumaksu ja sotsiaalmaksu." },
  ],
});
