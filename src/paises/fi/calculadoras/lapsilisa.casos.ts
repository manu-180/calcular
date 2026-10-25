import { definirCasos } from "@/motor/calculo";
import lapsilisa from "./lapsilisa";

const KELA = "https://www.kela.fi/documents/d/guest/etuuksien-euromaaria-ja-tulorajoja-1-1-2026-pdf";

export default definirCasos(lapsilisa, [
  {
    nombre: "Kaksi lasta, ei alle 3-vuotiaita",
    origen: { tipo: "oficial", url: KELA, detalle: "Ensimmäinen lapsi 94,88 ja toinen 104,84 euroa kuukaudessa: yhteensä 199,72." },
    fecha: "2026-10-24",
    entrada: { lapset: 2, alle3: 0, yksinhuoltaja: false },
    esperado: { kuukaudessa: 199.72, vuodessa: 2396.64 },
  },
  {
    nombre: "Kolme lasta, nuorin alle 3-vuotias",
    origen: { tipo: "oficial", url: KELA, detalle: "94,88 + 104,84 + 159,79 (kolmas alle 3-vuotias) = 359,51." },
    fecha: "2026-10-24",
    entrada: { lapset: 3, alle3: 1, yksinhuoltaja: false },
    esperado: { kuukaudessa: 359.51 },
  },
  {
    nombre: "Yksinhuoltaja, yksi lapsi",
    origen: { tipo: "oficial", url: KELA, detalle: "94,88 + yksinhuoltajakorotus 73,30 = 168,18." },
    fecha: "2026-10-24",
    entrada: { lapset: 1, alle3: 0, yksinhuoltaja: true },
    esperado: { kuukaudessa: 168.18, korotukset: 73.3 },
  },
  {
    nombre: "Kuusi lasta: viides ja kuudes samalla määrällä",
    origen: { tipo: "oficial", url: KELA, detalle: "94,88 + 104,84 + 133,79 + 173,24 + 192,69 + 192,69 = 892,13." },
    fecha: "2026-10-24",
    entrada: { lapset: 6, alle3: 0, yksinhuoltaja: false },
    esperado: { kuukaudessa: 892.13 },
  },
  {
    nombre: "Alle 3-vuotiaita enemmän kuin lapsia",
    origen: { tipo: "recalculado", url: KELA, detalle: "Syöte ei ole mahdollinen." },
    fecha: "2026-10-24",
    entrada: { lapset: 1, alle3: 2, yksinhuoltaja: false },
    esperaError: true,
  },
]);
