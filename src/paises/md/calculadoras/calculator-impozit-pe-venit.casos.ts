import { definirCasos } from "@/motor/calculo";
import calculatorImpozitPeVenit from "./calculator-impozit-pe-venit";

const SFS = "https://dataset.gov.md/dataset/38ec2750-8671-4faa-833d-3041baae0a18/resource/7fcde90e-cac2-4a3e-b0f8-758607dd2205/download/anul-2026-1.pdf";

export default definirCasos(calculatorImpozitPeVenit, [
  {
    nombre: "Salariu de 180.000 de lei pe an cu scutirea personală",
    origen: { tipo: "recalculado", url: SFS, detalle: "Prima 9 % = 16.200; impozabil 180.000 − 16.200 − 29.700 = 134.100; impozit 12 % = 16.092 (12 × 1.341)." },
    fecha: "2026-10-26",
    entrada: { venit: 180000, salariu: true, scutire: "personala", intretinuti: 0, intretinutiDizabilitate: 0 },
    esperado: { prima: 16200, scutiri: 29700, impozabil: 134100, impozit: 16092, lunar: 1341, cotaEfectiva: 8.94 },
  },
  {
    nombre: "Venit de 400.000 de lei: fără scutire personală",
    origen: { tipo: "recalculado", url: SFS, detalle: "400.000 > 360.000. Prima 36.000; un întreținut 9.900; impozabil 354.100; impozit 42.492." },
    fecha: "2026-10-26",
    entrada: { venit: 400000, salariu: true, scutire: "personala", intretinuti: 1, intretinutiDizabilitate: 0 },
    esperado: { scutiri: 9900, impozabil: 354100, impozit: 42492 },
  },
  {
    nombre: "Venit care nu este salariu, cu scutire majorată",
    origen: { tipo: "recalculado", url: SFS, detalle: "Fără primă medicală reținută; impozabil 100.000 − 34.620 = 65.380; impozit 7.845,60." },
    fecha: "2026-10-26",
    entrada: { venit: 100000, salariu: false, scutire: "majorata", intretinuti: 0, intretinutiDizabilitate: 0 },
    esperado: { prima: 0, impozabil: 65380, impozit: 7845.6 },
  },
  {
    nombre: "Venit zero",
    origen: { tipo: "recalculado", url: SFS, detalle: "Fără venit nu există impozit de calculat." },
    fecha: "2026-10-26",
    entrada: { venit: 0, salariu: true, scutire: "personala", intretinuti: 0, intretinutiDizabilitate: 0 },
    esperaError: true,
  },
]);
