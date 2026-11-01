import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ee.brutopalga-kalkulaator",
  h1: "Brutopalga kalkulaator: netost bruto",
  title: "Brutopalga kalkulaator {{anio}}: netopalgast brutopalk",
  description: "Tead soovitud netopalka? Arvuta vajalik brutopalk {{ee.tulumaks}} tulumaksu, {{ee.maksuvaba-kuu}} maksuvaba tulu ja II samba maksega. Näed ka tööandja kulu.",
  intro: [
    "Tööpakkumise läbirääkimisel räägitakse sageli netost, aga töölepingusse läheb brutopalk. See kalkulaator arvutab tagurpidi: sisestad summa, mida soovid kätte saada, ja näed, mis brutopalka selleks vaja on.",
    "Arvutus kasutab samu määrasid mis palgaarvestus: tulumaks {{ee.tulumaks}}, töötuskindlustusmakse {{ee.tootuskindlustus-tootaja}}, valitud II samba makse ja maksuvaba tulu {{ee.maksuvaba-kuu}} kuus.",
  ],
  comoSeCalcula: [
    "Kui netopalk jääb maksuvaba tulu piiresse, tulumaksu ei teki ja bruto on neto jagatud osaga, mis jääb pärast töötuskindlustust ja II sammast.",
    "Muidu lahutatakse netopalgast tulumaksumäära ja maksuvaba tulu korrutis ning tulemus jagatakse kahe osaga: palgaosa pärast makseid ja osa pärast tulumaksu.",
    "Lõpuks kontrollime tulemust otsearvutusega ja parandame sendi täpsusega, sest iga makse ümardatakse eraldi.",
  ],
  ejemplo: [
    "Soovid kätte 1000 eurot, II sammas 2% ja maksuvaba tulu on kasutusel. Vajalik brutopalk on 1125,12 eurot. Sellest läheb töötuskindlustuseks 18 eurot, II sambasse 22,50 eurot ja tulumaksuks 84,62 eurot.",
    "Kui maksuvaba tulu kasutad mõne teise tööandja juures, peab sama neto saamiseks brutopalk olema tunduvalt suurem. Muuda valikut ja näed vahet kohe.",
  ],
  faq: [
    {
      pregunta: "Miks bruto ja neto vahe ei ole iga palga juures sama protsent?",
      respuesta: "Maksuvaba tulu on kindel summa ({{ee.maksuvaba-kuu}} kuus). Väikese palga juures katab see suure osa, suure palga juures väiksema osa, seega maksukoormus kasvab palgaga, kuigi tulumaksumäär on kõigile {{ee.tulumaks}}.",
    },
    {
      pregunta: "Kas brutopalk võib olla väiksem kui miinimum?",
      respuesta: "Täistööajal mitte: palk peab olema vähemalt töötasu alammäär. Kalkulaator seda ei kontrolli, sest osalise tööajaga töötamisel võib kuupalk olla väiksem. Miinimumi leiad miinimumpalga kalkulaatorist.",
    },
    {
      pregunta: "Kuidas mõjutab tulemust II samba makse?",
      respuesta: "II samba makse võetakse brutopalgast enne tulumaksu. Kui valid {{ee.kogumispension[6]}} asemel {{ee.kogumispension[2]}}, on sama neto jaoks vaja väiksemat brutopalka. Makse ei kao, vaid läheb sinu pensionikontole.",
    },
  ],
  glosario: [
    { termino: "Neto", definicion: "Summa pangakontol pärast kinnipidamisi." },
    { termino: "Bruto", definicion: "Summa, mis märgitakse töölepingusse." },
    { termino: "Töötuskindlustusmakse", definicion: "Töötaja ja tööandja makse Töötukassale palgalt." },
  ],
});
