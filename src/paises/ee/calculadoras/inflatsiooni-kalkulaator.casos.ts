import { definirCasos } from "@/motor/calculo";
import thi from "./inflatsiooni-kalkulaator";

const STAT = "https://andmed.stat.ee/et/stat/majandus__hinnad/IA002";

export default definirCasos(thi, [
  {
    nombre: "Jaanuar 2020 kuni september 2026",
    origen: { tipo: "recalculado", url: STAT, detalle: "Tabel IA002: 329,07 / 213,4 = 1,54203; 1000 × 1,54203 = 1542,03." },
    fecha: "2026-10-15",
    entrada: { summa: 1000, algus: "2020-01-01", lopp: "2026-09-01" },
    esperado: { tana: 1542.03, vahe: 542.03 },
  },
  { nombre: "Liiga vana kuu", origen: { tipo: "recalculado", url: STAT, detalle: "Seeria algab 2015. aasta jaanuarist." }, fecha: "2026-10-15", entrada: { summa: 1000, algus: "2010-01-01", lopp: "2026-09-01" }, esperaError: true },
]);
