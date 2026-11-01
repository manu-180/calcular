import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ee.fie-maksud",
  h1: "FIE maksude kalkulaator",
  title: "FIE maksud {{anio}}: sotsiaalmaks ja tulumaks ettevõtlustulult",
  description: "Arvuta FIE maksud: sotsiaalmaks {{ee.sotsiaalmaks}}, tulumaks {{ee.tulumaks}}, kvartali avanss {{ee.fie-kvartal}}. Näed, mis pärast makse aastas kätte jääb.",
  intro: [
    "Füüsilisest isikust ettevõtja maksab ettevõtlustulult sotsiaalmaksu {{ee.sotsiaalmaks}} ja tulumaksu {{ee.tulumaks}}. Aasta jooksul tasutakse sotsiaalmaksu avansiliselt, 2026. aastal {{ee.fie-kvartal}} kvartalis. Tegelik summa selgub deklaratsiooniga.",
    "Sotsiaalmaksul on põrand ja lagi: miinimum tuleb kuumäärast {{ee.sotsiaalmaksu-kuumaar}} ja maksustatav ülempiir on 2026. aastal {{ee.fie-sotsiaalmaksu-lagi}}. FIE töötuskindlustusmakset ei tasu.",
  ],
  comoSeCalcula: [
    "Tulust lahutatakse ettevõtlusega seotud kulud.",
    "Tulemus jagatakse arvuga 1,33 (tulumaksuseadus, § 14 lõige 53). Jagatis on tulumaksu alus ja selle {{ee.sotsiaalmaks}} on sotsiaalmaks.",
    "Kui nii arvutatud sotsiaalmaks jääb alla aasta miinimumi või üle lae, tasutakse miinimum või lagi ja tulust lahutatakse see summa.",
    "Tulumaksu alusest lahutatakse maksuvaba tulu {{ee.maksuvaba-aasta}}, kui seda pole mujal kasutatud, ja arvutatakse tulumaks {{ee.tulumaks}}.",
  ],
  ejemplo: [
    "Tulu 40 000 eurot ja kulud 10 000 eurot. Kasum 30 000 eurot jagatuna arvuga 1,33 on 22 556,39 eurot. Sotsiaalmaks on 7443,61 eurot. Pärast maksuvaba tulu jääb maksustada 14 156,39 eurot ja tulumaks on 3114,41 eurot. Kätte jääb 19 441,98 eurot.",
    "Kasum 5000 eurot: sotsiaalmaksu miinimum 3508,56 eurot on suurem kui arvutatud summa, seega jääb 1491,44 eurot ja tulumaksu ei teki.",
  ],
  faq: [
    {
      pregunta: "Kui suur on FIE sotsiaalmaksu avanss?",
      respuesta: "2026. aastal {{ee.fie-kvartal}} kvartalis (kuumäär {{ee.sotsiaalmaksu-kuumaar}} korda kolm kuud korda {{ee.sotsiaalmaks}}). Maksu- ja Tolliamet arvutab lõpliku summa deklaratsiooni põhjal.",
    },
    {
      pregunta: "Kas FIE maksab sotsiaalmaksu ka siis, kui kasumit pole?",
      respuesta: "Üldjuhul jah: sotsiaalmaksuseaduse § 2 lõike 5 järgi vähemalt kuumäära 12-kordselt summalt. Seaduses on erandid, näiteks pensionärile või isikule, kelle eest kohustus on mujal täidetud. Kalkulaator erandeid ei arvesta.",
    },
    {
      pregunta: "Kas FIE võib kasutada ka ettevõtluskontot?",
      respuesta: "Need on eri võimalused. Ettevõtluskonto puhul kulusid maha ei arvata ja maks peetakse kinni iga laekumise pealt. Võrdle summasid ettevõtluskonto kalkulaatoriga.",
    },
  ],
  glosario: [
    { termino: "FIE", definicion: "Füüsilisest isikust ettevõtja: inimene, kes tegutseb ise ettevõtjana." },
    { termino: "Ettevõtlustulu", definicion: "Tulu kaupade müügist või teenustest." },
    { termino: "Avansiline makse", definicion: "Kvartali makse, mis arvestatakse lõplikust sotsiaalmaksust maha." },
  ],
});
