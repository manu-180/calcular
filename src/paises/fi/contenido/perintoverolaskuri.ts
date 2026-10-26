import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "fi.perintoverolaskuri",
  h1: "Perintöverolaskuri: paljonko perintöveroa maksat",
  title: "Perintöverolaskuri 2026: laske perintövero",
  description:
    "Laske perintövero perintöosuudestasi veroluokan I tai II mukaan. Vuodesta 2026 alle {{fi.perintovero-1[1].desde}} perintöosuus on verovapaa.",
  intro: [
    "Perintövero lasketaan jokaisen perillisen omasta perintöosuudesta. Syötä osuutesi arvo ja valitse veroluokka, niin laskuri näyttää veron.",
    "Veroluokka riippuu sukulaisuudesta. Lähimmät sukulaiset maksavat vähemmän kuin muut perilliset.",
  ],
  comoSeCalcula: [
    "Veroa ei makseta, jos perintöosuus on alle {{fi.perintovero-1[1].desde}}. Jos osuus on tätä suurempi, vero lasketaan koko arvosta taulukon mukaan.",
    "Veroluokassa I vero on alarajan kohdalla {{fi.perintovero-1[1].cuotaFija}}, ja ylimenevästä osasta vero on {{fi.perintovero-1[1].tasa}}. Prosentti nousee portaittain {{fi.perintovero-1[-1].tasa}}:iin.",
    "Veroluokassa II ensimmäisen portaan prosentti on {{fi.perintovero-2[1].tasa}} ja ylin {{fi.perintovero-2[-1].tasa}}.",
  ],
  ejemplo: [
    "Perit äidiltäsi 45 000 euroa. Vero 40 000 eurosta on 800 euroa, ja ylimenevästä 5 000 eurosta {{fi.perintovero-1[2].tasa}} eli 500 euroa.",
    "Perintöveroa maksetaan yhteensä 1 300 euroa.",
  ],
  faq: [
    {
      pregunta: "Kuka kuuluu veroluokkaan I?",
      respuesta: "Puoliso, rekisteröity puoliso sekä suoraan ylenevässä tai alenevassa polvessa olevat sukulaiset, kuten lapset, lapsenlapset, vanhemmat ja isovanhemmat. Myös puolison lapset kuuluvat siihen.",
    },
    {
      pregunta: "Mikä muuttui vuonna 2026?",
      respuesta: "Verovapaa raja nousi. Perintöveroa ei tarvitse maksaa, jos perintöosuus on alle {{fi.perintovero-1[1].desde}}. Aiemmin raja oli 20 000 euroa.",
    },
    {
      pregunta: "Vähennetäänkö verovapaa osa perinnön arvosta?",
      respuesta: "Ei vähennetä. Jos osuus ylittää rajan, vero lasketaan koko arvosta. Verovapaa osa on jo otettu huomioon verotaulukossa.",
    },
  ],
  glosario: [
    { termino: "Perintöosuus", definicion: "Se osa perinnöstä, jonka yksi perillinen saa perukirjan ja mahdollisen testamentin mukaan." },
    { termino: "Veroluokka", definicion: "Sukulaisuuteen perustuva luokka, joka määrää veron suuruuden." },
  ],
});
