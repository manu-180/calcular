import { definirCasos } from "@/motor/calculo";
import calc from "./bezdarbnieka-pabalsts";

const VSAA = "https://www.vsaa.gov.lv/en/services/granting-and-disbursement-unemployment-benefit";

export default definirCasos(calc, [
  {
    nombre: "1500 eiro, stāžs līdz 9 gadiem",
    origen: { tipo: "recalculado", url: VSAA, detalle: "50% = 750. Tālāk 75% = 562,50, 50% = 375, 45% = 337,50. (750 + 562,50 + 375 + 337,50) × 2 = 4050." },
    fecha: "2026-11-01",
    entrada: { alga: 1500, stazs: "1-9" },
    esperado: { m12: 750, m34: 562.5, m56: 375, m78: 337.5, kopa: 4050 },
  },
  {
    nombre: "Stāžs 30 gadi: 65%",
    origen: { tipo: "recalculado", url: VSAA, detalle: "1000 × 65% = 650." },
    fecha: "2026-11-01",
    entrada: { alga: 1000, stazs: "30" },
    esperado: { m12: 650 },
  },
]);
