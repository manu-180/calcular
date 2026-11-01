import { definirCasos } from "@/motor/calculo";
import puhkusetasu from "./puhkusetasu-arvutamine";

const KORD = "https://www.riigiteataja.ee/akt/122052024004";

export default definirCasos(puhkusetasu, [
  {
    nombre: "10 800 eurot, 28 päeva",
    origen: { tipo: "recalculado", url: KORD, detalle: "Määrus nr 91 § 4: 10 800 / 178 = 60,6742; × 28 = 1698,88." },
    fecha: "2026-10-15",
    entrada: { tasu: 10800, paevad: 178, puhkus: 28, liik: "tava", kuud: 12 },
    esperado: { tasu: 1698.88, paevatasu: 60.67, oigus: 28 },
  },
  {
    nombre: "Pool aastat tööl",
    origen: { tipo: "recalculado", url: "https://www.riigiteataja.ee/akt/TLS", detalle: "TLS § 68 lg 4: 28 × 6 / 12 = 14 päeva." },
    fecha: "2026-10-15",
    entrada: { tasu: 12000, paevad: 180, puhkus: 14, liik: "tava", kuud: 6 },
    esperado: { tasu: 933.33, oigus: 14 },
  },
  {
    nombre: "Alaealine 35 päeva",
    origen: { tipo: "recalculado", url: "https://www.riigiteataja.ee/akt/TLS", detalle: "TLS § 56: 35 kalendripäeva." },
    fecha: "2026-10-15",
    entrada: { tasu: 6000, paevad: 180, puhkus: 35, liik: "pikk", kuud: 12 },
    esperado: { oigus: 35, tasu: 1166.67 },
  },
]);
