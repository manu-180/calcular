import { definirCasos } from "@/motor/calculo";
import kulu from "./tooandja-kulu";

const SMS = "https://www.riigiteataja.ee/akt/SMS";

export default definirCasos(kulu, [
  {
    nombre: "1500 eurot",
    origen: { tipo: "recalculado", url: SMS, detalle: "33% = 495; 0,8% = 12; kokku 1500 + 495 + 12 = 2007; aastas 24 084." },
    fecha: "2026-10-15",
    entrada: { bruto: 1500, miinimum: true, kuud: 12 },
    esperado: { kulu: 2007, sotsiaalmaks: 495, tootuskindlustus: 12, kokku: 24084 },
  },
  {
    nombre: "500 eurot miinimumiga",
    origen: { tipo: "recalculado", url: "https://emta.ee/uudised/maksumuudatused-2026", detalle: "Minimaalne kohustus 292,38; 0,8% = 4; kokku 796,38." },
    fecha: "2026-10-15",
    entrada: { bruto: 500, miinimum: true, kuud: 1 },
    esperado: { kulu: 796.38, sotsiaalmaks: 292.38 },
  },
  {
    nombre: "500 eurot ilma miinimumita",
    origen: { tipo: "recalculado", url: SMS, detalle: "33% = 165; 0,8% = 4; kokku 669." },
    fecha: "2026-10-15",
    entrada: { bruto: 500, miinimum: false, kuud: 1 },
    esperado: { kulu: 669, sotsiaalmaks: 165 },
  },
]);
