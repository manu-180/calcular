import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "fi.palkkalaskuri",
  h1: "Palkkalaskuri: nettopalkka bruttopalkasta",
  title: "Palkkalaskuri {{anio}}: paljonko palkasta jää käteen",
  description:
    "Laske nettopalkka bruttopalkasta. Mukana kotikunnan veroprosentti, kirkollisvero, työeläkemaksu {{fi.palkansaajan-maksut[tyel]}} ja työttömyysvakuutusmaksu.",
  intro: [
    "Palkkalaskuri näyttää, paljonko palkastasi jää käteen verojen ja maksujen jälkeen. Valitse kotikuntasi, niin laskuri käyttää sen tuloveroprosenttia.",
    "Laskelma etenee samassa järjestyksessä kuin Verohallinnon verokorttilaskenta: vuositulot, automaattiset vähennykset, valtion vero, kunnallisvero ja sairausvakuutusmaksut. Saat myös arvion verokorttisi veroprosentista.",
  ],
  comoSeCalcula: [
    "Vuositulot ovat kuukausipalkka kertaa 12, ja niihin lisätään muut palkat, kuten lomaraha tai bonukset.",
    "Palkasta peritään työeläkemaksu {{fi.palkansaajan-maksut[tyel]}} ja 18-64-vuotiailta työttömyysvakuutusmaksu {{fi.palkansaajan-maksut[tyottomyys]}}. Jos vuositulot ovat vähintään {{fi.paivarahamaksun-tuloraja}}, peritään myös päivärahamaksu {{fi.palkansaajan-maksut[paivaraha]}}. Nämä maksut vähennetään verotuksessa.",
    "Palkasta vähennetään tulonhankkimisvähennys {{fi.tulonhankkimisvahennys}}. Pienituloinen saa lisäksi perusvähennyksen, joka on enintään {{fi.perusvahennys}}.",
    "Valtion vero lasketaan tuloveroasteikolla. Vero on {{fi.valtion-tuloveroasteikko[0].tasa}} tuloista {{fi.valtion-tuloveroasteikko[1].desde}} asti, ja ylin rajaveroprosentti on {{fi.valtion-tuloveroasteikko[-1].tasa}}. Kunnallisvero ja kirkollisvero lasketaan kotikunnan prosenteilla ja sairaanhoitomaksu on {{fi.palkansaajan-maksut[sairaanhoito]}}.",
    "Työtulovähennys pienentää veroja. Se on {{fi.tyotulovahennys-prosentit[osuus]}} palkasta, enintään {{fi.tyotulovahennys[enimmais]}}, ja se tehdään ensin valtion verosta.",
    "Yle-vero on {{fi.yle-vero}} tuloista, jotka ylittävät {{fi.yle-veron-tuloraja}}, ja enintään {{fi.yle-veron-enimmaismaara}} vuodessa.",
  ],
  ejemplo: [
    "Helsinkiläinen evankelis-luterilaisen kirkon jäsen ansaitsee 2 500 euroa kuukaudessa eli 30 000 euroa vuodessa. Veroja kertyy 2 530,49 euroa vuodessa, ja verokortin veroprosentti on 8,5.",
    "Kuukaudessa vero on noin 210,87 euroa, työeläkemaksu 182,50 euroa ja työttömyysvakuutusmaksu 22,25 euroa. Käteen jää 2 084,38 euroa.",
  ],
  faq: [
    {
      pregunta: "Paljonko 3 000 euron palkasta jää käteen?",
      respuesta:
        "Helsingissä ilman kirkollisveroa noin 2 440 euroa kuukaudessa, kun sinulla ei ole muita tuloja. Kotikunta ja kirkon jäsenyys muuttavat summaa muutamalla kymmenellä eurolla. Tarkan summan näet laskurista.",
    },
    {
      pregunta: "Miten verokortin veroprosentti lasketaan?",
      respuesta:
        "Verohallinto arvioi vuositulosi ja laskee niistä verot ja maksut. Veroprosentti on niiden osuus tuloista, ja se pyöristetään ylöspäin puolen prosenttiyksikön tarkkuudella.",
    },
    {
      pregunta: "Sisältyykö työeläkemaksu veroprosenttiin?",
      respuesta:
        "Ei sisälly. Työeläkemaksu {{fi.palkansaajan-maksut[tyel]}} ja työttömyysvakuutusmaksu {{fi.palkansaajan-maksut[tyottomyys]}} peritään palkasta veron lisäksi. Laskuri vähentää ne nettopalkasta.",
    },
    {
      pregunta: "Kuinka paljon kotikunta vaikuttaa veroon?",
      respuesta:
        "Kunnallisvero on kotikuntasi tuloveroprosentti verotettavasta tulosta. Esimerkiksi Helsingissä se on {{fi.kunnallisvero[helsinki]}} ja Tampereella {{fi.kunnallisvero[tampere]}}. Prosentin määrää kunta, joka oli kotikuntasi edellisen vuoden lopussa.",
    },
    {
      pregunta: "Miten lomaraha verotetaan?",
      respuesta: "Lomaraha on veronalaista palkkaa. Lisää se kohtaan Muut palkat, niin laskuri ottaa sen mukaan vuosituloihin ja veroprosenttiin.",
    },
  ],
  glosario: [
    { termino: "Bruttopalkka", definicion: "Palkka ennen veroja ja palkasta perittäviä maksuja." },
    { termino: "Nettopalkka", definicion: "Summa, joka maksetaan tilillesi verojen ja maksujen jälkeen." },
    { termino: "Verokortti", definicion: "Verohallinnon päätös siitä, millä prosentilla palkastasi pidätetään veroa." },
    { termino: "Työtulovähennys", definicion: "Verosta tehtävä vähennys palkkatulon saajalle. Se pienentää ensin valtion veroa." },
  ],
});
