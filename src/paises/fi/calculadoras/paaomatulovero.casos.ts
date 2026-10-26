import { definirCasos } from "@/motor/calculo";
import paaomatulovero from "./paaomatulovero";

const ARVOP = "https://www.vero.fi/syventavat-vero-ohjeet/ohje-hakusivu/48262/arvopaperien-luovutusten-verotus3/";
const OSINKO = "https://www.vero.fi/en/individuals/property/investments/dividends/dividends-from-a-listed-company/";
const PAATOS =
  "https://www.vero.fi/syventavat-vero-ohjeet/paatokset/47363/verohallinnon-paatos-ennakonpidatysprosenttien-laskentaperusteista-palkkatuloa-varten-ja-ennakonkannossa-maarattavan-ennakkoveron-laskentaperusteista-vuodelle-2026/";
const pohja = { myyntihinta: null, hankintameno: null, kymmenen: null, summa: null, muut: 0 } as const;

export default definirCasos(paaomatulovero, [
  {
    nombre: "Verohallinnon esimerkki: 2 500 euron myynti 40 prosentin olettamalla",
    origen: { tipo: "oficial", url: ARVOP, detalle: "Hankintameno-olettama 40 % × 2 500 = 1 000, luovutusvoitto 1 500. Vero 30 % = 450." },
    fecha: "2026-10-24",
    entrada: { ...pohja, laji: "luovutus", myyntihinta: 2500, hankintameno: 500, kymmenen: true },
    esperado: { olettama: 1000, veronalainen: 1500, vero: 450 },
  },
  {
    nombre: "Verohallinnon esimerkki: pörssiosinko 10 000 euroa",
    origen: { tipo: "oficial", url: OSINKO, detalle: "Veronalaista 85 % eli 8 500 euroa; 30 % = 2 550 euroa." },
    fecha: "2026-10-24",
    entrada: { ...pohja, laji: "osinko", summa: 10000 },
    esperado: { veronalainen: 8500, vero: 2550 },
  },
  {
    nombre: "Raja 30 000 euroa ylittyy",
    origen: { tipo: "recalculado", url: PAATOS, detalle: "Muut pääomatulot 25 000 ja vuokratulo 10 000: 5 000 × 30 % + 5 000 × 34 % = 3 200." },
    fecha: "2026-10-24",
    entrada: { ...pohja, laji: "muu", summa: 10000, muut: 25000 },
    esperado: { vero: 3200, rajavero: 34 },
  },
  {
    nombre: "Todellinen hankintameno on olettamaa suurempi",
    origen: { tipo: "recalculado", url: ARVOP, detalle: "Myynti 10 000, hankinta 6 000, olettama 20 % = 2 000. Voitto 4 000, vero 1 200." },
    fecha: "2026-10-24",
    entrada: { ...pohja, laji: "luovutus", myyntihinta: 10000, hankintameno: 6000, kymmenen: false },
    esperado: { veronalainen: 4000, vero: 1200 },
  },
  {
    nombre: "Tappiollinen myynti",
    origen: { tipo: "recalculado", url: ARVOP, detalle: "Myynti 5 000, hankinta 7 000: tappio 2 000, ei veroa." },
    fecha: "2026-10-24",
    entrada: { ...pohja, laji: "luovutus", myyntihinta: 5000, hankintameno: 7000, kymmenen: false },
    esperado: { veronalainen: -2000, vero: 0 },
  },
]);
