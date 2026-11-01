import { definirCasos } from "@/motor/calculo";
import calc from "./atvalinajuma-naudas-aprekins";

const VDI = "https://www.vdi.gov.lv/lv/ikgadejais-apmaksatais-atvalinajums";

export default definirCasos(calc, [
  {
    nombre: "Četras nedēļas: 20 darba dienas",
    origen: { tipo: "recalculado", url: VDI, detalle: "75. pants: 10 500 / 125 = 84 dienā. VDI: 4 × 5 = 20 darba dienas. 84 × 20 = 1680." },
    fecha: "2026-11-01",
    entrada: { samaksa: 10500, nostradatas: 125, dienas: 20 },
    esperado: { diena: 84, nauda: 1680, minimums: 4 },
  },
  {
    nombre: "Īss atvaļinājums: 5 dienas",
    origen: { tipo: "recalculado", url: "https://www.lm.gov.lv/lv/media/10361/download", detalle: "7500 / 120 = 62,50. × 5 = 312,50." },
    fecha: "2026-11-01",
    entrada: { samaksa: 7500, nostradatas: 120, dienas: 5 },
    esperado: { nauda: 312.5 },
  },
]);
