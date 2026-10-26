import { definirCasos } from "@/motor/calculo";
import osakesaastotili from "./osakesaastotili-verotus";

const OST = "https://www.vero.fi/syventavat-vero-ohjeet/ohje-hakusivu/81118/osakesaastotilin-verotus4/";

export default definirCasos(osakesaastotili, [
  {
    nombre: "Verohallinnon esimerkki 6: 1 500 euron nosto",
    origen: { tipo: "oficial", url: OST, detalle: "Tuottoa 5 000 / 15 000 × 1 500 = 500 euroa, pääomaa 1 000 euroa; talletettu pääoma 9 000. Vero 30 % = 150." },
    fecha: "2026-10-24",
    entrada: { talletukset: 10000, arvo: 15000, nosto: 1500, muut: 0 },
    esperado: { veronalainen: 500, paaoma: 1000, jaljella: 9000, vero: 150, talletusvara: 91000 },
  },
  {
    nombre: "Verohallinnon esimerkki 7: 3 500 euron nosto",
    origen: { tipo: "oficial", url: OST, detalle: "Tuottoa 9 000 / 18 000 × 3 500 = 1 750 euroa, pääomaa 1 750 euroa; jäljelle 7 250. Vero 30 % = 525." },
    fecha: "2026-10-24",
    entrada: { talletukset: 9000, arvo: 18000, nosto: 3500, muut: 0 },
    esperado: { veronalainen: 1750, paaoma: 1750, jaljella: 7250, vero: 525 },
  },
  {
    nombre: "Verohallinnon esimerkki 8: tili tappiolla",
    origen: { tipo: "oficial", url: OST, detalle: "Arvo 7 000 alittaa talletetun pääoman 7 250: koko nosto on pääomaa, ei veroa, ja rahasijoituksen määrä on noston jälkeen 0." },
    fecha: "2026-10-24",
    entrada: { talletukset: 7250, arvo: 7000, nosto: 7000, muut: 0 },
    esperado: { veronalainen: 0, vero: 0, jaljella: 0 },
  },
]);
