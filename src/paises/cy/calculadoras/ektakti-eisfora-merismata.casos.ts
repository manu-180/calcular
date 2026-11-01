import { definirCasos } from "@/motor/calculo";
import { URL_AMYNA } from "../lib/fuentes-url";
import ektaktiEisforaMerismata from "./ektakti-eisfora-merismata";

export default definirCasos(ektaktiEisforaMerismata, [
  {
    nombre: "Μέρισμα 10.000 € από κέρδη του 2026",
    origen: { tipo: "recalculado", url: URL_AMYNA, detalle: "Άρθρο 3(1)(α): 5% = 500. ΓεΣΥ 2,65% = 265. Καθαρά 9235." },
    fecha: "2026-10-26",
    entrada: { merisma: 10000, kerdi: "merismata" },
    esperado: { amyna: 500, gesy: 265, kathara: 9235 },
  },
  {
    nombre: "Μέρισμα 10.000 € από κέρδη του 2024",
    origen: { tipo: "recalculado", url: URL_AMYNA, detalle: "Επιφύλαξη (ii): 17% = 1700. ΓεΣΥ 265. Καθαρά 8035." },
    fecha: "2026-10-26",
    entrada: { merisma: 10000, kerdi: "merismata-palaia" },
    esperado: { amyna: 1700, kathara: 8035 },
  },
]);
