import { definirCasos } from "@/motor/calculo";
import calculatorSalariuNet from "./calculator-salariu-net";

const SFS = "https://dataset.gov.md/dataset/38ec2750-8671-4faa-833d-3041baae0a18/resource/7fcde90e-cac2-4a3e-b0f8-758607dd2205/download/anul-2026-1.pdf";
const MF = "https://particip.gov.md/ro/download_attachment/34715";

export default definirCasos(calculatorSalariuNet, [
  {
    nombre: "15.000 de lei brut cu scutirea personală",
    origen: { tipo: "recalculado", url: SFS, detalle: "Prima 9 % = 1.350; scutirea 29.700 / 12 = 2.475; baza 15.000 − 1.350 − 2.475 = 11.175; impozit 12 % = 1.341; net 15.000 − 1.350 − 1.341 = 12.309." },
    fecha: "2026-10-26",
    entrada: { brut: 15000, scutire: "personala", intretinuti: 0, intretinutiDizabilitate: 0 },
    esperado: { prima: 1350, scutireLunara: 2475, impozit: 1341, net: 12309, cas: 3600 },
  },
  {
    nombre: "Salariul minim de 6.300 de lei",
    origen: { tipo: "recalculado", url: SFS, detalle: "Prima 567; baza 6.300 − 567 − 2.475 = 3.258; impozit 390,96; net 6.300 − 567 − 390,96 = 5.342,04." },
    fecha: "2026-10-26",
    entrada: { brut: 6300, scutire: "personala", intretinuti: 0, intretinutiDizabilitate: 0 },
    esperado: { prima: 567, impozit: 390.96, net: 5342.04 },
  },
  {
    nombre: "35.000 de lei brut: peste plafonul de 360.000 de lei pe an",
    origen: { tipo: "recalculado", url: SFS, detalle: "35.000 × 12 = 420.000 > 360.000, fără scutire personală. Prima 3.150; baza 31.850; impozit 3.822; net 28.028." },
    fecha: "2026-10-26",
    entrada: { brut: 35000, scutire: "personala", intretinuti: 0, intretinutiDizabilitate: 0 },
    esperado: { scutireLunara: 0, impozit: 3822, net: 28028 },
  },
  {
    nombre: "Scutire majorată și două persoane întreținute",
    origen: { tipo: "recalculado", url: SFS, detalle: "(34.620 + 2 × 9.900) / 12 = 4.535; baza 15.000 − 1.350 − 4.535 = 9.115; impozit 1.093,80; net 12.556,20." },
    fecha: "2026-10-26",
    entrada: { brut: 15000, scutire: "majorata", intretinuti: 2, intretinutiDizabilitate: 0 },
    esperado: { scutireLunara: 4535, impozit: 1093.8, net: 12556.2 },
  },
  {
    nombre: "Fără scutire, cu o persoană întreținută cu dizabilitate",
    origen: { tipo: "recalculado", url: MF, detalle: "Scutire 21.780 / 12 = 1.815; baza 10.000 − 900 − 1.815 = 7.285; impozit 874,20; net 8.225,80." },
    fecha: "2026-10-26",
    entrada: { brut: 10000, scutire: "fara", intretinuti: 0, intretinutiDizabilitate: 1 },
    esperado: { scutireLunara: 1815, impozit: 874.2, net: 8225.8 },
  },
  {
    nombre: "Brut zero",
    origen: { tipo: "recalculado", url: MF, detalle: "Fără salariu nu există calcul." },
    fecha: "2026-10-26",
    entrada: { brut: 0, scutire: "personala", intretinuti: 0, intretinutiDizabilitate: 0 },
    esperaError: true,
  },
]);
