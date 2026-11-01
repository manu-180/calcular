import { definirCasos } from "@/motor/calculo";
import kilometrikorvaus from "./kilometrikorvaus";

const KM26 = "https://www.vero.fi/en/About-us/newsroom/news/uutiset/2025/tax-exempt-allowances-in-2026-for-business-travel/";
const KM27 = "https://www.vero.fi/syventavat-vero-ohjeet/paatokset/47405/verohallinnon-paatos-verovapaista-matkakustannusten-korvauksista-vuonna-2027/";

export default definirCasos(kilometrikorvaus, [
  {
    nombre: "2026: 250 km ja kaksi kokopäivärahaa",
    origen: { tipo: "recalculado", url: KM26, detalle: "250 × 0,55 = 137,50; 2 × 54 = 108. Yhteensä 245,50." },
    fecha: "2026-10-24",
    entrada: { km: 250, kokopaivat: 2, osapaivat: 0, ateriat: 0 },
    esperado: { kmKorvaus: 137.5, paivarahat: 108, yhteensa: 245.5 },
  },
  {
    nombre: "2026: osapäiväraha ja ateriakorvaus",
    origen: { tipo: "recalculado", url: KM26, detalle: "Osapäiväraha 25 ja ateriakorvaus 13,50: 38,50." },
    fecha: "2026-10-24",
    entrada: { km: 0, kokopaivat: 0, osapaivat: 1, ateriat: 1 },
    esperado: { yhteensa: 38.5 },
  },
  {
    nombre: "2027: uudet enimmäismäärät",
    origen: { tipo: "oficial", url: KM27, detalle: "2027: auto 58 senttiä kilometriltä, kokopäiväraha 55 euroa: 100 km + 1 päivä = 113." },
    fecha: "2027-01-15",
    entrada: { km: 100, kokopaivat: 1, osapaivat: 0, ateriat: 0 },
    esperado: { yhteensa: 113 },
  },
]);
