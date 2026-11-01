import { definirCasos } from "@/motor/calculo";
import maamaks from "./maamaks";

const MAAMS = "https://www.riigiteataja.ee/akt/MaaMS";

export default definirCasos(maamaks, [
  { nombre: "Elamumaa 0,3%", origen: { tipo: "recalculado", url: MAAMS, detalle: "§ 5: 50 000 × 0,3% = 150; soodustus 100; maks 50." }, fecha: "2026-10-15", entrada: { hind: 50000, siht: "elamu", maar: 0.3, soodustus: 100 }, esperado: { maks: 50, arvutatud: 150 } },
  { nombre: "Soodustus katab maksu", origen: { tipo: "recalculado", url: MAAMS, detalle: "§ 11: 100 × 1000 piiri piires; maks 0." }, fecha: "2026-10-15", entrada: { hind: 20000, siht: "elamu", maar: 0.5, soodustus: 500 }, esperado: { maks: 0, soodustus: 100 } },
  { nombre: "Maatulundusmaa piir", origen: { tipo: "recalculado", url: MAAMS, detalle: "§ 5 lg 1 p 2: üle 0,5% ei saa." }, fecha: "2026-10-15", entrada: { hind: 10000, siht: "maatulundus", maar: 0.8, soodustus: 0 }, esperaError: true },
]);
