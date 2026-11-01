import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "al.kontributet-e-sigurimeve",
  h1: "Kontributet e sigurimeve {{anio}}",
  title: "Kontributet e sigurimeve {{anio}}: shoqërore dhe shëndetësore",
  description: "Kontributet mbi pagën, me bazë minimale {{al.paga-minimale}}. Llogaritni pjesën tuaj dhe të punëdhënësit, ose kontributet e të vetëpunësuarit.",
  intro: [
    "Për një të punësuar, kontributet janë gjithsej 27,9% e pagës bruto: 24,5% sigurime shoqërore dhe 3,4% sigurime shëndetësore. Baza shoqërore fillon nga paga minimale {{al.paga-minimale}} dhe ndalet te paga maksimale, që mund ta vendosni në fushën e saj.",
    "I vetëpunësuari paguan vetë {{al.kontribute-vetepunesuar[shoqerore]}} sigurime shoqërore dhe {{al.kontribute-vetepunesuar[shendetesore]}} sigurime shëndetësore mbi dyfishin e pagës minimale.",
  ],
  comoSeCalcula: [
    "I punësuar: paguan {{al.kontribute[shoqerore-punonjes]}} shoqërore dhe {{al.kontribute[shendetesore-punonjes]}} shëndetësore. Punëdhënësi shton {{al.kontribute[shoqerore-punedhenes]}} dhe {{al.kontribute[shendetesore-punedhenes]}}.",
    "Nëse paga është nën minimumin, kontributi llogaritet mbi pagën minimale. Nëse kalon pagën maksimale, kontributi shoqëror ndalet aty.",
    "Kontributi shëndetësor nuk ka kufi të sipërm, sipas Udhëzimit nr. 23/2014.",
    "I vetëpunësuar: {{al.kontribute-vetepunesuar[shoqerore]}} mbi një bazë që zgjedh vetë brenda dy kufijve, plus {{al.kontribute-vetepunesuar[shendetesore]}} mbi dyfishin e pagës minimale.",
  ],
  ejemplo: [
    "Me pagë 100 000 lekë, kontributet janë 27 900 lekë: 11 200 lekë i mban punonjësi nga paga dhe 16 700 lekë i shton punëdhënësi. Një i vetëpunësuar me bazën minimale paguan 11 500 lekë shoqërore dhe 3 400 lekë shëndetësore, gjithsej 14 900 lekë në muaj.",
  ],
  faq: [
    {
      pregunta: "Sa është paga maksimale për kontributet?",
      respuesta: "Shifrën e fundit e njofton Administrata Tatimore; kontrollojeni atje dhe vendoseni në fushën e pagës maksimale. Sipas ligjit nr. 7703, kufiri rritet me të njëjtën masë dhe në të njëjtën kohë me pagën minimale.",
    },
    {
      pregunta: "Ku shkojnë kontributet shoqërore?",
      respuesta: "ISSH i ndan në pesë degë: sëmundje 0,3%, barrëlindje 1,4%, pensione 21,6%, aksidente 0,3% dhe papunësi 0,9%. Bashkë janë 24,5%.",
    },
    {
      pregunta: "A mund të paguaj kontribute më të larta si i vetëpunësuar?",
      respuesta: "Po. Sipas ligjit nr. 7703, personi fizik mund të zgjedhë një bazë më të lartë se paga minimale, deri te paga maksimale. Baza më e lartë ndikon në pensionin e ardhshëm.",
    },
    {
      pregunta: "Kur paguhen kontributet?",
      respuesta: "Personat juridikë i paguajnë brenda datës 20 të muajit pasardhës. Afati i të vetëpunësuarve është te faqja e ISSH-së dhe te Udhëzimi nr. 23/2014.",
    },
  ],
  glosario: [
    { termino: "ISSH", definicion: "Instituti i Sigurimeve Shoqërore, që paguan pensionet dhe përfitimet." },
    { termino: "Paga maksimale", definicion: "Kufiri i sipërm i bazës për kontributin shoqëror." },
  ],
});
