import { definirCasos } from "@/motor/calculo";
import sotsiaalmaks from "./sotsiaalmaks";

const SMS = "https://www.riigiteataja.ee/akt/SMS";

export default definirCasos(sotsiaalmaks, [
  {
    nombre: "2000 eurot",
    origen: { tipo: "recalculado", url: SMS, detalle: "§ 7: 2000 × 33% = 660; töötuskindlustus 32 ja 16." },
    fecha: "2026-10-15",
    entrada: { bruto: 2000, miinimum: true },
    esperado: { sotsiaalmaks: 660, tkTootaja: 32, tkTooandja: 16, aastas: 7920 },
  },
  {
    nombre: "Miinimum",
    origen: { tipo: "oficial", url: "https://emta.ee/uudised/maksumuudatused-2026", detalle: "Kuumäär 886 × 33% = 292,38." },
    fecha: "2026-10-15",
    entrada: { bruto: 500, miinimum: true },
    esperado: { sotsiaalmaks: 292.38, arvutatud: 165 },
  },
]);
