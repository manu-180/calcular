import { definirCasos } from "@/motor/calculo";
import lahjaverolaskuri from "./lahjaverolaskuri";

const LAHJA = "https://www.vero.fi/henkiloasiakkaat/omaisuus/lahja/lahjaverolaskuri/";

export default definirCasos(lahjaverolaskuri, [
  {
    nombre: "Verohallinnon esimerkki: 30 000 euroa mummolta",
    origen: { tipo: "oficial", url: LAHJA, detalle: "Vero 25 000 eurosta 1 500, ylimenevästä 5 000 eurosta 10 % = 500. Yhteensä 2 000 euroa." },
    fecha: "2026-10-24",
    entrada: { lahja: 30000, luokka: "1", aiemmat: 0 },
    esperado: { vero: 2000 },
  },
  {
    nombre: "Verohallinnon esimerkki: 30 000 euroa siskolta",
    origen: { tipo: "oficial", url: LAHJA, detalle: "Vero 25 000 eurosta 3 425, ylimenevästä 5 000 eurosta 25 % = 1 250. Yhteensä 4 675 euroa." },
    fecha: "2026-10-24",
    entrada: { lahja: 30000, luokka: "2", aiemmat: 0 },
    esperado: { vero: 4675 },
  },
  {
    nombre: "Alle 7 500 euroa on verovapaa",
    origen: { tipo: "oficial", url: LAHJA, detalle: "Alle 7 500 euron lahjasta ei makseta lahjaveroa." },
    fecha: "2026-10-24",
    entrada: { lahja: 7499, luokka: "1", aiemmat: 0 },
    esperado: { vero: 0 },
  },
  {
    nombre: "Kaksi 5 000 euron lahjaa kolmen vuoden sisällä",
    origen: { tipo: "recalculado", url: LAHJA, detalle: "Yhteensä 10 000: 100 + 8 % × 2 500 = 300. Aiemmasta 5 000 eurosta vero 0. Uuden lahjan vero 300." },
    fecha: "2026-10-24",
    entrada: { lahja: 5000, luokka: "1", aiemmat: 5000 },
    esperado: { vero: 300, yhteensa: 300, aiempi: 0 },
  },
]);
