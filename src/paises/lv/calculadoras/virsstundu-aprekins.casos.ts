import { definirCasos } from "@/motor/calculo";
import calc from "./virsstundu-aprekins";

const VDI = "https://www.vdi.gov.lv/lv/piemaksas";

export default definirCasos(calc, [
  {
    nombre: "8 virsstundas pa 10 eiro",
    origen: { tipo: "recalculado", url: VDI, detalle: "68. pants: 80 + 100% piemaksa 80 = 160." },
    fecha: "2026-11-01",
    entrada: { likme: 10, stundas: 8, lielaka: null },
    esperado: { kopa: 160, piemaksa: 80, likme: 100 },
  },
  {
    nombre: "Līgumā noteikts 150%",
    origen: { tipo: "recalculado", url: VDI, detalle: "68. panta otrā daļa: lielāka piemaksa. 80 × 150% = 120. Kopā 200." },
    fecha: "2026-11-01",
    entrada: { likme: 10, stundas: 8, lielaka: 150 },
    esperado: { kopa: 200, piemaksa: 120 },
  },
  {
    nombre: "Mazāka līguma likme nedarbojas",
    origen: { tipo: "recalculado", url: VDI, detalle: "Kalkulators nepiemēro mazāk par 100%." },
    fecha: "2026-11-01",
    entrada: { likme: 10, stundas: 8, lielaka: 50 },
    esperado: { likme: 100 },
  },
]);
