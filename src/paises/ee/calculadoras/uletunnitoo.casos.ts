import { definirCasos } from "@/motor/calculo";
import uletunnid from "./uletunnitoo";

const TLS = "https://www.riigiteataja.ee/akt/TLS";

export default definirCasos(uletunnid, [
  {
    nombre: "10 ületundi",
    origen: { tipo: "recalculado", url: TLS, detalle: "§ 44 lg 7: 2000 / 168 = 11,9048; × 10 × 1,5 = 178,57." },
    fecha: "2026-10-15",
    entrada: { palk: 2000, kuuTunnid: 168, uletunnid: 10, ootunnid: 0, riigipuha: 0 },
    esperado: { uletasu: 178.57, lisad: 178.57, kokku: 2178.57 },
  },
  {
    nombre: "Öötöö ja riigipüha",
    origen: { tipo: "recalculado", url: TLS, detalle: "§ 45: lisa 0,25 × 11,9048 × 8 = 23,81; lisa 1 × 11,9048 × 8 = 95,24." },
    fecha: "2026-10-15",
    entrada: { palk: 2000, kuuTunnid: 168, uletunnid: 10, ootunnid: 8, riigipuha: 8 },
    esperado: { oolisa: 23.81, pyhalisa: 95.24, lisad: 297.62, kokku: 2297.62 },
  },
]);
