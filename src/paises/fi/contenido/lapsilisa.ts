import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "fi.lapsilisa",
  h1: "Lapsilisä: paljonko lapsilisää saat",
  title: "Lapsilisä 2026: laske lapsilisän määrä",
  description:
    "Laske perheesi lapsilisät. Ensimmäisestä lapsesta saat {{fi.lapsilisa[1]}} kuukaudessa, ja määrä kasvaa lapsiluvun mukaan. Mukana alle 3-vuotiaiden korotus.",
  intro: [
    "Kela maksaa lapsilisää jokaisesta alle 17-vuotiaasta lapsesta. Laskuri laskee perheen lapsilisät yhteen ja näyttää, paljonko kustakin lapsesta maksetaan.",
    "Lapsilisä on porrastettu: mitä useampi lapsi perheessä on, sitä suurempi on seuraavan lapsen lapsilisä. Alle 3-vuotiaasta lapsesta maksetaan enemmän.",
  ],
  comoSeCalcula: [
    "Ensimmäisestä lapsesta maksetaan {{fi.lapsilisa[1]}}, toisesta {{fi.lapsilisa[2]}}, kolmannesta {{fi.lapsilisa[3]}} ja neljännestä {{fi.lapsilisa[4]}} kuukaudessa. Viidennestä ja jokaisesta seuraavasta lapsesta maksetaan {{fi.lapsilisa[5]}}.",
    "Alle 3-vuotiaasta ensimmäisestä lapsesta maksetaan {{fi.lapsilisa[1-alle-3]}}, ja muissakin järjestysnumeroissa alle 3-vuotiaan lapsilisä on vastaavasti suurempi.",
    "Laskuri olettaa, että alle 3-vuotiaat ovat perheen nuorimmat lapset.",
    "Yksinhuoltaja saa jokaisesta lapsesta korotusta {{fi.lapsilisan-yksinhuoltajakorotus}} kuukaudessa.",
  ],
  ejemplo: [
    "Perheessä on kolme lasta, joista nuorin on 1-vuotias. Lapsilisää maksetaan 94,88 + 104,84 + 159,79 eli 359,51 euroa kuukaudessa.",
  ],
  faq: [
    {
      pregunta: "Paljonko lapsilisä on vuonna 2026?",
      respuesta: "Ensimmäisestä lapsesta {{fi.lapsilisa[1]}} ja alle 3-vuotiaasta ensimmäisestä lapsesta {{fi.lapsilisa[1-alle-3]}} kuukaudessa. Seuraavista lapsista määrä kasvaa.",
    },
    {
      pregunta: "Mihin asti lapsilisää maksetaan?",
      respuesta: "Lapsilisää maksetaan sen kuukauden loppuun, jona lapsi täyttää 17 vuotta.",
    },
    {
      pregunta: "Saako yksinhuoltajakorotuksen, jos lapsella on yhteishuoltajuus?",
      respuesta: "Saa. Yksinhuoltaja saa korotuksen jokaisesta lapsesta, josta hän saa lapsilisää, vaikka lapsella olisi yhteishuoltajuus.",
    },
    {
      pregunta: "Milloin lapsilisä alkaa?",
      respuesta: "Kela myöntää lapsilisän hakemuksesta lapsen syntymää seuraavan kuukauden alusta.",
    },
  ],
  glosario: [
    { termino: "Porrastus", definicion: "Lapsilisän kasvaminen lapsiluvun mukaan." },
    { termino: "Yksinhuoltajakorotus", definicion: "Lapsilisän lisä yksinhuoltajalle jokaisesta lapsesta." },
  ],
});
