import { definirCasos } from "@/motor/calculo";
import yleVero from "./yle-vero";

const VERO = "https://www.vero.fi/henkiloasiakkaat/verokortti-ja-veroilmoitus/tulot/ansiotulot/palkan-el%C3%A4kkeen-ja-etuuden-veroprosentit/";
const PAATOS =
  "https://www.vero.fi/syventavat-vero-ohjeet/paatokset/47363/verohallinnon-paatos-ennakonpidatysprosenttien-laskentaperusteista-palkkatuloa-varten-ja-ennakonkannossa-maarattavan-ennakkoveron-laskentaperusteista-vuodelle-2026/";

export default definirCasos(yleVero, [
  {
    nombre: "Verohallinnon esimerkki: palkka 16 000 euroa",
    origen: { tipo: "oficial", url: VERO, detalle: "Veron määrä palkasta 2,50 euroa, joka on kokonaan Yle-veroa: 2,5 % × (15 250 − 15 150)." },
    fecha: "2026-10-24",
    entrada: { palkka: 16000, muut: 0, taysiIkainen: true },
    esperado: { vero: 2.5 },
  },
  {
    nombre: "Palkka 20 000 euroa",
    origen: { tipo: "recalculado", url: PAATOS, detalle: "2,5 % × (19 250 − 15 150) = 102,50." },
    fecha: "2026-10-24",
    entrada: { palkka: 20000, muut: 0, taysiIkainen: true },
    esperado: { vero: 102.5 },
  },
  {
    nombre: "Enimmäismäärä 160 euroa",
    origen: { tipo: "recalculado", url: PAATOS, detalle: "2,5 % × (49 250 − 15 150) = 852,50, enintään 160." },
    fecha: "2026-10-24",
    entrada: { palkka: 50000, muut: 0, taysiIkainen: true },
    esperado: { vero: 160 },
  },
  {
    nombre: "Alle 18-vuotias",
    origen: { tipo: "recalculado", url: PAATOS, detalle: "Yle-veroa maksavat vuoden aikana 18 vuotta täyttävät." },
    fecha: "2026-10-24",
    entrada: { palkka: 20000, muut: 0, taysiIkainen: false },
    esperado: { vero: 0 },
  },
]);
