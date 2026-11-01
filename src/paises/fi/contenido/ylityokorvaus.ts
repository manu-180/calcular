import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "fi.ylityokorvaus",
  h1: "Ylityökorvaus: laske ylityön palkka {{fi.ylityokorotukset[vuorokautinen-2]}} ja {{fi.ylityokorotukset[vuorokautinen-yli-2]}}",
  title: "Ylityökorvaus laskuri: {{fi.ylityokorotukset[vuorokautinen-2]}} ja {{fi.ylityokorotukset[vuorokautinen-yli-2]}} korotukset",
  description:
    "Laske ylityökorvaus työaikalain mukaan. Vuorokautisen ylityön kaksi ensimmäistä tuntia korotetaan {{fi.ylityokorotukset[vuorokautinen-2]}} ja seuraavat {{fi.ylityokorotukset[vuorokautinen-yli-2]}}.",
  intro: [
    "Ylityöstä maksetaan korotettua palkkaa. Laskuri erottelee vuorokautisen ja viikoittaisen ylityön ja laskee niiden korotukset tuntipalkastasi.",
    "Luvut ovat työaikalain vähimmäiskorvauksia. Työehtosopimuksessa voi olla sovittu toisin, joten tarkista oma sopimuksesi.",
  ],
  comoSeCalcula: [
    "Vuorokautista ylityötä on yleistyöajassa työ, joka ylittää kahdeksan tuntia vuorokaudessa. Viikoittaista ylityötä on työ, joka ylittää 40 tuntia viikossa olematta vuorokautista ylityötä.",
    "Vuorokautisen ylityön kahdelta ensimmäiseltä tunnilta maksetaan palkka korotettuna {{fi.ylityokorotukset[vuorokautinen-2]}} ja seuraavilta tunneilta {{fi.ylityokorotukset[vuorokautinen-yli-2]}}.",
    "Viikoittaisesta ylityöstä maksetaan palkka korotettuna {{fi.ylityokorotukset[viikoittainen]}}.",
    "Sunnuntaityöstä maksetaan {{fi.ylityokorotukset[sunnuntai]}} korotettu palkka. Laskuri näyttää siitä korotusosan.",
  ],
  ejemplo: [
    "Tuntipalkka on 20 euroa. Teet yhtenä päivänä 3 tuntia yli 8 tunnin: kaksi ensimmäistä tuntia maksavat 30 euroa ja kolmas 40 euroa, yhteensä 100 euroa.",
    "Lisäksi teet viikolla 4 tuntia viikoittaista ylityötä, joista saat 4 × 30 eli 120 euroa. Ylityökorvaus on yhteensä 220 euroa.",
  ],
  faq: [
    {
      pregunta: "Mikä on {{fi.ylityokorotukset[vuorokautinen-2]}} ja {{fi.ylityokorotukset[vuorokautinen-yli-2]}} ylityö?",
      respuesta:
        "Korotus lisätään tavalliseen tuntipalkkaan. {{fi.ylityokorotukset[vuorokautinen-2]}} korotuksella saat tunnilta 1,5-kertaisen palkan ja {{fi.ylityokorotukset[vuorokautinen-yli-2]}} korotuksella kaksinkertaisen. Vuorokautisen ylityön kaksi ensimmäistä tuntia korotetaan {{fi.ylityokorotukset[vuorokautinen-2]}}.",
    },
    {
      pregunta: "Voiko ylityön korvata vapaana?",
      respuesta: "Voi, jos siitä sovitaan. Silloin ylityötä vastaavan vapaan pituus lasketaan samoilla korotuksilla kuin rahakorvaus.",
    },
    {
      pregunta: "Pitääkö ylitöihin suostua?",
      respuesta: "Ylityöhön tarvitaan työntekijän suostumus kutakin kertaa varten. Suostumuksen voi antaa myös lyhyeksi ajaksi kerrallaan.",
    },
  ],
  glosario: [
    { termino: "Vuorokautinen ylityö", definicion: "Työ, joka ylittää kahdeksan tuntia vuorokaudessa yleistyöajassa." },
    { termino: "Viikoittainen ylityö", definicion: "Työ, joka ylittää 40 tuntia viikossa ja joka ei ole vuorokautista ylityötä." },
  ],
});
