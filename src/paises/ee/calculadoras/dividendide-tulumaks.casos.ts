import { definirCasos } from "@/motor/calculo";
import dividend from "./dividendide-tulumaks";

const EMTA = "https://www.emta.ee/ariklient/maksud-ja-tasumine/tulumaks-ja-sotsiaalmaks/dividendide-ja-omakapitali-valjamaksete";

export default definirCasos(dividend, [
  { nombre: "Neto 78 000", origen: { tipo: "recalculado", url: EMTA, detalle: "22/78 × 78 000 = 22 000; kokku 100 000." }, fecha: "2026-10-15", entrada: { suund: "neto", summa: 78000 }, esperado: { maks: 22000, kasum: 100000, kordaja: "22/78" } },
  { nombre: "Kasum 10 000", origen: { tipo: "recalculado", url: "https://www.riigiteataja.ee/akt/TuMS", detalle: "§ 4 lg 1 ja lg 11: 10 000 × 22% = 2200; neto 7800." }, fecha: "2026-10-15", entrada: { suund: "kasum", summa: 10000 }, esperado: { maks: 2200, neto: 7800 } },
]);
